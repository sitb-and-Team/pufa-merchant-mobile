import URL from '../constants/URL';
import {ofType} from 'redux-observable';
import {map, switchMap} from 'rxjs/operators';
import {settle as types} from '../constants/ActionTypes';
import {execute} from '../core/Request';
import {urlArgs} from "@sitb/wbs/utils/HttpUtil";

/**
 * 查看交易信息
 * @param action$
 */
export function searchEnterAccount(action$) {
  return action$.pipe(
    ofType(types.searchEnterAccount),
    switchMap(({payload}: any) => {
      const {isLoadMore, ...other} = payload;
      return execute({
        url: `${URL.settle}?${urlArgs(other)}`,
        inputValue: isLoadMore
      })
    }),
    map((payload) => {
      return {
        type: types.searchEnterAccountComplete,
        payload: {
          ...payload
        }
      }
    })
  )
}
