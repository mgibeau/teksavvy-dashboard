import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Limit from './limit'
import Period from './period'
import Summary from './summary'
import Details from './details'

const initialState = {
  limit: Limit.initialState,
  period: Period.initialState,
  summary: Summary.initialState,
  details: Details.initialState
}
const enhancers = []
const middleware = [
  thunk
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  combineReducers({
    limit: Limit.reducer,
    period: Period.reducer,
    summary: Summary.reducer,
    details: Details.reducer
  }),
  initialState,
  composedEnhancers
)

export default store
