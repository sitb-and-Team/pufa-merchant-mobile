/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/11/14
 */
import alert from '../component/Alert';
import { statusCode } from '../locale/zh-cn';

export default ({successTip = true, errorTip = true} = {}) => args => {
  const {status} = args;
  if (status === '0000') {
    successTip && alert(statusCode[status]);
  } else if (errorTip) {
    errorTip && alert(statusCode[status]);
  }
}
