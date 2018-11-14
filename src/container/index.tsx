import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { queryToObjectWithUrl } from '@sitb/wbs/utils/HttpUtil';

import { getActions, getState } from '../core/store';
import { setAccessToken } from '../core/SessionServices';
import routes, { routerPath } from '../core/router.config';

function createRender(route) {
  return props => {
    document.title = route.title || '';
    const params = getState().navigator.router[route.path];
    // pass the sub-routes down to keep nesting
    return (
      <route.component {...props}
                       params={params}
      />
    );
  };
}

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/10/2
 */
@connect(({session}) => ({
  hasBinding: session.hasBinding
}))
export default class App extends React.Component<any, any> {

  componentWillMount() {
    // 获取当前链接url，判断是否有token
    let nowHref = location.href;
    if (nowHref.indexOf('?') > -1) {
      // 获取当前token，返回search object
      const {access_token} = queryToObjectWithUrl(nowHref);
      if (access_token) {
        // session 保存access token
        setAccessToken(access_token);
        // 截取掉url？之后掉链接 并跳转
        location.href = nowHref.substr(0, nowHref.indexOf('?'));
      }
    }
    // 加载当前用户信息
    getActions().session.startProfile();
  }

  render() {
    const {hasBinding} = this.props;
    // 判断绑定状态，跳转path
    const path = hasBinding && routerPath.merchantBinding || routerPath.merchantRegister;
    return (
      <HashRouter>
        <React.Fragment>
          <Route exact
                 path="/"
                 render={() => (<Redirect to={path}/>)}
          />
          {routes.map((route: any, index) => (
            <Route path={route.path}
                   render={createRender(route)}
                   key={index}
                   exact={route.exact}
            />
          ))}
        </React.Fragment>
      </HashRouter>
    );
  }

}
