import axios from 'axios'


const api=axios.create({baseURL:"http://127.0.0.1:5000/"})
api.interceptors.request.use((req) => {    
    if (localStorage.getItem('profile')) {        
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const getAllPosts = () => {
    return api.get("posts")
}

export const createPost = (data) => {    
    const config = {
        headers:{
            "content-type":"multipart/form-data"
        }
    }
    return api.post("posts", data, config)
}

export const removePost = (id) => {
    return api.delete("posts/"+id)
}

export const updatePost = (id, data) => {
    return api.put(`posts/${id}`, data)
}


export const likePost = (id) => {
    return api.post("posts/like/"+id)
}

// auth api actions


export const register = (data) => {    
    return api.post(`users/register`,data)
}

export const login = (data) => {
    return api.post(`users/auth`,data)
}