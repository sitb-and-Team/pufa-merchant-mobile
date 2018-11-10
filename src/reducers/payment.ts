/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/9/13
 */
import compose from './composeReducer';
import { payment as types } from '../constants/ActionTypes';

export interface StoreState {
  page: any;
  processing: boolean;
  searchParams: object;
}

const DEFAULT_STATE = {
  page: {
    content: [],
    size: 10,
    totalElements: 0
  },
  processing: false,
  searchParams: {}
};

export default compose((state = DEFAULT_STATE, action): StoreState => {
  // type是动作类型，payload是发送请求的其他参数
  const {payload, type, status, success} = action;
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
      const {content} = payload;
      const oldItem: any = state.page.content;
      if (success === true){
        content.push(...oldItem)
      }

      return {
        ...state,
        page: (status === '0000' && payload instanceof Object) && payload || state.page,
        processing: false
      };
    }
    default:
      return state;
  }
}, DEFAULT_STATE);

