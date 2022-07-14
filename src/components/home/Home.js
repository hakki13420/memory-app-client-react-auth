import React,{useState} from 'react'

import {Grow, Box, Grid} from "@mui/material"
import Form from '../form/Form'
import Posts from '../posts/Posts'

const Home = () => {
    const [selectedIndex, setSelectedIndex]=useState(0)
  return (
    <>        
            <Grow in>
                <Grid container  >
                    <Grid item xs={4}>
                        <Form   selectedIndex={selectedIndex}
                                setSelectedIndex={setSelectedIndex}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <Posts  selectedIndex={selectedIndex}
                                setSelectedIndex={setSelectedIndex}
                        />
                    </Grid>
                </Grid>            
                
            </Grow>
    </>
  )
}

export default Home