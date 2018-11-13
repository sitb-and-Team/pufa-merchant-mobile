/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: hjf(2283785225@qq.com)
 * date: 2018/11/12
 */
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {lang} from "../../locale";
import {SitbCard} from "../../component/Card";
import {getActions} from "../../core/store";
import {routerPath} from "../../core/router.config";


// css
const styles = theme => ({});

class Container extends React.Component<any, any> {

  componentWillMount() {
    const {params} = this.props;
    if (!params) {
      getActions().navigator.navigate(routerPath.trade);
      return;
    }
  }

  render() {
    const {params} = this.props;
    console.log(this.props);
    /*const data = {
      merchantNo: '商户号',
      merchantName: '商户名',
      auditNumber: '流水号',
      totalAmount: '总支付金额',
      status: '支付状态',
      paymentAt: '支付时间',
      remark: '支付描述'
    };*/
    const basic = [{
      label: lang.merchantNo,
      value: 'merchant.merchantNo'
    }, {
      label: lang.merchantName,
      value: 'merchant.merchantName'
    }, {
      label: lang.auditNumber,
      value: 'auditNumber'
    }, {
      label: lang.payment.totalAmount,
      value: 'totalAmount'
    }, {
      label: lang.payment.status,
      value: 'status'
    }, {
      label: lang.payment.at,
      value: 'paymentAt'
    }, {
      label: lang.payment.remark,
      value: 'remark'
    }];
    const configs = [{
      title: lang.paymentDetail,
      config: basic
    }];
    return (
      <SitbCard configs={configs}
                dataResource={params}
      />
    )
  }
}

export const PaymentDetail = withStyles(styles)(Container);
