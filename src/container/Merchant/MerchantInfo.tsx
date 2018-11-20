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


// css
const styles: any = theme => ({});

@connect(({session}) => ({
  hasLogin: session.hasLogin,
  agencies: session.agencies
}))

class Container extends React.Component<any, any> {

  render() {
    /*const reg = /^(\d{3})\d*(\d{4})$/;
    const reg2 = /^(\d{6})\d*(\d{4})$/;
    const reg3 = /^\w*(\w{2})$/;*/
    // const reg4 = /(.)(.*)/;
    // 商户基本信息
    const basic = [{
      label: lang.merchantNo,
      value: 'merchantNo'
    }, {
      label: lang.merchantName,
      value: 'merchantName'
    }, {
      label: lang.legalPerson,
      value: 'legalPerson.name',
      // setValue: string => new Array(string.length).join('*') + string.substr(-1)
      setValue: string => string.replace(/.(?=.)/, '*')
    }, {
      label: lang.legalPersonPhone,
      value: 'legalPerson.phoneNo',
      setValue: string => string.replace(/^(\d{3})\d*(\d{4})$/,'$1****$2')
    }, {
      label: lang.legalEmail,
      value: 'legalPerson.email',
      setValue: string => string.replace(/(.=?)/, '*')
    }, {
      label: lang.idType,
      value: 'legalPerson.idCard.type',
      mappingObject: IdTypeOptions
    }, {
      label: lang.idNo,
      value: 'legalPerson.idCard.number',
      setValue: string => string.replace(/^(\d{6})\d*(\d{4})$/,'$1****$2')
    }, {
      label: lang.address,
      value: [
        'address.province',
        'address.county',
        'address.city',
        'address.street'
      ]
    }];
    const configs = [{
      title: lang.merchant.basic,
      config: basic
    }];
    const loginMerchant = getOperator() && getOperator().find(merchant => merchant.merchantNo === getMerchantId()) || {};
    return (
      <SitbCard configs={configs}
                dataResource={loginMerchant}
      />
    )

  }
}

export const MerchantInfo = withStyles(styles)(Container);
