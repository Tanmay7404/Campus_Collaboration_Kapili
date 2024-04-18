import React from 'react';
import TextField from '@mui/material/TextField';

export default function TextBox ({fixed,state,onChange}){
    const style = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
            borderColor: "white"
            }
        },
    }
  
    const fixedstyle = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
            borderColor: "transparent"
            }
        },
    }

    return (
        <TextField fullWidth  className="fullWidth" size="small" sx={fixed?fixedstyle:style}
            value={state}
            onChange={(event) => {if(!fixed){onChange(event.target.value) }}}
            InputProps={{
                style: {
                    
                color: 'white', // Text color
                backgroundColor: fixed ? "#131313": '#3B3B3B',
                // Background color
                },
                placeholder:"Type here",
                readOnly: fixed?true:null
            }} // Change text color
            InputLabelProps={{ style: { color: 'gray' } }} // Change label color
            
        />
    );
}