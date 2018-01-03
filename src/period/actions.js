import * as p from './actionTypes';

export const setPeriodIndex = (index) => {
  return dispatch => dispatch({ type: p.SET, index })
};
