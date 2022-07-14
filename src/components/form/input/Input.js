import {Grid, TextField} from "@mui/material"

const Input = ({id, name, type, value, label, handelChange}) => {
    return (
        <Grid item xs={12} marginBottom={2}>
            <TextField
              id={id}
              name={name}
              label={label}        
              value={value}      
              onChange={handelChange}
              type={type}   
              fullWidth  
            />
        </Grid>
    )    
}

export default Input