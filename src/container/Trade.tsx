/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {withStyles} from '@material-ui/core/styles';
import List from 'veigar/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import {autoBind} from '@sitb/wbs/autoBind';
import {getActions} from '../core/store';

import Grid from '@material-ui/core/Grid';
import weChat from '@sitb/svg-icon/weChat';
import aliPay from '@sitb/svg-icon/aliPay';
import quickPay from '@sitb/svg-icon/quickPay';
import money from '@sitb/svg-icon/money';
import {background} from '../styles/color';
import {routerPath} from "../core/router.config";
import {momentCommon} from "../constants/objectKey";
import {tradeStatusOptions} from '../constants/tradeStatus';
import {getMerchantId} from "../core/SessionServices";
import Typography from "@material-ui/core/es/Typography/Typography";
import Paper from "@material-ui/core/es/Paper/Paper";


// css
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  foot: {
    paddingTop: 10,
    paddingBottom: 10,
    borderTop: '1px solid #d8d8d8'
  },
  background: {
    border: '1px solid #d8d8d8',
    background: '#62b900'
  },
  left: {
    width: '50%',
    padding: 15,
    paddingRight: 0,
    margin: 0,
    display: 'inline-block'
  },
  right: {
    padding: 10,
    right: 0,
    margin: 0,
    display: 'inline-block'
  }
});

@connect(({payment}) => ({
  searchParams: payment.searchParams,
  processing: payment.processing,
  page: payment.page
}))
@autoBind
class Container extends React.Component<any, any> {

  /**
   * 交易信息查询
   */
  componentWillMount() {
    const merchantNo = getMerchantId();
    console.log(this.props.page)
    if (this.props.page.totalElements !== 0){
      return;
    }
    this.handleSearch({merchantNo, page: 0});

    return;
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
        <ListItemText primary={`${item.totalAmount} 元`} secondary={`${tradeStatusOptions[item.status]}`}/>
      </ListItem>
    )
  }

  /**
   * list底部
   * @returns {any}
   */
  renderFooter() {
    const {page, processing, classes} = this.props;
    const {last} = page;
    // 判断是否是最后一页，是否需要加载
    if (last) {
      return <Grid className={classes.foot}>{'已经到底了，别扯了'}</Grid>;
    }
    if (processing) {
      return (
        <Grid container
              justify="center"
              alignItems="center"
              className={classes.foot}
        >
          <CircularProgress size={20}/>
          {'加载中...'}
        </Grid>
      );
    }
    return null;
  }

  /**
   *  下拉时触发
   */
  handleLoadMore() {
    const {processing, page} = this.props;
    const {last, number} = page;
    if (processing || last) {
      return;
    }
    console.log(page);
    this.handleSearch({
      ...this.props.searchParams,
      page: number + 1,
      isLoadMore: true
    });
  }

  /**
   * search
   * @param params 搜索参数
   */
  handleSearch(params) {
    getActions().payment.searchPaymentTrade(params);
  }

  render() {
    const {classes, page} = this.props;
    console.log(page);
    return (
      <React.Fragment>
        <Paper elevation={1}>
          <Typography component="p" className={classes.left} paragraph={true}>
            总笔数： {page.totalElements} 笔
          </Typography>
          <Typography component="p" className={classes.right} paragraph={true}>
            总交易金额： {page.value} 元
          </Typography>
        </Paper>
        <List data={page.content}
              renderItem={this.renderItem}
              renderFooter={this.renderFooter}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
              useBodyScroll
        />
      </React.Fragment>
    )
  }
}

export const Trade = withStyles(styles)(Container as any);
