/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import grey from '@material-ui/core/colors/grey';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {routerPath} from '../../core/router.config';
import {getActions} from '../../core/store';
import {autoBind} from "@sitb/wbs/autoBind";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MoneyOffRoundedIcon from '@material-ui/icons/MoneyOffRounded';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {menu} from "../../locale";
import ListSubheader from "@material-ui/core/es/ListSubheader/ListSubheader";

// css
const styles: any = theme => ({
  header: {
    paddingTop: 40,
    paddingBottom: 40
  },
  card: {
    height: 120,
    fontSize: 16
  },
  header_mode: {
    backgroundColor: theme.palette.primary.main
  },
  headerTitle_mode: {
    color: grey[200]
  },
  headerMoney_mode: {
    fontSize: 40,
    color: '#fff'
  },
  left: {
    width: '60%',
    paddingRight: 0,
    margin: 0,
    display: 'inline-block'
  },
  right: {
    right: 0,
    margin: 0,
    display: 'inline-block'
  },
  foot: {
    paddingTop: 10,
    paddingBottom: 72
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

  render() {
    const {classes, page} = this.props;
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
    }, {
      label: menu.outAccount,
      Icon: MoneyOffRoundedIcon,
      path: routerPath.outAccount
    }];
    return (
      <Grid>
        <Grid item
              xs={12}
              className={classNames(classes.header, classes.header_mode)}
        >
          <TabContainer align="center">
            <p className={classes.headerTitle_mode}>{'总收入(元)'}</p>
            <span className={classes.headerMoney_mode}>{page.value}</span>
          </TabContainer>
        </Grid>
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
        <List subheader={<ListSubheader component="div">统计信息</ListSubheader>}>
          <ListItem>
            <ListItemText primary="总笔数: " className={classes.left}/>
            <ListItemText primary={`${page.totalElements} 笔`}  className={classes.right}/>
          </ListItem>
          <ListItem>
            <ListItemText primary='总金额: ' className={classes.left}/>
            <ListItemText primary={`${page.value} 元`} className={classes.right}/>
          </ListItem>
        </List>
      </Grid>
    )
  }
}

export const Home = withStyles(styles)(Container as any);
