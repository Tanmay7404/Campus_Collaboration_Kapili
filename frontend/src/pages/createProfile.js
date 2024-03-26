import React from "react";
import Button from 'react-bootstrap/Button';
import './profilePage.css';
import { IoCloseOutline } from 'react-icons/io5'; 
import profileImage from '../assets/images/profile_pic.jpg'; // Import your profile image
import TextField from '@mui/material/TextField';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Box } from "@mui/material";
import  { useState, useEffect} from 'react';
import  {useParams,useNavigate} from 'react-router-dom'
import Axios from 'axios';

export default function CreateProfilePage() {
  const navigate = useNavigate();
  const {email,fullname} = useParams();
  const [formData, setFormData] = useState({
    username: "",
    fullname: fullname,
    email: email,
    department:"",
    instagramLink:"",
    githubLink:"",
    linkedinLink:"",
    appleLink:"",
    facebookLink:"",
    imageName:"",
    tags:[],

    bio: "",
    url:""
    // profilePictureUrl: "",
    // profilePictureFilename: "",
    // skills: [],
    // projects: [],
    // coursesCompleted: []
  });



  const deleteImageFromCloudinary = async (publicId) => {
    if(publicId==='')
    {
      window.alert('no image: ' );
      return
    }
    try {
      console.log('deleting image')
      const response = await fetch(`http://localhost:8080/image/deleteImage/`+publicId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }); 
      var data=await response.json()

      setpp(profileImage)
      setFormData({...formData,url:'',imageName:''})
      console.log(data);
      console.log('Image deletion response:', response.data);
      // Handle further actions after deletion (e.g., updating UI state)
    } catch (error) {

     window.alert('Error deleting image: ' );
      console.error('Error deleting image:');
      // Handle error scenario
    }
  };
  
  

  const uploadImage = (files) => {
    const formData1 = new FormData();
    formData1.append("file",files[0]);
    formData1.append("upload_preset","xgz5toim");

    Axios.post("https://api.cloudinary.com/v1_1/dxkhzuvmr/image/upload", formData1).then((res)=>{
      console.log(res.data.secure_url);
      console.log(res.data)
      setpp(res.data.secure_url);
      setFormData({
        ...formData,
        url: res.data.secure_url,
        imageName: res.data.public_id
      });

      
    });
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

    const style = {
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "white"
          }
        },
      
      
      }

      var [profilepic,setpp] = useState(profileImage);

      // const handleAddSkill = (skill) => {
      //   const newSkills = [...formData.skills, formData.skill];
      //   setFormData({ ...formData, skills: newSkills, skill: "" });
      // };

  return (
  <div class="createPage">
  
    <div class="contentPP" style={{overflowY:'auto'}}>
      <div className="fillWidthDiv">
        <Button style={{display:"flex",backgroundColor:"transparent",borderColor:"transparent",justifyContent:"center",display: 'flex', alignItems: 'center'}} className="close-icon">
          <IoCloseOutline size={32} style={{ color: 'white' }}/> 
        </Button>
      </div>

      <div className="fillWidthDiv2">
          <h3 style={{color:"white"}} className="editProfile" ><b>Create Profile</b></h3>
      </div>
      <div className="fillWidthDiv3">
        <div className="imageContainer">
          <img src={profilepic} alt="Profile" className="profile-image" />
        </div>
        <div className="buttonContainer" style={{paddingLeft:10}}>
          <div>
            <input type="file" id="fileInput" name="fileInput" hidden onChange={(event)=>{
              uploadImage(event.target.files)
            }}/>
            <label for="fileInput" variant="outline-dark" className="buttonHover" style={{ width: 200, height: 50, backgroundColor: 'black',display:'flex',justifyContent:'center',justifyItems:'center',alignItems: 'center' ,borderRadius:'10px',borderColor:'white' }}>
              <p  class="picture_upload"> Upload new Picture </p>
            </label>
          </div>
        </div>
        <div className="buttonContainer" style={{paddingLeft:20}} >
          <Button variant="outline-dark" onClick ={()=>{
            deleteImageFromCloudinary(formData.imageName); 
          }} className="buttonHover"  style={{ width: 200, height: 50, backgroundColor: 'black',display:'flex',justifyContent:'center',justifyItems:'center',alignItems: 'center' ,borderRadius:'10px' }}  >
            <p  class="picture_upload"> Remove Picture </p>
          </Button>
        </div>
      </div>
  
      <div className="E-mail" >
        <p style={{color:"white",fontSize:'1.05rem',paddingRight:'20px'}} >Full Name :</p>
        <p style={{color:"gray"}} >{fullname}</p>
      </div>
      <div className="space"></div>
      <div className="E-mail" >
        <p style={{color:"white",fontSize:'1.05rem',paddingRight:'20px'}} >Email :</p>
        <p style={{color:"gray"}} >{email}</p>
      </div>   
      <div className="space"></div>
      <div className="E-mail" >
          <p style={{color:"white",fontSize:'1.05rem'}} >Username</p>
      </div>
      <div className="textfield">
        <TextField fullWidth  id="fullWidth" size="small" sx={style}
          value={formData.username}
          onChange={(event) => setFormData({ ...formData, username: event.target.value })}
        InputProps={{
            style: {
                
              color: 'white', // Text color
              borderColor: 'white', // Border color
              backgroundColor: '#3B3B3B', 
            
              // Background color
            },
            placeholder:"Type here"
          }} // Change text color
        InputLabelProps={{ style: { color: 'gray' } }} // Change label color
        />
      </div>
      <div className="space"></div>
      <div className="space"></div>


      <div className="E-mail">
        <p style={{color:"white",fontSize:'1.05rem'}} >Department</p>
      </div>
      <div className="textfield">

        <TextField fullWidth  id="fullWidth" size="small"  sx={style}
        value={formData.department}
        onChange={(event) => setFormData({ ...formData, department: event.target.value })}
        InputProps={{
          style: {       
            color: 'white', // Text color
            borderColor: 'white', // Border color
            backgroundColor: '#3B3B3B', // Background color
          },
          placeholder:"Type here"
        }} // Change text color
        InputLabelProps={{ style: { color: 'gray' } }}/>
      </div>

      <div className="space"></div>
      <div className="space"></div>

      <div className="E-mail">
        <p style={{color:"white",fontSize:'1.05rem'}} >Bio</p>
      </div>
      <div className="textfield">

        <TextField fullWidth  id="fullWidth" size="small"  sx={style} multiline={true} 
        value={formData.bio}
        onChange={(event) => setFormData({ ...formData, bio: event.target.value })}

        InputProps={{
          style: {
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', // Background color
        },
        placeholder:"Type here"
        }} // Change text color
        InputLabelProps={{ style: { color: 'gray' } }}/>
      </div>

      <div className="space"></div>
      <div className="space"></div>


      <div className="E-mail" >
        <p style={{color:"white",fontSize:'1.05rem'}} className="editProfile">Skills</p>
      </div>

      <div className="textfield" >
        <div className="textfield" style={{padding:'20px',backgroundColor:"#131313",borderRadius: '10px 10px 0 0'}}  >
          <TextField  fullWidth id="fullWidth" size="small"  sx={style}
          InputProps={{
            style: { 
              color: 'white', // Text color
              backgroundColor: '#3B3B3B', 
              },
            placeholder:"Search Tags"
          }} // Change text color
          InputLabelProps={{ style: { color: 'gray' }}} // Change label color
          />
        </div>
      </div>
      <div className="blackbg" style={{height:"150px"  }}>
        <div style={{ backgroundColor:"#131313",width:"100%",paddingLeft:20, overflowY: "auto",height: "150px",borderRadius: '0 0 10px 10px'}}>
          <p style={{color:"white", backgroundColor:"#131313",width:"100%"}} className="editProfile">ab</p>
          <div style={{width:"100%"}}>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'green', '--button-border-color': 'green',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'pink', '--button-border-color': 'pink',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'red', '--button-border-color': 'red',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'yellow', '--button-border-color': 'yellow',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
          </div>
          <div style={{width:"100%"}}>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'green', '--button-border-color': 'green',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'pink', '--button-border-color': 'pink',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'red', '--button-border-color': 'red',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'yellow', '--button-border-color': 'yellow',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
          </div>
          <div style={{width:"100%"}}>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'green', '--button-border-color': 'green',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'pink', '--button-border-color': 'pink',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'red', '--button-border-color': 'red',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'yellow', '--button-border-color': 'yellow',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
          </div>
          <div style={{width:"100%"}}>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'green', '--button-border-color': 'green',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'pink', '--button-border-color': 'pink',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'red', '--button-border-color': 'red',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
            <Button variant="outline-primary" className="customButton" style={{width:80, marginRight: 10,'--button-color': 'yellow', '--button-border-color': 'yellow',backgroundColor:'transparent'}} size='sm' >
              abc
            </Button>
          </div>
        </div>
      </div>

      <div className="space"></div>
      <div className="E-mail">
        <div className="email1"><p style={{color:"gray"}} className="editProfile">Social Link Title</p></div>
        <div className="email2"><p style={{color:"gray"}} className="editProfile">URL</p></div>
      </div>
      <div className="name">


      <div className="email1" style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
      <p style={{ margin: 0,fontSize:'1.05rem' }}>LinkedIn</p>
      <i className="bi bi-linkedin" style={{ marginLeft: '8px',fontSize: '1.25rem' }}></i> 
      </div>

      <div className="email2">
        <TextField fullWidth id="fullWidth" size="small"  sx={style}
        value={formData.linkedinLink}
        onChange={(event) => setFormData({ ...formData, linkedinLink: event.target.value })}
        InputProps={{
          style: {
            color: 'white', // Text color
            borderColor: 'white', // Border color
            backgroundColor: '#3B3B3B', 
            // Background color
          },
          placeholder:"Type here"
        }} // Change text color
        InputLabelProps={{ style: { color: 'gray' } }} />
      </div>
    </div>
    <div className="space"></div>
    <div className="name">
    <div className="email1" style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
      <p style={{ margin: 0,fontSize:'1.05rem' }}>Instagram</p>
      <i className="bi bi-instagram" style={{ marginLeft: '8px',fontSize: '1.25rem' }}></i> 
      </div>
      <div className="email2"><TextField fullWidth id="fullWidth" size="small"  sx={style}
      value={formData.instagramLink}
      onChange={(event) => setFormData({ ...formData, instagramLink: event.target.value })}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }} /></div>
</div>
<div className="space">

</div>
<div className="name">
<div className="email1" style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
      <p style={{ margin: 0,fontSize:'1.05rem' }}>Github</p>
      <i className="bi bi-github" style={{ marginLeft: '8px',fontSize: '1.25rem' }}></i> 
      </div>
    <div className="email2"><TextField fullWidth id="fullWidth" size="small" 
     value={formData.githubLink}
     onChange={(event) => setFormData({ ...formData, githubLink: event.target.value })}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }}/></div>
</div>
<div className="space"/>

<div className="name">
<div className="email1" style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
      <p style={{ margin: 0,fontSize:'1.05rem' }}>Apple</p>
      <i className="bi bi-apple" style={{ marginLeft: '8px',fontSize: '1.25rem' }}></i> 
      </div>
    <div className="email2"><TextField fullWidth id="fullWidth" size="small" 
     value={formData.appleLink}
     onChange={(event) => setFormData({ ...formData, appleLink: event.target.value })}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }}/></div>
</div>
<div className="space"/>

<div className="name">
<div className="email1" style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
      <p style={{ margin: 0,fontSize:'1.05rem' }}>Facebook</p>
      <i className="bi bi-facebook" style={{ marginLeft: '8px',fontSize: '1.25rem' }}></i> 
      </div>
    <div className="email2"><TextField fullWidth id="fullWidth" size="small" 
     value={formData.facebookLink}
     onChange={(event) => setFormData({ ...formData, facebookLink: event.target.value })}
    InputProps={{
        style: {
            
          color: 'white', // Text color
          borderColor: 'white', // Border color
          backgroundColor: '#3B3B3B', 
         
          // Background color
        },
        placeholder:"Type here"
      }} // Change text color
     InputLabelProps={{ style: { color: 'gray' } }}/></div>
</div>
<div className="space">

</div>
<div className="space">

</div>


<div className="name">
<div className="buttonContainer" >
    

<Button variant="dark" className="buttonHover" style={{width:200, backgroundColor: 'black'}} onClick={handleSubmit} >
        Done
      </Button></div>
      </div>
      <div className="space">
</div>
<div className="space">
</div>
         </div>
         
</div>
  );
}