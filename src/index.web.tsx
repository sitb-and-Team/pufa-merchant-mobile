import '@babel/polyfill';
import './styles/index.scss';
import * as React from 'react';
import bootstrap from 'veigar/bootstrap';
import { Provider } from 'react-redux';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import createHashHistory from 'history/createHashHistory';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import create from '@sitb/svg-icon/create';

import { create as createAppStore } from './core/store';
import App from './container';

// Create a history of your choosing (we're using a browser history in this case)
const hashHistory = createHashHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(hashHistory);

const store = createAppStore({}, {}, [historyMiddleware], reducer => connectRouter(hashHistory)(reducer));

(global as any).createSvgComponent = create;

// 主题配置
const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: '#11cb5f' }
    }
});

bootstrap(() => (
  <Provider store={store}>
    <ConnectedRouter history={hashHistory}>
      <MuiThemeProvider theme={theme}>
      <App/>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
));
