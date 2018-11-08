/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { lang } from '../../locale';
import { SitbCard } from '../../component/Card';
import {connect} from "react-redux";
import {getMerchantId, getOperator} from "../../core/SessionServices";

// 匹配出当前merchant
export const loginMerchant = getOperator().find(merchant => merchant.merchantNo === getMerchantId()) || {};

// css
const styles: any = theme => ({});

@connect(({session}) => ({
  hasLogin: session.hasLogin,
  agencies: session.agencies
}))

class Container extends React.Component<any, any> {

  render() {
    // const {agencies} = this.props;
    // console.log("loginMerchant==>",loginMerchant);
    const data = {
      merchantNo: loginMerchant.merchantNo,
      merchantName: loginMerchant.merchantName,
      address: loginMerchant.address.province,
      legalPerson: loginMerchant.legalPerson.name,
      legalPersonPhone: loginMerchant.legalPerson.phoneNo,
      legalEmail: loginMerchant.legalPerson.email,
      idType: loginMerchant.legalPerson.idCard.type,
      idNo: loginMerchant.legalPerson.idCard.number,
      settleBankName: loginMerchant.settleAccount.bankName,
      settleBankNo: loginMerchant.settleAccount.bankNo,
      accountName: loginMerchant.settleAccount.name,
      accountNumber: loginMerchant.settleAccount.number
    };
    // 商户基本信息
    const basic = [{
      label: lang.merchantNo,
      value: 'merchantNo'
    }, {
      label: lang.merchantName,
      value: 'merchantName'
    }, {
      label: lang.legalPerson,
      value: 'legalPerson'
    }, {
      label: lang.legalPersonPhone,
      value: 'legalPersonPhone'
    }, {
      label: lang.legalEmail,
      value: 'legalEmail'
    }, {
      label: lang.idType,
      value: 'idType'
    }, {
      label: lang.idNo,
      value: 'idNo'
    }, {
      label: lang.address,
      value: 'address'
    }];
    // 商户结算信息
    const cost = [{
      label: lang.settleBankName,
      value: 'settleBankName'
    }, {
      label: lang.settleBankNo,
      value: 'settleBankNo'
    }, {
      label: lang.accountName,
      value: 'accountName'
    }, {
      label: lang.accountNumber,
      value: 'accountNumber'
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
                dataResource={data}
      />
    )

  }
}

export const MerchantInfo = withStyles(styles)(Container);
