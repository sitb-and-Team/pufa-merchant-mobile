import {lang} from "../../locale";
import {BusinessTypeData} from "../../constants/BusinessType";
import {tradeStatusOptions} from "../../constants/tradeStatus";

const basic = [{
  label: lang.auditNumber,
  value: 'auditNumber'
}, {
  label: lang.settle.settleAmount,
  value: 'settleAmount',
  setValue: string => `${string} 元`
},  {
  label: lang.settle.realSettleAmount,
  value: 'realSettleAmount',
  setValue: string => `${string} 元`
}, {
  label: lang.settle.businessType,
  value: 'paymentRecord.businessType',
  setValue: string => `${BusinessTypeData[string]}`
}, {
  label: lang.settle.at,
  value: 'paymentRecord.paymentAt'
}, {
  label: lang.settle.status,
  value: 'status',
  setValue: string => `${tradeStatusOptions[string]}`
}];
export const configs = [{
  title: lang.enterAccountDetail,
  config: basic
}];
