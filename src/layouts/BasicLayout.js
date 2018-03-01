import React, { Component } from 'react';
import { Menu, Modal } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';
import styles from './BasicLayout.scss';
import Header from '../components/Header';
import Form from '../components/Form';

import Apply from '../components/Apply';
import Discount from '../components/Discount';
import Summary from '../components/Summary';
import Allocate from '../components/Allocate';

import { UserRole } from '../common/enum';
import { RoleName } from '../common/filter';



class BasicLayout extends Component {

  componentWillMount() {

  }

  componentDidMount() {
    // let userRole = 
  }

  // 贷款申请组件渲染
  // 经办网点、总行零售部、脱贫办
  renderApplyItem(userRole) {

    if (userRole !== UserRole.BANK && userRole !== UserRole.RETAIL && userRole !== UserRole.ALLEVIATION) return;
    return (
      <Menu.Item key="apply" >
        <React.Fragment>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-issue" />
          </svg><span>贷款申请</span>
        </React.Fragment>
        <Link to={`${this.props.match.url}/apply`}>
          <span>贷款申请</span>
        </Link>
      </Menu.Item>
    )
  }

  // 贷款贴息组件渲染
  // 经办网点
  renderDiscountItem(userRole) {
    if (userRole !== UserRole.BANK) return;
    return (
      <Menu.Item key="discount" >
        <React.Fragment>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-bill" />
          </svg><span>贷款贴息</span>
        </React.Fragment>
        <Link to={`${this.props.match.url}/discount`}>
          <span>贷款贴息</span>
        </Link>
      </Menu.Item>
    )
  }

  // 贴息汇总组件选软
  // 全部可见
  renderSummaryItem(userRole) {
    // if (userRole !== UserRole.BANK) return;
    return (
      <Menu.Item key="summary" >
        <React.Fragment>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-product" />
          </svg><span>贴息汇总</span>
        </React.Fragment>
        <Link to={`${this.props.match.url}/summary`}>
          <span>贴息汇总</span>
        </Link>
      </Menu.Item>
    )
  }

  // 贴息拨款
  // 省财政局
  renderAllocateItem(userRole) {
    if (userRole !== UserRole.PROVINCIAL_FINANCE_BUREAU) return;
    return (
      <Menu.Item key="allocate" >
        <React.Fragment>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-download" />
          </svg><span>划拨款项</span>
        </React.Fragment>
        <Link to={`${this.props.match.url}/allocate`}>
          <span>贴息拨款</span>
        </Link>
      </Menu.Item>
    )
  }



  logout() {
    this.props.history.push("/login");
    sessionStorage.clear();
    console.log(this.props.history);
  }

  showLoginWarning() {
    const that = this;
    Modal.warning({
      title: '登陆提示',
      content: '您未登陆，请先登陆',
      onOk() {
        that.props.history.push("/login");
      }
    });
  }



  render() {
    let userRole = sessionStorage.getItem("role");
    if (userRole === null) {
      this.showLoginWarning();
      return (
        <div className={styles.container}>
          <Header userInfo={{ userName: sessionStorage.getItem("name"), roleName: RoleName(userRole) }} basicInfo={<a onClick={this.logout.bind(this)}>退出</a>} />
        </div>
      );
    }
    userRole = Number.parseInt(userRole);
    return (
      <div className={styles.container}>
        <Header userInfo={{ userName: sessionStorage.getItem("name"), roleName: RoleName(userRole) }} basicInfo={<a onClick={this.logout.bind(this)}>退出</a>} />

        <main>
          <div className={styles.menu}>
            <Menu
              mode="inline"
            >
              {this.renderApplyItem(userRole)}
              {this.renderDiscountItem(userRole)}
              {this.renderSummaryItem(userRole)}
              {this.renderAllocateItem(userRole)}



              {/* <Menu.Item key="formtest" >
                <React.Fragment>
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-homepage" />
                  </svg><span>表单测试</span>
                </React.Fragment>
                <Link to={`${this.props.match.url}/formtest`}>
                  <span>表单测试</span>
                </Link>
              </Menu.Item> */}
            </Menu>
          </div>
          <div className={styles.routers}>
            <Switch>
              <Route path={`${this.props.match.url}/apply`} component={Apply} />
              <Route path={`${this.props.match.url}/discount`} component={Discount} />
              <Route path={`${this.props.match.url}/summary`} component={Summary} />
              <Route path={`${this.props.match.url}/allocate`} component={Allocate} />
              <Route path={`${this.props.match.url}/formtest`} component={Form} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default BasicLayout;
