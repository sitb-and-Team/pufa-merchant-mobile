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
import { background } from '../../styles/color';

// css
const styles: any = theme => ({});

class Container extends React.Component<any, any> {

  render() {
    const data = {
      weChat: {
        normalFeeRate: {
          fee: '0.48%'
        },
        serviceFeeRate: {
          fee: '3元'
        }
      },
      aliPay: {
        normalFeeRate: {
          fee: '0.48%'
        },
        serviceFeeRate: {
          fee: '3元'
        }
      },
      quickPay: {
        normalFeeRate: {
          fee: '0.48%'
        },
        serviceFeeRate: {
          fee: '3元'
        }
      }
    };
    const weChatConfig = [{
      label: lang.normalFeeRate.fee,
      value: 'weChat.normalFeeRate.fee'
    }, {
      label: lang.serviceFeeRate.fee,
      value: 'weChat.serviceFeeRate.fee'
    }];
    const aliPayConfig = [{
      label: lang.normalFeeRate.fee,
      value: 'aliPay.normalFeeRate.fee'
    }, {
      label: lang.serviceFeeRate.fee,
      value: 'aliPay.serviceFeeRate.fee'
    }];
    const quickPayConfig = [{
      label: lang.normalFeeRate.fee,
      value: 'quickPay.normalFeeRate.fee'
    }, {
      label: lang.serviceFeeRate.fee,
      value: 'quickPay.serviceFeeRate.fee'
    }];
    const configs = [{
      title: lang.weChat,
      titleIcon: weChat({width: 30, height: 30}),
      config: weChatConfig
    }, {
      title: lang.aliPay,
      titleIcon: aliPay({fill: background.aliPay, width: 30, height: 30}),
      config: aliPayConfig
    }, {
      title: lang.quickPay,
      titleIcon: quickPay({fill: background.quickPay, width: 30, height: 30}),
      config: quickPayConfig
    }];
    return (
      <SitbCard configs={configs}
                dataResource={data}
      />
    )
  }
}

export const MerchantRate = withStyles(styles)(Container);
