import React, { useState, useEffect } from 'react'
import {useDispatch}  from "react-redux"
import styled from '@emotion/styled'
import {AppBar,Avatar,Button, Container, Toolbar, Typography} from '@mui/material'
import {Link, useNavigate, useLocation} from "react-router-dom"
import { LOGOUT } from '../../Constants/authConstants'
import "./styles.css"

const LoginArea = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 2rem",
  gap:"20px"  
})

const Nav = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding:"0 2rem",
})


const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()


  const logout = () => {
    dispatch({
      type: LOGOUT,      
    })  
    navigate("/")
    setUser(null)
  }  

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")))
  },[location])


    return (
        <>
            <Container>
              <AppBar position="fixed" color="primary">                
                <Nav>
                  <Toolbar>
                    <Typography className="logo" to='/' variant="h6" component={Link}>
                      DCWTlemcen
                    </Typography>
                  </Toolbar>                  
                  <LoginArea>                    
                    {user ? (
                      <>
                        <Avatar alt={user.profile.fullName} src={user.profile.picture} />
                        <Typography variant="h6" color="initial">{user.profile.fullName }</Typography>
                        <Button variant="contained"
                              color="success"                              
                              onClick={logout}
                      >
                        Logout
                        </Button>    
                      </>
                      
                      )
                  : <Button variant="contained"
                              color="success"
                              component={Link}
                              to="auth"
                      >
                        Login
                      </Button>
                    }
                  </LoginArea>
                  </Nav>  
                </AppBar>
            </Container>
        </>
    )
}

export default NavBar