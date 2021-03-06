import {ofType} from 'redux-observable';
import {session as types} from '../constants/ActionTypes';
import {filter, switchMap, tap} from "rxjs/operators";
import {execute} from "../core/Request";
import URL from "../constants/URL";
import {resetStorage, saveOperator, setMerchantId} from '../core/SessionServices';

/**
 * 获取当前账户信息
 * @param action$
 * @returns {Observable<any>}
 */
export function startProfile(action$) {
  return action$.pipe(
    ofType(types.startProfile),
    switchMap(() => execute({
      url: `${URL.session}/me`,
      type: types.profileComplete
    })),
    tap((payload: any) => {
      if (payload.success) {
        saveOperator(payload.payload);
      }
    }))
}


/**
 * 存储机构id
 * @param action$
 * @returns {any}
 */
export function startMerchantId(action$) {
  return action$.pipe(
    ofType(types.startMerchantId),
    filter(({payload}) => {
      console.log('agencyId', payload);
      // 存储到缓存
      setMerchantId(payload);
      location.reload();
      return false;
    })
  );
}

/**
 * 退出
 * @param action$
 * @returns {any}
 */
export function startEntityExit(action$) {
  return action$.pipe(
    ofType(types.startEntityExit),
    tap(resetStorage),
    filter(() => {
      return false;
    })
  )
}
