import React, { Component } from 'react';
import styles from "./applyList.scss";

import { Table, Icon, Divider, Pagination } from 'antd';

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
}, {
    title: '到期日期',
    align: 'center',
    dataIndex: 'endDate',
    key: 'endDate',
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
        data: data
    }

    handelTableDataIndex(data) {
        if (!data || data.length == 0) return data;
        return data.map((item, i) => {
            item.key = i+1;
            return item;
        })
    }

    render() {
        const { data } = this.state;
        let dataSource = this.handelTableDataIndex(data);
        return (
            <div>
                <Table
                    loading={this.state.dataLoading}
                    columns={columns}
                    dataSource={dataSource}
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                console.log(record);
                                let id = record.key;
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