/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/27
 */
import * as React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {autoBind} from '@sitb/wbs/autoBind';
import {getActions} from '../../core/store';
import {routerPath} from "../../core/router.config";
import {momentCommon} from "../../constants/objectKey";
import {tradeStatusColorOptions, tradeStatusOptions} from "../../constants/tradeStatus";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import objectPath from 'object-path';
import { BusinessTypeData } from "../../constants/BusinessType";
import {background} from "../../styles/color";
import money from "@sitb/svg-icon/money";
import Avatar from "@material-ui/core/Avatar/Avatar";
import weChat from "@sitb/svg-icon/weChat";
import aliPay from "@sitb/svg-icon/aliPay";
import quickPay from "@sitb/svg-icon/quickPay";
import Grid from "@material-ui/core/es/Grid/Grid";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {List} from "veigar/List/List";
import Typography from "@material-ui/core/es/Typography/Typography";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import {SitbButton} from "../../component/SitbButton";
import TextField from "@material-ui/core/es/TextField/TextField";
import AppBar from "@material-ui/core/es/AppBar/AppBar";


// css
const styles = theme => ({
  header: {
    height: 105
  },
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
  },
  btn: {
    width: '20%'
  },
  search: {
    width: '100%'
  },
  list: {
    marginTop: 105
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

@connect(({settle}) => ({
  searchParams: settle.searchParams,
  processing: settle.processing,
  page: settle.page
}))
@autoBind
class Container extends React.Component<any, any> {

  constructor(props, content) {
    super(props, content);
    this.state = {
      paymentAt: '',
      totalElement: ''
    };
  }

  /**
   * 交易信息查询
   */
  componentWillMount() {
    if (this.props.page.totalElements !== this.props.page.totalElements) {
      return;
    }
    this.handleSearch({page: 0});
    this.setState({[this.state.totalElement]: this.props.page.totalElements});
    return;
  }

  /**
   * 路由跳转
   */
  handleGoToTradeDetail(params) {
    getActions().navigator.navigate({
      routeName: routerPath.enterAccountDetail,
      params
    });
  }

  /**
   * 保存日期
   * @param name
   * @returns {(event) => void}
   */
  handleChange = paymentAt => event => {
    this.setState({[paymentAt]: event.target.value});
  };

  /**
   * 搜索日期查看交易
   */
  handleClick() {
    this.handleSearch({page: 0, paymentAt: this.state.paymentAt});

  }


  /**
   * 渲染list
   * @param {any} item  当前行数据
   * @param {any} index 下标
   * @returns {any}
   */
  renderItem({item, index}) {
    const {businessType} = item.paymentRecord;
    let type = businessType;
    // svg默认props
    let svgProps = {fill: '#fff', width: 30, height: 30};
    let svg: { weChat: ({fill, ...props}?: any) => any; aliPay: ({...props}?: any) => any; quickPay: ({...props}?: any) => any } = {
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

    item.settleAt = item && `${moment(item.settleAt).format(momentCommon.DATETIME_FORMAT)}` || '';
    item.totalAmount = parseFloat(item.totalAmount).toFixed(2);

    return (
      <ListItem button
                key={index}
                divider={index % 5 === 0}
                onClick={() => this.handleGoToTradeDetail(item)}
      >
        <Avatar style={{background: background[type] || background.default}}>
          {svg[type] && svg[type](svgProps) || money(svgProps)}
        </Avatar>
        <ListItemText primary={BusinessTypeData[businessType]}
                      secondary={`${item.settleAt}`}/>
        <ListItemText primary={
                        <span>
                          {item.totalAmount} 元
                        </span>
                      }
                      style={{minWidth: 80, textAlign: 'right'}}
                      secondary={
                        <span>
                          <span style={{width: 10, height: 10, backgroundColor: tradeStatusColorOptions[item.paymentRecord.status], display: 'inline-block', borderRadius: '50%'}} />
                          <span>{tradeStatusOptions[item.paymentRecord.status]}</span>
                        </span>
                      }
        />
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
      return <Grid container
                   justify={"center"}
                   className={classes.foot}
      >
        {'已经到底了，别扯了'}
      </Grid>;
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
    const {paymentAt} = this.state;
    const {last, number} = page;
    if (processing || last) {
      return;
    }
    this.handleSearch({
      ...this.props.searchParams,
      page: number + 1,
      isLoadMore: true,
      paymentAt
    });
  }

  /**
   * search
   * @param params 搜索参数
   */
  handleSearch(params = this.props.searchParams) {
    // 判断 交易时间
    let paymentAt = objectPath.get(params, 'paymentAt');
    params.startTime = paymentAt && `${moment(paymentAt).hours(0).minutes(0).seconds(0).format(momentCommon.DATE_FORMAT)} 00:00:00` || '';
    params.endTime = paymentAt && `${moment(paymentAt).hours(23).minutes(59).seconds(59).format(momentCommon.DATETIME_FORMAT)}` || '';
    Reflect.deleteProperty(params, 'paymentAt');
    getActions().settle.searchEnterAccount(params);
  }

  render() {
    const {classes, page} = this.props;
    return (
      <React.Fragment>
        <AppBar position="fixed" color="default" className={classes.header}>
          <Toolbar>
            <form className={classes.search}>
              <TextField id="date"
                         type="date"
                         label="交易日期"
                         defaultValue=""
                         className={classes.textField}
                         InputLabelProps={{
                           shrink: true,
                         }}
                         onChange={this.handleChange('paymentAt')}
              />
            </form>
            <SitbButton key="submit"
                        size="large"
                        className={classes.btn}
                        onClick={this.handleClick}
            >
              {'确认'}
            </SitbButton>
          </Toolbar>
          <Toolbar>
            <Typography component="p" className={classes.left} paragraph={true}>
              总笔数:{page.totalElements} 笔
            </Typography>
            <Typography component="p" className={classes.right} paragraph={true}>
              总金额:{page.value} 元
            </Typography>
          </Toolbar>
        </AppBar>
        <List data={page.content}
              renderItem={this.renderItem}
              renderFooter={this.renderFooter}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
              className={classes.list}
              useBodyScroll
        />
      </React.Fragment>
    )
  }
}

export const EnterAccount = withStyles(styles)(Container as any);
