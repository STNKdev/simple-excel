import {storage} from '@core/utilits';

const defaultState = {
  rowState: {},
  columnState: {},
  dataState: {},
  currentText: ''
};

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState;
