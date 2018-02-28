import React, { Component } from 'react';
import styles from "./applyList.scss";

import moment from 'moment';

import { Table, Icon, Divider, Pagination } from 'antd';

import { queryAuditInfoWithPaging } from '../../services/audit';


const columns = [{
    title: '序号',
    align: 'center',
    dataIndex: 'key',
    key: 'index'
}, {
    title: '借款人名称',
    align: 'center',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '证件号码',
    align: 'center',
    dataIndex: 'idNumber',
    key: 'idNumber',
}, {
    title: '担保方式',
    align: 'center',
    dataIndex: 'guaranteeForm',
    key: 'guaranteeForm',
}, {
    title: '起始日期',
    align: 'center',
    dataIndex: 'startDate',
    key: 'startDate',
    render: val => <span>{moment(Number.parseInt(val)).format('YYYY-MM-DD')}</span>
}, {
    title: '到期日期',
    align: 'center',
    dataIndex: 'endDate',
    key: 'endDate',
    render: val => <span>{moment(Number.parseInt(val)).format('YYYY-MM-DD')}</span>
}, {
    title: '贷款金额(万元)',
    align: 'center',
    dataIndex: 'loanAmount',
    key: 'loanAmount',
    render: val => <span>￥{val}</span>
}, {
    title: '贷款余额',
    align: 'center',
    dataIndex: 'loanBalance',
    key: 'loanBalance',
    render: val => <span>￥{val}</span>
}, {
    title: '贷款用途',
    align: 'center',
    dataIndex: 'useOfLoan',
    key: 'useOfLoan',
}, {
    title: '贷款分类',
    align: 'center',
    dataIndex: 'loanType',
    key: 'loanType',
}];

const data = [{
    name: '哈哈',
    idNumber: '421123123123',
    guaranteeForm: '不知道',
    startDate: '2018-01-01',
    endDate: '2018-05-01',
    loanAmount: '200.3',
    loanBalance: '123',
    useOfLoan: '母鸡呀',
    loanType: '不晓得',
}, {
    name: '哈哈',
    idNumber: '421123123123',
    guaranteeForm: '不知道',
    startDate: '2018-01-01',
    endDate: '2018-05-01',
    loanAmount: '200.3',
    loanBalance: '123',
    useOfLoan: '母鸡呀',
    loanType: '不晓得',
}]

class ApplyList extends Component {

    state = {
        dataLoading: false,
        data: [],
        pageSize: 5,
        totalSize: 0,
        currentPage: 1
    }


    componentDidMount() {
        this.queryAuditInfoList(1, this.state.pageSize || 10);
    }

    handelTableDataIndex(data) {
        const { pageSize, currentPage } = this.state;
        if (!data || data.length == 0) return data;
        return data.map((item, i) => {
            item.key = pageSize * (currentPage-1) + i + 1;
            return item;
        })
    }

    queryAuditInfoList(page, pageSize) {
        const that = this;
        that.setState({ dataLoading: true });
        queryAuditInfoWithPaging(
            {
                startPage: page,
                pageSize: pageSize
            }
        ).then(res => {
            if (res instanceof Error) return;
            let totalSize = res.data.totalSize;
            let dataSource = res.data.elements;
            that.setState({
                dataLoading: false,
                data: dataSource,
                totalSize: totalSize,
                currentPage: page
            });
        });
    }

    onPageChange(page, pageSize) {
        this.queryAuditInfoList(page, pageSize);
    }

    onShowSizeChange(current, pageSize) {
        console.log(current, pageSize);
    }

    render() {
        const { data } = this.state;
        let dataSource = this.handelTableDataIndex(data);
        const { pageSize, totalSize } = this.state;
        return (
            <div>
                <Table
                    loading={this.state.dataLoading}
                    pagination={
                        {
                            pageSize: pageSize || 5,
                            total: totalSize,
                            onChange: this.onPageChange.bind(this),
                        }}
                    bordered
                    columns={columns}
                    dataSource={dataSource}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                console.log(record);
                                let id = record.auditId;
                                this.props.history.push(`${this.props.match.url}/${id}`)
                            }
                        };
                    }
                    }
                />
            </div>
        );
    }
}

export default ApplyList;