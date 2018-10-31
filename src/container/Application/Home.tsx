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
import EventNoteIcon from '@material-ui/icons/EventNote';
import { getActions } from '../../core/store';
import { routerPath } from '../../core/router.config';

// css
const styles: any = theme => ({
  header: {
    paddingTop: 40,
    paddingBottom: 40
  },
  header_mode: {
    backgroundColor: theme.palette.background.default
  },
  headerTitle_mode: {
    color: theme.palette.text.secondary
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
   * 跳转到交易记录
   */
  handleGoToTrade() {
    getActions().navigator.navigate(routerPath.trade);
  }

  render() {
    const {classes} = this.props;
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
              <Grid item
                    container
                    justify="center"
                    xs={4}
              >
                <Tab label="收款记录"
                     icon={<EventNoteIcon/>}
                     onClick={this.handleGoToTrade}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

export const Home = withStyles(styles)(Container as any);
