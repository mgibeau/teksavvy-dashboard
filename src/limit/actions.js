import ls from 'local-storage';
import * as l from './actionTypes';

export const setUsageLimit = (limit) => {
  return dispatch => {
    ls('limit', limit)

    return dispatch({ type: l.SET, limit })
  }
};
