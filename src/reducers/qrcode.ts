/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/20
 */
import compose from './composeReducer';

const DEFAULT_STATE = {
  processing: false
};

export default compose((state = DEFAULT_STATE, {type}) => {
  switch (type) {
    default:
      return state;
  }
}, DEFAULT_STATE);
