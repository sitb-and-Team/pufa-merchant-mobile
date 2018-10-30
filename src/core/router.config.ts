import { App } from '../container/Application/App';
import { Trade } from '../container/Trade';

// 路由列表
export const routerPath = {
  'app': '/app',
  'trade': '/trade'
};

export default [{
  path: routerPath.app,
  component: App,
}, {
  path: routerPath.trade,
  component: Trade
}];
