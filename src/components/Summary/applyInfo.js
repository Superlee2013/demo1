import React, { Component } from 'react';
import styles from "./applyInfo.scss";
import { Card, Col, Input, message, Row, Button, Modal, Alert } from 'antd';
import MyUpload from '../Upload';

const confirm = Modal.confirm;
const TextArea = Input.TextArea;


class ApplyInfo extends Component {

    state = {
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
                        申请表:
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
                <Row className={styles.row}>
                    <Col span={4} style={{ fontWeight: 700 }}>
                        借贷合同:
                    </Col>
                    <Col span={8}>
                        <div style={{ background: 'red', width: 250, height: 100 }}></div>
                    </Col>
                </Row>
            </div>
        )
    }

    showConfirm() {
        confirm({
            title: '确认同意该申请？',
            content: '',
            onOk() {
                console.log('OK');
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
                console.log('rejectReason');
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }

    render() {
        let userRole = 1;
        return (
            <React.Fragment>
                <Card title="申请详情" bordered={false}>
                    {
                        <div className={styles.resultArea}>
                            <Alert
                                message="审核拒绝"
                                description="我也不知道为什么拒绝了"
                                type="error"
                                showIcon
                            />
                        </div>

                    }
                    {
                        this.renderInfo({})
                    }
                </Card>

                {
                    userRole === 1 ? (
                        <div className={styles.action}>
                            <Button type="primary" size="large" htmlType="submit" icon="check" onClick={this.showConfirm.bind(this)}>通过</Button>
                            <Button size="large" style={{ marginLeft: 50 }} icon="close" onClick={this.showRejectConfirm.bind(this)}>拒绝</Button>
                        </div>
                    ) : null
                }
            </React.Fragment>

        );
    }
}

export default ApplyInfo;