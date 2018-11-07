import { ofType } from 'redux-observable';
import { session as types } from '../constants/ActionTypes';
import { switchMap } from "rxjs/operators";
import { execute } from "../core/Request";
import URL from "../constants/URL";

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
    })))
}
