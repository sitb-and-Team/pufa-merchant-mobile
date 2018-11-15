/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import { IdTypeOptions } from '../../constants/selectObj/IdType';
import { lang } from '../../locale';
import { SitbCard } from '../../component/Card';
import {getMerchantId, getOperator} from "../../core/SessionServices";

// 匹配出当前merchant
export const loginMerchant = getOperator() && getOperator().find(merchant => merchant.merchantNo === getMerchantId()) || {};

// css
const styles: any = theme => ({});

@connect(({session}) => ({
  hasLogin: session.hasLogin,
  agencies: session.agencies
}))

class Container extends React.Component<any, any> {

  render() {
    console.log("loginMerchant==>",loginMerchant);
    // 商户基本信息
    const basic = [{
      label: lang.merchantNo,
      value: 'merchantNo'
    }, {
      label: lang.merchantName,
      value: 'merchantName'
    }, {
      label: lang.legalPerson,
      value: 'legalPerson.name'
    }, {
      label: lang.legalPersonPhone,
      value: 'legalPerson.phoneNo'
    }, {
      label: lang.legalEmail,
      value: 'legalPerson.email'
    }, {
      label: lang.idType,
      value: 'legalPerson.idCard.type',
      mappingObject: IdTypeOptions
    }, {
      label: lang.idNo,
      value: 'legalPerson.idCard.number'
    }, {
      label: lang.address,
      value: [
        'address.province',
        'address.county',
        'address.city',
        'address.street'
      ]
    }];
    // 商户结算信息
    const cost = [{
      label: lang.settleBankName,
      value: 'settleAccount.bankName'
    }, {
      label: lang.settleBankNo,
      value: 'settleAccount.bankNo'
    }, {
      label: lang.accountName,
      value: 'settleAccount.name'
    }, {
      label: lang.accountNumber,
      value: 'settleAccount.number'
    }];
    const configs = [{
      title: lang.merchant.basic,
      config: basic
    }, {
      title: lang.merchant.cost,
      config: cost
    }];
    return (
      <SitbCard configs={configs}
                dataResource={loginMerchant}
      />
    )

  }
}

export const MerchantInfo = withStyles(styles)(Container);
