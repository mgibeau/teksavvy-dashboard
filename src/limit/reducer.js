import ls from 'local-storage';
import * as l from './actionTypes';

export const initialState = ls('limit') || process.env.TSI_BANDWIDTH_LIMIT || 200;

export default (state = initialState, action) => {
  switch (action.type) {
    case l.SET:
      return action.limit || initialState

    default:
      return state
  }
};
