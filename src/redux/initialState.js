import {defaultStyles, defaultTitle} from '@/constants';
import {clone} from '@core/utilits';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  columnState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
