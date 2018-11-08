import URL from '../constants/URL';
import {ofType} from 'redux-observable';
import {switchMap} from 'rxjs/operators';
import {payment as types} from '../constants/ActionTypes';
import {execute} from '../core/Request';

/**
 * 查看交易信息
 * @param action$
 */
export function searchPaymentTrade(action$) {
  return action$.pipe(
    ofType(types.searchPaymentTrade),
    switchMap(({payload}) => {
      const {merchantNo} = payload;
      return execute({
        url: `${URL.payment}/trades/${merchantNo}`,
        type: types.searchPaymentTradeComplete
      })
    }))
}
