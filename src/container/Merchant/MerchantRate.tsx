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
import {connect} from "react-redux";
import {background} from "../../styles/color";
import {getMerchantId, getOperator} from "../../core/SessionServices";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ColumnUtil from "../../utils/ColumnUtil";

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
      const basic = [{
        label: lang.serviceFeeRate.fee,
        value: 'serviceFeeRate.fee',
        setValue: rate => rate && (business.serviceFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.serviceFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.serviceFeeRate.min,
        value: 'serviceFeeRate.min',
        setValue: rate => rate && (business.serviceFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.serviceFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.serviceFeeRate.max,
        value: 'serviceFeeRate.max',
        setValue: rate => rate && (business.serviceFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.serviceFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.normalFeeRate.fee,
        value: 'normalFeeRate.fee',
        setValue: rate => rate && (business.normalFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.normalFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.normalFeeRate.min,
        value: 'normalFeeRate.min',
        setValue: rate => rate && (business.normalFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.normalFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.normalFeeRate.max,
        value: 'normalFeeRate.max',
        setValue: rate => rate && (business.normalFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.normalFeeRate.type)}` || `${rate}元`)
      }];
      /**
       * POS独有
       */
      const posRate = [{
        label: lang.creditFeeRate.fee,
        value: 'creditFeeRate.fee',
        setValue: rate => rate && (business.creditFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.creditFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.creditFeeRate.min,
        value: 'creditFeeRate.min',
        setValue: rate => rate && (business.creditFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.creditFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.creditFeeRate.max,
        value: 'creditFeeRate.max',
        setValue: rate => rate && (business.creditFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.creditFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.debitFeeRate.fee,
        value: 'debitFeeRate.fee',
        setValue: rate => rate && (business.debitFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.debitFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.debitFeeRate.min,
        value: 'debitFeeRate.min',
        setValue: rate => rate && (business.debitFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.debitFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.debitFeeRate.max,
        value: 'debitFeeRate.max',
        setValue: rate => rate && (business.debitFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.debitFeeRate.type)}` || `${rate}元`)
      }];
      if (business.businessType === "WeChat_PAY") {
        Default_business = {
          title: lang.weChat,
          titleIcon: weChat({fill: background.weChat, width: 30, height: 30}),
          ActionIcon: ExpandMoreIcon,
          config: basic
        }
      }

      if (business.businessType === "AliPay_PAY") {
        Default_business = {
          title: lang.aliPay,
          titleIcon: aliPay({fill: background.aliPay, width: 30, height: 30}),
          ActionIcon: ExpandMoreIcon,
          config: basic
        }
      }

      if (business.businessType === "UNION_PAY") {
        Default_business = {
          title: lang.quickPay,
          titleIcon: quickPay({fill: background.quickPay, width: 30, height: 30}),
          ActionIcon: ExpandMoreIcon,
          config: basic
        }
      }
      if (business.businessType === "POS_PAY") {
        basic.push(...posRate);
        Default_business = {
          title: lang.mpos,
          titleIcon: mposPay({fill: background.default, width: 30, height: 30}),
          ActionIcon: ExpandMoreIcon,
          config: basic
        }
      }
      configs.push(Default_business);
    });
    return (
      <React.Fragment>
        <SitbCard configs={configs}
                  isExpansionPanel
                  isTel
                  dataResource={loginMerchant.businesses}
        />
      </React.Fragment>
    )
  }
}

export const MerchantRate = withStyles(styles)(Container);
