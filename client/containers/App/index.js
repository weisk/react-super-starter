import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DatePicker, message } from 'antd';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import FirstPage from '../FirstPage';
import SecondPage from '../SecondPage';
import NoMatch from '../../components/NoMatch';

class App extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
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

  render(){
    return (
      <div>
        <h1>Server Side Rendering React</h1>
        <p>Using express v4, react-router v4, ANT.design, react-intl, jest+enzyme</p>
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
