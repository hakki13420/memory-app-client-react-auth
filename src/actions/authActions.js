import { AUTH, REGISTER } from '../Constants/authConstants'
import * as api from "../api"

export const register = (data, navigate) =>async(dispatch)=> {
    try {
        const res = await api.register(data)
        dispatch({
            type: REGISTER,                                    
        })
        navigate("/auth")
    } catch (error) {
        console.log(error)
    }
}

export const login = (data, navigate) =>async(dispatch)=> {
    
    try {
        const res = await api.login(data)
        console.log('data action',res)
        dispatch({
            type: AUTH,
            payload:res.data
        })
        navigate('/')
    } catch (error) {
        console.log(error)
    }

}