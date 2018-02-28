import React, { Component } from 'react';
import { Form, Input, Button, Icon, Checkbox, message } from 'antd';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import styles from './UserLayout.scss';

import Util from '../utils/Util';

import { UrlRouteIndex } from '../common/filter';

import { login } from '../services/session';

const FormItem = Form.Item;

class Login extends Component {

  componentDidMount() {
    sessionStorage.clear();
  }

  handleSubmit = (e) => {
    const that = this;
    e.preventDefault();

    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (err) return;
        login(values).then((res) => {
          if (res instanceof Error) return;
          // console.log(res);
          let userRole = res.data.roleCode;
          let userName = res.data.accountName;
          sessionStorage.setItem("role", userRole);
          sessionStorage.setItem("name", userName)
          that.nextMainUrl(userRole, that.props.history);
        })
      });



    // that.nextMainUrl(userRole, that.props.history);
    // sessionStorage.setItem("role", userRole);


  }

  nextMainUrl(userRole, history) {
    let url = "/main/" + UrlRouteIndex(userRole);
    history.push(url);
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.main}>
          <div className={styles.login}>
            <h3 className={styles.head}>密码登陆</h3>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('accountName', {
                  rules: [
                    { required: true, message: '用户名不能为空!' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                    placeholder="请输入账户名"
                  />
                  )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    { required: true, message: '密码不能为空!' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon} />}
                    type="password"
                    placeholder="请输入密码"
                  />
                  )}
              </FormItem>
              <FormItem className={styles.additional}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox className={styles.autoLogin}>记住我</Checkbox>
                  )}
                {/* <Link className={styles.forgot} to="/user/forgetPwd">忘记密码？</Link> */}
                <br />
                <Button
                  size="large"
                  className={styles.submit}
                  type="primary"
                  htmlType="submit"
                >
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const wapperLogin = Form.create()(Login);
export default wapperLogin;
