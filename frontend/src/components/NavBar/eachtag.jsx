import React, { useState,useEffect } from 'react'
import './eachtag.css'


function Eachtag({skill,color, changeTagList, selectedList}) {
  const [selected, changeSelected] = useState(false);
  const divstyle = {
    border: `2px solid ${color}`,
    color: color,
  };
  const selectedStyle ={
    backgroundColor: `${color}`,
    color: "rgba(0, 0, 0, 0.9)"
  }
  useEffect(()=>{
    console.log(selectedList);
    if(selectedList.length!=0){
      const tagIndex = selectedList.findIndex(t => t.tagname === skill);
      if (tagIndex !== -1) {
        // Tag already exists, remove it from the list
        changeSelected(true);
      }
      else{
        changeSelected(false);
      }
    }
    else{
      changeSelected(false);
    }
  },[selectedList]);
  return (
    <div className="eachtag" style = {selected?selectedStyle:divstyle} onClick={changeTagList}>
        {skill}
    </div>
  )
}

export default Eachtag