import { AUTH, LOGOUT, REGISTER } from "../Constants/authConstants"


const authReducer = (state={loginData:null}, action) => {
    switch (action.type) {
        case AUTH: {            
            localStorage.setItem('profile',JSON.stringify({...action.payload}))
            return {...state,loginData:{...action.payload}}
        }
        case LOGOUT: {
            localStorage.clear()
            return {...state,loginData:null}
        }
        case REGISTER: {
            return {...state, loginData:null}
        }
        default: return state
        
    }
}


export default authReducer;