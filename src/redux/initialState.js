import {storage} from '@core/utilits';
import {defaultStyles} from '@/constants';

const defaultState = {
  rowState: {},
  columnState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});

export const initialState = storage('excel-state') ?
  normalize(storage('excel-state')) :
  defaultState;
