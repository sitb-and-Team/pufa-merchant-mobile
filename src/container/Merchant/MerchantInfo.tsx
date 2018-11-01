/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { lang } from '../../locale';
import { SitbCard } from '../../component/Card';

// css
const styles: any = theme => ({});

class Container extends React.Component<any, any> {

  render() {
    const data = {
      merchantNo: '123123',
      merchantName: 'test',
      address: '浦东大道',
      legalPerson: '阳尧',
      legalPersonPhone: '17717213771',
      legalEmail: '878723@qq.com',
      idType: 'ID_CARD',
      idNo: '43012030210203',
      settleBankName: '华夏银行',
      settleBankNo: '43012030210203',
      accountName: '阳尧',
      accountNumber: '43012030210203'
    };
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
