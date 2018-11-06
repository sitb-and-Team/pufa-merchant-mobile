/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/6
 */
import URL from '../constants/URL';
import { ErrorCode } from '../constants/ErrorCode';

export default () => next => action => {
  const {status} = action;
  // 1000状态码
  if (status === ErrorCode.UNAUTHORIZED) {
    console.log('用户授权不正确');
    // redirectUri目前平台地址，appUri后台登录地址
    location.href = `${URL.session}/auth-server?redirectUri=${encodeURIComponent(location.href)}&appUri=${URL.session}/access-token`;
    return next({
      type: 'clear'
    });
  }
  return next(action);
}
