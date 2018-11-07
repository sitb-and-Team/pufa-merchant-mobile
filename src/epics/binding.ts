import {ofType} from 'redux-observable';
import {binding as types} from '../constants/ActionTypes';
import {switchMap,mergeMap} from "rxjs/operators";
import {execute} from "../core/Request";
import URL from "../constants/URL";
import {urlArgs} from "@sitb/wbs/utils/HttpUtil";
import { merge, of } from 'rxjs/index';
import {getActions} from '../core/store';
import {routerPath} from "../core/router.config";

/**
 * 绑定用户
 * @param action$
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}) => execute({
      url: `${URL.binding}?${urlArgs(payload)}`,
      method: 'PUT',
      body: JSON.stringify(payload),
    })),
    /*mapTo(({
      type: types.queryComplete
    }))),*/
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.queryComplete
      })];
      // 成功发起query请求
      if (success) {
        getActions().navigator.navigate(routerPath.app);
      }
      return merge(...result);
  }))
}


/**
 * 发送验证码
 * @param action$
 */
export function sendVerificationCode(action$) {
  return action$.pipe(
    ofType(types.sendVerificationCode),
    switchMap(({payload}) => execute({
      url: `${URL.bindSend}?${urlArgs(payload)}`,
      type: types.sendVerificationCodeComplete
    })))
}

