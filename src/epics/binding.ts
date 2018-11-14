import { ofType } from 'redux-observable';
import { binding as types } from '../constants/ActionTypes';
import { mergeMap, switchMap } from "rxjs/operators";
import { execute } from "../core/Request";
import URL from "../constants/URL";
import { urlArgs } from "@sitb/wbs/utils/HttpUtil";
import { merge, of } from 'rxjs/index';
import { getActions, getState } from '../core/store';
import { map, tap } from 'rxjs/internal/operators';
import actionToast from '../core/actionToast';

/**
 * 绑定用户
 * @param action$
 */
export function startQuery(action$) {
  return action$.pipe(
    ofType(types.startQuery),
    switchMap(({payload}: any) => {
      let newPayload = Object.assign({}, payload);
      const {merchantNo, checkValue} = newPayload;
      return execute({
        url: `${URL.binding}/${merchantNo}`,
        method: 'PUT',
        body: JSON.stringify({checkValue}),
      })
    }),
    tap(actionToast()),
    mergeMap((payload: any) => {
      const {success} = payload;
      const result = [of({
        ...payload,
        type: types.queryComplete
      })];
      // 成功发起query请求
      if (success) {
        // 重置验证码、获取商户信息
        getActions().binding.countDownComplete();
        getActions().session.startProfile();
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
    switchMap(({payload}: any) => execute({
      url: `${URL.bindSend}?${urlArgs(payload)}`
    })),
    tap(actionToast()),
    map(({success}) => {
      if (success) {
        // 重置验证码为60秒
        getActions().binding.resetCountDown();
        let timer = setInterval(() => {
          // 获取倒计时
          let countDown = getState().binding.countDown;

          // 为0时清空定时器
          if (countDown === 0) {
            clearInterval(timer);
            getActions().binding.countDownComplete();
            return;
          }
          // 读秒
          getActions().binding.startCountDown(countDown - 1);
        }, 1000);
      }
      return ({
        type: types.sendVerificationCodeComplete
      });
    })
  )
}

