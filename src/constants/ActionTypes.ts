/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/4/19
 */
function create(type: String, actions: Object) {
  const result = {};
  Object.keys(actions).forEach(key => result[key] = `application_types@${type}@${key}`);
  return result;
}

// 交易
export const trade: any = create('trade', {
  startQuery: null,
  queryComplete: null
});

// 导航
export const navigator: any = create('navigator', {
  navigate: null,
  back: null,
  replace: null,
  reset: null
});

export const session: any = create('session', {
  /**
   * 获取个人信息
   */
  startProfile: null,
  profileComplete: null,
  getSessionInfo: null,
  getSessionInfoComplete: null,

  /**
   * 存储商户id
   */
  startMerchantId: '',
  MerchantIdComplete: '',
});

export const payment: any = create('payment', {
  /**
   * 交易信息查询
   */
  searchPaymentTrade: null,
  searchPaymentTradeComplete: null
});

export const binding: any = create('binding', {
  startQuery: null,
  queryComplete: null,
  sendVerificationCode: null,
  sendVerificationCodeComplete: null,
});

export const root: any = create('root', {
  start: null
});
