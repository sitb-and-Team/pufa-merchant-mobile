/**
 * Copyright: Copyright (C) 2018 sitb.software,All Rights Reserved
 * author: yangyao(873241789@qq.com)
 * date: 2018/10/25
 */
const {api} = (global as any).config;

export default {
  setUrl: url => `${api}/${url}`,
  session: `${api}/session`,
  binding: `${api}/binding`,
  bindSend: `${api}/agency-check-value`,
  payment: `${api}/payment`
}
