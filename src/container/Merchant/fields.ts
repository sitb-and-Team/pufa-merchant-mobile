import {lang} from "../../locale";
import objectPath from 'object-path';
import ColumnUtil from "../../utils/ColumnUtil";

/**
 * 费率模板
 * @param prefixString
 */
export const rateTemplate: any = (prefixString) => [{
  label: lang[`${prefixString}`].value,
  value: `${prefixString}.value`,
  setValue: (rate, dataResource) => {
    const type = objectPath.get(dataResource, `${prefixString}.type`);
    return rate && (type && `${rate}${ColumnUtil.unitJudgment(type)}` || `${rate}元`)
  }
}, {
  label: lang[`${prefixString}`].min,
  value: `${prefixString}.min`,
  setValue: min => min && `${min}元`
}, {
  label: lang[`${prefixString}`].max,
  value: `${prefixString}.max`,
  setValue: max => max && `${max}元`
}];

