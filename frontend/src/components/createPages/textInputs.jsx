import React from "react";
import TextBox from "./textfield";


export default function TextInputs ({name,state,setState, fixed,tp}){
    
    return (
        <div className="fillWidthDiv4">
            <div className="E-mail" >
                <p className="text_input" >{name}</p>
            </div>
            
            <TextBox fixed={fixed} state={state} onChange={setState} tp={tp} />
            
        </div>
    )
}