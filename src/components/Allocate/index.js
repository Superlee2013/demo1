import React, { Component } from 'react';
import DiscountList from "./discountList";
import DiscountInfo from "./discountInfo";

import { Button } from 'antd';

import styles from './index.scss';

import { Link, Switch, Route } from 'react-router-dom';

class Index extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.url}/:id`} component={DiscountInfo} />
                    <Route path={`${this.props.match.url}`} component={Discount} />
                </Switch>
            </div>
        );
    }
}

class Discount extends Component {

    render() {
        return (
            <div>
                <h3 style={{marginBottom:20}}>划拨款项</h3>
                <div className={styles.applyList}>
                    <DiscountList history={this.props.history} match={this.props.match}></DiscountList>
                </div>
            </div>
        )
    }
}

export default Index;