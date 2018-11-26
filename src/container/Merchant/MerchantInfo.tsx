/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';

import {lang} from '../../locale';
import {SitbCard} from '../../component/Card';
import {getMerchantId, getOperator, nowOperator} from "../../core/SessionServices";
import {settleModeOptions} from "../../constants/settleMode";
import {merchantStatusOptions} from "../../constants/merchantStatus";


// css
const styles: any = theme => ({});

@connect(({session}) => ({
  hasLogin: session.hasLogin,
  agencies: session.agencies
}))

class Container extends React.Component<any, any> {

  render() {
    // 商户基本信息
    const basic = [{
      label: lang.merchantNo,
      value: 'merchantNo'
    }, {
      label: lang.merchantName,
      value: 'merchantName'
    }, {
      label: lang.title,
      value: 'title'
    }, {
      label: lang.legalInfo.legalPerson,
      value: 'legalPerson.name',
      // setValue: string => new Array(string.length).join('*') + string.substr(-1)
      setValue: string => string.replace(/.(?=.)/, '*')
    }, {
      label: lang.merchantStatus,
        value: 'status',
        setValue: string => `${merchantStatusOptions[string]}`
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
      label: lang.settleMode,
      value: 'settleMode',
      setValue: string => `${settleModeOptions[string]}`
    }];
    const configs = [{
      title: lang.merchant.basic,
      config: basic
    }, {
      title: lang.merchant.cost,
      config: cost
    }];
    const loginMerchant = nowOperator(getOperator(), getMerchantId());
    return (
      <SitbCard configs={configs}
                dataResource={loginMerchant}
      />
    )

  }
}

export const MerchantInfo = withStyles(styles)(Container);
