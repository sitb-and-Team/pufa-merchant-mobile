/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */
import compose from './composeReducer';
import {payment as types} from '../constants/ActionTypes';

const keyMap = {
  AliPay_PAY: 'aliPay',
  POS_PAY_DIRECT: 'posPayDirect',
  POS_PAY_INDIRECT: 'posPayIndirect',
  UNION_PAY: 'unionPay',
  WeChat_PAY: 'weChatPay'
};

const defaultStats = {totalElements: 0, totalAmount: 0};

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  homePage: {
    content: []
  },
  aliPay: defaultStats,
  weChatPay: defaultStats,
  unionPay: defaultStats,
  posPayDirect: defaultStats,
  posPayIndirect: defaultStats,
  processing: false,
  searchParams: {}
};

export default compose((state = DEFAULT_STATE, action) => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, success} = action;
  switch (type) {
    case types.searchPaymentTrade: {
      return {
        ...state,
        processing: true,
        searchParams: {
          ...state.searchParams,
          ...type === types.searchPaymentTrade && payload
        }
      };
    }
    case types.searchPaymentTradeComplete: {
      const {success, inputValue = false, paymentAt} = payload;
      let content: any = state.page.content;
      let page = state.page;

      if (success && payload instanceof Object) {
        page = payload.payload;
        let oldItem = payload.payload.content;
        if (inputValue && !paymentAt) {
          content.push(...oldItem);
          page = {
            ...payload.payload,
            content
          }
        }
      }
      return {
        ...state,
        page,
        processing: false
      };
    }
    // 获取统计信息start
    case types.searchStats:
      return {
        ...state,
        processing: true
      };
    // 获取统计信息end
    case types.searchStatsComplete: {
      const result = {
        ...state,
        processing: false
      };

      if (success) {
        Object.keys(payload).forEach(key => {
          result[keyMap[key]] = payload[key]
        })
      }
      return result;
    }

    default:
      return state;
  }
}, DEFAULT_STATE);

