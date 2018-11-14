/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/14
 */
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { autoBind } from '@sitb/wbs/autoBind';
import { getActions } from '../../core/store';

import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';

// css
const styles: any = theme => ({
  main: {
    height: '100vh',
    background: theme.palette.background.paper
  },
  mainLogo: {
    fontSize: 100,
    color: theme.palette.primary.main
  },
  mainForm: {
    marginLeft: 32,
    marginRight: 32
  },
  formServiceBtn: {
    marginTop: 10
  },
  formServiceReset: {
    color: theme.palette.text.primary
  },
  mainFootBtn: {
    color: theme.palette.text.primary
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150
  }
});


export interface Props {
  classes?: any;
  /**
   * 最下面按钮名
   */
  serviceButtonName: string;
  /**
   * 最下面按钮禁用
   */
  serviceButtonBan?: boolean;
  /**
   * 按钮跳转路由
   */
  routePath: string;
}

@autoBind
class Container extends React.Component<Props, any> {

  render() {
    const {classes, serviceButtonName, serviceButtonBan = false, routePath} = this.props;
    return (
      <Grid container
            justify="center"
            className={classes.main}
      >
        <Grid item
              container
              justify="center"
              alignItems="center"
              xs={12}
        >
          <AccountCircle className={classes.mainLogo}/>
        </Grid>

        <Grid item
              xs={12}
              className={classes.mainForm}
        >
          {this.props.children}
        </Grid>
        <Grid item
              xs={12}
              container
              justify="center"
              alignItems="center"
        >
          <Button component="span"
                  color="primary"
                  disabled={serviceButtonBan}
                  className={classes.mainFootBtn}
                  onClick={() => getActions().navigator.navigate(routePath)}
          >
            {serviceButtonName}
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export const BrandTemplate: any = withStyles(styles)(Container as any);
