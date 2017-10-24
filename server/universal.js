const path = require('path');
const fs = require('fs');
const React = require('react');
const {Provider} = require('react-redux');
const {renderToString} = require('react-dom/server');
const {StaticRouter} = require('react-router-dom');
const { LocaleProvider } = require('antd');
const enUS = require('antd/lib/locale-provider/en_US');
const {addLocaleData, IntlProvider} = require('react-intl');
const acceptLanguage = require('accept-language');

const {default: configureStore} = require('../client/store');
const {default: App} = require('../client/containers/App');

const reactIntlLocaleEn = require('react-intl/locale-data/en');

acceptLanguage.languages(['en']);
addLocaleData([
  ...reactIntlLocaleEn
]);
const messages = {
  en: require(`../i18n/en.json`)
};

function detectLocale(req) {
  const cookieLocale = req.cookies.locale;
  return acceptLanguage.get(cookieLocale || req.headers['accept-language']) || 'en';
}

module.exports = function universal(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  const locale = detectLocale(req);
  res.cookie('locale', locale, { maxAge: (new Date() * 0.001) + (365 * 24 * 3600) });

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err);
      return res.status(404).end();
    }

    const context = {};
    const store = configureStore();

    const markup = renderToString(
      <Provider store={store}>
        <IntlProvider locale={locale} messages={messages[locale]}>
          <LocaleProvider locale={enUS}>
            <StaticRouter location={req.url} context={context}>
              <App/>
            </StaticRouter>
          </LocaleProvider>
        </IntlProvider>
      </Provider>
    );

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url);
    } else {
      // we're good, send the response
      const RenderedApp = htmlData.replace('{{SSR}}', markup);
      res.send(RenderedApp);
    }
  })
}

