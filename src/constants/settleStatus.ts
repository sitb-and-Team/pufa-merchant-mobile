/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/28
 */
/**
 * 交易状态类型
 */
import { lang } from '../locale/index';

// 操作类型select
export const settleStatusOptions = {
  UNTREATED: lang.settle.unterated,
  SUCCESS: lang.settle.success,
  FAILURE: lang.settle.failure,
  PROCESSING: lang.settle.processing,
  EXCEPTION: lang.settle.exception,
  FULLREFUND: lang.settle.fullRefund
};
// 操作类型select-color
export const settleStatusColorOptions = {
  UNTREATED: '#888',
  FULLREFUND: '#888',
  SUCCESS: '#2b2',
  FAILURE: '#fb1122',
  PROCESSING: '#0bb',
  EXCEPTION: '#fb4'
};
