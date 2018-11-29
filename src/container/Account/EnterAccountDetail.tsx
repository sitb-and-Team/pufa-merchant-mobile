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
import classNames from 'classnames';
import accounting from 'accounting';

import {BusinessTypeColor, BusinessTypeData} from "../../constants/BusinessType";
import {settleStatusOptions} from "../../constants/settleStatus";
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
      getActions().navigator.navigate(routerPath.enterAccount);
      return;
    }
  }

  render() {
    const {params, classes} = this.props;
    params.totalAmount = parseFloat(params.totalAmount).toFixed(2);
    const basic = [{
      label: lang.auditNumber,
      value: 'auditNumber'
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
      value: 'paymentRecord.settleAt'
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
      <Grid>
        <Grid item
              xs={12}
              className={classNames(classes.header, classes.header_mode)}
        >
          <TabContainer align="center">
            <p className={classes.headerTitle_mode}>{'入账金额(元)'}</p>
            <span className={classes.headerMoney_mode}>{accounting.formatMoney(params.settleAmount, '', 2)}</span>
          </TabContainer>
        </Grid>
        <SitbCard configs={configs}
                  dataResource={params}
        />
      </Grid>
    )
  }
}

export const EnterAccountDetail = withStyles(styles)(Container);
