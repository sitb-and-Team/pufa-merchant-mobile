import { App } from '../container/Application/App';
import { Trade } from '../container/Trade';
import { Binding } from '../container/Merchant/Binding';

// 路由列表
export const routerPath = {
  'app': '/app',
  'trade': '/trade',
  'binding': '/Binding'
};

export default [{
  path: routerPath.app,
  component: App,
}, {
  path: routerPath.trade,
  component: Trade
}, {
  path: routerPath.binding,
  component: Binding
}];
