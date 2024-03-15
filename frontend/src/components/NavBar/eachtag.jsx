import React, { useState } from 'react'
import './eachtag.css'


function Eachtag({skill,color, changeTagList}) {
  const [selected, changeSelected] = useState(false);
  const divstyle = {
    border: `2px solid ${color}`,
    color: color,
  };
  const selectedStyle ={
    backgroundColor: `${color}`,
    color: "rgba(0, 0, 0, 0.9)"
  }
  const change = ()=>{
    changeSelected(!selected);
    changeTagList();
  }
  return (
    <div className="eachtag" style = {selected?selectedStyle:divstyle} onClick={change}>
        {skill}
    </div>
  )
}

export default Eachtag