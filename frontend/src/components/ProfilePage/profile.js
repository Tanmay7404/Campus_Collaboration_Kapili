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
                 
             //   const foundUser = JSON.parse(loggedInUser);
               setCurrUser(loggedInUser);
             } else
             {
  navigate("/login")
             }
      },[])

      // const userName="Simon"


      const handleLogOut = () => {
        localStorage.clear()
        window.location.href = 'http://localhost:8080/logout';

      };
      const [selectedButton, setSelectedButton] = useState('bio');
      
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
      //dynamic variables (for backend)
     // const userName = 'Soumya Savarn';
      const userEmail = 's.savarn@iitg.ac.in';
      const profilePic = image1;
      const userDepartment = 'DSAI, IITG';
      const userSkills = ['BlockChain', 'MySQL', 'iOS dev', 'TensorFlow',"Node JS"];
      const github = 'https://github.com/soumyasavarn';
      const linkedin = 'https://www.linkedin.com/in/kishan-jonty/?trk=public_profile_browsemap&originalSubdomain=in';
      const instagram = '';
      const apple = '';
      const facebook = '';

      
      const projects = [
        {
          title: "Nirvanna",
          likes: 10,
          contributors: [image1, image2, image3],
          projectImage: image4
        },
        {
          title: "Nirvanna",
          likes: 10,
          contributors: [image1, image2, image3],
          projectImage: image4
        },{
          title: "Nirvanna",
          likes: 10,
          contributors: [image1, image2, image3],
          projectImage: image4
        },{
          title: "Nirvanna",
          likes: 10,
          contributors: [image1, image2, image3],
          projectImage: image4
        },
        {
          title: "Campus Collab",
          likes: 12,
          contributors: [image1, image2],
          projectImage: image4
        },
        {
          title: "Cab Sharing",
          likes: 34,
          contributors: [image1, image2, image3],
          projectImage: image4
        }
      ];

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
        
      return (
          <>
            <div id="profilelayer"></div>
            <div id="profilelayer1"></div>
            <div id="profilelayer2"></div>
            {/* <div id="profileellips1"></div> */}
            
            <div id="profilepage1">
                
              <div id="profileleft">
                <h1>Profile</h1>
                <div id="self-in">
                  <img src={profilePic} id="profile-picture" alt="" />
                  <div id="self2">
                    <h2>{userName}</h2>
                    <h3>{userEmail}</h3>
                    <h3>{userDepartment}</h3>
                  </div>
                  <div id="self3">
                  <a href={instagram}><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.11179 0C4.74805 -1.00559e-07 3.44013 0.541609 2.47564 1.50573C1.51114 2.46986 0.96903 3.77756 0.968506 5.1413V18.8567C0.968506 20.2208 1.51039 21.529 2.47494 22.4936C3.43949 23.4581 4.7477 24 6.11179 24H19.8272C21.1909 23.9995 22.4986 23.4574 23.4628 22.4929C24.4269 21.5284 24.9685 20.2205 24.9685 18.8567V5.1413C24.968 3.77791 24.4261 2.4705 23.4621 1.50643C22.498 0.542363 21.1906 0.000523478 19.8272 0H6.11179ZM21.3066 5.14921C21.3066 5.54209 21.1505 5.91888 20.8727 6.19668C20.5949 6.47449 20.2181 6.63057 19.8252 6.63057C19.4323 6.63057 19.0556 6.47449 18.7777 6.19668C18.4999 5.91888 18.3439 5.54209 18.3439 5.14921C18.3439 4.75632 18.4999 4.37954 18.7777 4.10173C19.0556 3.82392 19.4323 3.66785 19.8252 3.66785C20.2181 3.66785 20.5949 3.82392 20.8727 4.10173C21.1505 4.37954 21.3066 4.75632 21.3066 5.14921ZM12.9715 7.89071C11.8819 7.89071 10.8369 8.32355 10.0665 9.094C9.296 9.86446 8.86316 10.9094 8.86316 11.999C8.86316 13.0886 9.296 14.1336 10.0665 14.904C10.8369 15.6745 11.8819 16.1073 12.9715 16.1073C14.0611 16.1073 15.106 15.6745 15.8765 14.904C16.6469 14.1336 17.0798 13.0886 17.0798 11.999C17.0798 10.9094 16.6469 9.86446 15.8765 9.094C15.106 8.32355 14.0611 7.89071 12.9715 7.89071ZM6.88604 11.999C6.88604 11.2001 7.0434 10.4091 7.34912 9.67098C7.65484 8.9329 8.10294 8.26226 8.66784 7.69736C9.23275 7.13246 9.90338 6.68436 10.6415 6.37864C11.3795 6.07292 12.1706 5.91556 12.9695 5.91556C13.7684 5.91556 14.5595 6.07292 15.2975 6.37864C16.0356 6.68436 16.7062 7.13246 17.2711 7.69736C17.836 8.26226 18.2841 8.9329 18.5899 9.67098C18.8956 10.4091 19.0529 11.2001 19.0529 11.999C19.0529 13.6124 18.412 15.1598 17.2711 16.3007C16.1303 17.4415 14.5829 18.0825 12.9695 18.0825C11.3561 18.0825 9.80871 17.4415 8.66784 16.3007C7.52698 15.1598 6.88604 13.6124 6.88604 11.999Z" fill="#BCBCBC"/>
                            </svg></a>
                            <a href={facebook}><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.968506 22.1537V1.84629C0.968506 1.35662 1.16302 0.88701 1.50927 0.540765C1.85552 0.194519 2.32513 0 2.81479 0L23.1222 0C23.3647 0 23.6048 0.0477556 23.8288 0.14054C24.0528 0.233325 24.2563 0.369321 24.4277 0.540765C24.5992 0.712208 24.7352 0.915741 24.828 1.13974C24.9207 1.36374 24.9685 1.60383 24.9685 1.84629V22.1537C24.9685 22.3962 24.9207 22.6363 24.828 22.8603C24.7352 23.0843 24.5992 23.2878 24.4277 23.4592C24.2563 23.6307 24.0528 23.7667 23.8288 23.8595C23.6048 23.9522 23.3647 24 23.1222 24H17.5851V15.2486H18.8948C19.1935 15.2486 19.48 15.1299 19.6912 14.9187C19.9024 14.7075 20.0211 14.421 20.0211 14.1223V12.7029C20.0215 12.5548 19.9927 12.4082 19.9363 12.2713C19.8798 12.1345 19.7969 12.0101 19.6922 11.9054C19.5875 11.8008 19.4632 11.7178 19.3263 11.6614C19.1895 11.6049 19.0428 11.5761 18.8948 11.5766H17.6571V9.84C17.6571 8.28857 18.3599 8.28857 19.0611 8.28857H19.9645C20.1132 8.29515 20.2616 8.26891 20.3991 8.21173C20.5365 8.15456 20.6597 8.06783 20.7599 7.95771C20.8674 7.85539 20.9525 7.73185 21.0098 7.59493C21.067 7.458 21.0952 7.31067 21.0925 7.16229V5.79771C21.1018 5.49392 20.9902 5.19885 20.7823 4.97713C20.5744 4.75542 20.2871 4.62515 19.9834 4.61486H17.8611C17.2415 4.59139 16.6243 4.70273 16.052 4.94119C15.4797 5.17964 14.966 5.53952 14.5464 5.99594C14.1268 6.45237 13.8114 6.99447 13.6218 7.58476C13.4322 8.17506 13.3731 8.79947 13.4485 9.41486V11.5749H12.2656C12.1163 11.5726 11.968 11.6 11.8294 11.6556C11.6907 11.7112 11.5645 11.7938 11.4581 11.8986C11.3517 12.0034 11.2672 12.1284 11.2096 12.2661C11.1519 12.4039 11.1222 12.5518 11.1222 12.7011V14.124C11.1224 14.2734 11.1523 14.4212 11.2102 14.5589C11.2681 14.6966 11.3528 14.8214 11.4594 14.926C11.5659 15.0307 11.6922 15.1131 11.831 15.1685C11.9697 15.2238 12.118 15.2511 12.2674 15.2486H13.4485V24H2.81479C2.57233 24 2.33225 23.9522 2.10825 23.8595C1.88425 23.7667 1.68071 23.6307 1.50927 23.4592C1.33783 23.2878 1.20183 23.0843 1.10905 22.8603C1.01626 22.6363 0.968506 22.3962 0.968506 22.1537Z" fill="#BCBCBC"/>
                            </svg></a>
                            <a href={linkedin}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.12729 4.05127C5.58142 3.5916 5.83119 2.97757 5.82595 2.33952C5.80249 1.72019 5.53899 1.13306 5.08932 0.698193C4.63966 0.263324 4.0378 0.0135677 3.40683 0C2.77395 0.0133116 2.16991 0.262429 1.71713 0.696856C1.26436 1.13128 0.996732 1.71851 0.968506 2.33952C0.977482 2.97696 1.23556 3.58664 1.68938 4.0425C2.14321 4.49837 2.75807 4.76555 3.40683 4.7888C4.05657 4.77381 4.67436 4.50897 5.12729 4.05127ZM2.9562 7.94132C1.93091 7.91902 1.23225 7.90358 1.23225 9.13509V22.8429C1.23225 24.0486 1.89947 24.0246 2.86013 23.9886C3.0348 23.9818 3.2182 23.9749 3.40858 23.9749C3.60071 23.9749 3.78411 23.9818 3.95703 23.9886C4.9142 24.0229 5.56744 24.0486 5.56744 22.8429V9.13681C5.56744 7.9053 4.88276 7.91902 3.86271 7.94303C3.56058 7.94984 3.25833 7.94984 2.9562 7.94303V7.94132ZM10.0895 7.96705C9.62492 8.05795 9.32624 8.34953 9.32624 9.13509V22.8429C9.32624 24.0486 9.96726 24.0246 10.9297 23.9886C11.1043 23.9818 11.2912 23.9749 11.4851 23.9749C11.6807 23.9749 11.8659 23.9818 12.0423 23.9886C13.0099 24.0229 13.6632 24.0486 13.6632 22.8429V15.5327C13.6259 15.1591 13.67 14.7819 13.7924 14.4262C13.9148 14.0705 14.1128 13.7444 14.3732 13.4695C14.6336 13.1947 14.9506 12.9773 15.3031 12.8318C15.6555 12.6862 16.0354 12.6159 16.4177 12.6255C16.8017 12.6029 17.1862 12.6618 17.545 12.7982C17.9039 12.9346 18.2285 13.1453 18.497 13.416C18.7655 13.6866 18.9715 14.0108 19.1009 14.3666C19.2304 14.7224 19.2803 15.1014 19.2472 15.4779V22.7863C19.2472 23.9938 19.8865 23.9697 20.8489 23.9337C21.0236 23.9269 21.2105 23.92 21.4043 23.92C21.6 23.92 21.7851 23.9269 21.9615 23.9337C22.9239 23.968 23.5632 23.9938 23.5632 22.788V13.4299C23.599 12.6616 23.4697 11.8945 23.1837 11.1785C22.8977 10.4625 22.4615 9.81359 21.9033 9.27405C21.3451 8.7345 20.6776 8.31638 19.944 8.04687C19.2104 7.77736 18.4273 7.66251 17.6456 7.70977C16.8493 7.63864 16.0479 7.7694 15.3179 8.08954C14.5879 8.40967 13.9538 8.90846 13.4763 9.53816C13.4955 8.86238 13.2719 7.96705 12.7148 7.96705C12.5541 7.96705 12.3078 7.95847 12.0283 7.9499C11.3297 7.92931 10.4214 7.90187 10.0895 7.96705Z" fill="#BCBCBC"/>
                            </svg></a>
                            <a href={apple}><svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4334 2.24158C15.5605 2.12307 15.6626 1.98015 15.7333 1.82136C15.8041 1.66257 15.8421 1.49115 15.8452 1.31734C15.8482 1.14353 15.8163 0.970876 15.7512 0.809688C15.686 0.648499 15.5891 0.502076 15.4662 0.379152C15.3433 0.256228 15.1969 0.159322 15.0357 0.0942151C14.8745 0.0291084 14.7018 -0.00286528 14.528 0.000201461C14.3542 0.0032682 14.1828 0.0413125 14.024 0.112065C13.8652 0.182817 13.7223 0.284828 13.6038 0.412012L11.0148 3.00102C10.8876 3.11953 10.7856 3.26245 10.7148 3.42124C10.6441 3.58003 10.606 3.75144 10.603 3.92526C10.5999 4.09907 10.6319 4.27172 10.697 4.43291C10.7621 4.5941 10.859 4.74052 10.9819 4.86345C11.1048 4.98637 11.2513 5.08328 11.4125 5.14838C11.5736 5.21349 11.7463 5.24546 11.9201 5.2424C12.0939 5.23933 12.2653 5.20129 12.4241 5.13053C12.5829 5.05978 12.7258 4.95777 12.8443 4.83059L15.4334 2.24158ZM12.7788 6.42542C13.9333 6.2061 15.1277 6.35924 16.1896 6.86273C17.2515 7.36621 18.126 8.19402 18.6869 9.22672C18.7478 9.33862 18.7832 9.46262 18.7905 9.58981C18.7978 9.717 18.7769 9.84424 18.7292 9.96238C18.6815 10.0805 18.6083 10.1866 18.5147 10.2731C18.4211 10.3596 18.3096 10.4243 18.1881 10.4625C17.5519 10.6636 16.9961 11.0617 16.6012 11.5994C16.2062 12.1371 15.9924 12.7865 15.9909 13.4537V13.4675C15.9777 14.2322 16.2451 14.9753 16.7425 15.5563C17.2398 16.1373 17.9328 16.516 18.6903 16.6209C18.8109 16.6375 18.9266 16.6794 19.0298 16.7439C19.133 16.8084 19.2214 16.894 19.2892 16.995C19.357 17.0961 19.4027 17.2103 19.4232 17.3303C19.4438 17.4503 19.4387 17.5732 19.4084 17.6911C18.8984 19.6815 17.8622 21.4981 16.4086 22.9502C15.6716 23.6027 14.728 23.9741 13.744 23.9987C12.76 24.0233 11.7989 23.6997 11.0303 23.0848C10.814 22.9287 10.5538 22.8452 10.287 22.8465C10.0203 22.8477 9.76078 22.9336 9.54595 23.0917C8.74092 23.6991 7.74527 23.9987 6.73875 23.9363C5.73223 23.8739 4.78116 23.4538 4.05725 22.7517C2.18112 20.766 1.00529 18.2216 0.708802 15.5059C0.349585 13.4774 0.68784 11.3871 1.66846 9.57538C2.03666 8.8538 2.55111 8.21681 3.17903 7.70499C3.80695 7.19317 4.53459 6.81773 5.31559 6.60259C6.09659 6.38745 6.91384 6.33732 7.71528 6.4554C8.51672 6.57348 9.28478 6.85718 9.97055 7.28842C10.0791 7.3487 10.201 7.3809 10.3252 7.38211C10.4494 7.38332 10.5719 7.35348 10.6817 7.29532C11.3132 6.8637 12.0272 6.56752 12.7788 6.42542Z" fill="#BCBCBC"/>
                            </svg></a>
                            <a href={github}><svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.7335 0C11.1185 0 9.51931 0.318095 8.02726 0.936124C6.53521 1.55415 5.17949 2.46001 4.03753 3.60198C1.73122 5.90829 0.435547 9.03631 0.435547 12.2979C0.435547 17.7336 3.96505 22.3453 8.84733 23.981C9.46222 24.0793 9.65899 23.6981 9.65899 23.3661V21.2877C6.25246 22.0256 5.52689 19.6398 5.52689 19.6398C4.96118 18.2132 4.16182 17.832 4.16182 17.832C3.04271 17.0695 4.2479 17.0941 4.2479 17.0941C5.4777 17.1802 6.12949 18.3608 6.12949 18.3608C7.19941 20.2301 9.0072 19.6767 9.70818 19.3815C9.81886 18.5822 10.1386 18.0411 10.483 17.7336C7.75281 17.4262 4.88739 16.3685 4.88739 11.683C4.88739 10.318 5.35472 9.22344 6.15408 8.35029C6.0311 8.04284 5.60067 6.76386 6.27706 5.10364C6.27706 5.10364 7.31009 4.77159 9.65899 6.35803C10.6305 6.08747 11.6881 5.9522 12.7335 5.9522C13.7788 5.9522 14.8364 6.08747 15.808 6.35803C18.1569 4.77159 19.1899 5.10364 19.1899 5.10364C19.8663 6.76386 19.4358 8.04284 19.3129 8.35029C20.1122 9.22344 20.5795 10.318 20.5795 11.683C20.5795 16.3808 17.7018 17.4139 14.9594 17.7213C15.4021 18.1025 15.808 18.8527 15.808 19.9964V23.3661C15.808 23.6981 16.0047 24.0916 16.6319 23.981C21.5142 22.333 25.0314 17.7336 25.0314 12.2979C25.0314 10.6829 24.7133 9.08376 24.0953 7.59171C23.4772 6.09966 22.5714 4.74395 21.4294 3.60198C20.2874 2.46001 18.9317 1.55415 17.4397 0.936124C15.9476 0.318095 14.3485 0 12.7335 0Z" fill="#BCBCBC"/>
                            </svg></a>
                  </div>
                  <div id="self5">
                  {userdata && (
  <>
    {userName !== userdata.username && (
      <button id="Edit" onClick={getInTouch}>
        <img src="../../assets/images/pencil.png" alt="" id="pencil" />
        <p style={{ textDecoration: 'none' }}>Get in Touch</p>
      </button>
    )}
    {userName === userdata.username && (
      <button id="Edit" onClick={()=>{}}>
        <img src="../../assets/images/pencil.png" alt="" id="pencil" />
        <p style={{ textDecoration: 'none' }}>Edit Your Profile</p>
      </button>
    )}
  </>
)}
                    <h3 onClick={handleLogOut}>Log Out</h3>
                  </div>
                </div>
              </div>
              <div id="profileright" style={{width:"600px"}}>
                <div id="buttons">
                <Button style={{textDecoration: 'none'}}  className={selectedButton === 'bio' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('bio')}>Bio</Button>
                <Button style={{textDecoration: 'none'}}  className={selectedButton === 'project' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('project')}>Projects</Button>
                <Button style={{textDecoration: 'none'}}  className={selectedButton === 'course' ? 'now-selected' : 'not-selected'} onClick={() => handleButtonClick('course')}>Courses</Button> 
                </div>
                {selectedButton==='bio'&&(<Bio/>)}
                {selectedButton==='project'&&(<Project projects={projects} />)}
                {selectedButton==='course'&&(<Course courses={courses} />)}

              </div>
            </div>
          </>
      );
    };

    export default Profile;
