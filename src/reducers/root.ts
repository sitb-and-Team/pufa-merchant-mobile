import compose from './composeReducer';
import { root } from '../constants/ActionTypes';
import { resetStorage } from '../core/SessionServices';

const DEFAULT_STATE = {};

export default compose((state = DEFAULT_STATE, {type}) => {
  switch (type) {
    case root.start:
      console.log('start reducers');
      return {
        ...state
      };
    case 'clear':
      // 清空浏览器缓存
      resetStorage();
      return {
        ...state
      };
    default:
      return state;
  }
}, DEFAULT_STATE);
