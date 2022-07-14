import './App.css'
import React,{useState} from 'react'
import NavBar from './components/navbar/NavBar'
import {Container, Box} from "@mui/material"
import Home from './components/home/Home'
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Auth from './components/auth/Auth'
import { GoogleOAuthProvider } from '@react-oauth/google';

const App =()=>{    
    return (
        <GoogleOAuthProvider
                clientId="741301665227-eeeh2p5ebfaqt83b3ojjj75vaulbk8vv.apps.googleusercontent.com"
        >
        <BrowserRouter>
            <Container maxWidth="lg">        
                <NavBar />    
                <Box sx={{ marginTop: "80px" }}></Box>            
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/auth" element={<Auth />}></Route> 
                </Routes>
            </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App