import React, { Component } from 'react';
import styles from "./discountInfo.scss";
import { Card, Col, Input, message, Row, Button, Modal, Alert, Spin } from 'antd';
import MyUpload from '../Upload';
import moment from 'moment';

import { AuditState, UserRole, DiscountState } from '../../common/enum';
import { AuditStateDesc, DiscountCheckDesc, DiscountStateDesc } from '../../common/filter';

import { queryDiscount, allocate } from '../../services/discount';


const confirm = Modal.confirm;
const TextArea = Input.TextArea;


class DiscountInfo extends Component {

    state = {
        queryLoading: true,
        agreeBtnLoading: false,
        rejectBtnLoading: false,
        uploadBtnLoading: false,
        discountId: this.props.match.params.id,
        discountInfo: {}
    }

    componentDidMount() {
        // console.log(this.state.discountId);
        this.queryDiscountInfo(this.props.match.params.id);
    }

    // 查询详情
    queryDiscountInfo(discountId) {
        const that = this;
        queryDiscount({
            discountId: discountId
        }).then(res => {
            if (res instanceof Error) return;
            that.setState({
                queryLoading: false,
                discountInfo: res.data
            })
        })
    }

    // 拨款
    checkAllocate() {
        const that = this;
        const { discountId } = this.state;
        let discountIdList = [];
        discountIdList.push(discountId);
        allocate(discountIdList).then(res => {
            if (res instanceof Error) return;
            that.setState({ agreeBtnLoading: false });
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
                    {this.renderSingleColData("贷款户姓名", data.name)}
                    {this.renderSingleColData("详细地址", data.familyAddress)}
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
                    {this.renderSingleColData("贷款项目发展名称", data.projectName)}
                    {this.renderSingleColData("贷款额度(单位：万元)", data.loanAmount)}
                </Row>

                <Row className={styles.row}>
                    {this.renderSingleColData("拟贴息额(单位：万元)", data.discountAmount)}
                    {this.renderSingleColData("拟贴息资金(单位：万元)", data.discountFund)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("贷款时间", data.loanPeriod)}
                    {this.renderSingleColData("汇入贴息款账户", data.discountAccount)}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("承贷银行意见", DiscountCheckDesc(Number.parseInt(data.bankAudit)))}
                    {this.renderSingleColData("农业局(脱贫办)意见", DiscountCheckDesc(Number.parseInt(data.agricultureAudit)))}
                </Row>
                <Row className={styles.row}>
                    {this.renderSingleColData("财政局意见", DiscountCheckDesc(Number.parseInt(data.financeAudit)))}
                    {this.renderSingleColData("审核表ID", data.auditId)}
                </Row>

                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        申请表:
                    </Col>
                    <Col span={8}>
                        {
                            this.renderImgArea(data.auditUrl)
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
            title: '确认同意该笔拨款？',
            content: '',
            onOk() {
                // console.log('OK');
                that.setState({ agreeBtnLoading: true });
                that.checkAllocate();
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
                // that.checkDiscount(false, rejectReason);
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    renderStateArea(rejectReason, discountState) {
        let type = "info";
        if (discountState == DiscountState.RETAIL_REJECT || discountState == DiscountState.ALLEVIATION_REJECT || discountState == DiscountState.PRO_AGRICULTURE_REJECT || discountState == DiscountState.PRO_FINANCE_REJECT) {
            type = "error";
        }
        let stateDesc = DiscountStateDesc(Number.parseInt(discountState));
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

    renderCtrlBtnArea(userRole, discountState) {
        if (!userRole) return;

        let role = Number.parseInt(userRole);
        let stateCode = Number.parseInt(discountState);

        if (role !== UserRole.PROVINCIAL_FINANCE_BUREAU) return;
        if (stateCode !== DiscountState.LOAN_GRANTING) return;

        // if (role === UserRole.BANK || role === UserRole.CITY_FINANCE_DEPARTMENT) return null;
        // // if (stateCode === AuditState.ALLEVIATION_REJECT || stateCode === AuditState.RETAIL_REJECT || stateCode === AuditState.LOAN_CONTRACT_UPLOADED) return null;
        // if (role === UserRole.RETAIL && stateCode != DiscountState.BANK_PASSED) return null;
        // if (role === UserRole.ALLEVIATION && stateCode != DiscountState.RETAIL_PASSED) return null;

        // if (role === UserRole.PROVINCIAL_AGRICULTURAL_DEPARTMENT
        //     && stateCode != DiscountState.ALLEVIATION_PASSED
        //     && stateCode != DiscountState.PRO_FINANCE_PASSED) return null;

        // if (role === UserRole.PROVINCIAL_FINANCE_BUREAU
        //     && stateCode != DiscountState.ALLEVIATION_PASSED
        //     && stateCode != DiscountState.PRO_AGRICULTURE_PASSED) return null;


        return (
            <div className={styles.action}>
                <Button type="primary" size="large" htmlType="submit" icon="check" onClick={this.showConfirm.bind(this)} loading={this.state.agreeBtnLoading}>确认拨款</Button>
                {/* <Button size="large" style={{ marginLeft: 50 }} icon="close" onClick={this.showRejectConfirm.bind(this)} loading={this.state.rejectBtnLoading}>拒绝</Button> */}
            </div>
        )
    }



    render() {
        if (this.state.queryLoading) {
            return (
                <Card title="贴息详情" bordered={false}>
                    <div className={styles.loadingArea}>
                        <Spin />
                    </div>
                </Card>
            )
        }
        let userRole = sessionStorage.getItem("role");
        return (
            <React.Fragment>
                <Card title="贴息详情" bordered={false}>
                    {
                        this.renderStateArea(this.state.discountInfo.reason, this.state.discountInfo.loanState)

                    }
                    {
                        this.renderInfo(this.state.discountInfo)
                    }
                </Card>

                {
                    this.renderCtrlBtnArea(userRole, this.state.discountInfo.loanState)
                }

            </React.Fragment>

        );
    }
}

export default DiscountInfo;