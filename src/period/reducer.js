import * as p from './actionTypes';

export const initialState = {
  index: 2
};

export default (state = initialState, action) => {
  switch (action.type) {
    case p.SET:
      return { index: action.index }

    default:
      return state
  }
};
