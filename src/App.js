import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import UserLayout from './layouts/UserLayout';
import BasicLayout from './layouts/BasicLayout';
import './utils/iconfont.js';
import './App.scss';

class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path="/main" component={BasicLayout} />
            <Route path="/" component={UserLayout} />
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}

export default App;
