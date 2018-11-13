import { App } from '../container/Application/App';
import { Trade } from '../container/Trade';
import { Binding } from '../container/Merchant/Binding';
import { MerchantInfo } from '../container/Merchant/MerchantInfo';
import { menu } from '../locale';
import { MerchantRate } from '../container/Merchant/MerchantRate';
import { PaymentDetail } from '../container/Payment/Payment';

// 路由列表
export const routerPath = {
  app: '/app',
  trade: '/trade',
  merchantBinding: '/Binding',
  merchantInfo: '/merchantInfo',
  merchantRate: '/merchantRate',
  paymentDetail: '/paymentDetail'
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
}, {
  path: routerPath.merchantRate,
  component: MerchantRate,
  title: menu.merchantRate
}, {
  path: routerPath.paymentDetail,
  component: PaymentDetail,
  title: menu.paymentDetail
}];
