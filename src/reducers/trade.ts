/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
import compose from './composeReducer';

const DEFAULT_STATE = {
  page: {
    last: true,
    content: [{
      id: 1,
      type: 'weChat'
    }, {
      id: 1,
      type: 'weChat'
    }, {
      id: 1,
      type: 'aliPay'
    }, {
      id: 1,
      type: 'aliPay'
    }, {
      id: 1,
      type: 'quickPay'
    }, {
      id: 1,
      type: 'quickPay'
    }]
  },
  searchParams: {},
  listLoading: true,
  processing: true,
  number: 0,
};

export default compose((state = DEFAULT_STATE, {type}) => {
  switch (type) {
    default:
      return state;
  }
}, DEFAULT_STATE);
