/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/31
 */
import * as React from 'react';
import classNames from 'classnames';
import objectPath from 'object-path';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { lang } from '../../locale';

// css
const styles: any = theme => ({
  main: {
    paddingTop: 12,
    paddingBottom: 12,
    height: '100%'
  },
  main_mode: {
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  mainCard: {
    marginLeft: 16,
    marginRight: 16
  },
  cardMedia: {
    objectFit: 'cover'
  },
  cardTitle: {
    marginTop: 24
  },
  cardItem: {
    marginTop: 5
  },
  itemLabel_mode: {
    color: theme.palette.text.secondary
  },
  itemValue_mode: {
    color: theme.palette.text.primary
  }
});

class Container extends React.Component<any> {

  /**
   * 渲染内容
   * @param title   标题
   * @param config  row列表
   * @param data    后台数据
   * @returns {any}
   */
  renderCardContent(title, config, data) {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Typography gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.cardTitle}
        >
          {title}
        </Typography>
        <Typography gutterBottom
                    component="div"
        >
          {
            config.map((values, index) => (
              <Grid item
                    container
                    key={index}
                    justify="space-between"
                    className={classes.cardItem}
              >
                <div className={classes.itemLabel_mode}>{`${values.label}:`}</div>
                <div className={classes.itemValue_mode}>{objectPath.get(data, values.value)}</div>
              </Grid>
            ))
          }
        </Typography>
      </React.Fragment>
    )
  }

  render() {
    const {classes} = this.props;
    const data = {
      merchantNo: '123123',
      merchantName: 'test',
      address: '浦东大道',
      legalPerson: '阳尧',
      legalPersonPhone: '17717213771',
      legalEmail: '878723@qq.com',
      idType: 'ID_CARD',
      idNo: '43012030210203',
      settleBankName: '华夏银行',
      settleBankNo: '43012030210203',
      accountName: '阳尧',
      accountNumber: '43012030210203'
    };
    const basic = [{
      label: lang.merchantNo,
      value: 'merchantNo'
    }, {
      label: lang.merchantName,
      value: 'merchantName'
    }, {
      label: lang.legalPerson,
      value: 'legalPerson'
    }, {
      label: lang.legalPersonPhone,
      value: 'legalPersonPhone'
    }, {
      label: lang.legalEmail,
      value: 'legalEmail'
    }, {
      label: lang.idType,
      value: 'idType'
    }, {
      label: lang.idNo,
      value: 'idNo'
    }, {
      label: lang.address,
      value: 'address'
    }];
    const cost = [{
      label: lang.settleBankName,
      value: 'settleBankName'
    }, {
      label: lang.settleBankNo,
      value: 'settleBankNo'
    }, {
      label: lang.accountName,
      value: 'accountName'
    }, {
      label: lang.accountNumber,
      value: 'accountNumber'
    }];
    return (
      <Grid container
            alignItems="center"
            justify="center"
            className={classNames(classes.main, classes.main_mode)}
      >
        <Card className={classes.mainCard}>
          <CardActionArea>
            <CardMedia component="img"
                       className={classes.cardMedia}
                       image="http://img.zcool.cn/community/01f9eb5768ee240000018c1b3f524a.jpg"
                       title="Contemplative Reptile"
            />
            <CardContent>
              {this.renderCardContent(lang.merchant.basic, basic, data)}
              <Divider component="div"/>
              {this.renderCardContent(lang.merchant.cost, cost, data)}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    )
  }
}

export const MerchantInfo = withStyles(styles)(Container as any);
