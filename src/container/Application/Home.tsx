/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import grey from '@material-ui/core/colors/grey';

import EventNoteIcon from '@material-ui/icons/EventNote';
import StoreIcon from '@material-ui/icons/Store';

import { lang } from '../../locale';
import { routerPath } from '../../core/router.config';
import { getActions } from '../../core/store';

// css
const styles: any = theme => ({
  header: {
    paddingTop: 40,
    paddingBottom: 40
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

class Container extends React.Component<any> {

  /**
   * 路由跳转
   */
  handleGoToTrade(path) {
    getActions().navigator.navigate(path);
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
    const {classes} = this.props;
    // tab配置
    const config = [{
      label: lang.tradeRecord,
      Icon: EventNoteIcon,
      path: routerPath.trade
    }, {
      label: lang.merchant.binding,
      Icon: StoreIcon,
      path: routerPath.merchantBinding
    }];
    return (
      <Grid>
        <Grid item
              xs={12}
              className={classNames(classes.header, classes.header_mode)}
        >
          <TabContainer align="center">
            <p className={classes.headerTitle_mode}>{'今日收入(元)'}</p>
            <span className={classes.headerMoney_mode}>{'0'}</span>
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
      </Grid>
    )
  }
}

export const Home = withStyles(styles)(Container as any);
