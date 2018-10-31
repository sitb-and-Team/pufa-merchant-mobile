/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import StoreIcon from '@material-ui/icons/Store';
import PersonIcon from '@material-ui/icons/Person';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';

import { withStyles } from '@material-ui/core/styles';
import {autoBind} from "@sitb/wbs/autoBind";

const styles: any = theme => ({
  root: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: "#00bcd4",
  },
  avatar: {
    width: 40,
    height: 40,
    color: "#000",
    backgroundColor: "#a4dce3",
  },
  user: {
    maxWidth: 300,
    color: "#fff",
  },
  item: {
    width: '100%',
    maxWidth: 380,
    height: "50px",
    backgroundColor: theme.palette.background.paper,
  },
  exit: {
    height: "60px",
    textAlign: "center",
    marginLeft: -20,
    backgroundColor: theme.palette.background.paper,
  }
});

@autoBind
class Container extends React.Component<any, any> {


  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav" style={{padding:0}}>
          <ListItem className={classes.header}>
            <ListItemIcon>
              <Avatar className={classes.avatar}>
                <StoreIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText inset primary="000000000028089" className={classes.user} />
          </ListItem>
        </List>
        <List component="nav">
          <ListItem button className={classes.item}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText inset primary="商家信息" />
            <ChevronRightIcon />
          </ListItem>
          <Divider inset component="li" />
          <ListItem button className={classes.item}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText inset primary="完善经营信息" />
            <ChevronRightIcon />
          </ListItem>
          <Divider inset component="li" />
          <ListItem button className={classes.item}>
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
            <ListItemText inset primary="修改结算信息" />
            <ChevronRightIcon />
          </ListItem>
          <Divider inset component="li" />
          <ListItem button className={classes.exit}>
            <ListItemText inset primary="安全退出" />
          </ListItem>
        </List>
      </div>
    )
  }
}


export const User = withStyles(styles)(Container as any);
