/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';
import { autoBind } from "@sitb/wbs/autoBind";
import { getActions } from '../../core/store';
import { getMerchantId } from '../../core/SessionServices';
import { routerPath } from '../../core/router.config';
import { menu } from '../../locale';

const styles: any = theme => ({
  header_mode: {
    backgroundColor: theme.palette.primary.main
  },
  headerItem: {
    height: 100
  },
  itemAvatar: {
    width: 40,
    height: 40
  },
  itemAvatar_mode: {
    color: "#000",
    backgroundColor: "#a4dce3"
  },
  itemMerchantNo_mode: {
    color: "#fff"
  },
  content_mode: {
    backgroundColor: theme.palette.background.paper
  },
  contentItem: {
    width: '100%',
    height: "50px"
  },
  contentExit: {
    paddingLeft: 16,
    textAlign: "center"
  },
  contentExit_mode: {
    backgroundColor: theme.palette.background.paper
  },
  contentExitValue: {
    paddingRight: 0
  }
});

@autoBind
class Container extends React.Component<any, any> {
  state = {
    isExit: false
  };

  /**
   * 渲染list
   * @param config
   * @returns {any}
   */
  renderContent(config) {
    const {classes} = this.props;
    return config.map((item, index) => {
      const {name, Icon, path} = item;
      return (
        <React.Fragment key={index}>
          <ListItem button
                    onClick={() => getActions().navigator.navigate(path)}
                    className={classes.contentItem}
          >
            <ListItemIcon>
              <Icon/>
            </ListItemIcon>
            <ListItemText inset
                          primary={name}
            />
            <ChevronRightIcon/>
          </ListItem>
          <Divider inset
                   component="div"
          />
        </React.Fragment>
      )
    })
  }

  /**
   * 退出弹框开关
   * @param status
   */
  handleExitSwitch(status) {
    this.setState({isExit: status});
  }

  /**
   * 退出清空缓存
   */
  handleExit() {
    getActions().session.startEntityExit();
    // 重载页面
    location.reload();
  }

  render() {
    const {classes} = this.props;
    const config = [{
      name: menu.merchantRate,
      Icon: StoreIcon,
      path: routerPath.merchantRate
    }, {
      name: menu.merchantInfo,
      Icon: PersonIcon,
      path: routerPath.merchantInfo
    }];

    return (
      <Grid container>
        <Grid item
              xl={12}
              xs={12}
        >
          <List component="nav"
                className={classes.header_mode}
          >
            <ListItem className={classes.headerItem}>
              <ListItemIcon>
                <Avatar className={classNames(classes.itemAvatar, classes.itemAvatar_mode)}>
                  <StoreIcon/>
                </Avatar>
              </ListItemIcon>
              <ListItemText inset
                            primary={<span className={classes.itemMerchantNo_mode}>{getMerchantId()}</span>}
              />
            </ListItem>
          </List>
          <List component="nav"
                className={classes.content_mode}
          >
            {this.renderContent(config)}
            {<ListItem button
                       className={classNames(classes.contentExit, classes.contentExit_mode)}
            >
              <Button onClick={() => this.handleExitSwitch(true)}
                      className={classes.contentExitValue}
                      fullWidth={true}
              >安全退出</Button>
              <Dialog open={this.state.isExit}
                      onClose={() => this.handleExitSwitch(false)}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"安全退出"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    您确定要退出吗？
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.handleExitSwitch(false)}
                          color="primary"
                  >
                    取消
                  </Button>
                  <Button onClick={this.handleExit}
                          color="primary"
                          autoFocus
                  >
                    确定
                  </Button>
                </DialogActions>
              </Dialog>
            </ListItem>}

          </List>
        </Grid>
      </Grid>
    )
  }
}


export const User = withStyles(styles)(Container as any);
