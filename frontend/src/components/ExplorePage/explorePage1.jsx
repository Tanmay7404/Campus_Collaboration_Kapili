import React from 'react';
import logoSVG from "../../Images/logo.svg";
import page1PNG from '../../Images/designe-page1.png';
const ExplorePg1 = () => {
    return (
    <div id="page1">
        <div id="page1-contain">
            <img src={logoSVG} id="big-logo" alt="" />
            <p>Unlock the power of collaboration. Create, manage, and share projects seamlessly with our intuitive platform. Empowering individuals and teams to bring ideas to life, together.</p>
        </div>

        <img src={page1PNG} id="page1-designe" alt="" />
        
    </div>
    );
};
  
export default ExplorePg1;