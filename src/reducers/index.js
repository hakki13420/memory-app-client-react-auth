import posts from './postReducer'
import auth from './authReducer'
import  {combineReducers}  from 'redux'

export default combineReducers({
    posts, auth
})