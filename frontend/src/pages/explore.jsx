import React, { useEffect } from 'react';
import ExplorePg1 from '../components/ExplorePage/explorePage1.jsx';
import ExplorePg2 from '../components/ExplorePage/explorePage2.jsx';
import "./explore.css";
import ExplorePg3 from '../components/ExplorePage/explorePage3.jsx';
// import CardExpanded from '../components/ExplorePage/CardExpanded.jsx';
import {useState, useContext} from 'react';
import backg from '../assets/images/img1.jpeg';
import sli1 from '../assets/images/slider-img3.jpeg';
import sli2 from '../assets/images/slider-img1.png';
import profile from '../assets/images/profile.jpeg';
import {userContext} from "../userContext.jsx";






const Explore = () => {
    const [exploreData,setExploreData] = useState([])
    const currUser = useContext(userContext);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8080/exploreDataGet/"+currUser, {
                    method: "GET" // GET, POST, PUT, DELETE, PATCH, etc.
                    // headers: {
                    // "Content-Type": "application/json",
                    // As sending JSON data to API
                    // },
                    // body: JSON.stringify(data)   //if data to be given to the backend, uncomment this and the header, with data input in function
                });
                const res = await response.json();
                setExploreData(res.message);
                return;
            }
            catch(err){
                console.log(11111111);
                setExploreData([]);
                return;
            }
        }
        fetchData();
        
    },[currUser,setExploreData])
  const data = {
    explore: {
        allGroups: [
            {
            text: "Ongoing Projects",
            list_cards: [
                    {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                }
            ]
        },
        {
            text: "Completed Projects",
            list_cards: [
                    {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                }
            ]
        },
        {
            text: "Completed Course",
            list_cards: [
                    {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
                },
                {
                    tags: [{name: 'AI/ML', color:"#4EB0E7"},{name: 'DSA',color:"#4EB0E7" }],
                    likes: 120,
                    ratings: 5.0,
                    projectImage: backg,
                    projectTitle: 'This is the text which will be displayed.',
                    profileImage: profile,
                    userName: 'Jane Done',
                    
                    
                    additionalImages: [sli1, sli2, backg],
                    
                    aboutProjectText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                    feedbackHeading: 'Rating and Feedback',
                    feedbackArray: [
                        { heading: 'Tanmay Mittal',
                        image:profile,
                        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        date:'22/09/2024',
                        stars:5 },
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hello',
                        date:'22/22/2342',
                        stars:4
                        }
                        ,
                        {
                        heading: 'Priyanshu',
                        image:profile,
                        text:'hellovtvgvbuv',
                        date:'22/22/2342',
                        stars:4
                        }
                    ]
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
      <ExplorePg3 allGroups={data.explore.allGroups} setModalOpen = {setModalOpen}/>
    </>
    );
  };
  
export default Explore;