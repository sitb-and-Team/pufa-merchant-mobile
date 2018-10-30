import { trade as types } from '../constants/ActionTypes';
import { ofType } from 'redux-observable';
import { filter } from 'rxjs/operators';

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/30
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    filter(() => {
      console.log('app start.');
      return false;
    })
  );
}
