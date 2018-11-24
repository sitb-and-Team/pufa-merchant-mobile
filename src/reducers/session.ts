import compose from './composeReducer';
import {session as types} from '../constants/ActionTypes';

const DEFAULT_STATE = {
  /**
   * 判断是否绑定
   */
  hasBinding: false,
  merchants: {
    merchants: []
  }
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
        hasBinding: false
      };
    // 获取个人机构信息end
    case types.profileComplete: {
      return {
        ...state,
        hasBinding: success && payload.merchants.length > 0,
        merchants: success && payload.merchants || state.merchants
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
