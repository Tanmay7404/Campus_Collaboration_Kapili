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

const Explore_last = ({contentType,searchInput,selectedTags,searchTrigger }) => {
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
      async function fetchData(type) {
          try {
              console.log("fetching search");
              const response = await fetch("http://localhost:8080/courses/search", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      type: type,
                      title: searchInput,
                      tags: selectedTags
                  })
              });

              const res = await response.json();
              console.log(res);
              setongoingData(res);
          } catch (err) {
              console.error(err);
          }
      }

      if (contentType === 'Projects') {
          fetchData('project');
      } else if (contentType === 'Courses') {
          fetchData('course');
      }
  }, [searchTrigger, contentType, searchInput, selectedTags]);




  const data = {
    explore: {
        allGroups: [
            {
            type: "Project",
            text: contentType,
            list_cards:ongoingData
        }
        ]
    },
        // Add more cards as needed
  }
  const data2 = {
    explore2: {
        allGroups2: [
            {
            type: "Course",
            text: contentType,
            list_cards:ongoingData
        }
        ]
    },
        // Add more cards as needed
  }
  
    const [modaldata, setModalOpen] = useState(null);
    return (
    <>
      <div id="layer0"></div>
      <div id="layer1"></div>
      <div id="layer2"></div>
      <div id="layer3"></div>
      {/* <ExplorePg1 />
      <ExplorePg2 /> */}
      {contentType==='Projects'&&(
      <ExplorePg3 allGroups={data.explore.allGroups} setModalOpen = {setModalOpen} setongoingData={setongoingData} setcompletedData={setongoingData} setcourseData={setcourseData} />
      )}
      {contentType==='Courses'&&(
      <ExplorePg3 allGroups={data2.explore2.allGroups2} setModalOpen = {setModalOpen} setongoingData={setongoingData} setcompletedData={setongoingData} setcourseData={setongoingData} />
      )}

      </>
    );
  };// 
  
export default Explore_last;