import React, { Component } from 'react';
import styles from "./applyInfo.scss";
import { Card, Col, Input, message, Row, Button, Modal, Spin } from 'antd';
import MyUpload from '../Upload';

const confirm = Modal.confirm;
const TextArea = Input.TextArea;


class ApplyInfo extends Component {

    state = {
        attachVisible: false,
        attachLoading: false
    }

    renderSingleColData(labelName, data) {
        return (
            <Col span={12}>
                <Row>
                    <Col span={8} style={{ fontWeight: 700 }}>{`${labelName}:`} </Col>
                    <Col span={16}>{data || "默认不晓得什么鬼"}</Col>
                </Row>
            </Col>
        )
    }

    uploadFile(id, file) {
        this.state[id] = file;
    }

    renderInfo(data) {
        return (
            <div className={styles.content}>
                <Row className={styles.row}>
                    {this.renderSingleColData("姓名", data.name)}
                    {this.renderSingleColData("证件号码", data.idNumber)}
                </Row>

                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        身份证:
                    </Col>
                    <Col span={8}>
                        <div style={{ background: 'red', width: 250, height: 100 }}></div>
                    </Col>
                    <Col span={8}>
                        <div style={{ background: 'yellow', width: 250, height: 100 }}></div>
                    </Col>
                </Row>

                <Row className={styles.row}>
                    {this.renderSingleColData("联系电话", data.phone)}
                    {this.renderSingleColData("所在乡(镇、街道)村(居)", data.location)}
                </Row>

                <Row className={styles.row}>
                    {this.renderSingleColData("贷款金额(单位：万元)", data.loanAmount)}
                    {this.renderSingleColData("贷款用途", data.useOfLoan)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("审贷期限", data.loanPeriod)}
                    {this.renderSingleColData("类型", data.loanType)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("担保人A", data.guaranteeA)}
                    {this.renderSingleColData("担保人A身份证", data.guarenteeAIdNumber)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("担保人B", data.guaranteeB)}
                    {this.renderSingleColData("担保人B身份证", data.guarenteeBIdNumber)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("担保人B", data.guaranteeB)}
                    {this.renderSingleColData("担保人B身份证", data.guarenteeBIdNumber)}
                </Row>

                <Row className={styles.row}>
                    {this.renderSingleColData("担保方式", data.guaranteeForm)}
                    {this.renderSingleColData("贷款余额", data.loanBalance)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("起始日期", data.startDate)}
                    {this.renderSingleColData("到期日期", data.endDate)}
                </Row>

                <Row className={styles.row} style={{ marginTop: 30 }}>
                    {this.renderSingleColData("贫困户A姓名", data.poorHouseholdsAName)}
                    {this.renderSingleColData("贫困户A身份证", data.poorHouseholdsAId)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("贫困户A日期", data.poorHouseholdsADate)}
                </Row>
                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        贫困户A身份证
                    </Col>
                    <Col span={8}>
                        <div style={{ background: 'red', width: 250, height: 100 }}></div>
                    </Col>
                    <Col span={8}>
                        <div style={{ background: 'yellow', width: 250, height: 100 }}></div>
                    </Col>
                </Row>

                <Row className={styles.row} style={{ marginTop: 30 }}>
                    {this.renderSingleColData("贫困户B姓名", data.poorHouseholdsBName)}
                    {this.renderSingleColData("贫困户B身份证", data.poorHouseholdsBId)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("贫困户B日期", data.poorHouseholdsBDate)}
                </Row>
                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        贫困户B身份证
                    </Col>
                    <Col span={8}>
                        <div style={{ background: 'red', width: 250, height: 100 }}></div>
                    </Col>
                    <Col span={8}>
                        <div style={{ background: 'yellow', width: 250, height: 100 }}></div>
                    </Col>
                </Row>

                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        借贷合同:
                    </Col>
                    <Col span={8}>
                        <div style={{ background: 'red', width: 250, height: 100 }}></div>
                    </Col>
                    {/* <Col span={4} style={{fontWeight:700}}>
                        审核表:
                    </Col>
                    <Col span={8}>
                        <div style={{background:'red',width:250,height:100}}></div>
                    </Col> */}
                </Row>
            </div>
        )
    }

    showConfirm() {
        const that = this;
        confirm({
            title: '确认发起贴息？',
            content: '',
            onOk() {
                console.log('OK');
                that.showAttachModal();
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    showAttachModal = () => {
        this.setState({
            attachVisible: true,
        });
    }

    hideAttachModal = () => {
        this.setState({
            attachVisible: false,
            attachLoading:false
        });
    }

    handelAttach() {
        console.log(this.state);
        // this.hideAttachModal();
        if(!this.state.discountAmount||!this.state.discountFund||!this.state.discountAccount){
            message.error("关键不能为空", 2);
            return;
        }
        this.setState({attachLoading:true})
    }

    attachItemInput(event, id) {
        let value = event.target.value;
        let item = {};
        item[id] = value;
        this.setState(item);
    }


    render() {
        let userRole = 1;
        return (
            <React.Fragment>
                <Card title="贷款申请表详情" bordered={false}>
                    {
                        this.renderInfo({})
                    }
                </Card>

                {
                    userRole === 1 ? (
                        <div className={styles.action}>
                            <Button type="primary" size="large" htmlType="submit" onClick={this.showConfirm.bind(this)}>贴息</Button>
                            <Button size="large" style={{ marginLeft: 50 }} onClick={() => { console.log(this.props.history.goBack()) }}>返回</Button>

                            <Modal
                                title="贴息"
                                visible={this.state.attachVisible}
                                onOk={this.handelAttach.bind(this)}
                                onCancel={this.hideAttachModal.bind(this)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <Spin spinning={this.state.attachLoading}>
                                    <div className={styles.attachItem}>
                                        <div className={styles.attachItemName}>拟贴息额</div>
                                        <div className={styles.attachItemInput}>
                                            <Input placeholder="请输入拟贴息额" onChange={(event) => { this.attachItemInput(event, "discountAmount") }} />
                                        </div>
                                    </div>
                                    <div className={styles.attachItem}>
                                        <div className={styles.attachItemName}>拟贴息资金</div>
                                        <div className={styles.attachItemInput}>
                                            <Input placeholder="请输入拟贴息资金" onChange={(event) => { this.attachItemInput(event, "discountFund") }} />
                                        </div>
                                    </div>
                                    <div className={styles.attachItem}>
                                        <div className={styles.attachItemName}>贴息款账户</div>
                                        <div className={styles.attachItemInput}>
                                            <Input placeholder="请输入汇入贴息款账户" onChange={(event) => { this.attachItemInput(event, "discountAccount") }} />
                                        </div>
                                    </div>
                                </Spin>
                            </Modal>

                        </div>
                    ) : null
                }

            </React.Fragment>

        );
    }
}

export default ApplyInfo;