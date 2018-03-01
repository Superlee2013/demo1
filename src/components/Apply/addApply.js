import React, { Component } from 'react';
import { Form, Button, Input, Select, Row, Col, Card, DatePicker, message, Spin, Anchor } from 'antd';
import moment from 'moment';
import styles from './addApply.scss';

import MyUpload from '../Upload';

import { MD5 } from "crypto-js";

import { insert } from '../../services/audit';

const { Link } = Anchor;

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

class FormIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      insertLoding: false
    };
  }


  uploadFile(id, file) {
    this.state.data[id] = file;
  }

  handleSubmit = (e) => {
    const that = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;

      this.setState({ insertLoding: true })
      const { data } = this.state;

      Object.keys(values).forEach((item) => {
        data[item] = typeof values[item] !== 'string' ?
          values[item].valueOf() : values[item];
      })

      console.log(data);

      insert(data).then((res) => {
        if (res instanceof Error) return;
        // console.log(res);
        that.setState({ insertLoding: false })
        that.props.history.goBack();
      });

    });
  }

  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  renderRowItem = (labelName1, mark1, initialValue1, labelName2, mark2, initialValue2) => {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label={labelName1}
          >
            {getFieldDecorator(mark1, {
              rules: [{
                required: true, message: `请输入${labelName1}`
              }],
              initialValue: initialValue1,
            })(
              <Input placeholder={`请输入${labelName1}`} />
              )}
          </FormItem>
        </Col>
        {!labelName2 ? null :
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={labelName2}
            >
              {getFieldDecorator(mark2, {
                rules: [{
                  required: true, message: `请输入${labelName2}`
                }],
                initialValue: initialValue2
              })(
                <Input placeholder={`请输入${labelName2}`} />
                )}
            </FormItem>
          </Col>}
      </Row>
    )
  }

  renderDropList = (labelName, mark, choices) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col span={12}>
        <FormItem
          {...formItemLayout}
          label={labelName}
        >
          {getFieldDecorator(mark, {
            rules: [{
              required: true, message: `请输入${labelName}`
            }],
            initialValue: "1",
          })(
            <Select>
              <Option value="1" key="1">建档立卡贫困户</Option>
              <Option value="2" key="2">农业专业大户</Option>
              <Option value="3" key="3">家庭农场</Option>
              <Option value="4" key="4">农民合作社</Option>
              <Option value="5" key="5">农业龙头企业</Option>
            </Select>
            )}
        </FormItem>
      </Col>
    )
  }

  renderDataItem(labelName1, mark1, initialValue1, labelName2, mark2, initialValue2) {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row>
        <Col span={12}>
          <FormItem
            {...formItemLayout}
            label={labelName1}
          >
            {getFieldDecorator(mark1, {
              rules: [{
                required: true, message: `请输入${labelName1}`
              }],
              initialValue: initialValue1,
            })(
              <DatePicker style={{ width: '100%' }} placeholder={`请输入${labelName1}`} />
              )}
          </FormItem>
        </Col>
        {!labelName2 ? null :
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={labelName2}
            >
              {getFieldDecorator(mark2, {
                rules: [{
                  required: true, message: `请输入${labelName2}`
                }],
                initialValue: initialValue2
              })(
                <DatePicker style={{ width: '100%' }} placeholder={`请输入${labelName2}`} />
                )}
            </FormItem>
          </Col>}
      </Row>
    )
  }


  render() {
    const { getFieldDecorator } = this.props.form;


    return (
      <Card title="申请贷款" bordered={false}>

        <Form onSubmit={this.handleSubmit}>
          {this.renderRowItem("申请人姓名", "name", "哈哈", "证件号码", "idNumber", "4212313131")}
          {this.renderRowItem("性别", "sex", "男", "年龄", "age", "22")}
          {this.renderRowItem("联系电话", "phone", "189323232","贷款项目名称", "projectName", "搞事")}
          {this.renderRowItem("所在乡(镇、街道)村(居)", "location", "12312", "详细地址", "familyAddress", "12312号")}
          {this.renderRowItem("贷款金额(单位：万元)", "loanAmount", "123", "贷款用途", "useOfLoan", "买房")}
          {/* {rowItem("审贷期限", "loanPeriod", "类型", "loanType")} */}

          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label={"审贷期限"}
              >
                {getFieldDecorator(`loanPeriod`, {
                  rules: [{
                    required: true, message: `请输入审贷期限`
                  }],
                  initialValue: "1年",
                })(
                  <Input placeholder={`请输入审贷期限`} />
                  )}
              </FormItem>
            </Col>
            {this.renderDropList("类型", "loanType")}
          </Row>

          {this.renderRowItem("担保人A", "guaranteeA", "AAA", "担保人A身份证", "guaranteeAIdNumber", "123121")}
          {this.renderRowItem("担保人B", "guaranteeB", "BBB", "担保人B身份证", "guaranteeBIdNumber", "12312")}
          {this.renderRowItem("贫困户A姓名", "poorHouseholdsAName", "贫困A", "贫困户A身份证", "poorHouseholdsAId", "42421142")}
          {this.renderDataItem("贫困户A日期", "poorHouseholdsADate", moment('2018-02-02', 'YYYY-MM-DD'))}
          {this.renderRowItem("贫困户B姓名", "poorHouseholdsBName", "贫困A", "贫困户B身份证", "poorHouseholdsBId", "BBBBB")}
          {this.renderDataItem("贫困户B日期", "poorHouseholdsBDate", moment('2018-02-02', 'YYYY-MM-DD'))}
          {this.renderRowItem("担保方式", "guaranteeForm", "A", "贷款余额", "loanBalance", "123.23")}
          {this.renderDataItem("起始日期", "startDate", moment('2018-02-02', 'YYYY-MM-DD'), "到期日期", "endDate", moment('2018-05-02', 'YYYY-MM-DD'))}



          <Card title="附件上传" bordered={false}>
            <div className={styles.attachItem}>
              <div className={styles.attachItemName}>
                申请人身份证件上传:
              </div>
              <div className={styles.attachItemContent}>
                <MyUpload content={"身份证正面"} style={{ marginRight: 10 }} uploadFile={this.uploadFile.bind(this, "idFaceFile")}></MyUpload>
                <MyUpload content={"身份证反面"} uploadFile={this.uploadFile.bind(this, "idBackFile")}></MyUpload>
              </div>
            </div>
            <div className={styles.attachItem}>
              <div className={styles.attachItemName}>
                贫困户A身份证件上传:
              </div>
              <div className={styles.attachItemContent}>
                <MyUpload content={"身份证正面"} style={{ marginRight: 10 }} uploadFile={this.uploadFile.bind(this, "poorHouseholdsAIdFaceFile")}></MyUpload>
                <MyUpload content={"身份证反面"} uploadFile={this.uploadFile.bind(this, "poorHouseholdsAIdBackFile")}></MyUpload>
              </div>
            </div>
            <div className={styles.attachItem}>
              <div className={styles.attachItemName}>
                贫困户B身份证件上传:
              </div>
              <div className={styles.attachItemContent}>
                <MyUpload content={"身份证正面"} style={{ marginRight: 10 }} uploadFile={this.uploadFile.bind(this, "poorHouseholdsBIdFaceFile")}></MyUpload>
                <MyUpload content={"身份证反面"} uploadFile={this.uploadFile.bind(this, "poorHouseholdsBIdBackFile")}></MyUpload>
              </div>
            </div>
            {/* <Row>
              <Col span ={12}></Col>
              <Col span ={12}></Col>
            </Row> */}
            <div className={styles.attachItem}>
              <div className={styles.attachItemName}>
                带动协议:
              </div>
              <div className={styles.attachItemContent}>
                <MyUpload content={"带动协议"} uploadFile={this.uploadFile.bind(this, "drivingAgreementFile")}></MyUpload>
              </div>
            </div>
            <div className={styles.attachItem}>
              <div className={styles.attachItemName}>
                申请表上传:
              </div>
              <div className={styles.attachItemContent}>
                <MyUpload content={"申请表"} uploadFile={this.uploadFile.bind(this, "auditFile")}></MyUpload>
              </div>
            </div>
          </Card>


          <div className={styles.next}>
            <Button type="primary" size="large" htmlType="submit" loading={this.state.insertLoding}>提交</Button>
            <Button size="large" style={{ marginLeft: 50 }} onClick={() => { console.log(this.props.history.goBack()) }}>放弃</Button>
          </div>

        </Form>
      </Card>
    );
  }
}


const wapperForm = Form.create()(FormIndex);
export default wapperForm;
