import React, { Component } from 'react';
import styles from "./applyInfo.scss";
import { Card, Col, Input, message, Row, Button, Modal, Alert, Spin } from 'antd';
import MyUpload from '../Upload';
import moment from 'moment';

import { UserRole } from '../../common/enum';

import { queryAudit } from '../../services/audit';
import { insert } from '../../services/discount';

const confirm = Modal.confirm;
const TextArea = Input.TextArea;


class ApplyInfo extends Component {

    state = {
        queryLoading: true,
        attachVisible: false,
        attachLoading: false,
        auditId: this.props.match.params.id,
        auditInfo: {}
    }

    componentDidMount() {
        console.log(this.state.auditId);
        this.queryAuditInfo(this.props.match.params.id);
    }

    uploadFile(id, file) {
        this.state[id] = file;
    }

    // 查询详情
    queryAuditInfo(auditId) {
        const that = this;
        queryAudit({
            auditId: auditId
        }).then(res => {
            if (res instanceof Error) return;
            that.setState({
                queryLoading: false,
                auditInfo: res.data
            })
        })
    }

    // 贴息申请
    applyDiscount() {
        const that = this;
        const { auditId, discountAmount, discountFund, discountAccount } = this.state;
        insert({
            auditId: auditId,
            discountAmount: discountAmount,
            discountFund: discountFund,
            discountAccount: discountAccount
        }).then(res => {
            if (res instanceof Error) return;
            that.setState({
                attachLoading: false,
                attachVisible: false
            });
            that.props.history.push("../summary");
        })
    }

    renderImgArea(url) {
        return (
            <div style={{ width: 250, height: 120 }}>
                {
                    url ? <img src={url} className={styles.imageArea} onClick={() => { window.open(url) }} /> : <Alert message="未上传" type="warning" />
                }
            </div>
        )
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


    renderInfo(data) {
        return (
            <div className={styles.content}>
                <Row className={styles.row}>
                    {this.renderSingleColData("姓名", data.name)}
                    {this.renderSingleColData("证件号码", data.idNumber)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("性别", data.sex)}
                    {this.renderSingleColData("年龄", data.age)}
                </Row>

                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        身份证:
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.idFaceUrl)
                        }
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.idBackUrl)
                        }
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
                    {this.renderSingleColData("担保方式", data.guaranteeForm)}
                    {this.renderSingleColData("贷款余额", data.loanBalance)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("起始日期", moment(Number.parseInt(data.startDate)).format('YYYY-MM-DD'))}
                    {this.renderSingleColData("到期日期", moment(Number.parseInt(data.endDate)).format('YYYY-MM-DD'))}
                </Row>

                <Row className={styles.row} style={{ marginTop: 30 }}>
                    {this.renderSingleColData("贫困户A姓名", data.poorHouseholdsAName)}
                    {this.renderSingleColData("贫困户A身份证", data.poorHouseholdsAId)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("贫困户A日期", moment(Number.parseInt(data.poorHouseholdsADate)).format('YYYY-MM-DD'))}
                </Row>
                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        贫困户A身份证
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.poorHouseholdsAIdFaceUrl)
                        }
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.poorHouseholdsAIdBackUrl)
                        }
                    </Col>
                </Row>

                <Row className={styles.row} style={{ marginTop: 30 }}>
                    {this.renderSingleColData("贫困户B姓名", data.poorHouseholdsBName)}
                    {this.renderSingleColData("贫困户B身份证", data.poorHouseholdsBId)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("贫困户B日期", moment(Number.parseInt(data.poorHouseholdsBDate)).format('YYYY-MM-DD'))}
                </Row>
                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        贫困户B身份证
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.poorHouseholdsBIdFaceUrl)
                        }
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.poorHouseholdsBIdBackUrl)
                        }
                    </Col>
                </Row>

                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        借贷合同:
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.loanContractUrl)
                        }
                    </Col>
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
            attachLoading: false
        });
    }

    handelAttach() {
        console.log(this.state);
        // this.hideAttachModal();
        if (!this.state.discountAmount || !this.state.discountFund || !this.state.discountAccount) {
            message.error("关键不能为空", 2);
            return;
        }
        this.setState({ attachLoading: true });
        this.applyDiscount();
    }

    attachItemInput(event, id) {
        let value = event.target.value;
        let item = {};
        item[id] = value;
        this.setState(item);
    }


    render() {
        if (this.state.queryLoading) {
            return (
                <Card title="贷款申请表详情" bordered={false}>
                    <div className={styles.loadingArea}>
                        <Spin />
                    </div>
                </Card>
            )
        }
        let userRole = Number.parseInt(sessionStorage.getItem("role"));
        return (
            <React.Fragment>
                <Card title="贷款申请表详情" bordered={false}>
                    {
                        this.renderInfo(this.state.auditInfo)
                    }
                </Card>

                {
                    userRole === UserRole.BANK ? (
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