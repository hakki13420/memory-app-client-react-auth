import {TextField,Grid, InputAdornment, IconButton} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'


const Input = ({name, label, half, autoFocus, type, value, handelChange, showPassword}) => {
    return (
        <Grid item xs={12} sm={half?6:12}>
          <TextField
            name={name}
            label={label}
            value={value}
            onChange={handelChange}            
            type={type}    
            fullWidth    
            required                
            InputProps={name === "password" ?            
              { endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword}>
                    {
                    type === "password" ?
                      <VisibilityOffIcon />
                      :
                      <VisibilityIcon />
                    }
                  </IconButton>
                </InputAdornment>
                )
              }
              :null
            }          
          />
        </Grid>
    )
}

export default Input