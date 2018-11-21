import URL from '../constants/URL';
import {ofType} from 'redux-observable';
import {map, switchMap} from 'rxjs/operators';
import {payment as types} from '../constants/ActionTypes';
import {execute} from '../core/Request';
import {urlArgs} from "@sitb/wbs/utils/HttpUtil";

/**
 * 查看交易信息
 * @param action$
 */
export function searchPaymentTrade(action$) {
  return action$.pipe(
    ofType(types.searchPaymentTrade),
    switchMap(({payload}: any) => {
      const {merchantNo, isHome, ...other} = payload;
      return execute({
        url: `${URL.payment}/trades/${merchantNo}?${urlArgs(other)}`,
        inputValue: isHome
      })
    }),
    map((payload) => {
      return {
        type: types.searchPaymentTradeComplete,
        payload: {
          ...payload
        }
      }
    })
  )
}

/**
 * 查看交易信息
 * @param action$
 */
export function searchAppPayment(action$) {
  return action$.pipe(
    ofType(types.searchAppPayment),
    switchMap(({payload}: any) => {
      const {merchantNo, ...other} = payload;
      return execute({
        url: `${URL.payment}/trades/${merchantNo}?${urlArgs(other)}`,
        type: types.searchAppPaymentComplete
      })
    }))
}
