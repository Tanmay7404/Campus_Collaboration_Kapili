import React from "react";
import Button from 'react-bootstrap/Button';

export default function SubmitButton ({text,onClick}){
    return (
        <div className="name">
            <div className="buttonContainer" >
                <Button variant="dark" className="buttonHover" style={{width:200, backgroundColor: 'black'}} onClick={onClick} >
                {text}
                </Button>
            </div>
        </div>
    );
}