import {ofType} from 'redux-observable';
import {payment as types} from '../constants/ActionTypes';
import {switchMap} from "rxjs/operators";
import {execute} from "../core/Request";
import URL from "../constants/URL";


/**
 *  /me默认请求
 * @param action$
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(() => {
      return execute({
        url: `${URL.payment}/trade`,
        type: types.queryComplete
      });
    }))
}

