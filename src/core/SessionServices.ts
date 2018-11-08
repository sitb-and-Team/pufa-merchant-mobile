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
 * 获取当前操作员拥有的机构信息
 */
export function getAgencies() {
  const {agencies} = getOperator() || {agencies: []};
  return agencies;
}

/**
 * 获取机构权限
 * @returns {any}
 */
export function getAgencyRules() {
  const agencies = getAgencies();
  const merchantId = getMerchantId();
  // 默认为false
  let agency: any = false;
  if ((agencies && Array.isArray(agencies)) && merchantId) {
    agencies.forEach(agencyItem => {
      if (`${agencyItem.id}` === `${merchantId}`) {
        agency = agencyItem;
      }
    });
  }
  if (agency) {
    return agency.roles[0].rules;
  }
  // 清空机构id，并返回false
  resetAgencyId();
  return agency;
}

export function getAccessToken() {
  return sessionStorage.getItem(SessionKey.accessToken) || '';
}

export function setAccessToken(accessToken: string) {
  sessionStorage.setItem(SessionKey.accessToken, accessToken);
}

export function getMerchantId() {
  return sessionStorage.getItem(SessionKey.agencyId) || '';
}

export function setMerchantId(agencyId) {
  return sessionStorage.setItem(SessionKey.agencyId, `${agencyId}`);
}


// 清除当前选择的机构
export function resetAgencyId() {
  sessionStorage.removeItem(SessionKey.agencyId);
}

// 清除缓存
export function resetStorage() {
  // 清除操作员信息
  sessionStorage.removeItem(SessionKey.loginOperator);
  // 清除access token
  sessionStorage.removeItem(SessionKey.accessToken);
  resetAgencyId();
}
