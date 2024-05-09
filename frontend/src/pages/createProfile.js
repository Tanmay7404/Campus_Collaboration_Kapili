import React from "react";
import './profilePage.css';
import  { useState} from 'react';
import  {useParams,useNavigate} from 'react-router-dom'

import ProfilePicAdd from "../components/createPages/ProfilePic";
import TextInputs from "../components/createPages/textInputs";
import SelectTags from "../components/createPages/selectTags";
import Starting from "../components/createPages/starting";
import TextBox from "../components/createPages/textfield";
import SubmitButton from "../components/createPages/submit";
import profileImage from '../assets/images/profile_image.jpg';


export default function CreateProfilePage() {

  var [username,setUS] = useState("");
  var [department,setDept] = useState("");
  var [bio,setBio] = useState("");
  var [linkedinLink,setLink] = useState("");
  var [instagramLink,setInsta] = useState("");
  var [githubLink,setGit] = useState("");
  var [facebookLink,setFace] = useState("");
  var [appleLink,setApple] = useState("");
  var [selectedTags, setSelectedTags] = useState([]);
  var [url,setURL] = useState(profileImage);
  var [imageName,setImgN] = useState('');

  
  const navigate = useNavigate();
  const {email,fullname} = useParams();
  
  const formData ={
    username: username,
    fullname: fullname,
    email: email,
    department:department,
    instagramLink:instagramLink,
    githubLink:githubLink,
    linkedinLink:linkedinLink,
    appleLink:appleLink,
    facebookLink:facebookLink,
    url:url,
    imageName:imageName,
    tags:selectedTags,
    bio: bio,
    // profilePictureUrl: "",
    // profilePictureFilename: "",
    // skills: [],
    // projects: [],
    // coursesCompleted: []
  };





  
  const handleSubmit = () => {
    // Assuming you have an API endpoint to send the data
    if(formData.username==='')
    {
      window.alert('username cannot be empty ' );
      return
    }
    
    console.log(formData)
    fetch('http://localhost:8080/user/addNewUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if(response.status==500){
        window.alert('UserName Already Exists. Choose a new one' );
      }
      else{
        navigate("/sucesslogin/"+formData.username)
      }
      
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error
    });
  };  
      // const handleAddSkill = (skill) => {
      //   const newSkills = [...formData.skills, formData.skill];
      //   setFormData({ ...formData, skills: newSkills, skill: "" });
      // };

  return (
  <div class="createPage">
  
    <div class="contentPP" >
      {/* <div className="fillWidthDiv">
        
      </div> */}

      <Starting text="Create Profile" navigate={navigate}/>
      
      <ProfilePicAdd profilepic={url} setpp={setURL} setImgN={setImgN} formData={formData} type={'profile'}/>
      
      <div className="fillWidthDiv">

        <TextInputs name="Full Name" state={fullname} fixed={true}/>
    
        <TextInputs name="Email" state={email} fixed={true}/>

      </div>

      <div className="fillWidthDiv">
        <TextInputs name="Username*" state={username} setState={setUS} fixed={false}/>

        <TextInputs name="Department" state={department} setState={setDept} fixed={false}/>
        </div>

      <TextInputs name="Bio" state={bio} setState={setBio} fixed={false}/>
      
      <SelectTags text = "Selected Skills" selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
     
      
      <div className="fillWidthDiv4" >
        <div className="E-mail">
          <p className="text_input" >Social Links</p>
        </div>
        <div className="fillWidthDiv">
          <div className = "fillWidthDiv5">
            <TextBox state = "LinkedIn" fixed={true}/>
            <i className="bi bi-linkedin" style={{fontSize: '1.25rem' }}></i>
          </div>
          <TextBox state = {linkedinLink} fixed={false} onChange={setLink} />
        </div>
        <div className="fillWidthDiv">
          <div className = "fillWidthDiv5">
            <TextBox state = "Instagram" fixed={true}/>
            <i className="bi bi-instagram" style={{fontSize: '1.25rem' }}></i>
          </div>
          <TextBox state = {instagramLink} fixed={false} onChange={setInsta} />
        </div>
        <div className="fillWidthDiv">
          <div className = "fillWidthDiv5">
            <TextBox state = "Github" fixed={true}/>
            <i className="bi bi-github" style={{fontSize: '1.25rem' }}></i>
          </div>
          <TextBox state = {githubLink} fixed={false} onChange={setGit} />
        </div>
        <div className="fillWidthDiv">
          <div className = "fillWidthDiv5">
            <TextBox state = "Apple" fixed={true}/>
            <i className="bi bi-apple" style={{fontSize: '1.25rem' }}></i>
          </div>
          <TextBox state = {appleLink} fixed={false} onChange={setApple} />
        </div>
        <div className="fillWidthDiv">
          <div className = "fillWidthDiv5">
            <TextBox state = "Facebook" fixed={true}/>
            <i className="bi bi-facebook" style={{fontSize: '1.25rem' }}></i>
          </div>
          <TextBox state = {facebookLink} fixed={false} onChange={setFace} />
        </div>
      </div>
      
      <SubmitButton text="Done" onClick={handleSubmit} /> 
    </div>
  </div>
  );
}