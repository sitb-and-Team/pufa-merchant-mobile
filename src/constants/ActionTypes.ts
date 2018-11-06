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
  profileComplete: null
});

export const root: any = create('root', {
  start: null
});
