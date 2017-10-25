import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';
import { Switch, Route } from 'react-router-dom';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import {
  DatePicker,
  message,
  Dropdown,
  Menu,
  Button,
  Icon
} from 'antd';

import FirstPage from '../FirstPage';
import SecondPage from '../SecondPage';
import NoMatch from '../../components/NoMatch';

class App extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    locale: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
  }

  handleChange(date) {
    message.info('Selected Date: ' + date.toString());
    this.setState({ date });
  }

  changeLocale(locale = 'en') {
    Cookie.set('locale', locale.key);
    window.location.reload();
  }

  render(){
    const { locale } = this.props;

    const languagesMenu = (
      <Menu onClick={(locale) => this.changeLocale(locale)}>
        <Menu.Item key="en">
          <FormattedMessage id="app.english"/>
        </Menu.Item>
        <Menu.Item key="es">
          <FormattedMessage id="app.spanish"/>
        </Menu.Item>
      </Menu>
    );

    const languagesButton = (
      <div>
        <Dropdown overlay={languagesMenu} placement="bottomRight" trigger={['click']}>
          <Button style={{ marginLeft: 8 }}>
            { locale } <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );

    return (
      <div>
        <h1>Server Side Rendering React</h1>
        <p>Using express v4, react-router v4, ANT.design, react-intl, jest+enzyme</p>
        { languagesButton }
        <br/>
        <h2>
          <FormattedMessage id="app.hello" />
        </h2>
        <DatePicker onChange={value => this.handleChange(value)} />
        <div style={{ marginTop: 20 }}>Date: {this.state.date.toString()}</div>
        <br/>
        <p>routes:</p>
        <Switch>
          <Route exact path="/" component={FirstPage}/>
          <Route path="/second" component={SecondPage}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  }
}

export default injectIntl(App);
