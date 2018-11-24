/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/1
 */
import * as React from 'react';

import {withStyles} from '@material-ui/core/styles';
import {SitbCard} from '../../component/Card';
import weChat from '@sitb/svg-icon/weChat';
import aliPay from '@sitb/svg-icon/aliPay';
import quickPay from '@sitb/svg-icon/quickPay';
import mposPay from '@sitb/svg-icon/mpos';
import bankCard from '@sitb/svg-icon/bankCard';
import {connect} from "react-redux";
import {background} from "../../styles/color";
import {getMerchantId, getOperator, nowOperator} from "../../core/SessionServices";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {rateTemplate} from "./fields";
import {BusinessTypeData} from "../../constants/BusinessType";

// css
const styles: any = theme => ({});

const checkWord = ['debit', 'ownerDebit', 'credit', 'ownerCredit', 'abroadDebit', 'abroadCredit'];

@connect(({session}) => ({
  hasLogin: session.hasLogin,
  agencies: session.agencies
}))
class Container extends React.Component<any, any> {

  someBusinessType(type) {
    return checkWord.some(string => string === type);
  }

  render() {
    const loginMerchant = nowOperator(getOperator(), getMerchantId());
    const configs: any = [];

    const businesses = loginMerchant && loginMerchant.businesses || [];

    // 匹配出当前loginMerchantBusiness
    businesses.map((business) => {
      let Default_business: any = [];
      let titleIconProps: any = {width: 30, height: 30};
      let titleIcon: any = (props) => bankCard(props);
      /**
       * 公有
       */
      const basicConfig: any = [];
      // pos
      const posConfig: any = [];
      // 判断服务费
      if (business.serviceFeeRate) {
        basicConfig.push(...rateTemplate('serviceFeeRate'));
      }
      // 判断费率
      if (business.normalFeeRate) {
        basicConfig.push(...rateTemplate('normalFeeRate'));
      }
      // 判断是否有pos
      if (business.posFeeRate) {
        Object.keys(business.posFeeRate).forEach(type => {
          if (this.someBusinessType(type)) {
            posConfig.push(...rateTemplate(`posFeeRate.${type}`));
          }
        });
        basicConfig.push(...posConfig);
      }
      if (business.businessType.search('WeChat') !== -1) {
        titleIcon = weChat;
        titleIconProps = {
          ...titleIconProps,
          fill: background.weChat
        }
      }
      if (business.businessType.search('AliPay') !== -1) {
        titleIcon = aliPay;
        titleIconProps = {
          ...titleIconProps,
          fill: background.aliPay
        }
      }
      if (business.businessType.search('UNION') !== -1) {
        titleIcon = quickPay;
        titleIconProps = {
          ...titleIconProps,
          fill: background.quickPay
        }
      }
      if (business.businessType.search('POS') !== -1) {
        titleIcon = mposPay;
        titleIconProps = {
          ...titleIconProps,
          fill: background.default
        }
      }

      Default_business.push({
        title: BusinessTypeData[business.businessType],
        titleIcon: titleIcon(titleIconProps),
        ActionIcon: ExpandMoreIcon,
        config: basicConfig
      });

      configs.push(...Default_business);
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
