/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import classNames from 'classnames';

import {routerPath} from '../../core/router.config';
import {getActions} from '../../core/store';
import {autoBind} from "@sitb/wbs/autoBind";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {menu} from "../../locale";
/*import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import weChat from "@sitb/svg-icon/weChat";
import aliPay from "@sitb/svg-icon/aliPay";
import quickPay from "@sitb/svg-icon/quickPay";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {background} from "../../styles/color";
import money from "@sitb/svg-icon/money";*/
// import {List} from "veigar/List/List";
import Typography from "@material-ui/core/es/Typography/Typography";
import {grey} from "@material-ui/core/es/colors";
import {BusinessTypeData} from "../../constants/BusinessType";

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

const POS = ['POS直连', 'POS间连'];
const MOBILE = ['支付宝', '微信', '银联'];

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
    this.handleSearch({page: 0});
    getActions().payment.searchStats();
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

  /**
   * 渲染list
   * @param {any} item  当前行数据
   * @param {any} index 下标
   * @returns {any}
   */
  renderItem({item, index}) {
    const {businessType} = item;
    const {classes} = this.props;

    item.totalAmount = parseFloat(item.totalAmount).toFixed(2);

    return (
      <Grid item
            xs={4}
            key={index}
            className={classNames(classes.header, classes.header_mode)}
      >
        <span>{BusinessTypeData[businessType]}</span>
        <span>{`交易笔数：${item.totalElements} 笔`}</span>
        <span>{`交易总额：${item.totalAmount} 笔`}</span>
      </Grid>
    )
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
            <span className={classes.headerMoney_mode}>{page.value}</span>
          </TabContainer>
          <Grid style={{marginBottom: 20, marginTop: 20}}
                container
          >
            {[posPayDirect, posPayIndirect].map((item, index) => {
              item.totalAmount = item.totalAmount ? parseFloat(item.totalAmount).toFixed(2) : '0.00';
              return <Grid item
                           key={index}
                           xs={4}
              >
                <span className={classNames(classes.headerMoney_second, classes.span)}>{item.totalAmount}</span>
                <span
                  className={classNames(classes.headerTitle_mode, classes.span)}>{`${POS[index]} ${item.totalElements}笔`}</span>
              </Grid>
            })}
          </Grid>
          <Grid container>
            {[aliPay, weChatPay, unionPay].map((item, index) => {
              item.totalAmount = item.totalAmount ? parseFloat(item.totalAmount).toFixed(2) : '0.00';
              return <Grid item
                           key={index}
                           xs={4}
              >
                <span className={classNames(classes.headerMoney_second, classes.span)}>{item.totalAmount}</span>
                <span
                  className={classNames(classes.headerTitle_mode, classes.span)}>{`${MOBILE[index]} ${item.totalElements}笔`}</span>
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
