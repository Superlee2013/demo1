import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import AddApply from "./addApply";
import ApplyList from "./applyList";
import ApplyInfo from "./applyInfo";
import { UserRole } from "../../common/enum";

import { Button } from 'antd';

import styles from './index.scss';





class Index extends Component {
    render() {
        return (
            <Switch>
                <Route path={`${this.props.match.url}/add`} component={AddApply} />
                <Route path={`${this.props.match.url}/:id`} component={ApplyInfo} />
                <Route path={`${this.props.match.url}`} component={Apply} />
            </Switch>
        );
    }
}

class Apply extends Component {

    addApply() {
        // console.log(this.props);
        this.props.history.push(`${this.props.match.url}/add`);
    }

    render() {
        let userRole = sessionStorage.getItem("role");
        if (userRole === null) return null;
        userRole = Number.parseInt(userRole);
        return (
            <div>
                <h3 style={{ marginBottom: 20 }}>小额贷款台账</h3>
                {
                    userRole === UserRole.BANK ? <Button type="primary" onClick={this.addApply.bind(this)}>添加申请审批</Button> : null
                }

                <div className={styles.applyList}>
                    <ApplyList history={this.props.history} match={this.props.match}></ApplyList>
                </div>
            </div>
        )
    }
}

export default Index;