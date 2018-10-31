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
import { autoBind } from "@sitb/wbs/autoBind";
import Grid from '@material-ui/core/Grid';

const styles: any = theme => ({
  header: {
    backgroundColor: theme.palette.primary.main
  },
  headerItem: {
    height: 100
  },
  itemAvatar: {
    width: 40,
    height: 40,
    color: "#000",
    backgroundColor: "#a4dce3",
  },
  itemMerchantNo: {
    maxWidth: 300,
    color: "#fff",
  },
  contentItem: {
    width: '100%',
    maxWidth: 380,
    height: "50px",
    backgroundColor: theme.palette.background.paper
  },
  contentExit: {
    paddingLeft: 16,
    textAlign: "center",
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
      const {name, Icon} = item;
      return (
        <React.Fragment key={index}>
          <ListItem button
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
                   component="li"
          />
        </React.Fragment>
      )
    })
  }

  render() {
    const {classes} = this.props;
    const config = [{
      name: '商家信息',
      Icon: StoreIcon,
      path: ''
    }, {
      name: '完善经营信息',
      Icon: PersonIcon,
      path: ''
    }, {
      name: '修改结算信息',
      Icon: RateReviewIcon,
      path: ''
    }];
    return (
      <Grid container>
        <Grid item
              xs={12}
        >
          <List component="nav"
                className={classes.header}
          >
            <ListItem className={classes.headerItem}>
              <ListItemIcon>
                <Avatar className={classes.itemAvatar}>
                  <StoreIcon/>
                </Avatar>
              </ListItemIcon>
              <ListItemText inset
                            primary={<span className={classes.itemMerchantNo}>{'000000000028089'}</span>}
              />
            </ListItem>
          </List>
          <List component="nav">
            {this.renderContent(config)}
            <ListItem button
                      className={classes.contentExit}
            >
              <ListItemText disableTypography
                            className={classes.contentExitValue}
                            primary="安全退出"/>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    )
  }
}


export const User = withStyles(styles)(Container as any);
