import * as d from './actionTypes';

export const initialState = {
  loading: true,
  error: null,
  records: [],
  count: 0,
  range: 'N/A',
  trends: {
    daily: '',
    dailyAmount: 0,
    weekly: '',
    weeklyAmount: 0,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case d.LOADING:
      return {
        ...state,
        loading: true
      }

    case d.ERROR:
      return {
        ...state,
        loading: initialState.loading,
        error: action.error
      }

    case d.GET:
      return {
        ...state,
        loading: false,
        error: initialState.error,
        records: action.records,
        count: action.count
      };

    case d.GET_TRENDS:
      return {
        ...state,
        loading: false,
        error: initialState.error,
        trends: action.trends,
        range: action.range
      };

    default:
      return state
  }
};
