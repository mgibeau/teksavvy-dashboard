import * as s from './actionTypes';

export const initialState = {
  loading: true,
  error: null,
  records: [],
  count: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case s.LOADING:
      return {
        ...state,
        loading: true
      }

    case s.ERROR:
      return {
        ...state,
        loading: initialState.loading,
        error: action.error
      }

    case s.GET:
      return {
        loading: false,
        error: initialState.error,
        records: action.records,
        count: action.count
      };

    default:
      return state
  }
};
