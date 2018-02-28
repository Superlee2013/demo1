import React, { Component } from 'react';
import styles from "./applyList.scss";

import { Table, Icon, Divider, Pagination } from 'antd';

const columns = [{
    title: '序号',
    align: 'center',
    dataIndex: 'key',
    key: 'index'
}, {
    title: '贷款户姓名',
    align: 'center',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '性别',
    align: 'center',
    dataIndex: 'sex',
    key: 'sex',
}, {
    title: '年龄',
    align: 'center',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '详细地址',
    align: 'center',
    dataIndex: 'familyAddress',
    key: 'familyAddress',
}, {
    title: '贷款户项目发展名称',
    align: 'center',
    dataIndex: 'projectName',
    key: 'projectName',
}, {
    title: '贷款额度(万元)',
    align: 'center',
    dataIndex: 'loanAmount',
    key: 'loanAmount',
    render: val => <span>￥{val}</span>
}, {
    title: '拟贴息额(万元)',
    align: 'center',
    dataIndex: 'discountAmount',
    key: 'discountAmount',
    render: val => <span>￥{val}</span>
}, {
    title: '拟贴息资金(万元)',
    align: 'center',
    dataIndex: 'discountFund',
    key: 'discountFund',
    render: val => <span>￥{val}</span>
}, {
    title: '贷款时间',
    align: 'center',
    dataIndex: 'loanPeriod',
    key: 'loanPeriod',
    render: val => <span>￥{val}</span>
}, {
    title: '汇入贴息款账户',
    align: 'center',
    dataIndex: 'discountAccount',
    key: 'discountAccount',
}];

const data = [{
    name: '哈哈',
    sex: '男',
    age: '88',
    familyAddress: '文三路1999好哈哈哈哈？',
    projectName: 'fjxn',
    loanAmount: '200.3',
    discountAmount: '123',
    discountFund: '888.66',
    loanPeriod: '2018-08-08',
    discountAccount: '4212131212112313'
},
{
    name: '哈哈',
    sex: '男',
    age: '88',
    familyAddress: '文三路？',
    projectName: 'fjxn',
    loanAmount: '200.3',
    discountAmount: '123',
    discountFund: '888.66',
    loanPeriod: '2018-08-08',
    discountAccount: '4212131212112313'
}]

class ApplyList extends Component {

    state = {
        dataLoading: false,
        data: data
    }

    handelTableDataIndex(data) {
        if (!data || data.length == 0) return data;
        return data.map((item, i) => {
            item.key = i + 1;
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