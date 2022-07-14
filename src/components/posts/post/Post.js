import { Paper, Grid, Card, CardHeader, CardMedia, Typography, CardContent, CardActions, Avatar, IconButton }  
        from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment'
import styled from "@emotion/styled";
import { useDispatch } from 'react-redux'
import { removePost, likePostAction } from '../../../actions/postAction'
import {useNavigate} from 'react-router-dom'
const url="http://127.0.0.1:5000/"


const Post = ({id, title, message, creator, date_p,photo, likeCount ,selectedInsex, setSelectedIndex})=>{

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const StyledBox = styled("div")({
    padding :"1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems:'center'
  })
  
  const ButtonArea = styled('div')({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  })
  
  const deletePost = (id) => {
    if (window.confirm("areyou sure?")) dispatch(removePost(id))
  }

  const editPost = (id) => {    
    setSelectedIndex(id);
  }

  const likePost = (id) => {
    dispatch(likePostAction(id, navigate))
  }

  return (     
      
    <Grid item xs={12} sm={6}>
      <Paper elevation={3}>
        <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="">
                  
                </Avatar>
              }
              action={
                
                  JSON.parse(localStorage.getItem('profile')) ?                
                    (<IconButton onClick={()=>editPost(id)}>
                      <MoreVertIcon />
                    </IconButton>
                    ):null
                
              }
              title={title}
              subheader={creator}
              
            />
          <CardMedia  title="photo"
                      image={`${url}${photo}`}
                      component="img"             
          />
            <StyledBox>
              <Typography variant="body1" color="initial">
                {creator}
              </Typography>
              <Typography variant="body1" color="initial">
                {moment(date_p).fromNow()}
              </Typography>
            </StyledBox>
            <CardContent sx={{ maxHeight:"50px" , height:'50px', overflow:"hidden"}}>
                <Typography variant="body" color="initial" >
                    {message}
                </Typography>
            </CardContent>

          <CardActions>
            <ButtonArea>
                <IconButton onClick={()=>likePost(id)}>
                    <ThumbUpAltIcon/>
                    &nbsp; {likeCount}
              </IconButton>
              {
                JSON.parse(localStorage.getItem("profile"))?
                  (<IconButton onClick={()=>deletePost(id)}>
                        <DeleteIcon/>
                  </IconButton>
                  ):null
              }
            </ButtonArea>
          </CardActions>

        </Card>
      </Paper>
      </Grid>
    )
}

export default Post