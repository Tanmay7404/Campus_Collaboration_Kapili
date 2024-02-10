import React from 'react'
import './eachtag.css'

function Eachtag({skill,color}) {
  return (
    <div className={color}>
        {skill}
    </div>
  )
}

export default Eachtag