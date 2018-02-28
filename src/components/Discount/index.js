import React, { Component } from 'react';
import ApplyList from "./applyList";
import ApplyInfo from "./applyInfo";

import { Button } from 'antd';

import styles from './index.scss';

import { Link, Switch, Route } from 'react-router-dom';

class Index extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.url}/:id`} component={ApplyInfo} />
                    <Route path={`${this.props.match.url}`} component={Apply} />
                </Switch>
            </div>
        );
    }
}

class Apply extends Component {

    render() {
        return (
            <div>
                <h3 style={{marginBottom:20}}>贷款贴息列表</h3>
                <div className={styles.applyList}>
                    <ApplyList history={this.props.history} match={this.props.match}></ApplyList>
                </div>
            </div>
        )
    }
}

export default Index;