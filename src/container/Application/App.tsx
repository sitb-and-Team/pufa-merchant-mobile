/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch as SwitchRouter} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';

import {withStyles} from '@material-ui/core/styles';
import {autoBind} from '@sitb/wbs/autoBind';
import {getActions} from '../../core/store';

import {User} from './User';
import {Home} from './Home';
import {menu} from '../../locale';

const styles: any = theme => ({
  tabs: {
    flexGrow: 1,
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
});

/**
 * connect
 */
@connect(({app}) => ({
  /*processing: app.processing,
  searchParams: app.searchParams,
  page: app.page*/
}))

@autoBind
class Container extends React.Component<any, any> {

  /**
   * Component封装修改对应title
   * @param Component   对应组件
   * @param title       对应title
   * @returns {(props) => any}
   */
  createRender(Component, title) {
    return props => {
      document.title = title;
      return <Component {...props}/>
    }
  }

  /**
   * 路由跳转
   * @param event
   * @param path    跳转path
   */
  handleChange(event, path) {
    getActions().navigator.replace(path);
  };

  render() {
    const {match, location, classes} = this.props;
    // 导航路由配置
    const routes = [{
      path: `${match.url}/Home`,
      render: this.createRender(Home, menu.home),
      label: menu.home,
      Icon: HomeIcon
    }, {
      path: `${match.url}/User`,
      render: this.createRender(User, menu.user),
      label: menu.user,
      Icon: PersonIcon
    }];

    // 根据当前浏览器地址遍历对应导航index
    const tabIndex: any = routes.find(route => location.pathname.startsWith(route.path)) || {};
    return (
      <Grid container
            direction="column"
            justify="space-between"
      >
        <SwitchRouter>
          <Route render={this.createRender(Home, menu.home)}
                 path={match.url}
                 exact
          />
          {routes.map(({path, render}, index) => (
            <Route render={render}
                   path={path}
                   key={index}
            />
          ))}
        </SwitchRouter>
        <Paper className={classes.tabs}>
          <Tabs centered
                fullWidth
                value={tabIndex.path || routes[0].path}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
          >
            {routes.map(({path, label, Icon}, index) => (
              <Tab key={index}
                   label={label}
                   icon={<Icon/>}
                   value={path}
              />
            ))}
          </Tabs>
        </Paper>
      </Grid>
    )
  }
}

export const App = withStyles(styles)(Container as any);
