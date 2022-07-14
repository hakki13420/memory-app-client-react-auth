import React,{useEffect} from 'react'
import {CircularProgress , Grid} from "@mui/material"

import Post from './post/Post';
import { getPosts } from "../../actions/postAction"
import {useDispatch, useSelector} from 'react-redux'
import styled from '@emotion/styled';



const Loading = styled('div')({
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width:"100%"
})

const Posts=({selectedIndex, setSelectedIndex})=>{
    const dispatch = useDispatch()
    const posts =useSelector(state=>state.posts)
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])    
    

    return (        
        <Grid container spacing={2} alignItems="stretch">                        
            {   
                !posts.length? <Loading><CircularProgress /></Loading>                   
                :posts.map(post => <Post key={post._id}                    
                                        id={post._id}
                                        title={post.title} 
                                        message={post.message}
                                        creator={post.creator}
                                        date_p={post.date_p}
                                        photo={post.photo}
                                        likeCount={post.likeCount}
                                        selectedIndex={selectedIndex}
                                        setSelectedIndex={setSelectedIndex}
                />)            
            }
        </Grid>        
    )
}

export default Posts