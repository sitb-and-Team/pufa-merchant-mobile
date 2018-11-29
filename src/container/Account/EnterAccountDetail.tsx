/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: hjf(2283785225@qq.com)
 * date: 2018/11/12
 */
import * as React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {SitbCard} from "../../component/Card";
import {getActions} from "../../core/store";
import {routerPath} from "../../core/router.config";
import {lang} from "../../locale";
import {BusinessTypeColor, BusinessTypeData} from "../../constants/BusinessType";
import {settleStatusOptions} from "../../constants/settleStatus";


// css
const styles = theme => ({});

class Container extends React.Component<any, any> {

  componentWillMount() {
    const {params} = this.props;
    if (!params) {
      getActions().navigator.navigate(routerPath.enterAccount);
      return;
    }
  }

  render() {
    const {params} = this.props;
    params.totalAmount = parseFloat(params.totalAmount).toFixed(2);
    const basic = [{
      label: lang.auditNumber,
      value: 'auditNumber'
    }, {
      label: lang.settle.settleAmount,
      value: 'settleAmount',
      setValue: string => `${parseFloat(string).toFixed(2)} 元`
    }, {
      label: lang.settle.realSettleAmount,
      value: 'realSettleAmount',
      setValue: string => `${parseFloat(string).toFixed(2)} 元`
    }, {
      label: lang.settle.businessType,
      value: 'paymentRecord.businessType',
      setValue: string => `${BusinessTypeData[string]}`,
      color: BusinessTypeColor[params.paymentRecord.businessType]
    }, {
      label: lang.settle.at,
      value: 'paymentRecord.paymentAt'
    }, {
      label: lang.settle.status,
      value: 'status',
      setValue: string => `${settleStatusOptions[string]}`
    }];

    const configs = [{
      title: lang.enterAccountDetail,
      config: basic
    }];
    return (
      <SitbCard noCard
                configs={configs}
                dataResource={params}
      />
    )
  }
}

export const EnterAccountDetail = withStyles(styles)(Container);
