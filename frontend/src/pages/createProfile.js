import React, { useEffect } from "react";
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

  const {param1,param2} = useParams();

  var [edit,setEdit] = useState(false);
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
  var [email,setEmail] = useState("");
  var [fullname,setFN] = useState("");
  var[id,setId] = useState('');
  
  const navigate = useNavigate();
  
  
  var formData ={
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
    id: id
    // profilePictureUrl: "",
    // profilePictureFilename: "",
    // skills: [],
    // projects: [],
    // coursesCompleted: []
  };


  useEffect(()=>{
    console.log(formData);
  },[formData]);
  
  useEffect(()=>{
    async function getuserData(){
      console.log(param2,param1);
      if(!param2){
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) 
        {
            navigate("/login")
        }
        setEdit(true);
        setUS(loggedInUser);
        fetch('http://localhost:8080/user/editUserData/'+loggedInUser, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( async(res) => {
          if(res.status==500){
            throw new Error (res.message);
          }
          else{
            var data = await res.json();
            setId(data.id);
            setUS(data.username);
            setDept(data.department);
            setBio(data.bio);
            setLink(data.linkedinLink);
            setInsta(data.instagramLink);
            setGit(data.githubLink);
            setFace(data.facebookLink);
            setApple(data.appleLink);
            setFN(data.fullname);
            setEmail(data.email);
            setURL (data.url);
            setImgN(data.imageName);
            setSelectedTags(data.tags);
          }
        }).catch((error) => {
          console.error('Error:', error);
        
        });
  
      }
      else{
        setEmail(param1);
        setFN(param2);
      }
    }
    getuserData();
  },[]);



  
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
          console.log(edit);
          if(edit){
            navigate("/profile/"+username);
          }
          else{
            navigate("/sucesslogin/"+formData.username)
          }
          
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
  <div className="createPage">
  
    <div className="contentPP" >
      {/* <div className="fillWidthDiv">
        
      </div> */}

      <Starting text="Create Profile" navigate={navigate}/>
      
      <ProfilePicAdd profilepic={url} setpp={setURL} imgN = {imageName}setImgN={setImgN} type={'profile'} />
      
      <div className="fillWidthDiv">

        <TextInputs name="Full Name" state={fullname} fixed={true}/>
    
        <TextInputs name="Email" state={email} fixed={true}/>

      </div>

      <div className="fillWidthDiv">
        <TextInputs name="Username" state={username} setState={setUS} fixed={false}/>

        <TextInputs name="Department" state={department} setState={setDept} fixed={false}/>
        </div>

      <TextInputs name="Bio" state={bio} setState={setBio}  fixed={false} tp={"bio"}/>
      
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