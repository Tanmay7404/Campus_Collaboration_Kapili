import React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
export default function TextBox ({fixed,state,onChange,tp}){
    const style = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
            borderColor: "white"
            }
        },
    }
   // const [inputState, setInputState] = useState(state);
    console.log(431,state,121)
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
                readOnly: fixed?true:null,
                multiline:tp === 'multiline' ? true : false
            }} // Change text color
            InputLabelProps={{ style: { color: 'gray' } }} // Change label color
            
        />
    );
}