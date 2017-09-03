// import { applyMiddleware, createStore } from "redux"
// import { reactReduxFirebase } from 'react-redux-firebase'
// import thunk from "redux-thunk"
// import promise from "redux-promise-middleware"
// import { compose } from 'redux'
// import reducer from "./reducers/megaReducer"

// const middleware = applyMiddleware(promise(), thunk)

// // Firebase config
// const firebaseConfig = {
//     apiKey: "AIzaSyBohJQCqFznu3rhwYgRZUVtjJWz4dmg1u8",
//     authDomain: "dreamboard-af-83240.firebaseapp.com",
//     databaseURL: "https://dreamboard-af-83240.firebaseio.com",
//     storageBucket: "dreamboard-af-83240.appspot.com",
// }
// // react-redux-firebase options
// const config = {
//   userProfile: 'users', // firebase root where user profiles are stored
//   enableLogging: false, // enable/disable Firebase's database logging
// }


// export default compose(
//   reactReduxFirebase(firebaseConfig, config)
// )(createStore(reducer, middleware))

import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import makeRootReducer from './reducers'
import { browserHistory } from 'react-router'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config'
//import { version } from '../../package.json'
import { updateLocation } from './location'

export default (initialState = {}, history) => {
  // ======================================================
  // Window Vars Config
  // ======================================================
 // window.version = version

  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
//   if (__DEV__) {
//     const devToolsExtension = window.devToolsExtension
//     if (typeof devToolsExtension === 'function') {
//       enhancers.push(devToolsExtension())
//     }
//   }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      reactReduxFirebase(fbConfig, reduxConfig),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
//   store.unsubscribeHistory = browserHistory.listen(updateLocation(store))

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
