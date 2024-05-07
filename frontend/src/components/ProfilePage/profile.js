    import React, { useState} from 'react';
    import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
    import './profile.css';
    import UserdataContext from '../../userdataContext.js';


    import Bio from './bio.js';
    import Project from './project.js';
    import Course from './course.js';
    // import EditProfile from './editProfilePage.js';
    // import CreateCoursePage from './createCourse.js';
    // import CreateProjectPage from './createProject';
    import image1 from '../../assets/images/profile.jpeg';
    import image2 from '../../assets/images/profile2.jpeg';
    import image3 from '../../assets/images/profile2.jpeg';
    import image4 from '../../assets/images/swigy.png';
    import { Button } from 'react-bootstrap';
    import  {useParams,useNavigate} from 'react-router-dom'
    import  { useEffect ,useContext} from 'react';

    const Profile = () => {
      const{userdata}=useContext(UserdataContext);
      const navigate = useNavigate();
      const {userName} = useParams();

      const [currUser,setCurrUser] =useState(null);

      useEffect(()=>{
          const loggedInUser = localStorage.getItem("user");
             if (loggedInUser) {
               setCurrUser(loggedInUser);
             } else
             {
  navigate("/login")
             }
      },[])


      const handleLogOut = () => {
        localStorage.clear()
        window.location.href = 'http://localhost:8080/logout';

      };
      const [selectedButton, setSelectedButton] = useState("bio");
      
      const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
      };

      const getInTouch = async() => {
        try {
         const firstResponse = await fetch('http://localhost:8080/chats/personalChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friendUsername: userName,
         currUsername: userdata.username,
      }),
    });
    const userData = await firstResponse.json();
       if(userData){   
        navigate("/chat/"+userdata.username+"?name="+userName)}
          return;
      }
      catch(err){
        console.log(err)
          console.log("error in get in touch");
          return;
      }
      }; 
      const [dataprofile,setdataprofile]=useState(null);
      const [dataproject,setdataproject]=useState(null);
      useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8080/projects/userProjects/"+userName, {
                    method: "GET" // GET, POST, PUT, DELETE, PATCH, etc.
                    // headers: {
                    // "Content-Type": "application/json",  
                    // As sending JSON data to API
                    // },
                    // body: JSON.stringify(data)   //if data to be given to the backend, uncomment this and the header, with data input in function
                });
                
                const res = await response.json()
                const sortedProjects = res.updatedProjects.sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setdataprofile(res.user);
                
                setdataproject(sortedProjects);
                console.log('falma')
                console.log(res)
                return;
            }
            catch(err){
              setdataprofile(null);
              setdataproject([]);
                return;
            }
        }
        fetchData();
    },[userdata])
    const courses = [
      {
        title: "C++ Basics",
        likes: 78,
        contributors: [image1],
        courseImage: image4
      },
      {
        title: "Ruby on Rails",
        likes: 56,
        contributors: [image1],
        courseImage: image4
      }
    ];


      const [check, setcheck] = useState("profile");
      console.log('balma');
      console.log(dataprofile);

      return (
            <>
            <div id="profilelayer"></div>
            <div id="profilelayer1"></div>
            <div id="profilelayer2"></div>
            <div id="profilepage1">
                
              <div id="profileleft">
                <h1>Profile</h1>
                <div id="self-in">
                  {dataprofile&&dataproject&&userdata&&(
                  <img src={dataprofile.profileInfo.profilePicture.url} id="profile-picture" alt="" />
                  )}
                  <div id="self2">
                  {dataprofile&&dataproject&&userdata&&(
                    <>
                    <h2>{dataprofile.username}</h2>
                    <h3>{dataprofile.email}</h3>
                   <h3>{dataprofile.department}</h3>
                   </>
                   )}
                  

                  </div>
                  <div id="self3">
                  {dataprofile&&dataproject&&userdata&&(<>
                            <a href={dataprofile.instagram}><i class="bi bi-facebook" style={{fontSize:'1.5rem', cursor:'pointer'}}></i></a>
                            <a href={dataprofile.facebook}><i class="bi bi-instagram" style={{fontSize:'1.5rem', cursor:'pointer'}}></i></a>
                            <a href={dataprofile.linkedin}><i class="bi bi-linkedin" style={{fontSize:'1.5rem', cursor:'pointer'}}></i></a>
                            <a href={dataprofile.apple}><i class="bi bi-apple" style={{fontSize:'1.5rem' ,cursor:'pointer'}}></i></a>
                            <a href={dataprofile.github}><i class="bi bi-github" style={{fontSize:'1.5rem' ,cursor:'pointer'}}></i></a>
                            </>
                )}
                  </div>
                  <div id="self5">
                  {dataprofile && dataproject && userdata  && (
                    <>
    {userdata.username!=userName &&(
      <div   style={{cursor:'pointer' }}onClick={getInTouch}>Get in Touch</div>
    )}
    {userdata.username===userName &&(
      <div style={{cursor:'pointer'}}>Edit Profile</div>
    )}
    </>
)}
                    <div style={{cursor:'pointer'}} onClick={handleLogOut}>Log Out</div>
                  </div>
                </div>
              </div>
              <div id="profileright" style={{width:"600px"}}>
                <div id="buttons">
                <Button style={{textDecoration: 'none'}}  className={selectedButton === 'bio' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('bio')}>Bio</Button>
                <Button style={{textDecoration: 'none'}}  className={selectedButton === 'project' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('project')}>Projects</Button>
                <Button style={{textDecoration: 'none'}}  className={selectedButton === 'course' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('course')}>Courses</Button> 
                </div>
                {dataprofile && dataproject && userdata && (
    <>
        {selectedButton === 'bio' && <Bio dataprofile={dataprofile} />}
        {selectedButton === 'project' && <Project userprojects={dataproject} setongoingData={setdataproject} check={check} />}
        {selectedButton === 'course' && <Course courses={courses} />}
    </>
)}


              </div>
            </div>
          
          </>
           )
    
    };

    export default Profile;
