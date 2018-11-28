/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/28
 */
import compose from './composeReducer';
import {settle as types} from '../constants/ActionTypes';

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
  const {payload, type} = action;
  switch (type) {
    case types.searchEnterAccount: {
      return {
        ...state,
        processing: true,
        searchParams: {
          ...state.searchParams,
          ...type === types.searchEnterAccount && payload
        }
      };
    }
    case types.searchEnterAccountComplete: {
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
    default:
      return state;
  }
}, DEFAULT_STATE);

