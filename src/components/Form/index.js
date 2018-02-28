import React, { Component } from 'react';
import { Form, Button, Input, Row, Col, Card, DatePicker,message } from 'antd';
import moment from 'moment';
import styles from './style.scss';

import { MD5 } from "crypto-js";

const FormItem = Form.Item;

const formData = {
  projectId: '',
  projectName: '',
  contractCode: '',
  valueDay: 0,
  startDay: 0,
  dueDay: 0,
  corpus: '',
  oddCorpus: '',
  interestRateTypeCode: '',
  interestRate: '',
  repaymentTypeCode: '',
  paymentFrequencyCode: '',
  deductDay: 0,
  repaymentAmountPerMonth: '',
  feeRate: '',
  fee: '',
  loansPurpose: '',
  internalGrade: '',
  name: '',
  age: '',
  credentialsTypeCode: '',
  credentialsCode: '',
  maritalStatusCode: '',
  census: '',
  educationCode: '',
  monthlyIncome: '',
  place: '',
  postcode: '',
  provinceCode: '',
  profession: '',
  organizationName: '',
  duty: '',
  title: '',
  levelCode: '',
  currentOverdueDays: '',
  currentOverdueTimes: '',
  overdueDaysTotal: ''
};

class FormIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: [{
        key: 0,
        ...formData
      }]
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { formList } = this.state;
    this.props.form.validateFields((err, values) => {
      if (err) return;

      Object.keys(values).forEach((item) => {
        const key = item.split('-')[1];
        const itemKey = item.split('-')[0];
        formList.forEach((formItem, index) => {
          if (formItem.key === Number(key)) {
            formList[index][itemKey] = typeof values[item] !== 'string' ?
              values[item].valueOf() : values[item];
          }
        });
      });


      let assetInsetUrl = "v1/asset/createAssetPoolOnChain";
      let content = JSON.stringify(formList);
      let abstractParam = MD5(content).toString();
      let token = sessionStorage.getItem("token");


      fetch(assetInsetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token":token,
          "abstractParam":abstractParam
        },
        body: content
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject();
      }).then(success => {
        let code = success.code;
        if (code !== "0000") {
          message.error(success.message, 2);
          return;
        }
        console.log(success.data);
        message.success("添加成功，正在异步写入，等待回调", 2);
        // Util.setSessionStorageItem("token", { login: true, token: token, accountName: userName });
      }, error => {
        message.error("网络异常，请检查网络配置", 2);
      });

    });
  }

  addCompany = () => {
    const { form } = this.props;
    form.validateFields(() => {
      const length = this.state.formList.length;
      const newList = [
        ...this.state.formList,
        {
          key: this.state.formList[length - 1].key + 1,
          ...formData
        }
      ];
      this.setState({
        formList: newList
      });
    });
  }

  deleteCompany = (index) => {
    const { formList } = this.state;
    const newList = formList.filter((item, i) => {
      return i !== index;
    });
    this.setState({
      formList: newList
    });
  }

  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  render() {
    const { formList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      }
    };

    const items = formList.map((item, index) => {
      return (
        <Row className={styles.companyForm} key={item.key}>
          <Col span={2} className={styles.index}>
            <span>{index + 1}</span>
          </Col>
          <Col span={20}>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="项目ID"
                >
                  {getFieldDecorator(`projectId-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入项目ID！'
                    }],
                    initialValue:"0001201802072213",
                  })(
                    <Input placeholder="请输入项目ID" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="项目名称"
                >
                  {getFieldDecorator(`projectName-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入项目名称！'
                    }],
                    initialValue:"资产001"
                  })(
                    <Input placeholder="请输入项目名称" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="合同编号"
                >
                  {getFieldDecorator(`contractCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入合同编号！'
                    }],
                    initialValue:"3100238997623"
                  })(
                    <Input placeholder="请输入合同编号" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="合同起息日"
                >
                  {getFieldDecorator(`valueDay-${item.key}`, {
                    rules: [{
                      required: true, message: '请选择合同起息日！'
                    }],
                    initialValue:moment('2018-02-07', 'YYYY-MM-DD')
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="请选择合同起息日"
                      disabledDate={this.disabledDate}
                    />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="合同起始日"
                >
                  {getFieldDecorator(`startDay-${item.key}`, {
                    rules: [{
                      required: true, message: '请选择合同起始日！'
                    }],
                    initialValue:moment('2018-02-07', 'YYYY-MM-DD')
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="请选择合同起始日"
                      disabledDate={this.disabledDate}
                    />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="合同到期日"
                >
                  {getFieldDecorator(`dueDay-${item.key}`, {
                    rules: [{
                      required: true, message: '请选择合同到期日！'
                    }],
                    initialValue:moment('2020-08-08', 'YYYY-MM-DD')
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="请选择合同到期日"
                      disabledDate={this.disabledDate}
                    />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="合同本金"
                >
                  {getFieldDecorator(`corpus-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入合同本金！'
                    }],
                    initialValue:'888888.66'
                  })(
                    <Input placeholder="请输入合同本金" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="剩余本金"
                >
                  {getFieldDecorator(`oddCorpus-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入剩余本金！'
                    }],
                    initialValue:'111111.34'
                  })(
                    <Input placeholder="请输入剩余本金" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="利率类型"
                >
                  {getFieldDecorator(`interestRateTypeCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入利率类型！'
                    }],
                    initialValue:'1'
                  })(
                    <Input placeholder="请输入利率类型" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="贷款利率"
                >
                  {getFieldDecorator(`interestRate-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入贷款利率！'
                    }],
                    initialValue:'0.6181'
                  })(
                    <Input placeholder="请输入贷款利率" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="还款方式"
                >
                  {getFieldDecorator(`repaymentTypeCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入还款方式！'
                    }],
                    initialValue:'1'
                  })(
                    <Input placeholder="请输入还款方式" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="还款频率"
                >
                  {getFieldDecorator(`paymentFrequencyCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入还款频率！'
                    }],
                    initialValue:'6'
                  })(
                    <Input placeholder="请输入还款频率" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="扣款日期"
                >
                  {getFieldDecorator(`deductDay-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入选择日期！'
                    }],
                    initialValue:moment('2020-08-08', 'YYYY-MM-DD')
                  })(
                    <DatePicker
                      style={{ width: '100%' }}
                      placeholder="请选择扣款日期"
                      disabledDate={this.disabledDate}
                    />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="每月还款金额"
                >
                  {getFieldDecorator(`repaymentAmountPerMonth-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入每月还款金额！'
                    }],
                    initialValue:"2333.22"
                  })(
                    <Input placeholder="请输入每月还款金额" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="手续费率"
                >
                  {getFieldDecorator(`feeRate-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入手续费率！'
                    }],
                    initialValue:"0.3142"
                  })(
                    <Input placeholder="请输入手续费率" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="手续费"
                >
                  {getFieldDecorator(`fee-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入手续费！'
                    }],
                    initialValue:"2333.23"
                  })(
                    <Input placeholder="请输入手续费" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="贷款用途"
                >
                  {getFieldDecorator(`loansPurpose-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入贷款用途！'
                    }],
                    initialValue:"为解决购房问题，进行贷款申请"
                  })(
                    <Input placeholder="请输入贷款用途" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="内部评分"
                >
                  {getFieldDecorator(`internalGrade-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入内部评分！'
                    }],
                    initialValue:"10"
                  })(
                    <Input placeholder="请输入内部评分" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="姓名"
                >
                  {getFieldDecorator(`name-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入姓名！'
                    }],
                    initialValue:"张正义"
                  })(
                    <Input placeholder="请输入姓名" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="年龄"
                >
                  {getFieldDecorator(`age-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入年龄！'
                    }],
                    initialValue:"25"
                  })(
                    <Input placeholder="请输入年龄" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="证件类型"
                >
                  {getFieldDecorator(`credentialsTypeCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入证件类型！'
                    }],
                    initialValue:"1"
                  })(
                    <Input placeholder="请输入证件类型" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="证件号"
                >
                  {getFieldDecorator(`credentialsCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入证件号！'
                    }],
                    initialValue:"350181199311205688"
                  })(
                    <Input placeholder="请输入证件号" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="婚姻状况"
                >
                  {getFieldDecorator(`maritalStatusCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入婚姻状况！'
                    }],
                    initialValue:"1"
                  })(
                    <Input placeholder="请输入婚姻状况" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="户籍"
                >
                  {getFieldDecorator(`census-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入户籍！'
                    }],
                    initialValue:"福建"
                  })(
                    <Input placeholder="请输入户籍" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="学历"
                >
                  {getFieldDecorator(`educationCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入学历！'
                    }],
                    initialValue:"1"
                  })(
                    <Input placeholder="请输入学历" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="个人月收入"
                >
                  {getFieldDecorator(`monthlyIncome-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入个人月收入！'
                    }],
                    initialValue:"30000"
                  })(
                    <Input placeholder="请输入个人月收入" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="家庭住址"
                >
                  {getFieldDecorator(`place-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入家庭住址！'
                    }],
                    initialValue:"福建省福州市福清市"
                  })(
                    <Input placeholder="请输入家庭住址" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="家庭邮编"
                >
                  {getFieldDecorator(`postcode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入家庭邮编！'
                    }],
                    initialValue:"653331"
                  })(
                    <Input placeholder="请输入家庭邮编" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="开户省"
                >
                  {getFieldDecorator(`provinceCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入开户省！'
                    }],
                    initialValue:"1"
                  })(
                    <Input placeholder="请输入开户省" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="职业"
                >
                  {getFieldDecorator(`profession-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入职业！'
                    }],
                    initialValue:"程序员"
                  })(
                    <Input placeholder="请输入职业" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="单位名称"
                >
                  {getFieldDecorator(`organizationName-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入单位名称！'
                    }],
                    initialValue:"人类科技"
                  })(
                    <Input placeholder="请输入单位名称" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="本人职务"
                >
                  {getFieldDecorator(`duty-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入本人职务！'
                    }],
                    initialValue:"项目经理"
                  })(
                    <Input placeholder="请输入本人职务" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="本人职称"
                >
                  {getFieldDecorator(`title-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入本人职称！'
                    }],
                    initialValue:"高级工程师"
                  })(
                    <Input placeholder="请输入本人职称" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="五级分类"
                >
                  {getFieldDecorator(`levelCode-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入五级分类！'
                    }],
                    initialValue:"1"
                  })(
                    <Input placeholder="请输入五级分类" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="当期逾期天数"
                >
                  {getFieldDecorator(`currentOverdueDays-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入当期逾期天数！'
                    }],
                    initialValue:"2"
                  })(
                    <Input placeholder="请输入当期逾期天数" />
                    )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="累计逾期次数"
                >
                  {getFieldDecorator(`currentOverdueTimes-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入累计逾期次数！'
                    }],
                    initialValue:"1"
                  })(
                    <Input placeholder="请输入累计逾期次数" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row className={styles.firstRow}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="累计逾期天数"
                >
                  {getFieldDecorator(`overdueDaysTotal-${item.key}`, {
                    rules: [{
                      required: true, message: '请输入累计逾期天数！'
                    }],
                    initialValue:"2"
                  })(
                    <Input placeholder="请输入累计逾期天数" />
                    )}
                </FormItem>
              </Col>
            </Row>
          </Col>
          {
            index !== 0 &&
            <Col span={2}>
              <Button type="text" onClick={this.deleteCompany.bind(this, index)}>删除</Button>
            </Col>
          }
        </Row>
      );
    });
    return (
      <Card title="表单" bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          {items}
          <div className={styles.add}>
            <Button type="dashed" onClick={this.addCompany}>添加资产</Button>
          </div>
          <div className={styles.next}>
            <Button type="primary" size="large" htmlType="submit">提交</Button>
          </div>
        </Form>
      </Card>
    );
  }
}

const wapperForm = Form.create()(FormIndex);
export default wapperForm;
