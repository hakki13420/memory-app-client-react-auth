import React,{useState} from 'react'
import {Avatar, Box, Paper,Typography, Container, Grid, TextField, Button} from "@mui/material"
import styled from '@emotion/styled'
import { GoogleLogin } from '@react-oauth/google';
import decode from "jwt-decode"
//import { useGoogleLogin } from '@react-oauth/google'  //custom button
import {useDispatch} from 'react-redux'
import { AUTH } from '../../Constants/authConstants';
import { useNavigate } from 'react-router-dom'
import Input from './Input'
import {register,login} from "../../actions/authActions"
import "./style.css"


const HeaderLogin=styled("div")({
  display: "flex",
  flexDirection:'column',
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.6rem",
  gap: ".7rem",
  marginBottom: "1rem",
  padding:'1rem 1rem 0',
})

const initialState = {
  firstName:'',
  lastName: "",
  email: "",
  password: '',
  confirmPassword:""
}

const Auth = () => {
  const [haveCompte, setHaveCompte] = useState(true)
  const [formData, setFormData] = useState(initialState)
  const [showPw, setShowPw]=useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  //decode jwt
  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')); 

    return JSON.parse(jsonPayload);
  }

  const parseJwt2 = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
//end decode jwt
  
  const handelSuccess=(res)=>{
    try {
      const credential=decode(res.credential)
      const profile = {
        fullName: credential.name,
        email: credential.email,      
        picture:credential.picture
      }
      const data = {
        profile: profile,
        token:res.credential
      }
      dispatch({
        type: AUTH,
        payload:data
      })
      navigate('/')
  
    } catch (error) {
      console.log(error)
    }
    
  }
  const handelFailure=(error)=>{
    console.log(error)
  }
  

  const handelChange = (e) => {    
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const changeMode = () => {
    setHaveCompte(!haveCompte)
  }

  const handelSubmit = (e) => {
    e.preventDefault();
    !haveCompte?
    dispatch(login(formData,navigate))
    :dispatch(register(formData, navigate))
  }

  const showPassword = () => {
    setShowPw((prev)=>!prev)
  }

  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => console.log(tokenResponse),
  //   onError: error => console.log(error),
  //   flow: 'auth-code',    
  //  });

    return (
      <Container maxWidth="xs" sx={{marginTop:"2rem"}}>
        <Box mt={9} xs={12}>
          <Paper elevation={4}>                              
              <HeaderLogin>
                <Typography variant="h5" color="initial">
                  {haveCompte?"Login":"Register" }
                </Typography>
                <Avatar>              
                </Avatar>
              </HeaderLogin>
              <form onSubmit={handelSubmit}>
                <Grid container spacing={1} p={2}>
                {haveCompte ? (
                  <>
                  <Input  name="firstName"
                          type="text" 
                          label="firstName"
                          value={formData.firstName}
                          handelChange={handelChange}
                          autoFocus
                          half
                  />                                   
                  <Input  name="lastName"
                          type="text"  
                          label="lastName"
                          handelChange={handelChange}
                          value={formData.lastName}
                          fullWidth
                          half
                  />
                    
                  </>
                  )
                  :null                  
                }
                  <Input  name="email"
                          type="email"  
                          label="email"
                          handelChange={handelChange}
                          value={formData.email}
                          fullWidth
                  />
                  
                  <Input  name="password"
                          type={showPw?"text":"password"}  
                          label="password"
                          handelChange={handelChange}
                          value={formData.password}
                          fullWidth
                          showPassword={showPassword}
                />
                {
                  haveCompte ? (
                    <Input  name="confirmPassword"
                            type={showPw?"text":"password"}
                            label="confimr password"
                            handelChange={handelChange}
                            value={formData.ConfirmPassword}
                            fullWidth
                            showPassword={showPassword}
                      
                  />
                  ):null
                }
                
                <Grid item xs={12}>
                  <Button type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {!haveCompte?"Login":"Register"}  
                  </Button>                
                </Grid>            
                <Grid item xs={12}>                                    
                  <GoogleLogin                    
                    onSuccess={handelSuccess}
                    onError={handelFailure}
                    useOneTap
                  />
                  {/* custom button
                   <Button variant="contained"
                          color="primary"
                          onClick={login}
                          fullWidth
                  >
                    google  
                  </Button> */}
                </Grid>
                <Grid item xs={12}>
                  <Typography align="center" variant="body2" color="error" component="p" onClick={changeMode}>                  
                      {haveCompte?"I have already a compte login":"register now"}                  
                    </Typography>
                  </Grid>
              </Grid>
              </form>
          </Paper>
        </Box>
    </Container>
  )
}

export default Auth