import SessionKey from '../constants/SessionKey';

/**
 * 保存操作员信息
 * @param operator 操作员信息
 */
export function saveOperator(operator) {
  sessionStorage.setItem(SessionKey.loginOperator, JSON.stringify(operator));
}

/**
 * 获取登陆操作员信息
 */
export function getOperator() {
  const operatorStr = sessionStorage.getItem(SessionKey.loginOperator);
  if (operatorStr) {
    return JSON.parse(operatorStr);
  }
  return null;
}

/**
 * 获取当前操作员信息
 * @param operator    操作员list
 * @param merchantId  当前商户id
 */
export function nowOperator(operator, merchantId) {
  // 判断operator
  const operators = (operator && Object.keys((operator.merchants).length !== 0)) && operator;
  // 获取当前商户信息
  return operators && operator.merchants.find(merchant => merchant.merchantNo === merchantId) || {};
}


export function getAccessToken() {
  return sessionStorage.getItem(SessionKey.accessToken) || '';
}

export function setAccessToken(accessToken: string) {
  sessionStorage.setItem(SessionKey.accessToken, accessToken);
}

export function getMerchantId() {
  return sessionStorage.getItem(SessionKey.merchantId) || '';
}

export function setMerchantId(agencyId) {
  return sessionStorage.setItem(SessionKey.merchantId, `${agencyId}`);
}


// 清除当前选择的机构
export function resetMerchantId() {
  sessionStorage.removeItem(SessionKey.merchantId);
}

// 清除缓存
export function resetStorage() {
  // 清除操作员信息
  sessionStorage.removeItem(SessionKey.loginOperator);
  // 清除access token
  sessionStorage.removeItem(SessionKey.accessToken);
  resetMerchantId();
}
