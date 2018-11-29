/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: hjf(2283785225@qq.com)
 * date: 2018/11/12
 */
import * as React from 'react';
import moment from 'moment';
import {withStyles} from '@material-ui/core/styles';
import {lang} from "../../locale";
import {SitbCard} from "../../component/Card";
import {getActions} from "../../core/store";
import {routerPath} from "../../core/router.config";
import {tradeStatusOptions} from "../../constants/tradeStatus";
import {BusinessTypeData} from "../../constants/BusinessType";
import {momentCommon} from "../../constants/objectKey";


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
    if (params.paymentAt) {
      params.paymentAt = params && `${moment(params.paymentAt).format(momentCommon.DATETIME_FORMAT)}` || '';
    }
    console.log(params.paymentAt);
    params.createAt = params && `${moment(params.createAt).format(momentCommon.DATETIME_FORMAT)}` || '';
    params.totalAmount = parseFloat(params.totalAmount).toFixed(2);
    const basic = [{
      label: lang.merchantNo,
      value: 'merchantNo'
    }, {
      label: lang.channelMerchantNo,
      value: 'channelMerchantNo'
    }, {
      label: lang.payment.businessType,
      value: 'businessType',
      setValue: string => `${BusinessTypeData[string]}`
    }, {
      label: lang.auditNumber,
      value: 'auditNumber'
    }, {
      label: lang.payment.totalAmount,
      value: 'totalAmount',
      setValue: string => `${string} 元`
    }, {
      label: lang.payment.status,
      value: 'status',
      setValue: string => `${tradeStatusOptions[string]}`
    }, {
      label: lang.payment.createAt,
      value: 'createAt'
    }, {
      label: lang.payment.at,
      value: 'paymentAt'
    }, {
      label: lang.payment.remark,
      value: 'describe'
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
