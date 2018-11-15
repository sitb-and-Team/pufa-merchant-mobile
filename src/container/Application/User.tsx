/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
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
import Grid from '@material-ui/core/Grid';
import { getActions } from '../../core/store';
import { routerPath } from '../../core/router.config';
import {loginMerchant} from "../Merchant/MerchantInfo";

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

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    getActions().session.startEntityExit();
  };

  render() {
    const {classes} = this.props;
    const config = [{
      name: '费率信息',
      Icon: StoreIcon,
      path: routerPath.merchantRate
    }, {
      name: '商户信息',
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
                            primary={<span className={classes.itemMerchantNo_mode}>{loginMerchant.merchantNo}</span>}
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
              {/*<ListItemText disableTypography
                            className={classes.contentExitValue}
                            primary="安全退出"/>*/}
              <Button onClick={this.handleClickOpen}
                      className={classes.contentExitValue}
                      fullWidth = {true}
              >安全退出</Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
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
                  <Button onClick={this.handleClose} color="primary">
                    取消
                  </Button>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
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
