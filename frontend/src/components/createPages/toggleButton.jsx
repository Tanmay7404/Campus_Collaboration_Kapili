import React from "react";

const ToggleButton = ({text,val,changeVal}) => {

    const changeToggle = () => {
      // Toggle the ongoing value in the formData state
      changeVal(!val);
    };
    
    return (
        <div className="fillWidthDiv5" style={{justifyContent:"flex-start"}}>
            <div className="E-mail" >
                <p className="text_input">{text}</p>
            </div>
            <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" role="switch" 
                id="flexSwitchCheckDefault" checked={val} onChange={changeToggle} />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
            </div>
        </div>
    );
};

export default ToggleButton;