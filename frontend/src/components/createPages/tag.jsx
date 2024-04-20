import React from 'react'
import './tag.css'
import Eachtag from '../NavBar/eachtag';

function Tag({ onTagClick, tagList,offsets}) {
    // console.log(selectedSearch);
    
    const all_tags = [
      {
    groupname: "Programming Language",color: "#68B67E" ,tags: ['Java','Python','JavaScript','C#','PHP','Ruby','C++','Swift','Kotlin','TypeScript']},
          {
    groupname: "Web Development",color: "#B77269" ,tags: ['React','Angular','Vue.js','Node.js','Django','Flask','Bootstrap','WordPress','HTML5','CSS3']},
          {
    groupname: "Mobile Development",color: "#6569B6" ,tags: ['iOS Development','Android Development','React Native','Flutter']},
          {
    groupname: "Database Technologies",color: "#9375C4" ,tags: ['MySQL','PostgreSQL','MongoDB','SQL Server','Firebase']},
          {
    groupname: "DevOps and Cloud Computing",color: "#A5A760" ,tags: ['AWS (Amazon Web Services)','Azure','Google Cloud Platform','Docker']},
          {
    groupname: "Machine Learning / AI",color: "#68B5A2" ,tags: ['TensorFlow','PyTorch','Keras','Scikit-Learn','Natural Language Processing (NLP)','Computer Vision']},
          {
    groupname: "CyberSecurity",color: "#B44C4C" ,tags: ['Ethical Hacking','Cryptography','Network Security']},
          {
    groupname: "Design and UX/UI",color: "#A950B7" ,tags: ['Figma','Adobe XD','Sketch','User Experience (UX) Design','User Interface (UI) Design']},
          {
    groupname: "Miscellaneous Technologies",color: "#A1BB55" ,tags: ['Blockchain','Internet of Things (IoT)','Augmented Reality (AR)','Virtual Reality (VR)']}
    ]
    

  return (
    <div id='taglist' style={offsets}>
    {
      all_tags.map((element)=>{
        return (
        <div className="box" key = {element.groupname} >
          <div className="title">{element.groupname}</div>
          <div className="content">
            {
              element.tags.map((ele)=>{
                return(
                  <Eachtag skill={ele} selectedList={tagList} color={element.color} changeTagList={() => onTagClick({tagname: ele, color:element.color})}/>
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
