import React, { useEffect, useState, useContext } from 'react';
//import ExplorePg1 from '../components/ExplorePage/explorePage1.jsx';
//import ExplorePg2 from '../components/ExplorePage/explorePage2.jsx';
import './searchuserwithoutswiper.css';
import ExplorePg4 from '../components/ExplorePage/explorepage4.jsx';
// import CardExpanded from '../components/ExplorePage/CardExpanded.jsx';
import backg from '../assets/images/img1.jpeg';
import sli1 from '../assets/images/slider-img3.jpeg';
import sli2 from '../assets/images/slider-img1.png';
import profile from '../assets/images/profile.jpeg';
import UserContext from "../userContext.jsx";
import profimage from '../assets/images/profile.jpeg'
import courseimage from '../assets/images/swiggy.png'
import UserdataContext from '../userdataContext.js';

import logo from '../assets/images/logo.svg';
import search from '../assets/images/search.svg';


const Exploreu = () => {
    console.log(5);
    const [ongoingData,setongoingData] = useState([])
    const [completedData,setcompletedData] = useState([])
    const [course,setcourseData] = useState([])
    const[likedproj,setlikedproj] =useState([]);
    // const[userdata,setuserdata]=useState(null);


    const {currUser} = useContext(UserContext);

    const{userdata}=useContext(UserdataContext);
    console.log(69);
    console.log(userdata);
    console.log(79);
    console.log(currUser);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8080/projects/ongoingProjects/"+currUser, {
                    method: "GET" // GET, POST, PUT, DELETE, PATCH, etc.
                    // headers: {
                    // "Content-Type": "application/json",  
                    // As sending JSON data to API
                    // },
                    // body: JSON.stringify(data)   //if data to be given to the backend, uncomment this and the header, with data input in function
                });
                
                const res = await response.json()
                
                setongoingData(res);
                return;
            }
            catch(err){
                console.log(11111111);
                setongoingData([]);
                return;
            }
        }
        fetchData();
        
    },[currUser,setongoingData])
    console.log(41);
    console.log(ongoingData);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8080/user/likedProjects/"+currUser, {
                    method: "GET" ,
          
                });   
                const res = await response.json() 
                console.log(res);
                setlikedproj(res);
                return;
            }
            catch(err){
                console.log(11111111);
                setlikedproj([]);
                return;
            }
        }
        fetchData();
        
    },[])




   




    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8080/projects/completedProjects/"+currUser, {
                    method: "GET" // GET, POST, PUT, DELETE, PATCH, etc.
                    // headers: {
                    // "Content-Type": "application/json",
                    // As sending JSON data to API
                    // },
                    // body: JSON.stringify(data)   //if data to be given to the backend, uncomment this and the header, with data input in function
                });
                
                const res = await response.json()
                
                setcompletedData(res);
                return;
            }
            catch(err){
                console.log(11111111);
                setcompletedData([]);
                return;
            }
        }
        fetchData();
        
    },[currUser,setcompletedData])
    





  const data = {
    explore: {
        allGroups: [
            {
            type: "Project",
            text: "Ongoing Projects",
            list_cards:ongoingData

          
        },
        {
            type: "Project",
            text: "Completed Projects",
            list_cards:completedData
           
        },
        
        ]
    },
        // Add more cards as needed
    chat :[],
    profile: {
        userName : 'Soumya Savarn',
        userEmail : 's.savarn@iitg.ac.in',
        profilePic : './Images/profile.jpeg',
        userDepartment : 'DSAI, IITG',
        userSkills : ['BlockChain', 'MySQL', 'iOS dev', 'TensorFlow'],
  
        projects : [{
        title: "Nirvanna",
        likes: 10,
        contributors: ["./Images/profile.jpeg", "./Images/profile2.jpeg", "./Images/profile3.jpg"],
        projectImage: "./Images/swigy.png"
    },{
      title: "Nirvanna",
      likes: 10,
      contributors: ["./Images/profile.jpeg", "./Images/profile2.jpeg"],
      projectImage: "./Images/swigy.png"
    },{
      title: "Nirvanna",
      likes: 10,
      contributors: ["./Images/profile.jpeg", "./Images/profile2.jpeg", "./Images/profile3.jpg"],
      projectImage: "./Images/swigy.png"
    }],
  
    courses :
     [{
      title: "C++ Basics",
      likes: 78,
      contributors: ["./Images/profile.jpeg"],
      courseImage: "./Images/swigy.png"
      },{
        title: "C++ Basics",
        likes: 56,
        contributors: ["./Images/profile.jpeg"],
        courseImage: "./Images/swigy.png"
        }]
    }
  }
  
    const [modaldata, setModalOpen] = useState(null);
    return (
    <>
      {/* <div id="layer0"></div>
      <div id="layer1"></div>
      <div id="layer2"></div>
      <div id="layer3"></div> */}
      <div id="wholepage">
      {/* <div id="navbar"> */}
          {/* <nav>
            <img src={logo} id="logo" alt="" />
            <div id="search">
              <input type="text" name="" id="sch" placeholder="Search" />
              <img src={search} alt="" />
            </div>
            <div id="nav-part2">
              <a href="#">Explore</a>
              <a href="#">Chats</a>
              <a href="#">Profile</a>
            </div>
          </nav> */}
        {/* </div> */}

        {/* <div id="typeButton">
              <button id="global">Profile</button>
              <button id="personal">Project</button>
              <button id="global">Course</button>

        </div> */}
      
      {/* <ExplorePg1 /> */}
      {/* <ExplorePg2 /> */}
      <ExplorePg4 allGroups={data.explore.allGroups} setModalOpen = {setModalOpen} setongoingData={setongoingData} setcompletedData={setcompletedData} likedproj={likedproj} setlikedproj={setlikedproj}/>
      {/* <ExplorePg3 allGroups={data.explore.allGroups} setModalOpen = {setModalOpen}/> */}
    {/* </> */}
    </div>
    </>
    );
  };// 
  
export default Exploreu;