import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import rootReducer from './root-reducer'  // this is the combined Reducers

const middlewares = [logger] // store expects middleware in Array format

// createStore accetps two arguments
// argv1 - rootReducer (the whole reducers combined)
// argv2 - applyMiddleware that accepts all middlewares that is spread as arguments

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store