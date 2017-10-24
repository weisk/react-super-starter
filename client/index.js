import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { addLocaleData, IntlProvider } from 'react-intl';
import reactIntlLocaleEn from 'react-intl/locale-data/en';
import Cookie from 'js-cookie';

import configureStore from './store';
import './index.scss';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

// Let the reducers handle initial state;
const initialState = {};
const store = configureStore(initialState);

// get locale from cookie, otherwise english
const locale = Cookie.get('locale') || 'en';

function renderRoot(localeData) {
  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale={locale} messages={localeData}>
        <LocaleProvider locale={enUS}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LocaleProvider>
      </IntlProvider>
    </Provider>
  , document.getElementById('root'));
}

fetch(`/i18n/${locale}.json`)
.then((res) => res.json())
.then((json) => {
  addLocaleData([...reactIntlLocaleEn]);
  renderRoot(json);
  registerServiceWorker();
})
.catch((err) => {
  console.error(err);
});

