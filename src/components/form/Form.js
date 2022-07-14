import React,{useEffect, useState} from "react"
import { Paper, Button, Container, Grid, Card, CardHeader, CardContent, Avatar, IconButton } from "@mui/material"
import Input from "./input/Input"
import { useDispatch, useSelector } from "react-redux"
import {createPost, updatePost} from '../../actions/postAction'

const Form = ({selectedIndex, setSelectedIndex}) => {
    const [post, setPost] = useState({
        title: "",
        message: "",
        creator: "",        
        photo: "",
        likeCount:0
    })
    const handelChange = (e) => {        
        setPost({...post,[e.target.name]:e.target.value})
    }
    const reset = () => {
        setPost({title: "",
        message: "",
        creator: "",
        date_p: "",
        photo: "",
        likeCount: 0
        })
        setSelectedIndex(0)
    }
    const dispatch=useDispatch()
    const handelSubmit = (e) => {
        e.preventDefault();

        const inputFile=document.getElementById('photo')
        const formData = new FormData();
        formData.append("photo",inputFile.files[0]);
        formData.append("title",post.title)
        formData.append("message",post.message)
        formData.append("creator",post.creator)        
        

        selectedIndex ?
        dispatch(updatePost(selectedIndex,formData))        
        : dispatch(createPost(formData))        
        reset()
    }

    const selectedPost = useSelector(state => state.posts.find(item => item._id === selectedIndex))
    useEffect(() => {
        if(selectedIndex) setPost(selectedPost)
    },[selectedIndex, selectedPost])
    
    return (
        <Container>
            <Paper elevation={3}>
            <Card sx={{padding:"0 10px"}}>
                <CardHeader                                    
                  title={selectedIndex?"Edit Memory":"Add Memory"}
                  subheader=""                  
                />
                <hr />
                <CardContent>
                    <form onSubmit={handelSubmit} encType="multipart/form-data">
                        <Container xs={12} maxWidth='lg' sx={{ padding: {xs:"0"}}}>
                                <Input name='title'
                                    id='title'
                                    type="text" 
                                    label="Title"
                                    value={post.title}
                                    handelChange={handelChange}
                            />
                            <Input  name='message'
                                    id='message'
                                    type="text" 
                                    label="Message"
                                    value={post.message}
                                    handelChange={handelChange}
                            />
                            
                            <Input name='creator'
                                    id='creator'
                                    type="text" 
                                    label="creator"
                                    value={post.creator}
                                    handelChange={handelChange}
                            />
                            <Button variant="contained" color="primary" component="label" fullWidth>
                                Upload
                                <input name='photo'
                                        type="file"                                     
                                        id='photo'
                                        onChange={(e) => setPost({
                                            ...post,
                                            photo:e.target.files[0].name
                                        })}
                                        hidden
                                />    
                                
                            </Button>
                            <span>{post.photo}</span>    
                                                  
                            <Grid item xs={12}>
                                <Button fullWidth variant='contained' type="submit" color='primary' sx={{ margin: "10px 0" }}>{ selectedIndex?"Update":"Submit"}</Button>
                                <Button fullWidth variant='contained' onClick={reset} color='error'>Reset</Button>
                            </Grid>                                                     
                        </Container>
                    </form>
                </CardContent>
            </Card>
            </Paper>
        </Container>
    )
}

export default Form