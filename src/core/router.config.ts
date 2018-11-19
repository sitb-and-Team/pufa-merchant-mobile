import { menu } from '../locale';

import { App } from '../container/Application/App';

import { PaymentDetail } from '../container/Payment/Payment';
import { Trade } from '../container/Trade';

import { MerchantIndex } from '../container/Merchant';
import { MerchantLogin } from '../container/Merchant/Login';
import { MerchantBinding } from '../container/Merchant/Binding';
import { MerchantInfo } from '../container/Merchant/MerchantInfo';
import { MerchantRate } from '../container/Merchant/MerchantRate';
import { QrCode } from '../container/Payment/qrCode';

// 路由列表
export const routerPath = {
  app: '/app',
  trade: '/trade',
  merchantBinding: '/binding',
  merchantLogin: '/login',
  merchantIndex: '/merchantIndex',
  merchantInfo: '/merchantInfo',
  merchantRate: '/merchantRate',
  paymentDetail: '/paymentDetail',
  qrCode: '/qrCode',
};

export default [{
  path: routerPath.app,
  component: App
}, {
  path: routerPath.trade,
  component: Trade,
  title: menu.tradeRecord
}, {
  path: routerPath.merchantIndex,
  component: MerchantIndex,
  title: menu.merchantIndex
}, {
  path: routerPath.merchantBinding,
  component: MerchantBinding,
  title: menu.merchantBinding
}, {
  path: routerPath.merchantLogin,
  component: MerchantLogin,
  title: menu.merchantLogin
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
}, {
  path: routerPath.qrCode,
  component: QrCode,
  title: menu.qrCode
}];
