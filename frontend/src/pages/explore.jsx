import React, { useEffect, useState, useContext } from 'react';
import ExplorePg1 from '../components/ExplorePage/explorePage1.jsx';
import ExplorePg2 from '../components/ExplorePage/explorePage2.jsx';
import "./explore.css";
import ExplorePg3 from '../components/ExplorePage/explorePage3.jsx';
// import CardExpanded from '../components/ExplorePage/CardExpanded.jsx';
import backg from '../assets/images/img1.jpeg';
import sli1 from '../assets/images/slider-img3.jpeg';
import sli2 from '../assets/images/slider-img1.png';
import profile from '../assets/images/profile.jpeg';
// import UserContext from "../userContext.jsx";
import profimage from '../assets/images/profile.jpeg'
import courseimage from '../assets/images/swiggy.png'
import UserdataContext from '../userdataContext.js';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
    const [ongoingData,setongoingData] = useState([])
    const [completedData,setcompletedData] = useState([])
    const [course,setcourseData] = useState([])
    const[likedproj,setlikedproj] =useState([]);
    // const[userdata,setuserdata]=useState(null);
    const{userdata}=useContext(UserdataContext);

      const [currUser,setCurrUser] =useState(null);
      const navigate=useNavigate()

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("user");
           if (loggedInUser) {
               
           //   const foundUser = JSON.parse(loggedInUser);
             setCurrUser(loggedInUser);
           } else
           {
navigate("/login")
           }
    },[])
    useEffect(() => {
        async function fetchData() {
            
               if (currUser) {
                   
               //   const foundUser = JSON.parse(loggedInUser);               }  


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
                setongoingData([]);
                return;
            }}else{

            }
        }
        fetchData();
        
    },[currUser,setongoingData])
  




   




    useEffect(() => {
        async function fetchData() {
            if(currUser){

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
                setcompletedData([]);
                return;
            }
        }}
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
        {
            type: "Course",
            text: "Completed Course",
            list_cards: [
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage,profimage,profimage,profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" },{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:false
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'AI/ML', color:"#4EB0E7"},{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage:[profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:false
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'AI/ML', color:"#4EB0E7"},{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage:[profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:false
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'AI/ML', color:"#4EB0E7"},{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage:[profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:false
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'AI/ML', color:"#4EB0E7"},{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage:[profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    },
                    {
                        title: "Deep Learning Specialization",
                        creatorimage: [profimage],
                        courseimage: courseimage,
                        tags:[{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                        rating:4,
                        helpful:10,
                        complete:true
                    }
                    
                    
                
                
                
                ]
        }
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
      <div id="layer0"></div>
      <div id="layer1"></div>
      <div id="layer2"></div>
      <div id="layer3"></div>
      <ExplorePg1 />
      <ExplorePg2 />
      <ExplorePg3 allGroups={data.explore.allGroups} setModalOpen = {setModalOpen} setongoingData={setongoingData} setcompletedData={setcompletedData} />
      {/* <ExplorePg3 allGroups={data.explore.allGroups} setModalOpen = {setModalOpen}/> */}
    </>
    );
  };// 
  
export default Explore;