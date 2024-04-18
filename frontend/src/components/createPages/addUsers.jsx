import React from "react";
import { useState } from "react";
// import TextField from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import AddMoreButton from "./addMoreButton";


export default function AddUsers ({values2,setValues2}){
    
    const addTextField2 = () => {
        // console.log(values2);
        setValues2([...values2,""]); // Append a new object with name and link properties
        // console.log(values2);
    };
    const handleClear2=(index)=>{
        const newValues2 = values2.filter((_, indexes) => indexes !== index);   
        setValues2(newValues2);
    };
    const handleChange2 = (index, value) => {
        const newValues = [...values2];
        newValues[index] = value;
        setValues2(newValues);
        console.log(index);
    };
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

    
    <div className="fillWidthDiv4">
        <div className="E-mail" >
            <p className="text_input" >Add Collabolators</p>
        </div>
        
        {values2.map((value, index) => (
            <div  key = {index}>
            <TextField fullWidth  className="fullWidth" size="small" sx={(index==0)?fixedstyle:style}
                value={value} // Use value.link for the link field
                onChange={(e) => {if(index!=0)handleChange2(index, e.target.value)}} // Pass 'link' as the field parameter
                InputProps={{
                    style: {
                        
                    color: 'white', // Text color
                    backgroundColor: '#3B3B3B', 
                    // Background color
                    },
                    placeholder:"Enter User Name",
                    endAdornment: (
                        <IconButton onClick={()=>handleClear2(index) } size="small" sx={{visibility:(index)?"visible":"hidden"}}>
                             <ClearIcon  />
                        </IconButton>
                    ),
                }} // Change text color

                InputLabelProps={{ style: { color: 'gray' } }} // Change label color
            />
            </div>
        ))}
        
        <AddMoreButton text ="Add More Users" action ={addTextField2}/>
    </div>  
    );
}