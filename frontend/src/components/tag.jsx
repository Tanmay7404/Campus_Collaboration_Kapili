import React from 'react'
import './tag.css'
import Eachtag from './eachtag.jsx';

function Tag() {
    
    const programming=['Java','Python','JavaScript','C#','PHP','Ruby','C++','Swift','Kotlin','Typescript']
    const webd=['React','Angular','Vue.js','Node.js','Django','Flask','Bootstrap','Wordpress','HTML5','CSS3']

    const appd=['IOS dev','Android dev','React Native','Flutter']
    const database=['Mysql','Postregresql','MongoDB','SQL Server','Firebase']
    const devops=['AWS','Azure','Google Cloud','Docker']
    const mlai=['TensorFlow','Pytorch','Keras','Scikit-Learn','NLP','Computer Vision']

    const cyber=['Ethical Hacking','Cryptography','Network Security']
    const design=['Figma','Adobe XD','Sketch','UX','UI']
    const misc=['Blockchain','IoT','AR','VR']

  return (
    <div id='taglist'>
        <div className="box programming">
            <div className="title">Programming Languages</div>
            <div className="content">
                {
                  programming.map((element)=>{
                    return(
                        <Eachtag skill={element} color='green'/>
                    );
                  })
                }
            </div>
        </div>
        <div className="box webd">
            <div className="title">Web Development</div>
            <div className="content">
               {
                  webd.map((element)=>{
                    return(
                        <Eachtag skill={element} color='orange'/>
                    );
                  })
                }
            </div>
        </div>
        <div className="box appd">
            <div className="title">App Development</div>
            <div className="content">
                {
                  appd.map((element)=>{
                    return(
                        <Eachtag skill={element} color='blue'/>
                    );
                  })
                }
            </div>
        </div>
        <div className="box database">
            <div className="title">Database Technologies</div>
            <div className="content">
                {
                  database.map((element)=>{
                    return(
                        <Eachtag skill={element} color='purple'/>
                    );
                  })
                }
            </div>
        </div>
        <div className="box devops">
            <div className="title">DevOps Cloud Computing</div>
            <div className="content">
                {
                  devops.map((element)=>{
                    return(
                        <Eachtag skill={element} color='yellow'/>
                    );
                  })
                }
            </div>
        </div>
        <div className="box mlai">
            <div className="title">Machine Learing/ AI</div>
            <div className="content">
                {
                  mlai.map((element)=>{
                    return(
                        <Eachtag skill={element} color='green'/>
                    );
                  })
                }
            </div>
        </div>
        <div className="box cyber">
            <div className="title">Cybersecurity</div>
            <div className="content">
                {
                  cyber.map((element)=>{
                    return(
                        <Eachtag skill={element} color="red"/>
                    );
                  })
                }
            </div>
        </div>
        <div className="box design">
            <div className="title">Design and UI/UX</div>
            <div className="content">
                {
                  design.map((element)=>{
                    return(
                        <Eachtag skill={element} color='pink'/>
                    );
                  })
                }
            </div>
        </div>
        <div className="box misc">
            <div className="title">Misc</div>
            <div className="content">
               {
                  misc.map((element)=>{
                    return(
                        <Eachtag skill={element} color='yellow'/>
                    );
                  })
                }
            </div>
        </div>
    </div>
  )
}

export default Tag
