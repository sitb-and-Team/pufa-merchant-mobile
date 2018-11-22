/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */
import compose from './composeReducer';
import {payment as types} from '../constants/ActionTypes';

export interface StoreState {
  page: any;
  homePage: any;
  processing: boolean;
  searchParams: object;
}

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  homePage: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false,
  searchParams: {}
};

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, status} = action;
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
      let oldItem = state.page.content;
      let page = state.page;

      if (success && payload instanceof Object) {
        page = payload.payload;
        let content = payload.payload.content;
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

    case types.searchAppPaymentComplete: {

      return {
        ...state,
        homePage: (status === '0000' && payload instanceof Object) && payload || state.homePage,
        processing: false
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);

