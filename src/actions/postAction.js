import * as api from '../api'
import {ALL_POSTS, CREATE, DELETE, UPDATE, LIKE} from '../Constants/postConstants'

export const getPosts = () => async (dispatch) => {
    try {
        const posts = await api.getAllPosts()                          
        dispatch({
            type: ALL_POSTS,
            payload: posts.data
        });
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (data) => async (dispatch) => {
    try {        
        const post = await api.createPost(data)       
        dispatch({
            type: CREATE,
            payload:post.data
        })
    } catch (error) {
        console.log(error)
    }
}

export const removePost = (id) =>async (dispatch)=> {
    try {        
        await api.removePost(id)
        dispatch({
            type: DELETE,
            payload:id  
        })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, data) =>async(dispatch)=> {
    try {
        const post = await api.updatePost(id, data)        
        dispatch({
            type: UPDATE,
            payload:post.data
        })
    } catch (error) {
    console.log(error)       
    }
}

export const likePostAction = (id, navigate) =>async (dispatch)=> {
    try {        
        const post = await api.likePost(id)
        if (post) {            
            dispatch({
                type: LIKE,
                payload: post.data
            })                
        } else {            
            navigate('/auth')
        }

    } catch (error) {
        console.log(error)
        navigate('/auth')
    }    
}