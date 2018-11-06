import {ofType} from 'redux-observable';
import {session as types} from '../constants/ActionTypes';
import {switchMap} from "rxjs/operators";
import {execute} from "../core/Request";
import URL from "../constants/URL";

export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(() => execute({
      url: `${URL.session}/me`,
      type: types.queryComplete
    })))
}
