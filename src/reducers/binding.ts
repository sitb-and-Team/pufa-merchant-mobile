/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/14
 */
import compose from './composeReducer';
import { binding as types } from '../constants/ActionTypes';

const DEFAULT_STATE = {
  /**
   * 验证码倒计时
   */
  countDown: 0
};

export default compose((state = DEFAULT_STATE, action) => {
  const {payload, type} = action;
  switch (type) {
    // 初始化倒计时时间
    case types.resetCountDown: {
      return {
        ...state,
        countDown: 60
      };
    }
    // 开始倒计时
    case types.startCountDown:
      return {
        ...state,
        countDown: payload
      };
    // 结束验证码，重置为60
    case types.countDownComplete: {
      return {
        ...state,
        countDown: 0
      }
    }
    default:
      return state;
  }
}, DEFAULT_STATE);
