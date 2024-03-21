import React from "react";
import Button from 'react-bootstrap/Button';
import './profilePage.css';
import { IoCloseOutline } from 'react-icons/io5'; 
import profileImage from '../assets/images/profile_pic.jpg'; // Import your profile image
import TextField from '@mui/material/TextField';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Box } from "@mui/material";
import  { useState, useEffect } from 'react';
import Axios from 'axios';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';







const ToggleSwitch_collab = ({ formData, setFormData }) => {

  const toggleOngoing_collab = () => {
    // Toggle the ongoing value in the formData state
    setFormData({ ...formData,openForCollaboration:!formData.openForCollaboration });
    console.log(formData.openForCollaboration);
  };
  
  return (
    <>
    <div class="form-check form-switch" style={{marginLeft:'10px'}}>
  <input class="form-check-input" type="checkbox" role="switch" 
  id="flexSwitchCheckDefault" checked={formData.openForCollaboration} onChange={toggleOngoing_collab} />
  <label class="form-check-label" for="flexSwitchCheckDefault"></label>
</div>

    </>


  );
  };


  
  const ParentComponent_collab = ({ formData, setFormData }) => {
   
    return (
      <div>
        {/* ... your other components ... */}
        <ToggleSwitch_collab formData={formData} setFormData={setFormData} />
      </div>
    );
  };
const ToggleSwitch = ({ formData, setFormData }) => {
  const toggleOngoing_ongoing = () => {
    // Toggle the ongoing value in the formData state
    setFormData({ ...formData, ongoing: !formData.ongoing });
  };
  return (
    <>
    <div class="form-check form-switch" style={{marginLeft:'10px'}}>
  <input class="form-check-input" type="checkbox" role="switch"  checked={formData.ongoing} onChange={toggleOngoing_ongoing} id="flexSwitchCheckDefault"/>
  <label class="form-check-label" for="flexSwitchCheckDefault"></label>
</div>

    </>

  );
  
  };
  

  const ParentComponent = ({ formData, setFormData }) => {
    return (
      <div>
        {/* ... your other components ... */}
        <ToggleSwitch formData={formData} setFormData={setFormData} />
      </div>
    );
  };


export default function CreateProjectPage() {

   const initialFormData = {
      title: '',
      name:'',
      projectImage:'',
      description: '',
      url:'',
      imageName:'',
      collaboratorName:[],
      ongoing:false,
      openForCollaboration:false,
      links:[],
      projectImages:[]
    
    };
    const [formData, setFormData] = useState(initialFormData);
    
   
useEffect(()=>{console.log(formData)},[formData])

    const [values, setValues] = useState([""]); // Initial state with one empty string for collaboratos
    const [values2, setValues2] = useState([{ name: '', link: '' }]);
    useEffect(()=>{console.log(values2)},[values2])

    const handleChange = (index, value) => {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);
    };
    const handleClear=(index)=>{
      const newValues = values.filter((_, indexes) => indexes !== index);   
      setValues(newValues);
    }
    const handleChange2 = (index, field, value) => {
      const newValues = [...values2];
      newValues[index][field] = value;
      setValues2(newValues);
    };
    const handleClear2=(index)=>{
      const newValues2 = values2.filter((_, indexes) => indexes !== index);   
      setValues2(newValues2);
    }
    const addTextField = () => {
      setValues([...values, ""]); // Add an empty string to the values array
    };
    const addTextField2 = () => {
      setValues2([...values2, { name: '', link: '' }]); // Append a new object with name and link properties
    };
    var [profilepic,setpp] = useState(profileImage);
    const[hoverIndex,setHoverIndex]=useState(null);

    const handleMouseOver = (index) => {
      setHoverIndex(index);
    };
  
    // Function to handle mouse leaving an image
    const handleMouseOut = () => {
      setHoverIndex(null);
    };
  


    const deleteImageFromCloudinary = async (publicId, type, index) => {
      try {
        console.log('deleting image')
        const response = await fetch(`http://localhost:8080/image/deleteImage/`+publicId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }); 
        var data=await response.json()
        if(type==='pp'){
        setpp(profileImage)
        setFormData({...formData,url:'',imageName:''})}
        else
        {
deleteItem(index)
        }
        console.log(data);
        console.log('Image deletion response:', response.data);
        // Handle further actions after deletion (e.g., updating UI state)
      } catch (error) {
        console.error('Error deleting image:', error);
        // Handle error scenario
      }
    };


    const uploadImage = (files) => {
      if(formData.imageName!=" "){
        deleteImageFromCloudinary(formData.imageName)
      }
      console.log("execution")
      const formData1 = new FormData();
      formData1.append("file",files[0]);
      formData1.append("upload_preset","hv9vnkse");

      Axios.post("https://api.cloudinary.com/v1_1/dcsdkvzcq/image/upload", formData1).then((res)=>{
        // console.log(res.data.secure_url);
        console.log(res.data);
        setpp(res.data.secure_url);
        setFormData({
          ...formData,
          url: res.data.secure_url,
          imageName: res.data.public_id,
        });
      });
    };


    const uploadProjectImages = async (files) => {
      const uploadedImages = [];
      
      // Define a recursive function to upload images one by one
      const uploadImage = async (index) => {
        if (index < files.length) {
          const formData1 = new FormData();
          formData1.append("file", files[index]);
          formData1.append("upload_preset", "hv9vnkse");
          
          try {
            console.log(index)
            const res = await Axios.post("https://api.cloudinary.com/v1_1/dcsdkvzcq/image/upload", formData1);
            console.log("Uploaded image:", res.data);
            uploadedImages.push({
              filename: res.data.public_id,
              url: res.data.secure_url
            });
            
            // Upload next image recursively
            await uploadImage(index + 1);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        } else {
          // All images have been uploaded, update the form data
          setFormData({
            ...formData,
            projectImages: [...formData.projectImages, ...uploadedImages] // Concatenate with existing projectImages
          });
        }
      }; 
      
      // Start uploading the first image
      await uploadImage(0);
    };


    const deleteItem = (targetIndex) => {
     
      // Filter out the image at the targetIndex
      const updatedProjectImages = formData.projectImages.filter((_, index) => index !== targetIndex);
      
      // Update the formData state with the new projectImages array
      setFormData({
        ...formData,
        projectImages: updatedProjectImages
      });
      
    };



    
    
    const [trigger,setTrigger]=useState(1)
    const handleSubmit = () => {
      if(formData.name===''){
        window.alert('Name is required');
        return;
      }
      else if(formData.title===''){
        window.alert('Title is required');
        return ;
      }
      // Assuming you have an API endpoint to send the data
      const updatedFormData = {
        ...formData,
        collaboratorName: [...values, "Simon"],
        links:values2
      };
      setFormData(updatedFormData);
      setTrigger(prevTrigger => prevTrigger + 1); // Update trigger separately
    };

    useEffect(() => {
      
      if(trigger!==1){
      console.log(formData)
      fetch('http://localhost:8080/projects/addNewProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {response.json;console.log(1);})
      .then(data => {
        console.log(2);
        console.log('Success:', data);
        // Handle success response
      })
      .catch((error) => {
        console.log(3);
        console.error(error.message);
        if (error.message.includes('duplicate key error')) {
          window.alert('Duplicate error occurred. Please enter unique data.');
        } else {
          console.log(4);
          console.error(error);
          window.alert('er.');
        }
        // Handle error
      
      });}

    },[trigger])

    const style = {
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "white"
          }
        }
      }
  return (
<div class="containerPP">
  
  <div class="contentPP" style={{overflow:"auto"}}>
    <div className="fillWidthDiv">
        <Button style={{display:"flex",backgroundColor:"transparent",borderColor:"transparent",justifyContent:"center",display: 'flex', alignItems: 'center'}} className="close-icon">
  <IoCloseOutline size={32} style={{ color: 'white' }}/> 
  </Button>
</div>

<div className="fillWidthDiv2">
    <h3 style={{color:"white"}} className="editProfile" ><b>Create Project</b></h3>
</div>
<div className="space"></div>
<div className="space"></div>
<div className="fillWidthDiv3" >
    <div className="imageContainer">

<img src={profilepic} alt="Profile" className="profile-image"  />
</div>


<div className="buttonContainer" style={{paddingLeft:10}}>
    <div>
        <input type="file" id="fileInput" name="fileInput" hidden onChange={(event)=>{
          uploadImage(event.target.files)
        }}/>
        <label for="fileInput" variant="outline-dark" className="buttonHover" style={{ width: 200, height: 50, backgroundColor: 'black',display:'flex',justifyContent:'center',justifyItems:'center',alignItems: 'center' ,borderRadius:'10px',borderColor:'white' }}>
         <p  class="picture_upload"> Upload new Picture </p></label>
    </div>
</div>




<div className="buttonContainer" style={{paddingLeft:20}} >

<Button variant="outline-dark" onClick ={()=>{
  deleteImageFromCloudinary(formData.imageName,'pp',0);
  
  
}
  } className="buttonHover"  style={{ width: 200, height: 50, backgroundColor: 'black',display:'flex',justifyContent:'center',justifyItems:'center',alignItems: 'center' ,borderRadius:'10px' }}  >
<p  class="picture_upload"> Remove Picture </p>
      </Button></div>



</div>
<div className="E-mail" >
    <p style={{color:"white",margin:'0'}} >Project Name</p>
</div>
<div className="textfield">
<TextField fullWidth  id="fullWidth" size="small"  sx={style}
value={formData.name}
onChange={(e)=> setFormData({...formData,name:e.target.value})}
 InputProps={{
    style: {
      color: 'white', // Text color
      borderColor: 'white', // Border color
      backgroundColor: '#3B3B3B'
     
      // Background color
    },
    placeholder:"Type here"
  }} // Change text color
 InputLabelProps={{ style: { color: 'gray' } }} // Change label color
/>
</div>


<div className="space"></div>
<div className="space"></div>
<div className="E-mail" >
    <p style={{color:"white",margin:'0'}} >Project Title</p>
</div>
<div className="textfield" style={{ maxHeight: '100px', overflow: 'auto' }}>
<TextField  fullWidth id="fullWidth" size="small"  sx={style }
value={formData.title}
onChange={(e)=> setFormData({...formData,title:e.target.value})}
 InputProps={{
    style: {
        
      color: 'white', // Text color
      backgroundColor: '#3B3B3B', 
  
      
        },
    placeholder:"Type here"
  }} // Change text color
 InputLabelProps={{ style: { color: 'gray' } 
}} // Change label color
/>
</div>
<div className="space"></div>
<div className="space"></div>
<div className="E-mail" >
    <p style={{color:"white",margin:'0'}} >About This Project</p>
</div>



<div className="textfield1">
<TextField  fullWidth id="fullWidth" size="small"  sx={style} multiline={true}
value={formData.description}
onChange={(e)=> setFormData({...formData,description:e.target.value})}
 InputProps={{
    style: {
        
      color: 'white', // Text color
      backgroundColor: '#3B3B3B', 
  // height:'100px',
  // overflowY:'auto',
  // paddingTop:'0px',
  // alignItems:'flex-start'

        },

    placeholder:"Type here"
  }} // Change text color
 InputLabelProps={{ style: { color: 'gray' } 
}} // Change label color
/>
</div>


<div className="space"></div>
<div className="space"></div>
<div className="E-mail" >
<p style={{color:"white",margin:'0'}} className="editProfile">Tags</p>
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
 InputLabelProps={{ style: { color: 'gray' } 
}} // Change label color
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
<div className="space"></div>
<div className="space">

</div>
<div className="space">

</div>
<div className="E-mail" >
<p style={{color:"gray",margin:'0'}} className="editProfile">Project Demo</p>


</div>
<div style={{paddingLeft:64
,display:'flex',flexDirection:'row'
,gap:'20px',paddingRight:64
}}>

<input
  type="file"
  id="fileInput2"
  name="fileInput2"
  hidden
  multiple // Add the 'multiple' attribute here
  onChange={(event) => {
    console.log("event")
    uploadProjectImages(event.target.files);
  }}
/>
<label
  htmlFor="fileInput2" // Use htmlFor to associate the label with the file input
  variant="outline-dark"
  className="buttonHover"
  style={{
    width: 180,
    height: 100,
    backgroundColor: "#3B3B3B",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
    borderRadius: "10px",
    borderColor: "white"
  }}
>
  <AiOutlinePlusCircle size={36}></AiOutlinePlusCircle>
</label>






<div style={{ overflowX: "auto", whiteSpace: "nowrap", paddingTop: '0px', borderRadius: '20px',width: 'calc(100% - 200px)' }}>



  {formData.projectImages.map((image, index) => (
    <div key={index}  className="imageContainer" onMouseOver={() => handleMouseOver(index)} onMouseOut={handleMouseOut} style={{ display: 'inline-block', position: 'relative', marginRight: 10 }}>
      <img
        src={image.url}
        alt={`Project Image ${index + 1}`}
        style={{ width: 100, height: 100, borderRadius: '10px' }}
 
      />
      {hoverIndex==index&&  
      <button
        onClick={() =>{
          deleteItem(index);
          deleteImageFromCloudinary(formData.projectImages[index].filename,"demo",index);
        }
        }
        className="deleteButton"
        
       
      >
        x
      </button>
}

    </div>
  ))}


</div>



         </div>

<div className="space">

</div>
<div className="space">

</div>

<div className="E-mail" >
<p style={{color:"white",margin:'0'}} className="editProfile">Open for Collaboration</p>

{/* <Button onClick={() => setFormData({...formData,openForCollaboration:!formData.openForCollaboration})} className="box" variant="dark" style={{ height: 25, width: 25, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginLeft:10,margin:'0'}}>
      <h2 >+</h2>
    </Button> */}
    
<ParentComponent_collab formData={formData} setFormData={setFormData}/>
</div>

<div className="space"/>
<div className="space"/>

<div className="E-mail" >
<p style={{color:"white",margin:'0'}} className="editProfile">Ongoing</p>


<ParentComponent formData={formData} setFormData={setFormData}/>

{/* <Button onClick={() => setFormData({...formData,ongoing:!formData.ongoing})} className="box"  variant="dark" style={{ height: 25, width: 25, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginLeft:10,margin:'0'}}>
      <h2 >+</h2>
    </Button> */}
</div>
<div className="space">
</div>
<div className="space">
</div>
<div className="E-mail" >
    <p style={{color:"white",margin:'0'}} >Add Collaborator</p>
</div>
<div>
      {values.map((value, index) => (
        <div key={index} className="textfield">
          <TextField
            fullWidth
            id={`fullWidth${index}`}
            size="small"
            sx={style}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            InputProps={{
              style: {
                color: "white", // Text color
                borderColor: "white", // Border color
                backgroundColor: "#3B3B3B"
                // Background color
              },
              placeholder: "Username",
              endAdornment: (
                <IconButton onClick={()=>handleClear(index) } size="small" sx={{visibility:(index)?"visible":"hidden"}}>
                  <ClearIcon  />
                </IconButton>
              ),
            }}
             // Change text color
            InputLabelProps={{ style: { color: "gray" } }} // Change label color
          />
        </div>
      ))}
      <div className="space"></div>

    </div>
    <div className="space"></div>

    <div className="E-mail" >

<Button onClick={addTextField}className="box" variant="dark" style={{  height: 25, width: 25, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h2 >+</h2>
    </Button>
<p style={{color:"white",marginLeft:10}} className="editProfile">Add more collaborator</p>
</div>
<div className="space"></div>

    <div className="E-mail" >
    <p style={{color:"white",margin:'0'}} >Add Project Links</p>
</div>
<div>
{values2.map((value, index) => (
  <div key={index} className="textfield">
    <TextField
      fullWidth
      id={`fullWidth${index}`}
      size="small"
      sx={style}
      value={value.name} // Use value.name for the name field
      onChange={(e) => handleChange2(index, 'name', e.target.value)} // Pass 'name' as the field parameter
      InputProps={{
        style: {
          color: "white",
          borderColor: "white",
          backgroundColor: "#3B3B3B"
        },
        placeholder: "Website"
      }}
      InputLabelProps={{ style: { color: "gray" } }}
    />
    <TextField
      fullWidth
      id={`fullWidth${index}`}
      size="small"
      sx={style}
      value={value.link} // Use value.link for the link field
      onChange={(e) => handleChange2(index, 'link', e.target.value)} // Pass 'link' as the field parameter
      InputProps={{
        style: {
          color: "white",
          borderColor: "white",
          backgroundColor: "#3B3B3B"
        },
        placeholder: "Link",
        endAdornment: (
          <IconButton onClick={()=>handleClear2(index) } size="small" sx={{visibility:(index)?"visible":"hidden"}}>
            <ClearIcon  />
          </IconButton>
        ),
      }}
      InputLabelProps={{ style: { color: "gray" } }}
    />
  </div>
))}
      <div className="space"></div>

    </div>
    <div className="space"></div>
    <div className="space"></div>

    <div className="E-mail" >

<Button onClick={addTextField2}className="box" variant="dark" style={{  height: 25, width: 25, borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <h2 >+</h2>
    </Button>
<p style={{color:"white",marginLeft:10}} className="editProfile">Add more Links</p>
</div>
<div className="space"></div>



<div className="space"></div>
<div className="space"></div>

<div className="name">
<div className="buttonContainer" >

<Button variant="dark" className="buttonHover" style={{width:200, backgroundColor: 'black'}} onClick={handleSubmit} >
       Create Project
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
//npm install @emotion/react @emotion/styled
//npm install @mui/material
