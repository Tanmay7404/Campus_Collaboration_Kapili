import React from "react";
import './profilePage.css';
import  { useState, useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import Starting from "../components/createPages/starting";
import ProfilePicAdd from "../components/createPages/ProfilePic";
import TextInputs from "../components/createPages/textInputs";
import SelectTags from "../components/createPages/selectTags";
import Links from "../components/createPages/links";
import AddUsers from "../components/createPages/addUsers";
import SubmitButton from "../components/createPages/submit";
import DemoUpload from "../components/createPages/demoUpload";
import profileImage from '../assets/images/course_image.jpg';
import Difficulty from "../components/createPages/difficulty";

export default function CreateCoursePage() {

  var [values, setValues] = useState([""]); // Initial state with one empty string for collaboratos
  var [values2, setValues2] = useState([{ name: '', link: '' }]);
  var [courseTitle,setCtitle] = useState("");
  var [courseDesc,setCdesc] = useState("");
  var [selectedTags, setSelectedTags] = useState([]);
  var [demolinks,setDemo] = useState([]);
  var [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  var [url,setURL] = useState(profileImage);
  var [imageName,setImgN] = useState('');
  var [id,setId] = useState("");
  const navigate=useNavigate()

  var {cname} = useParams()

  const formData = {
    id:id,
    title: courseTitle,
    description: courseDesc,
    tags: selectedTags,
    url:url,
    imageName:imageName,
    collaboratorName:values,
    links:values2,
    courseImages:demolinks,
    level: selectedDifficulty
  };   
  useEffect(()=>{console.log(formData)},[formData])

  
  const [currUser,setCurrUser] =useState(null);
  useEffect(()=>{
    const loggedInUser = localStorage.getItem("user");
      if (!loggedInUser) {
        navigate("/login")

      } else{
        if(cname){
          console.log(cname,"CNAME");
          // console.log(JSON.stringify(pname));
          fetch('http://localhost:8080/courses/editCourseData', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({cname:cname})
        }).then( async(res) => {
          if(res.status==500){
            throw new Error (res.message);
          }
          else{
            
            var data = await res.json();
            console.log(data);
            setValues(data.creators);
            setValues2(data.courseInfo.courseLink);
            setCtitle(data.title);
            setCdesc(data.courseInfo.description);
            setSelectedTags(data.tags);
            setDemo(data.courseInfo.demoLinks);
            setSelectedDifficulty(data.level);
            setURL(data.courseImage.url);
            setImgN(data.courseImage.filename);
            setId(data._id);
          }
        }).catch((error) => {
          window.alert(error);
          console.error('Error:', error);
        });
      }else{
        setCurrUser(loggedInUser);
        setValues([loggedInUser]);
      }
    }
      
  },[])
  


  
  const [trigger,setTrigger]=useState(1)
  const handleSubmit = () => {
      if(formData.title===''){
        window.alert('Title is required');
        return ;
      }
      if(formData.level==''){
        window.alert('Level is required');
        return;
      }
    // Assuming you have an API endpoint to send the data
    setTrigger(prevTrigger => prevTrigger + 1); // Update trigger separately
  };

  useEffect(() => {
    
    if(trigger!==1){
      try{
        fetch('http://localhost:8080/courses/addNewCourse', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          console.log(1);
        return response.json();
        })
        .then(data => {
          console.log(data);
          if(data.error===undefined){
            console.log(2);
            console.log(data)
            navigate(-1);
          }
          else{
            window.alert('Course Title already exists  '); 
          }
        })
        .catch((error) => {
          console.log(3);
          console.error(error.message);
          // if (error.message.includes('duplicate key error')) {
          //   window.alert('Duplicate error occurred. Please enter unique data.');
          // } else {
          //   console.log(4);
          //   console.error(error);
          //   window.alert('errror');
          // }
          window.alert('Error Occured');
          // Handle error
        
        })
      } catch (error) {
        console.error('Error occurred in sending request:', error);
      }
    }

  },[trigger])

  return (
  <div className="createPage">
    
    <div className="contentPP">
    {cname!==undefined&&(<Starting text="Edit Course" navigate={navigate}/>)}
    {cname===undefined&&(<Starting text="Create Course" navigate={navigate}/>)}

      
        
      <ProfilePicAdd profilepic={url} setpp={setURL} setImgN={setImgN} imgN={imageName} type={'course'}/>

      <TextInputs name="Course Title*" state={courseTitle} setState={setCtitle} fixed={false}/>

      <TextInputs name="About The Course" state={courseDesc} setState={setCdesc} fixed={false}/>
      
      <SelectTags text = "Course Tags" selectedTags={selectedTags} setSelectedTags={setSelectedTags} />

      <DemoUpload text="Course Demo Images" demoImages = {demolinks} setDemo = {setDemo}/>

      <Difficulty selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty}/>

      <AddUsers values2={values} setValues2={setValues}/>

      <Links values2={values2} setValues2={setValues2} text ="Add Course Links"/>

      {cname!==undefined&&(  <SubmitButton text="Edit Course" onClick={handleSubmit} />)}
      {cname===undefined&&(  <SubmitButton text="Create Course" onClick={handleSubmit} />)}

    </div>
  </div>
  );
}
//npm install @emotion/react @emotion/styled
//npm install @mui/material
