import { qrCode as types } from '../constants/ActionTypes';
import { ofType } from 'redux-observable';
import { switchMap} from 'rxjs/operators';
import { execute } from "../core/Request";
import URL from "../constants/URL";

/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: HJF(2283785225@qq.com)
 * date: 2018/11/20
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(() => execute({
      url: `${URL.qrCode}`,
      type: types.queryComplete
    })))
}
