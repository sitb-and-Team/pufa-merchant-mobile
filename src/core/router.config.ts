import { App } from '../container/Application/App';
import { Trade } from '../container/Trade';
import { Binding } from '../container/Merchant/Binding';
import { MerchantInfo } from '../container/Merchant/MerchantInfo';
import { menu } from '../locale';

// 路由列表
export const routerPath = {
  app: '/app',
  trade: '/trade',
  merchantBinding: '/Binding',
  merchantInfo: '/merchantInfo'
};

export default [{
  path: routerPath.app,
  component: App
}, {
  path: routerPath.trade,
  component: Trade,
  title: menu.tradeRecord
}, {
  path: routerPath.merchantBinding,
  component: Binding,
  title: menu.merchantBinding
}, {
  path: routerPath.merchantInfo,
  component: MerchantInfo,
  title: menu.merchantInfo
}];
