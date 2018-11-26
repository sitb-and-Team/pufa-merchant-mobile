/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import grey from '@material-ui/core/colors/grey';

import {routerPath} from '../../core/router.config';
import {getActions} from '../../core/store';
import List from "veigar/List";
import {autoBind} from "@sitb/wbs/autoBind";
import weChat from "@sitb/svg-icon/weChat";
import aliPay from "@sitb/svg-icon/aliPay";
import quickPay from "@sitb/svg-icon/quickPay";
import money from "@sitb/svg-icon/money";
import MoreIcon from '@material-ui/icons/ArrowRightAlt';
import {momentCommon} from "../../constants/objectKey";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {background} from "../../styles/color";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {tradeStatusColorOptions, tradeStatusOptions} from "../../constants/tradeStatus";
import IconButton from "@material-ui/core/es/IconButton/IconButton";

// css
const styles: any = theme => ({
  header: {
    paddingTop: 40,
    paddingBottom: 40
  },
  card: {
    height: 60,
    fontSize: '16'
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
  foot: {
    paddingTop: 10,
    paddingBottom: 72
  },
  record: {
    width: '85%',
    display: 'inline-block'
  },
  more: {
    width: '15%',
    display: 'inline-block'
  },
  content: {
    paddingTop: 8,
    paddingBottom: 8
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
    let {isToday} = this.state;
    this.handleSearch({page: 0});
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
    getActions().payment.searchAppPayment(params);
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
   * 路由跳转
   */
  handleGoToTradeDetail(params) {
    getActions().navigator.navigate({
      routeName: routerPath.paymentDetail,
      params
    });
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

    item.paymentAt = item && moment(item.paymentAt).format(momentCommon.DATETIME_FORMAT);
    let {totalAmount} = item;
    totalAmount = parseFloat(totalAmount).toFixed(2);

    return (
      <ListItem button
                key={index}
                divider={index % 5 === 0}
                onClick={() => this.handleGoToTradeDetail(item)}
      >
        <Avatar style={{background: background[type] || background.default}}>
          {svg[type] && svg[type](svgProps) || money(svgProps)}
        </Avatar>
        <ListItemText primary={`${item.merchant.merchantName}`}
                      secondary={`${item.paymentAt}`}/>
        <ListItemText primary={`${totalAmount} 元`}
                      style={{minWidth: 80}}
                      secondary={
                        <span>
                          <span style={{width: 10, height: 10, backgroundColor: tradeStatusColorOptions[item.status], display: 'inline-block', borderRadius: '50%'}} />
                          <span>{tradeStatusOptions[item.status]}</span>
                        </span>
                      }
        />
      </ListItem>
    )
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
    const {classes, homePage, page} = this.props;
    // page.value = (page.value && (page.value.length !== 0)) || '0.00';
    page.value = page.value ? parseFloat(page.value).toFixed(2) : '0.00';
    // tab配置
    /*const config = [{
      label: menu.tradeRecord,
      Icon: EventNoteIcon,
      path: routerPath.trade
    }];*/
    return (
      <React.Fragment>
        <Grid>
          <Grid item
                xs={12}
                className={classNames(classes.header, classes.header_mode)}
          >
            <TabContainer align="center">
              <p className={classes.headerTitle_mode}>{'今日收入(元)'}</p>
              <span className={classes.headerMoney_mode}>{page.value}</span>
            </TabContainer>
          </Grid>
          <Card className={classes.card}>
            <CardContent className={classes.content}>

              <Typography component="p" className={classes.record}>
                最近收款记录
              </Typography>
              <IconButton onClick={() => getActions().navigator.navigate(routerPath.trade)}
                          className={classes.more}
              >
                <MoreIcon/>
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
        <List data={homePage.content}
              className={classes.foot}
              renderItem={this.renderItem}
              onEndReachedThreshold={50}
              useBodyScroll
        />
      </React.Fragment>
    );

  }
}

export const Home = withStyles(styles)(Container as any);
