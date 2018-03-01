import React, { Component } from 'react';
import styles from "./applyInfo.scss";
import { Card, Col, Input, message, Row, Button, Modal, Alert, Spin } from 'antd';
import MyUpload from '../Upload';
import moment from 'moment';

import { AuditState, UserRole } from '../../common/enum';

import { queryAudit, updateAuditSetState, updateAuditSetStateAndLoanContractFile } from '../../services/audit';

import { AuditStateDesc } from '../../common/filter';

const confirm = Modal.confirm;
const TextArea = Input.TextArea;


class ApplyInfo extends Component {

    state = {
        queryLoading: true,
        agreeBtnLoading: false,
        rejectBtnLoading: false,
        uploadBtnLoading: false,
        auditId: this.props.match.params.id,
        auditInfo: {}
    }

    componentDidMount() {
        // console.log(this.state.auditId);
        this.queryAuditInfo(this.props.match.params.id);
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

    // 审核
    checkAudit(isAgree, reason) {
        const that = this;
        const { auditId } = this.state;
        updateAuditSetState({
            auditId: auditId,
            isAgree: isAgree,
            reason: reason
        }).then(res => {
            if (res instanceof Error) return;
            that.setState({ agreeBtnLoading: false });
            that.props.history.goBack();
        })
    }

    // 上传借贷合同
    uploadLoadFile() {
        const that = this;
        that.setState({ uploadBtnLoading: true });
        const { loanContractFile,auditId } = this.state;
        updateAuditSetStateAndLoanContractFile({
            loanContractFile:loanContractFile,
            auditId:auditId,
            state:6
        }).then(res=>{
            if (res instanceof Error) return;
            that.setState({ uploadBtnLoading: false });
            that.props.history.goBack();
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
                    {this.renderSingleColData("担保人A身份证", data.guaranteeAIdNumber)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("担保人B", data.guaranteeB)}
                    {this.renderSingleColData("担保人B身份证", data.guaranteeBIdNumber)}
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
                        审核表:
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.auditUrl)
                        }
                    </Col>
                    {/* <Col span={4} style={{fontWeight:700}}>
                        审核表:
                    </Col>
                    <Col span={8}>
                        <div style={{background:'red',width:250,height:100}}></div>
                    </Col> */}
                </Row>
                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        带动协议:
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.drivingAgreementUrl)
                        }
                    </Col>
                </Row>
            </div>
        )
    }



    showConfirm() {
        const that = this;
        confirm({
            title: '确认同意该申请？',
            content: '',
            onOk() {
                // console.log('OK');
                that.setState({ agreeBtnLoading: true });
                that.checkAudit(true, "");
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }



    showRejectConfirm() {
        const that = this;
        confirm({
            height: '500px',
            title: '请填写拒绝原因',
            content: <TextArea rows={4} id="rejectReason" />,
            onOk() {
                let rejectReason = document.getElementById("rejectReason").value;
                that.setState({ rejectBtnLoading: true });
                that.checkAudit(false, rejectReason);
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    renderRejectArea(rejectReason, auditState) {
        let type = "info";
        if (auditState == AuditState.RETAIL_REJECT || auditState == AuditState.ALLEVIATION_REJECT) {
            type = "error";
        }
        let stateDesc = AuditStateDesc(Number.parseInt(auditState));
        console.log(stateDesc);
        return (
            <div className={styles.resultArea}>
                <Alert
                    message={stateDesc}
                    description={rejectReason}
                    type={type}
                    showIcon
                />
            </div>
        )
    }

    renderCtrlBtnArea(userRole, auditState) {
        if (!userRole) return;

        let role = Number.parseInt(userRole);
        let stateCode = Number.parseInt(auditState);

        if (role === UserRole.BANK || role > UserRole.ALLEVIATION) return null;
        // if (stateCode === AuditState.ALLEVIATION_REJECT || stateCode === AuditState.RETAIL_REJECT || stateCode === AuditState.LOAN_CONTRACT_UPLOADED) return null;
        if (role === UserRole.RETAIL && stateCode != AuditState.BANK_PASSED) return null;
        if (role === UserRole.ALLEVIATION && stateCode != AuditState.RETAIL_PASSED) return null;

        return (
            <div className={styles.action}>
                <Button type="primary" size="large" htmlType="submit" icon="check" onClick={this.showConfirm.bind(this)} loading={this.state.agreeBtnLoading}>通过</Button>
                <Button size="large" style={{ marginLeft: 50 }} icon="close" onClick={this.showRejectConfirm.bind(this)} loading={this.state.rejectBtnLoading}>拒绝</Button>
            </div>
        )
    }

    renderUploadLoadArea(userRole, auditState) {
        if (!userRole) return;

        let role = Number.parseInt(userRole);
        let stateCode = Number.parseInt(auditState);

        if (role === UserRole.BANK && stateCode === AuditState.ALLEVIATION_PASSED) {
            return (
                <div className={styles.uploadArea}>
                    <Row className={styles.uploadRow}>
                        <Col span={4} style={{ fontWeight: 700 }}>
                            上传借贷合同
                        </Col>
                        <Col span={8}>
                            <MyUpload content={"借贷合同"} style={{ marginRight: 10 }} uploadFile={this.uploadFile.bind(this, "loanContractFile")}></MyUpload>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16} style={{textAlign:'center'}}>
                            <Button type="primary" size="large" htmlType="submit" icon="check" onClick={this.uploadLoadFile.bind(this)} loading={this.state.uploadBtnLoading}>上传</Button>
                        </Col>
                    </Row>
                </div>
            )
        }
        return null;
    }

    render() {
        if (this.state.queryLoading) {
            return (
                <Card title="申请表详情" bordered={false}>
                    <div className={styles.loadingArea}>
                        <Spin />
                    </div>
                </Card>
            )
        }
        let userRole = sessionStorage.getItem("role");
        return (
            <React.Fragment>
                <Card title="申请详情" bordered={false}>
                    {
                        this.renderRejectArea(this.state.auditInfo.reason, this.state.auditInfo.state)

                    }
                    {
                        this.renderInfo(this.state.auditInfo)
                    }
                </Card>

                {
                    this.renderCtrlBtnArea(userRole, this.state.auditInfo.state)
                }


                {
                    this.renderUploadLoadArea(userRole, this.state.auditInfo.state)
                }
            </React.Fragment>

        );
    }
}

export default ApplyInfo;