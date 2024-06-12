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
    import  {useParams,useNavigate,useSearchParams} from 'react-router-dom'
    import  { useEffect ,useContext} from 'react';

    const Profile = () => {
      const{userdata}=useContext(UserdataContext);
      const navigate = useNavigate();
      const {userName} = useParams();
      
      let [searchParams, setSearchParams] = useSearchParams();
      let [query, setQuery] = useState(
       searchParams.get("name")
     );
     let [query2, setQuery2] = useState(
      searchParams.get("type")
    );
    const [dataprofile,setdataprofile]=useState(null);
    const [dataproject,setdataproject]=useState(null);
    const[datacourse,setdatacourse]=useState(null);
      const [compledtedData, setcompletedData] = useState([]);
      const [ongoingData, setongoingData] = useState([]);
      const [courseData, setcourseData] = useState([]);

      useEffect(()=>{
          const loggedInUser = localStorage.getItem("user");
            if (!loggedInUser) {
              navigate("/login")
            }
      },[])


      const handleLogOut = () => {
        localStorage.clear()
        window.location.href = 'http://localhost:8080/logout';

      };
      const [selectedButton, setSelectedButton] = useState("bio");
      useEffect(()=>{
        console.log(121,query2,121)
if(query2!==null&&query!==null)
  {
    setSelectedButton(query2)
  }else
  {
    setSelectedButton("bio")

  }

      },[])
      const handleButtonClick = (buttonId) => {
        setSelectedButton(buttonId);
      };
      const handleAddFriend = async() => {
        try{
        // Add logic to handle adding the user as a friend
        const link = "http://localhost:8080/user/addFriend" ;
        console.log(link);
      const response= await fetch(link, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify( {
            "currentUserName":userdata.username,"friendUserName":userName
          }),
        });
         const res = await response.text()
  
         window.alert( res);}
         catch(e)
         {
          window.alert("Error please try again")
         }
  
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
                return;
            }
            catch(err){
              setdataprofile(null);
              setdataproject([]);
                return;
            }
        }
        fetchData();
    },[userdata,userName])
    console.log(69);
    console.log(userName );
    console.log(userdata)

    useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch("http://localhost:8080/courses/userCourses/"+userName, {
                  method: "GET" // GET, POST, PUT, DELETE, PATCH, etc.
                  // headers: {
                  // "Content-Type": "application/json",  
                  // As sending JSON data to API
                  // },
                  // body: JSON.stringify(data)   //if data to be given to the backend, uncomment this and the header, with data input in function
              });
              
              const res = await response.json()
              const sortedCourses = res.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              });
              setdatacourse(sortedCourses);
              return;
          }
          catch(err){
            setdatacourse([]);
              return;
          }
      }
      fetchData();
  },[userdata,userName])

      const [check, setcheck] = useState("profile");
      const [check2, setcheck2] = useState('Course');

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
      <div>
      <div   style={{cursor:'pointer' }}onClick={getInTouch}>Get in Touch</div>
      <div   style={{cursor:'pointer' }}onClick={handleAddFriend}>Add Friend</div>
      </div>
    )}
    {userdata.username===userName &&(
       <Link to = {"/editProfile"} style={{cursor:'pointer', color: 'inherit', textDecoration: 'inherit'}}><b>Edit Profile</b> </Link>

      // <div style={{cursor:'pointer'}}>Edit Profile</div>
    )}
    </>
)}
                    <div style={{cursor:'pointer'}} onClick={handleLogOut}>Log Out</div>
                  </div>
                </div>
              </div>
              <div id="profileright" style={{width:"600px",height: '-webkit-max-content',maxHeight: '-webkit-fill-available'}}>
                <div id="buttons">
                <Button style={{textDecoration: 'none' ,marginRight:'10px'}}  className={selectedButton === 'bio' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('bio')}>Bio</Button>
                <Button style={{textDecoration: 'none',marginRight:'10px'}}  className={selectedButton === 'Project' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('Project')}>Projects</Button>
                <Button style={{textDecoration: 'none',marginRight:'10px'}}  className={selectedButton === 'Course' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('Course')}>Courses</Button> 
                </div>
                {dataprofile && dataproject && userdata && (
    <>
        {selectedButton === 'bio' && <Bio dataprofile={dataprofile} />}
        {selectedButton === 'Project' && <Project userprojects={dataproject} setongoingData={setdataproject} setcompletedData={setcompletedData} setcourseData={setcourseData}  check={check} user={userdata.username} person={userName}/>}
        {selectedButton === 'Course' && <Course usercourses={datacourse} setongoingData={setongoingData}  setcompletedData={setcompletedData} setcourseData={setdatacourse}check={check2} user={userdata.username} person={userName} />}
    </>
)}


              </div>
            </div>
          
          </>
           )
    
    };

    export default Profile;
