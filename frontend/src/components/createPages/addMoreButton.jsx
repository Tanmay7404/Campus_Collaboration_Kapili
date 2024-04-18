import React from "react";
import Button from 'react-bootstrap/Button';

export default function AddMoreButton ({action,text}){
    return (
        <div className="E-mail" >
            <Button onClick={action}className="box" variant="dark" style={{  height: 25, width: 25, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2 >+</h2>
            </Button>
            <p style={{color:"white",marginLeft:10}} className="editProfile">{text}</p>
        </div>
    )
}