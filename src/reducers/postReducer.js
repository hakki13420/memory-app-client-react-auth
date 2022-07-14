import {ALL_POSTS, CREATE,UPDATE, DELETE, LIKE} from '../Constants/postConstants'

const postReducer = (state = [], action) => {
    switch (action.type) {
        case ALL_POSTS: {
            return [...action.payload];
        }
        case CREATE: {
            return[...state, action.payload]
        }
        case DELETE: {
            return state.filter(post=>post._id!==action.payload)
        }
        case UPDATE: {            
            return state.map(post=>post._id===action.payload._id?action.payload:post)
        }
        case LIKE: {
            return state.map(post=>post._id===action.payload._id?action.payload:post)            
        }
        default: return state;
    }

}

export default postReducer