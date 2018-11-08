import compose from './composeReducer';
import { session as types } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  /**
   * 判断是否跳转到登录
   */
  hasLogin: false,
  agencies: []
};

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2018/5/4
 */
export default compose((state = DEFAULT_STATE, action) => {
  const {payload, type, success} = action;
  switch (type) {
    // 获取个人机构信息start
    case types.startProfile:
      return {
        ...state,
        hasLogin: false
      };
    // 获取个人机构信息end
    case types.profileComplete: {
      return {
        ...state,
        hasLogin: !success,
        agencies: success && payload || state.agencies
      }
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
