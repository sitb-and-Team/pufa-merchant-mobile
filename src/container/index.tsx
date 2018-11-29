import * as React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {getQueryArgs, queryToObjectWithUrl} from '@sitb/wbs/utils/HttpUtil';

import {getActions, getState} from '../core/store';
import {getAccessToken, getMerchantId, getOperator, setAccessToken} from '../core/SessionServices';
import routes, {routerPath} from '../core/router.config';

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
export default class App extends React.Component<any, any> {

  componentWillMount() {
    let {access_token} = getQueryArgs();
    if (!access_token && location.hash.includes('?')) {
      const hash = location.hash;
      access_token = queryToObjectWithUrl(hash);
    }

    if (access_token) {
      // session 保存access token
      setAccessToken(access_token);
      // 截取掉url？之后掉链接 并跳转
      location.href = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + location.pathname + location.hash;
    }
    // 加载当前用户信息
    getActions().session.startProfile();
  }

  render() {
    const operator = (getOperator() && Object.keys((getOperator().merchants).length !== 0)) && getOperator();
    // 判断绑定状态，跳转path
    const path = (operator && getAccessToken() && getMerchantId()) && routerPath.home || routerPath.merchantIndex;
    return (
      <HashRouter>
        <React.Fragment>
          <Switch>
            {routes.map((route: any, index) => (
              <Route path={route.path}
                     render={createRender(route)}
                     key={index}
                     exact={route.exact}
              />
            ))}
            <Route exact
                   render={() => (<Redirect to={path}/>)}
            />
          </Switch>
        </React.Fragment>
      </HashRouter>
    );
  }

}
