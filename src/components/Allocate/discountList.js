import React, { Component } from 'react';
import styles from "./discountList.scss";

import { Table, Icon, Divider, Pagination, Button } from 'antd';

import { queryDiscountListByState } from '../../services/discount';

import { UserRole,DiscountState } from '../../common/enum';

const columns = [{
    title: '序号',
    align: 'center',
    dataIndex: 'index',
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
        data: [],
        pageSize: 5,
        totalSize: 0,
        currentPage: 1,
        selectedRowKeys: [],
        batchSubmitLoading: false,
    }


    componentDidMount() {
        this.queryDiscountAuditList(1, this.state.pageSize || 10);
    }

    handelTableDataIndex(data) {
        const { pageSize, currentPage } = this.state;
        if (!data || data.length == 0) return data;
        return data.map((item, i) => {
            item.index = pageSize * (currentPage - 1) + i + 1;
            return item;
        })
    }

    queryDiscountAuditList(page, pageSize) {
        const that = this;
        that.setState({ dataLoading: true });
        queryDiscountListByState(
            {
                loanState:DiscountState.LOAN_GRANTING,
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

    rowSelection() {
        const rowConfig = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return rowConfig;
    }

    batchSubmit = () => {
        this.setState({ batchSubmitLoading: true });

    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.setState({ selectedRowKeys });
    }

    render() {

        let userRole = Number.parseInt(sessionStorage.getItem("role"));

        const { data } = this.state;
        let dataSource = this.handelTableDataIndex(data);
        const { pageSize, totalSize, batchSubmitLoading, selectedRowKeys } = this.state;
        const hasSelected = selectedRowKeys.length > 0;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const showRowSelect = userRole !== UserRole.BANK;

        const rowSelectionWithRole = showRowSelect ? rowSelection : null;
        return (
            <div>
                {
                    showRowSelect ?
                        <div className={styles.tableOperations}>
                            <Button
                                onClick={this.batchSubmit.bind(this)}
                                disabled={!hasSelected}
                                loading={batchSubmitLoading}
                            >
                                提交
                            </Button>
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `您选择了 ${selectedRowKeys.length} 项` : ''}
                            </span>
                        </div>
                        : null
                }

                <Table
                    rowKey={record => record.discountId}
                    rowSelection={rowSelectionWithRole}
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
                                let id = record.discountId;
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