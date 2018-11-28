import {lang} from "../../locale";
import objectPath from 'object-path';
import ColumnUtil from "../../utils/ColumnUtil";

/**
 * 费率模板
 * @param prefixString
 */
export const rateTemplate: any = (prefixString) => [{
  label: objectPath.get(lang, `${prefixString}.value`),
  value: `${prefixString}.value`,
  setValue: (rate, dataResource) => {
    const type = objectPath.get(dataResource, `${prefixString}.type`);
    return rate && (type && `${rate}${ColumnUtil.unitJudgment(type)}` || `${parseFloat(rate).toFixed(2)}元`)
  },
  color: ''
}, {
  label: objectPath.get(lang, `${prefixString}.min`),
  value: `${prefixString}.min`,
  setValue: min => min && `${parseFloat(min).toFixed(2)}元`,
  color: ''
}, {
  label: objectPath.get(lang, `${prefixString}.max`),
  value: `${prefixString}.max`,
  setValue: max => max && `${parseFloat(max).toFixed(2)}元`,
  color: ''
}];

