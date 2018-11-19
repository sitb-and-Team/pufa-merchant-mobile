/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/1
 */
import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { lang } from '../../locale';
import { SitbCard } from '../../component/Card';
import weChat from '@sitb/svg-icon/weChat';
import aliPay from '@sitb/svg-icon/aliPay';
import quickPay from '@sitb/svg-icon/quickPay';
import mposPay from '@sitb/svg-icon/mpos';
import { connect } from "react-redux";
import { background } from "../../styles/color";
import {getMerchantId, getOperator} from "../../core/SessionServices";

// css
const styles: any = theme => ({});

@connect(({session}) => ({
  hasLogin: session.hasLogin,
  agencies: session.agencies
}))

class Container extends React.Component<any, any> {
  render() {
    const loginMerchant = getOperator() && getOperator().find(merchant => merchant.merchantNo === getMerchantId()) || {};
    const configs: any = [];

    const businesses = loginMerchant && loginMerchant.businesses || [];
    // 匹配出当前loginMerchantBusiness
    businesses.map((business) => {
      let Default_business: any = {};
      /**
       * 公有
       */
      if (business.normalFeeRate.type == "PERCENTAGE"){
        business.normalFeeRate.type === "%";
      }
      const basic = [{
        label: lang.normalFeeRate.fee,
        value: 'normalFeeRate.fee',
        setValue: string=> `${string} %`
      }, {
        label: lang.normalFeeRate.min,
        value: 'normalFeeRate.min',
        setValue: string=> `${string} %`
      }, {
        label: lang.normalFeeRate.max,
        value: 'normalFeeRate.max',
        setValue: string=> `${string} %`
      },{
        label: lang.serviceFeeRate.fee,
        value: 'serviceFeeRate.fee',
        setValue: string=> `${string} %`
      }, {
        label: lang.serviceFeeRate.min,
        value: 'serviceFeeRate.min',
        setValue: string=> `${string} %`
      }, {
        label: lang.serviceFeeRate.max,
        value: 'serviceFeeRate.max',
        setValue: string=> `${string} %`
      }];
      /**
       * POS独有
       */
      const posRate = [{
        label: lang.creditFeeRate.fee,
        value: 'creditFeeRate.fee',
        setValue: string=> `${string} %`
      }, {
        label: lang.creditFeeRate.min,
        value: 'creditFeeRate.min',
        setValue: string=> `${string} %`
      }, {
        label: lang.creditFeeRate.max,
        value: 'creditFeeRate.max',
        setValue: string=> `${string} %`
      }, {
        label: lang.debitFeeRate.fee,
        value: 'debitFeeRate.fee',
        setValue: string=> `${string} %`
      }, {
        label: lang.debitFeeRate.min,
        value: 'debitFeeRate.min',
        setValue: string=> `${string} %`
      }, {
        label: lang.debitFeeRate.max,
        value: 'debitFeeRate.max',
        setValue: string=> `${string} %`
      }];
      if (business.businessType === "WeChat_PAY") {
        Default_business = {
          title: lang.weChat,
          titleIcon: weChat({fill: background.weChat, width: 30, height: 30}),
          config: basic
        }
      }

      if (business.businessType === "AliPay_PAY") {
        Default_business = {
          title: lang.aliPay,
          titleIcon: aliPay({fill: background.aliPay, width: 30, height: 30}),
          config: basic
        }
      }

      if (business.businessType === "UNION_PAY") {
        Default_business = {
          title: lang.quickPay,
          titleIcon: quickPay({fill: background.quickPay, width: 30, height: 30}),
          config: basic
        }
      }
      if (business.businessType === "POS_PAY") {
        basic.push(...posRate);
        Default_business = {
          title: lang.mpos,
          titleIcon: mposPay({fill: background.default, width: 30, height: 30}),
          config: basic
        }
      }
      configs.push(Default_business);
    });
    return (
      <SitbCard configs={configs}
                dataResource={loginMerchant.businesses}
      />
    )
  }
}

export const MerchantRate = withStyles(styles)(Container);
