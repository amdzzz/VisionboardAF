import { combineReducers } from "redux"
import { firebaseStateReducer } from 'react-redux-firebase'
import user from "./userReducer"

export default combineReducers({
  firebase: firebaseStateReducer,
  user,
})
