/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/1
 */
import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getMerchantId, getOperator} from "../../core/SessionServices";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";

// css
const styles: any = theme => ({});

@connect(({session}) => ({
  hasLogin: session.hasLogin,
  agencies: session.agencies
}))

class Container extends React.Component<any, any> {
  /*render() {
    const loginMerchant = getOperator() && getOperator().find(merchant => merchant.merchantNo === getMerchantId()) || {};
    const configs: any = [];

    const businesses = loginMerchant && loginMerchant.businesses || [];
    // 匹配出当前loginMerchantBusiness
    businesses.map((business) => {
      console.log(business);
      let Default_business: any = {};
      /!**
       * 公有
       *!/
      const basic = [{
        label: lang.serviceFeeRate.fee,
        value: 'serviceFeeRate.fee',
        setValue: rate => rate && (business.serviceFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.serviceFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.serviceFeeRate.min,
        value: 'serviceFeeRate.min',
        setValue: rate => rate && (business.serviceFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.serviceFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.serviceFeeRate.max,
        value: 'serviceFeeRate.max',
        setValue: rate => rate && (business.serviceFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.serviceFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.normalFeeRate.fee,
        value: 'normalFeeRate.fee',
        setValue: rate => rate && (business.normalFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.normalFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.normalFeeRate.min,
        value: 'normalFeeRate.min',
        setValue: rate => rate && (business.normalFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.normalFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.normalFeeRate.max,
        value: 'normalFeeRate.max',
        setValue: rate => rate && (business.normalFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.normalFeeRate.type)}` || `${rate}元`)
      }];
      /!**
       * POS独有
       *!/
      const posRate = [{
        label: lang.creditFeeRate.fee,
        value: 'creditFeeRate.fee',
        setValue: rate => rate && (business.creditFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.creditFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.creditFeeRate.min,
        value: 'creditFeeRate.min',
        setValue: rate => rate && (business.creditFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.creditFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.creditFeeRate.max,
        value: 'creditFeeRate.max',
        setValue: rate => rate && (business.creditFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.creditFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.debitFeeRate.fee,
        value: 'debitFeeRate.fee',
        setValue: rate => rate && (business.debitFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.debitFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.debitFeeRate.min,
        value: 'debitFeeRate.min',
        setValue: rate => rate && (business.debitFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.debitFeeRate.type)}` || `${rate}元`)
      }, {
        label: lang.debitFeeRate.max,
        value: 'debitFeeRate.max',
        setValue: rate => rate && (business.debitFeeRate.type && `${rate}${ColumnUtil.unitJudgment(business.debitFeeRate.type)}` || `${rate}元`)
      }];
      if (business.businessType === "WeChat_PAY") {
        Default_business = {
          title: lang.weChat,
          titleIcon: weChat({fill: background.weChat, width: 30, height: 30}),
          config: basic
        }
      }

      if (business.businessType === "AliPay_PAY") {
        Default_business = {
          title: lang.aliPay,
          titleIcon: aliPay({fill: background.aliPay, width: 30, height: 30}),
          config: basic
        }
      }

      if (business.businessType === "UNION_PAY") {
        Default_business = {
          title: lang.quickPay,
          titleIcon: quickPay({fill: background.quickPay, width: 30, height: 30}),
          config: basic
        }
      }
      if (business.businessType === "POS_PAY") {
        basic.push(...posRate);
        Default_business = {
          title: lang.mpos,
          titleIcon: mposPay({fill: background.default, width: 30, height: 30}),
          config: basic
        }
      }
      configs.push(Default_business);
    });
    return (
      <SitbCard configs={configs}
                dataResource={loginMerchant.businesses}
      />
    )
  }*/
  state = {
    expanded: null,
  };
  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const loginMerchant = getOperator() && getOperator().find(merchant => merchant.merchantNo === getMerchantId()) || {};

    const businesses = loginMerchant && loginMerchant.businesses || [];
    // 匹配出当前loginMerchantBusiness
    businesses.map((business) => {})

    return (
      <div className={classes.root}>
        <CardActionArea>
          <CardMedia component="img"
                     className={classes.cardMedia}
                     image={require('../../assets/pictureInfo.png')}
                     title="Contemplative Reptile"
          />
        </CardActionArea>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography className={classes.heading}>General settings</Typography>
            <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography className={classes.heading}>Users</Typography>
            <Typography className={classes.secondaryHeading}>
              You are currently not an owner
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography className={classes.heading}>Advanced settings</Typography>
            <Typography className={classes.secondaryHeading}>
              Filtering has been entirely disabled for whole web server
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography className={classes.heading}>Personal data</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>


    );
  }
}

export const MerchantRate = withStyles(styles)(Container);
