import {TABLE_RESIZE, CHANGE_TEXT} from '@/redux/types';


// Action Creator
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  };
}
