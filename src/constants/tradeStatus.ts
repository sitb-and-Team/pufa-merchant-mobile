/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/15
 */
/**
 * 比较操作符类型
 */
import { lang } from '../locale/index';

// 操作类型select
export const tradeStatusOptions = {
  SUCCESS: lang.payment.success,
  FAILURE: lang.payment.failure,
  WAIT_PAYMENT: lang.payment.waitPayment,
  PROCESSING: lang.payment.processing,
  CANCELLED: lang.payment.cancelled,
  REFUNDED: lang.payment.refunded,
  REFUNDED_PART: lang.payment.refundedPart,
  CLOSE: lang.payment.close,
  DELETE: lang.payment.delete
};
