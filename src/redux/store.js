import { createStore, applyMiddleware } from 'redux'
// persistStore allows our browser to actually cache our store
// depending on certain configurations
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'

import rootReducer from './root-reducer'  // this is the combined Reducers

const middlewares = [] // store expects middleware in Array format

// check if env is development or production
// Create React App has the "NODE_ENV" to check your current running environment
// is in production or development
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}



// createStore accetps two arguments
// argv1 - rootReducer (the whole reducers combined)
// argv2 - applyMiddleware that accepts all middlewares that is spread as arguments

const store = createStore(rootReducer, applyMiddleware(...middlewares))

// this will create a peristing version of our "store"
/**
 * Now we are going to use the "store" and the "persistor" to create
 *  a new "Provider" that's wrapping our application
 */
 const persistor = persistStore(store)

export {store, persistor}