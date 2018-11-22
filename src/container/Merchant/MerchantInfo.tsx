/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import {connect} from "react-redux";
import {withStyles} from '@material-ui/core/styles';

import {IdTypeOptions} from '../../constants/selectObj/IdType';
import {lang} from '../../locale';
import {SitbCard} from '../../component/Card';
import {getMerchantId, getOperator} from "../../core/SessionServices";
// import {SitbButton} from "../../component/SitbButton";


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
      label: lang.legalInfo.legalPersonPhone,
      value: 'legalPerson.phoneNo',
      setValue: string => string.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')
    }, {
      label: lang.legalInfo.legalEmail,
      value: 'legalPerson.email',
      setValue: string => string.replace(/(.=?)/, '*')
    }, {
      label: lang.idType,
      value: 'legalPerson.idCard.type',
      mappingObject: IdTypeOptions
    }, {
      label: lang.idNo,
      value: 'legalPerson.idCard.number',
      setValue: string => string.replace(/^(\d{6})\d*(\d{4})$/, '$1****$2')
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
    const loginMerchant = getOperator() && getOperator().find(merchant => merchant.merchantNo === getMerchantId()) || {};
    return (
      <React.Fragment>
        <SitbCard configs={configs}
                  dataResource={loginMerchant}
        />
        {/*<SitbButton key="submit"
                    size="large"
                    // onClick={this.handleClick}
        >
          {'修改基本信息'}
        </SitbButton>*/}
      </React.Fragment>
    )

  }
}

export const MerchantInfo = withStyles(styles)(Container);
