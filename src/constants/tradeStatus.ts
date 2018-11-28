/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/15
 */
/**
 * 交易状态类型
 */
import { lang } from '../locale/index';

// 操作类型select
export const tradeStatusOptions = {
  SUCCESS: lang.payment.success,
  FAILURE: lang.payment.failure,
  WAIT_PAYMENT: lang.payment.waitPayment,
  PROCESSING: lang.payment.processing,
  CLOSE: lang.payment.close,
  DELETE: lang.payment.delete
};
// 操作类型select-color
export const tradeStatusColorOptions = {
  SUCCESS: '#2b2',
  FAILURE: '#fb1122',
  WAIT_PAYMENT: '#f90',
  PROCESSING: '#0bb',
  CLOSE: '#888',
  DELETE: '#888'
};
