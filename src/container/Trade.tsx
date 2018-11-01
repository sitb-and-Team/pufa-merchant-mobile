/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import List from 'veigar/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../core/store';

import Grid from '@material-ui/core/Grid';
import weChat from '@sitb/svg-icon/weChat';
import aliPay from '@sitb/svg-icon/aliPay';
import quickPay from '@sitb/svg-icon/quickPay';
import money from '@sitb/svg-icon/money';
import { background } from '../styles/color';

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
  }
});

@connect(({trade}) => ({
  searchParams: trade.searchParams,
  processing: trade.processing,
  page: trade.page
}))
@autoBind
class Container extends React.Component<any> {
  /**
   * 渲染list
   * @param {any} item  当前行数据
   * @param {any} index 下标
   * @returns {any}
   */
  renderItem({item, index}) {
    const {type} = item;
    // svg默认props
    let svgProps = {fill: '#fff', width: 30, height: 30};
    let svg = {
      'weChat': weChat,
      'aliPay': aliPay,
      'quickPay': quickPay
    };
    return (
      <ListItem button
                key={index}
                divider={index % 5 === 0}
      >
        <Avatar style={{background: background[type] || background.default}}>
          {svg[type] && svg[type](svgProps) || money(svgProps)}
        </Avatar>
        <ListItemText primary={`Photos${item.id}`} secondary={`Jan 9, 2014${index}`}/>
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
    const {listLoading, page} = this.props;
    const {last, number} = page;
    if (listLoading || last) {
      return;
    }
    this.handleSearch({
      ...this.props.searchParams,
      pageable: number + 1
    });
  }

  /**
   * search
   * @param params 搜索参数
   */
  handleSearch(params) {
    console.log('search', params);
    getActions().trade.startQuery(params);
  }

  render() {
    const {page} = this.props;
    return (
      <List data={page.content}
            renderItem={this.renderItem}
            renderFooter={this.renderFooter}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={50}
            useBodyScroll
      />
    )
  }
}

export const Trade = withStyles(styles)(Container as any);
