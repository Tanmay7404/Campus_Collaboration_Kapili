import React from "react";
import { useState } from "react";
// import TextField from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import AddMoreButton from "./addMoreButton";


export default function Links ({values2,setValues2, text}){
    
    const addTextField2 = () => {
        // console.log(values2);
        setValues2([...values2, { name: '', link: '' }]); // Append a new object with name and link properties
        // console.log(values2);
    };
    const handleClear2=(index)=>{
        const newValues2 = values2.filter((_, indexes) => indexes !== index);   
        setValues2(newValues2);
    };
    const handleChange2 = (index, field, value) => {
        const newValues = [...values2];
        newValues[index][field] = value;
        setValues2(newValues);
    };
    const style = {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
            borderColor: "white"
            }
        },
    }
    return (

    
    <div className="fillWidthDiv4">
        <div className="E-mail" >
            <p className="text_input" >{text}</p>
        </div>

        {values2.map((value, index) => (
            <div key={index} className="fillWidthDiv">
            <TextField fullWidth  className="fullWidth" size="small" sx={style}
                value={value.name} // Use value.name for the name field
                onChange={(e) => handleChange2(index, 'name', e.target.value)} // Pass 'name' as the field parameter
                InputProps={{
                    style: {
                        
                    color: 'white', // Text color
                    backgroundColor: '#3B3B3B',
                    // Background color
                    },
                    placeholder:"Name"
                }} // Change text color
                InputLabelProps={{ style: { color: 'gray' } }} // Change label color
            />
            <TextField fullWidth  className="fullWidth" size="small" sx={style}
                value={value.link} // Use value.link for the link field
                onChange={(e) => handleChange2(index, 'link', e.target.value)} // Pass 'link' as the field parameter
                InputProps={{
                    style: {
                        
                    color: 'white', // Text color
                    backgroundColor: '#3B3B3B',
                    // Background color
                    },
                    placeholder:"Link",
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
        
        <AddMoreButton text ="Add More Links" action ={addTextField2}/>
    </div>  
    );
}