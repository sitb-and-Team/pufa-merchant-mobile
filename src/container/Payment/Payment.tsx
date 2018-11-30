/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: hjf(2283785225@qq.com)
 * date: 2018/11/12
 */
import * as React from 'react';
import moment from 'moment';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import accounting from 'accounting';

import {lang} from "../../locale";
import {SitbCard} from "../../component/Card";
import {getActions} from "../../core/store";
import {routerPath} from "../../core/router.config";
import {tradeStatusOptions} from "../../constants/tradeStatus";
import {BusinessTypeColor, BusinessTypeData} from "../../constants/BusinessType";
import {momentCommon} from "../../constants/objectKey";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import {grey} from "@material-ui/core/es/colors";


// css
const styles = theme => ({
  header: {
    paddingTop: 20,
    paddingBottom: 15
  },
  header_mode: {
    backgroundColor: theme.palette.primary.main
  },
  headerTitle_mode: {
    color: grey[200],
    fontSize: 12
  },
  headerMoney_mode: {
    fontSize: 40,
    color: '#fff'
  },
  headerMoney_second: {
    fontSize: 18,
    color: '#fff'
  }
});

function TabContainer(props) {
  const {children, ...other} = props;
  return (
    <Typography component="div"
                color="textSecondary"
                {...other}
    >
      {children}
    </Typography>
  );
}

class Container extends React.Component<any, any> {

  componentWillMount() {
    const {params} = this.props;
    if (!params) {
      getActions().navigator.navigate(routerPath.trade);
      return;
    }
  }

  render() {
    const {params, classes} = this.props;
    if (params.paymentAt) {
      params.paymentAt = params && `${moment(params.paymentAt).format(momentCommon.DATETIME_FORMAT)}` || '';
    }
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
      setValue: string => `${BusinessTypeData[string]}`,
      color: BusinessTypeColor[params.businessType]
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

    // 已经退货金额
    const refund = [{
      label: lang.payment.refundAmount,
      value: 'refundAmount',
      setValue: string => `${parseFloat(string).toFixed(2)} 元`
    }];

    // 如果交易类型为 退款，字段增加 已经退货金额
    const query = (params.businessType.includes('REFUND'));
    if (query) {
      basic.splice(5, 0, ...refund);
    }

    // 当 交易金额 等于 已经退款金额 时，交易状态类型更改为 已全额退款
    if (query && (params.totalAmount === params.refundAmount)) {
      params.status = 'FULLREFUND';
    }

    const configs = [{
      title: lang.paymentDetail,
      config: basic
    }];
    return (
      <Grid>
        <Grid item
              xs={12}
              className={classNames(classes.header, classes.header_mode)}
        >
          <TabContainer align="center">
            <p className={classes.headerTitle_mode}>{'交易金额(元)'}</p>
            <span className={classes.headerMoney_mode}>{accounting.formatMoney(params.totalAmount, '', 2)}</span>
          </TabContainer>
        </Grid>
        <SitbCard configs={configs}
                  dataResource={params}
        />
      </Grid>
    )
  }
}

export const PaymentDetail = withStyles(styles)(Container);
