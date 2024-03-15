import React from 'react'
import './tag.css'
import Eachtag from './eachtag.jsx';

function Tag({ onTagClick }) {
    const all_tags = [
      {name: "Programming Language",color: "green" ,tags: ['Java','Python','JavaScript','C#','PHP','Ruby','C++','Swift','Kotlin','Typescript']},
      {name: "Web Development",color: "orange" ,tags: ['React','Angular','Vue.js','Node.js','Django','Flask','Bootstrap','Wordpress','HTML5','CSS3']},
      {name: "App Development",color: "blue" ,tags: ['IOS dev','Android dev','React Native','Flutter']},
      {name: "Database Technologies",color: "purple" ,tags: ['Mysql','Postregresql','MongoDB','SQL Server','Firebase']},
      {name: "DevOps Cloud Computing",color: "yellow" ,tags: ['AWS','Azure','Google Cloud','Docker']},
      {name: "Machine Learning/AI",color: "violet" ,tags: ['TensorFlow','Pytorch','Keras','Scikit-Learn','NLP','Computer Vision']},
      {name: "CyberSecurity",color: "red" ,tags: ['Ethical Hacking','Cryptography','Network Security']},
      {name: "Design And UI/UX",color: "pink" ,tags: ['Figma','Adobe XD','Sketch','UX','UI']},
      {name: "Miscellaneous",color: "aqua" ,tags: ['Blockchain','IoT','AR','VR']}
    ]

  return (
    <div id='taglist'>
        {
          all_tags.map((element)=>{
            return (
            <div className="box" key = {element.name}>
            <div className="title">{element.name}</div>
            <div className="content">
                {
                  element.tags.map((ele)=>{
                    return(
                      <Eachtag skill={ele} color={element.color} changeTagList={() => onTagClick(ele)}/>
                    );
                  })
                }
              </div>
            </div>
            )
          })
        }
        
    </div>
  )
}

export default Tag
