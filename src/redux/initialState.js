import {storage} from '@core/utilits';

const defaultState = {
  rowState: {},
  columnState: {}
};

export const initialState = storage('excel-state') ?
  storage('excel-state') :
  defaultState;
