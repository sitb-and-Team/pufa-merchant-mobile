import URL from '../constants/URL';
import {ofType} from 'redux-observable';
import { switchMap} from 'rxjs/operators';
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
      const {merchantNo, ...other} = payload;
      console.log(other);
      return execute({
        url: `${URL.payment}/trades/${merchantNo}?${urlArgs(other)}`,
        type: types.searchPaymentTradeComplete
      })
    }))
}
