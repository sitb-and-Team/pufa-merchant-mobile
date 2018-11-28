/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {routerPath} from '../../core/router.config';
import {getActions} from '../../core/store';
import {autoBind} from "@sitb/wbs/autoBind";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {menu} from "../../locale";
import weChat from "@sitb/svg-icon/weChat";
import aliPay from "@sitb/svg-icon/aliPay";
import quickPay from "@sitb/svg-icon/quickPay";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {background} from "../../styles/color";
import money from "@sitb/svg-icon/money";
import {List} from "veigar/List/List";

// css
const styles: any = theme => ({
  header: {
    paddingTop: 40,
    paddingBottom: 40
  },
  card: {
    height: 100,
    fontSize: 16
  },
  right: {
    textAlign: 'right'
  },
  foot: {
    paddingTop: 10,
    paddingBottom: 72
  }
});

@connect(({payment}) => ({
  searchParams: payment.searchParams,
  processing: payment.processing,
  isLoadMore: payment.isLoadMore,
  homePage: payment.homePage,
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
    let type = businessType;
    // svg默认props
    let svgProps = {fill: '#fff', width: 30, height: 30};
    let svg = {
      'weChat': weChat,
      'aliPay': aliPay,
      'quickPay': quickPay
    };
    if (businessType.search("We") !== -1) {
      type = "weChat";
    }
    if (businessType.search("Ali") !== -1) {
      type = "aliPay";
    }
    if (businessType.search("UNION") !== -1) {
      type = "quickPay";
    }

    item.totalAmount = parseFloat(item.totalAmount).toFixed(2);

    return (
      <ListItem key={index}
                divider={index % 5 === 0}
      >
        <Avatar style={{background: background[type] || background.default}}>
          {svg[type] && svg[type](svgProps) || money(svgProps)}
        </Avatar>
        <ListItemText primary='交易笔数：'
                      secondary='交易总额：'
        />
        <ListItemText primary={`${item.totalElements} 笔`}
                      secondary={`${item.totalAmount} 元`}
                      style={{textAlign: 'right', padding: 0}}/>
      </ListItem>
    )
  }

  render() {
    const {classes, page, homePage} = this.props;
    console.log(homePage);
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
        <List data={homePage.content}
              renderItem={this.renderItem}
              onEndReachedThreshold={50}
              className={classes.list}
              useBodyScroll
        />
        <Card className={classes.card}>
          <CardContent>
            <Grid container
                  spacing={24}
            >
              {
                this.renderTabItem(config)
              }
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export const Home = withStyles(styles)(Container as any);
