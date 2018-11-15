/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/1
 */
import * as React from 'react';

import {withStyles} from '@material-ui/core/styles';
import {lang} from '../../locale';
import {SitbCard} from '../../component/Card';
import weChat from '@sitb/svg-icon/weChat';
import aliPay from '@sitb/svg-icon/aliPay';
import quickPay from '@sitb/svg-icon/quickPay';
import mposPay from '@sitb/svg-icon/mpos';
import {loginMerchant} from "./MerchantInfo";
import {connect} from "react-redux";
import {background} from "../../styles/color";


// css
const styles: any = theme => ({});

@connect(({session}) => ({
  hasLogin: session.hasLogin,
  agencies: session.agencies
}))

class Container extends React.Component<any, any> {
  render() {
    const configs: any = [];

    const businesses = loginMerchant && loginMerchant.businesses || [];
    // 匹配出当前loginMerchantBusiness
    businesses.forEach((business) => {
      let Default_business: any = {};
      const basic = [{
        label: lang.normalFeeRate.fee,
        value: 'normalFeeRate.fee'
      }, {
        label: lang.normalFeeRate.min,
        value: 'normalFeeRate.min'
      }, {
        label: lang.normalFeeRate.max,
        value: 'normalFeeRate.max'
      }, {
        label: lang.normalFeeRate.type,
        value: 'normalFeeRate.type'
      }, {
        label: lang.serviceFeeRate.fee,
        value: 'serviceFeeRate.fee'
      }, {
        label: lang.serviceFeeRate.min,
        value: 'serviceFeeRate.min'
      }, {
        label: lang.serviceFeeRate.max,
        value: 'serviceFeeRate.max'
      }, {
        label: lang.serviceFeeRate.type,
        value: 'serviceFeeRate.type'
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
