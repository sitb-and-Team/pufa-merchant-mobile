/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import classNames from 'classnames';
import accounting from 'accounting';

import {routerPath} from '../../core/router.config';
import {getActions} from '../../core/store';
import {autoBind} from "@sitb/wbs/autoBind";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {menu} from "../../locale";
import Typography from "@material-ui/core/es/Typography/Typography";
import {grey} from "@material-ui/core/es/colors";
import {momentCommon} from "../../constants/objectKey";

// css
const styles: any = theme => ({
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
  },
  card: {
    height: 100,
    fontSize: 16,
    marginBottom: 72
  },
  span: {
    display: 'inline-block',
    width: '100%',
    paddingLeft: 10
  },
  right: {
    textAlign: 'right'
  },
  stats: {
    display: 'inline-block',
    padding: 10,
    paddingRight: 0
  },
  foot: {
    paddingTop: 10,
    paddingBottom: 72
  }
});

const POS = ['POS支付-直连', 'POS支付-间连'];
const MOBILE = ['支付宝支付', '微信支付', '银联支付'];

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

@connect(({payment}) => ({
  searchParams: payment.searchParams,
  processing: payment.processing,
  isLoadMore: payment.isLoadMore,
  aliPay: payment.aliPay,
  weChatPay: payment.weChatPay,
  unionPay: payment.unionPay,
  posPayDirect: payment.posPayDirect,
  posPayIndirect: payment.posPayIndirect,
  page: payment.page
}))
@autoBind
class Container extends React.Component<any> {

  state = {
    isToday: new Date()
  };

  componentWillMount() {
    let {isToday} = this.state;
    this.handleSearch({page: 0});
    getActions().payment.searchStats();
    this.handleSearchToday({page: 0, isToday});
  }

  /**
   * 路由跳转
   */
  handleGoToTrade(path) {
    getActions().navigator.navigate(path);
  }

  /**
   * search
   * @param params 搜索参数
   */
  handleSearch(params) {
    getActions().payment.searchPaymentTrade(params);
  }


  /**
   * search
   * @param params 搜索今日收入参数
   */
  handleSearchToday(params) {
    let {isToday} = this.state;
    // 判断 交易时间
    params.startTime = isToday && `${moment(isToday).hours(0).minutes(0).seconds(0).format(momentCommon.DATE_FORMAT)} 00:00:00` || '';
    params.endTime = isToday && `${moment(isToday).hours(23).minutes(59).seconds(59).format(momentCommon.DATETIME_FORMAT)}` || '';
    Reflect.deleteProperty(params, 'isToday');
    getActions().payment.searchPaymentTrade(params);
  }

  /**
   * 渲染tab图标
   * @param tabs    配置参数
   * @returns {any}
   */
  renderTabItem(tabs) {
    return tabs.map((tab, index) => {
      const {label, Icon, path} = tab;
      return (
        <Grid item
              container
              key={index}
              justify="center"
              xs={4}
        >
          <Tab label={label}
               icon={<Icon/>}
               onClick={() => this.handleGoToTrade(path)}
          />
        </Grid>
      )
    })
  }


  render() {
    const {classes, page, aliPay, weChatPay, unionPay, posPayDirect, posPayIndirect} = this.props;
    page.value = page.value ? parseFloat(page.value).toFixed(2) : '0.00';
    // tab配置
    const config = [{
      label: menu.tradeRecord,
      Icon: EventNoteIcon,
      path: routerPath.trade
    }, {
      label: menu.enterAccount,
      Icon: AccountBalanceWalletIcon,
      path: routerPath.enterAccount
    }];

    return (
      <Grid>
        <Grid item
              xs={12}
              className={classNames(classes.header, classes.header_mode)}
        >
          <TabContainer align="center">
            <p className={classes.headerTitle_mode}>{'今日收入(元)'}</p>
            <span className={classes.headerMoney_mode}>{accounting.formatMoney(page.value, '', 2)}</span>
          </TabContainer>
          <Grid style={{marginBottom: 20, marginTop: 20}}
                container
          >
            {[posPayDirect, posPayIndirect].map((item, index) => {
              return <Grid item
                           key={index}
                           xs={4}
              >
                <span
                  className={classNames(classes.headerTitle_mode, classes.span)}>{POS[index]}</span>
                <span className={classNames(classes.headerMoney_second, classes.span)}>
                  {accounting.formatMoney(item.totalAmount, '', 2)}
                  </span>
                <span
                  className={classNames(classes.headerTitle_mode, classes.span)}>{`${item.totalElements}笔`}</span>
              </Grid>
            })}
          </Grid>
          <Grid container>
            {[aliPay, weChatPay, unionPay].map((item, index) => {
              return <Grid item
                           key={index}
                           xs={4}
              >
                <span
                  className={classNames(classes.headerTitle_mode, classes.span)}>{MOBILE[index]}</span>
                <span className={classNames(classes.headerMoney_second, classes.span)}>
                  {accounting.formatMoney(item.totalAmount, '', 2)}
                  </span>
                <span
                  className={classNames(classes.headerTitle_mode, classes.span)}>{`${item.totalElements}笔`}</span>
              </Grid>
            })}
          </Grid>
        </Grid>
        <Grid container
              spacing={24}
        >
          {this.renderTabItem(config)}
        </Grid>
      </Grid>
    )
  }
}

export const Home = withStyles(styles)(Container as any);
