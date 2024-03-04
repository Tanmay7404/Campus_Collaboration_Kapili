import React from 'react';
import './profile.css';

const Project = ({projects}) => {
    const listproject = projects.map((element) => {
        return (
          <div className="project" key={element.id}>
            <div id="like-div">
              <img src="./Images/like.svg" id="like" alt="" />
              <span>{element.likes}</span>
            </div>
            <div id="contri">
                        {element.contributors.map((contributor, index) => (
                            <img key={index} src={contributor} alt={`Contributor ${index + 1}`} />
                        ))}
            </div>
            <img src={element.projectImage} className="www" alt={element.title} />
            <p>{element.title}</p>
          </div>
        );
      });
    return (
            <>
            
            
            <div id="projects">

            <div id="upload">
                <div>
                    <div id="circle">
                        <img src="./Images/plus-1512-svgrepo-com.svg" alt="" />
                    </div>
                    <p>Create</p>
                </div>
            </div>

            {listproject}

            </div>

            </>
    );
};

export default Project;