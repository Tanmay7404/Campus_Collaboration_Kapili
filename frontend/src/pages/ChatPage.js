// ChatPage.js

import React, { useState } from 'react';
import './ChatPage.css'; // Import your stylesheet
import smile from '../assets/images/smile.svg';
import clip from '../assets/images/clip.svg';
import logo from '../assets/images/logo.svg';
import search from '../assets/images/search.svg';
import io from 'socket.io-client';
import Axios from 'axios';
import  { useEffect ,useRef,useContext} from 'react';
import UserdataContext from '../userdataContext';
import { useModel } from './../tsModelContext'; // import the useModel hook
import earth from '../assets/images/5267307.webp';
import default_img from '../assets/images/discord-profile-pictures-jktaycg4bu6l4s89.jpg';

// import * as tf from '@tensorflow/tfjs'

// import {load } from '@tensorflow-models/toxicity'
import { useNavigate, useSearchParams } from "react-router-dom";


const socket=io('http://localhost:8080')
const ChatPage = () => {
  const model = useModel(); // access the model from the context
  const [currUser,setCurrUser] =useState(null);
   const navigate=useNavigate()
  useEffect(()=>{
      const loggedInUser = localStorage.getItem("user");
         if (loggedInUser) {
             
         //   const foundUser = JSON.parse(loggedInUser);
           setCurrUser(loggedInUser);
         } else
         {
navigate('/login')
         }
  },[])

  useEffect(() => {
    // Use the model in your component
    if (model) {
      console.log("Model loaded:", model);
      // Make predictions using the model
    }
  }, [model]);
  const{userdata}=useContext(UserdataContext);

  const [selectedPerson, setSelectedPerson] = useState(null); // Initialize with the first person
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userObjectId, setUserObjectId] = useState(userdata ? userdata._id : null);
  const [chatList,  setChatList]=useState([])

  const[friend,setfriend]=useState(false);
  const[globalcha,setglobalcha]=useState(false);
  const[cha,setcha]=useState(false);

 const [searchQuery, setSearchQuery] = useState('');
 const [userFriends, setUserFriends] = useState([]);
 const [people, setPeopleData] = useState([]);
 const selectedPersonRef = useRef(selectedPerson);
 const [global,setGlobal]=useState(false);
 const [globalChats,setGlobalChats]=useState([]);
 const [globalPeople,setGlobalPeople]=useState([]);
 const divRef = useRef(null);
 let [searchParams, setSearchParams] = useSearchParams();
 let [query, setQuery] = useState(
  searchParams.get("name")
);

 const handleSearch = (e) => {
 
  setSearchQuery(e.target.value);
};

useEffect(()=>{
  console.log(people);
  console.log('halwa');
  console.log(selectedPerson?.name);
},[people])


const filteredPeople = people.filter((person, index) => {
  if (person.name!=undefined) {
   // console.log(person.name);

    return person.name.toLowerCase().includes(searchQuery.toLowerCase())
  } 
});

 useEffect(() => {
   selectedPersonRef.current = selectedPerson;

 }, [selectedPerson]);

const acceptUserCollaborate = async(curr) => {
  const link = "http://localhost:8080/projects/addNewCollaborator/" + curr.senderName+"/"+curr.name ;
  console.log(link);
  const response = await fetch(link, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
  });
  const link3 = "http://localhost:8080/chats/deleteMessage/" + currChatId + "/" + curr._id;
      console.log(link3);
      const deleteResponse = await fetch(link3, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });
      setChatList(currentChatList => {
        const updatedChatList = currentChatList.filter(msg => msg._id !== curr._id);
        return updatedChatList;
     
    });
     setPeopleData(prevPeople => {
       const updatedPeople = prevPeople.map(person => {
         if (person.chatId === currChatId) {
           const updatedMessages = person.messages.filter(msg => msg._id !== curr._id);
           return { ...person, messages: updatedMessages };
         }
         return person;
       });
  
  
       return updatedPeople;
     });

}
const rejectUserCollaborate = async(curr) => {
  setChatList(currentChatList => {
    const updatedChatList = currentChatList.filter(msg => msg._id !== curr._id);
    return updatedChatList;
 
});
 setPeopleData(prevPeople => {
   const updatedPeople = prevPeople.map(person => {
     if (person.chatId === currChatId) {
       const updatedMessages = person.messages.filter(msg => msg._id !== curr._id);
       return { ...person, messages: updatedMessages };
     }
     return person;
   });


   return updatedPeople;
 });
}
  const handlePersonClick = async(person) => {
    setSelectedPerson(person);
      setSearchParams({name:person.name})
      console.log(person)
  


      setCurrChatId(person.chatId)
      if(person.messages.length===0){
        const ChatResponse = await fetch(`http://localhost:8080/chats/getAllMessages/${person.chatId}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    }); 
        var chatMessages=await ChatResponse.json()
        setChatList(chatMessages)
        setcha(true);
        updateMessagesForPerson(person.name,chatMessages)
}
else
{setcha(true);
  setChatList(person.messages)

}
  };

// Function to sort people array by lastMessageTime
const sortPeopleByLastMessageTime = (peopleArray) => {
  return peopleArray.slice().sort((a, b) => {
      // If one of the persons doesn't have lastMessageTime, move it to the end
      if (!a.lastMessageTime) return 1;
      if (!b.lastMessageTime) return -1;

      // Compare lastMessageTime to determine order
      return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
  });
};
const [count,setCount]=useState(0)
// Call the sort function whenever people array changes
useEffect(() => {
  console.log('deed')
  setPeopleData(prevPeople => sortPeopleByLastMessageTime(prevPeople));
}, [count]);


  const updateMessagesForPerson = (personName, newMessages) => {
    setPeopleData(prevPeople => {
      // Find the index of the person in the people array
      const index = prevPeople.findIndex(person => person.name === personName);
      if (index === -1) {
        console.error(`Person with name '${personName}' not found.`);
        return prevPeople; // Return the original state if person not found
      }
  
      // Create a new array with the updated person object
      const updatedPeople = [...prevPeople];
      updatedPeople[index] = {
        ...updatedPeople[index], // Copy the existing person object
        messages: newMessages // Update the messages array
      };
  
      return updatedPeople; // Return the updated state
    });
  };

  const updateMessageForPerson = (personName, newMessage) => {

    setPeopleData(prevPeople => {
      // Find the index of the person in the people array
      const index = prevPeople.findIndex(person => person.name === personName);
      if (index === -1) {
        console.error(`Person with name '${personName}' not found.`);
        return prevPeople; // Return the original state if person not found
      }
      // Create a new array with the updated person object
      const updatedPeople = [...prevPeople];


      updatedPeople[index] = {
        ...updatedPeople[index], // Copy the existing person object
        messages: [...updatedPeople[index].messages,newMessage] // Update the messages array by appending new messages
      };
  
      return updatedPeople; // Return the updated state
    });
  };

  const updateMessageForChatId = (chatId, newMessage) => {
    setPeopleData(prevPeople => {
      // Find the index of the person in the people array
      const index = prevPeople.findIndex(person => person.chatId === chatId);
      if (index ===-1) {
        console.error(` ChatID '${chatId}' not found.`);
        return prevPeople; // Return the origi  nal state if person not found
      }
  console.log('execution '+chatId)
      // Create a new array with the updated person object
      const updatedPeople = [...prevPeople];
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      if(updatedPeople[index].messages.length>0){
      console.log('im wrong')
      updatedPeople[index] = {
        ...updatedPeople[index], // Copy the existing person object
        messages: [...updatedPeople[index].messages,newMessage],
        lastMessageTime:formattedDate  // Update the messages array by appending new messages
      };
   }else{
    console.log('here man')
   updatedPeople[index] = {
    ...updatedPeople[index], // Copy the existing person object
    lastMessageTime:formattedDate  // Update the messages array by appending new messages
  };}
      return updatedPeople; // Return the updated state
    });
  };
 
  useEffect(() => {
    const fetchData = async () => {
    
      if(userdata){
      try {

        console.log("fetching")
        const response = await fetch('http://localhost:8080/user/getUserChatList/'+userdata.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
          // You can include additional headers or body if needed
        });
  
        const data = await response.json();
        setPeopleData(data)
        setfriend(true);
         setCount(prev=>prev+1)
        for (const peep of data){
          socket.emit("join_room",peep.chatId)
          
        }

        const pson=await data.findIndex(person=>person.name==query);
        console.log(pson);
        console.log("query"+query)
        if(pson!=-1)
        {
          //setSelectedPerson(pson)
          handlePersonClick(data[pson]);
        }
        //setUserFriends(data);
      } catch (error) {
        console.error('Error fetching user friends:', error);
      }
      return;
    };}
    fetchData(); // Call the fetchData function
    
  }, [userdata]);

  useEffect(()=>{
    if(divRef.current){
      divRef.current?.lastElementChild?.scrollIntoView();
    }
    console.log("global "+global)
  },[chatList,globalChats,global]);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        if(global==true && globalPeople.length===0){

        const response = await fetch('http://localhost:8080/user/getGlobalChatList/' + userdata.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setGlobalPeople(data.profiles)
        setCurrChatId(data.chatId)
      
        socket.emit("join_room",data.chatId)
        const ChatResponse = await fetch(`http://localhost:8080/chats/getAllMessages/${data.chatId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }); 
        var chatMessages=await ChatResponse.json()
       setGlobalChats(chatMessages)
       setglobalcha(true)
      }
        //setUserFriends(data);
      } catch (error) {
        console.error('Error fetching user friends:', error);
      }
      return;
    };
    
    fetchGlobalData(); // Call the fetchData function
  
  }, [global,currUser]);
//   useEffect(() => {
//     console.log('connected to localhost')
//     const newSocket = io('http://localhost:8080'); // Replace with your server URL
    
//     setSocket(newSocket);
//     return () => newSocket.close();
// }, []);

useEffect(() => {
  if (!socket ) return;
console.log('socker')
  socket.on('receive_message', message => {
    console.log('received message')
    if(selectedPersonRef.current){ 
          if(selectedPersonRef.current.chatId===message.chatId){setChatList(prevMessages => [...prevMessages, message.message])};
    }
updateMessageForChatId(message.chatId,message.message)
     setCount(prev=>prev+1)
      // updateMessageForPerson(.name,{
      //   senderName:userdata.username,
      //   message:currentMessage,
      //   timestamp:formattedDate
      //  })
  });
  socket.on('receive_global_message', message => {
      if(userdata.username!==message.name){setGlobalChats(prevMessages => [...prevMessages, message.message])};

      // updateMessageForPerson(.name,{
      //   senderName:userdata.username,
      //   message:currentMessage,
      //   timestamp:formattedDate
      //  })
  });
  // socket.on('messages', messages => {
  //     setMessages(messages);
  // });
  socket.on('checked_spam', async(message) => {
    //if not spam then proceed
    try{
    const link = "http://localhost:8080/chats/deleteMessage/" + message.chatId + "/" + message.message._id;
    console.log(link);
    await fetch(link, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
    window.alert("Deleted message due to spam content");
    deleteChatGlobalAndUser(message);
    }
    catch(err){
      console.log(err);
      window.alert("Error in deleting message");
    }


    
});
  
  socket.on('delete_message', message => {
 
      console.log("received")
      console.log(message)
  //     setChatList(currentChatList => {
  //       const updatedChatList = currentChatList.filter(msg => msg._id !== message.message._id);
  //       return updatedChatList;
     
  //  });
  deleteChatGlobalAndUser(message)
  //  };

});


  return () => {
    socket.off('receive_message');
    socket.off('receive_global_message');
    socket.off('delete_message');
    socket.off('checked_spam');

       // socket.off('delete_chat_message')

  };
}, [socket]);
function deleteChatGlobalAndUser(message) {
  console.log("deleteing")
 
   console.log("global mdoe")
    setGlobalChats(currentChatList=>{
     console.log(currentChatList)

     const updatedChatList = currentChatList.filter(msg => msg._id !== message.message._id);

      return updatedChatList;
    })
 
    setChatList(currentChatList => {
      const updatedChatList = currentChatList.filter(msg => msg._id !== message.message._id);
      return updatedChatList;
   
  });
   setPeopleData(prevPeople => {

     const updatedPeople = prevPeople.map(person => {
       if (person.chatId === message.chatId) {

         console.log('person here')
console.log(person)
         console.log('here')
         const updatedMessages = person.messages.filter(msg => msg._id !== message.message._id);
         console.log(updatedMessages)
         return { ...person, messages: updatedMessages };
       }
       return person;
     });
  

     return updatedPeople;
   });
  
}
  
  const [currentMessage, setCurrentMessage] = useState(""); // Initialize with the first person
  
  
  
  const handleMessage = (e) => {
    setCurrentMessage(e.target.value)
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentMessage.trim() !== '') {
      handleSubmit()
    }
  };

 const [currChatId,setCurrChatId]=useState("")
 const [currentImage,setcurrentImage]=useState("")


//  const uploadImage = async (files) => {
//   try {
//     console.log("execution");
//     const formData1 = new FormData();
//     formData1.append("file", files[0]);
//     formData1.append("upload_preset", "hv9vnkse");

//     const res = await Axios.post("https://api.cloudinary.com/v1_1/dcsdkvzcq/image/upload", formData1);
//     console.log(res.data);
//     setcurrentImage(res.data.secure_url);
//   } catch (err) {
//     console.error(err);
//   }
// };



const uploadChatImages = async (files) => {

  const uploadImage = async (index) => {
    if (index < files.length) {
      const formData1 = new FormData();
      formData1.append("file", files[index]);
      formData1.append("upload_preset", "hv9vnkse");
      try {
        console.log(index)
        const res = await Axios.post("https://api.cloudinary.com/v1_1/dcsdkvzcq/image/upload", formData1);
        console.log(res.data);
        setcurrentImage(res.data.secure_url);
        await uploadImage(index + 1);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
    }
    await uploadImage(0);
  }; 


useEffect(()=>{
  if(currentImage!==""){
    console.log(currentImage);
    handleSubmit();
  }
},[currentImage])

const [currentMessageList, setCurrentMessageList] = useState([]);


const checkToxicity = async (currentMessage, newMessage, message_id) => {
  try {
    const predictions = await model.classify([currentMessage]);
    console.log(
      "toxic",predictions[6].results[0].match);
      console.log(
        "sexual",predictions[4].results[0].match);
        console.log(
          "threat",predictions[5].results[0].match);
    if (predictions[6].results[0].match === true ||predictions[4].results[0].match === true ||predictions[5].results[0].match === true) {
      socket.emit("delete_chat_message", {
        room: currChatId,
        message: newMessage,
        username: userdata.username
      });
      const link = "http://localhost:8080/chats/deleteMessage/" + currChatId + "/" + message_id;
      console.log(link);
      const deleteResponse = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });

    }
  } catch (error) {
    console.error('Error:', error);
    // Handle error
  }
};

const handleMessageClassification = async () => {
  for (const message of currentMessageList) {
    await checkToxicity(message.currentMessage, message.newMessage, message.message_id);
    setCurrentMessageList(prevList => prevList.filter(msg => msg.message_id !== message.message_id));

 

  }
};

// This effect will trigger whenever currentMessageList changes
useEffect(() => {
  if (currentMessageList.length > 0) {
    handleMessageClassification();
  }
}, [currentMessageList]);



  const handleSubmit = async (e) => {
    try {

      var link="http://localhost:8080/chats/addMessage/"+currChatId
      // Second fetch
      const secondResponse = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender:userObjectId ,
          senderName:userdata.username,
          message: currentMessage,
          img:currentImage,
          messageType:1

        }),
      });
      const message_id = await secondResponse.json();

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      if(global){
        console.log("global")
        const newMessage = {
          senderName: userdata.username,
          message: currentMessage,
          timestamp: formattedDate,
          img:currentImage,
          _id:message_id,
          messageType:1
        };
        socket.emit("send_global_message",{room:currChatId,message:newMessage,username:userdata.username})
      
        setGlobalChats(prevList => {
    
          return [...prevList, newMessage];
        });
      }
      else{
          updateMessageForPerson(selectedPerson.name,{
            senderName:userdata.username,
            message:currentMessage,
            timestamp:formattedDate,
            img:currentImage,
            _id:message_id,
            messageType:1


          })
          const newMessage = {
            senderName: userdata.username,
            message: currentMessage,
            timestamp: formattedDate,
            img:currentImage,
            _id:message_id,
            messageType:1

          };
          setCount(prev=>prev+1)
          setChatList(prevList => {
            
            return [...prevList, newMessage];
          });
            socket.emit("send_chat_message",{room:currChatId,message:newMessage,username:userdata.username})
            // const secondData = await secondResponse.json();
          // Handle success response for the second fetch
      }   
      if(currentMessage!=="") setCurrentMessage("");
      else if(currentImage!=="")setcurrentImage("");
      
      setCurrentMessageList(prevList => [
        ...prevList,
        {
          currentMessage,
          newMessage: {
            senderName: userdata.username,
            message: currentMessage,
            timestamp: formattedDate,
            img: currentImage,
            _id: message_id,
            messageType:1


          },
          message_id
        }
      ]);
     

    } catch (error) {
      console.error('Error:', error);
      // Handle error for both fetch calls
    }
  };



  
  

  return (
    <>
    <div id= "chatlayer0"></div>
    <div id= "chatlayer1"></div>
    <div id= "chatlayer2"></div>
    <div id= "chatsmain">
        {/* Left Panel - People */}
       
        <div id="chatpage1">
          <div id="left">
            <p>Chats</p>
            <div id="typeButton">
              <button id={global ? "global" : "personal"} onClick={()=>{
                setGlobal(false)
              }}>Personal</button>
              <button id={global ? "personal" : "global"} onClick={()=>{
                setGlobal(true)
              }}>Global</button>
            </div>



            
            {/* {!global&&( */}
              {(
            <div id="search2">
              <input type="text" name="" id="chats-search" placeholder={global?"Search Users":"Search Friends/Projects"} 
              value={searchQuery}
              onChange={handleSearch}
              
              />
              <img src={search} alt="" />
            </div>)}





            {!global && (
            <div id="persons">
              {!friend ? (
                <div className="loader-container">
                  <div className="loader"></div>
                  <h1>Loading...</h1>
                </div>
              ) : (
                searchQuery === '' ? (
                  <React.Fragment>
                    {people.length === 0 ? (
                      <div className="friend-list" >
                        <h4>Add friends to start chat</h4>
                      </div>
                    ) : (
                      people.map((person, index) => (
                        <div
                          key={index}
                          className={selectedPerson?.name === person.name ? "personsel" : "person"}
                          onClick={() => handlePersonClick(person)}
                        >
                          <img src={person.profilePic ? person.profilePic : default_img} alt="" className="profilePic" />
                          {person.name}
                        </div>
                      ))
                    )}
                  </React.Fragment>
                ) : (
                  filteredPeople.map((person, index) => (
                    <div
                      key={index}
                      className="person"
                      onClick={() => handlePersonClick(person)}
                    >
                      <img key={index} src={person.profilePic ? person.profilePic : default_img} alt="" className="profilePic" />
                      {person.name}
                    </div>
                  ))
                )
              )}
            </div>
            )}




          </div>
          <div id="right">
          {!global&&userdata&&cha&&(
            <div id="chatinf">
              <div onClick={()=>{if(selectedPerson.profileType==='User'){
                navigate("/profile/"+selectedPerson?.name  )}else if(selectedPerson.profileType==='Project')
            {
              const encodedName = encodeURIComponent(selectedPerson?.name);
              const encodedUserName = encodeURIComponent(userdata.username);

              navigate(`/profile/${encodedUserName}?type=Project&name=${encodedName}`);

             // navigate("/profile/"+userdata.username+"?name="+selectedPerson?.name+"&?type=Project"  )
            }else
            {
              const encodedName = encodeURIComponent(selectedPerson?.name);
              const encodedUserName = encodeURIComponent(userdata.username);

              navigate(`/profile/${encodedUserName}?type=Course&name=${encodedName}`);
            }
            
            
            }}>
              <img
                src={selectedPerson?.profilePic}
                className={`profilePic ${selectedPerson?.id === userdata._id ? 'me' : ''}`}
                alt=""
              />
              </div>
              <span
                id="Name"
                style={{ textAlign: selectedPerson?.id === userdata._id ? 'right' : 'left' }}
              >
                {selectedPerson?.name}
              </span>
             
           
            </div>
               )}
                {global&&userdata&&(
                  <div id="chatinf">
                    <img
                      src={earth}
                      className={`profilePic ${selectedPerson?.id === userdata._id ? 'me' : ''}`}
                      alt=""
                    />
                    <span
                      id="Name"
                      style={{ textAlign: selectedPerson?.id === userdata._id ? 'right' : 'left' }}
                    >
                      Global Chat
                    </span>
                  

                  </div>
                )}
            <div id="chats" style={{height:'65vh'}} ref={divRef}>
              
            {!global && !cha ? (
  <div className="front" style={{ textAlign: 'center',marginTop: '170px' }}>
    <div>Send And Reciceve Messages </div>
    
  </div>
) : (
  chatList?.map((message, index) => (
    <div
      key={index}
      className={`front ${message.senderName === userdata.username ? userdata.username : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: message.senderName === userdata.username ? 'end' : 'start',
        borderRadius: '7px',
      }}
    >
      {!index || (message.senderName !== chatList[index - 1]?.senderName) ? (
        <inf
          style={{
            textAlign: message.senderName === userdata.username ? 'right' : 'left',
            borderRadius: '7px',
          }}
        >
          <img
            src={
              message.senderName === userdata.username
                ? userdata.profileInfo.profilePicture.url
                : people.find((p) => p.name === message.senderName)?.profilePic
            }
            className={`profilePic ${message.senderName === userdata.username ? 'me' : ''}`}
            alt=""
            style={{
              float: message.senderName === userdata.username ? 'right' : 'left',
            }}
          />
          <inf2
            style={{
              textAlign: message.senderName === userdata.username ? 'right' : 'left',
            }}
          >
            <div
              id="Name"
              style={{
                textAlign: message.senderName === userdata.username ? 'right' : 'left',
              }}
            >
              {message.senderName === userdata.username ? 'Me' : people.find((p) => p.name === message.senderName)?.name}
            </div>
            <inf3
              style={{
                textAlign: message.senderName === userdata.username ? 'right' : 'left',
              }}
            >
              <span className="date">{new Date(message.timestamp).toLocaleDateString()}</span>
              <span className="line"></span>
              <span className="time">{new Date(message.timestamp).toLocaleTimeString()}</span>
            </inf3>
          </inf2>
        </inf>
      ) : null}
      {message.message && message.messageType !== 2 && (
        <div
          className={`chat ${message.senderName === userdata.username ? 'me' : ''}`}
          style={{ textAlign: message.senderName === userdata.username ? 'right' : 'left' }}
        >
          <p>{message.message}</p>
        </div>
      )}
      {message.img && message.messageType !== 2 && (
        <div
          className={`chat ${message.senderName === userdata.username ? 'me' : ''}`}
          style={{ textAlign: message.senderName === userdata.username ? 'right' : 'left' }}
        >
          <img src={message.img} alt="Uploaded content" style={{ maxHeight: '300px', borderRadius: '8px' }} />
        </div>
      )}
      {message.message && message.messageType === 2 && (
        <div
          className={`chat ${message.senderName === userdata.username ? 'me' : ''}`}
          style={{ textAlign: message.senderName === userdata.username ? 'right' : 'left' }}
        >
          <p>{message.message}</p>
          <div>
            <button onClick={() => { console.log(selectedPerson.name); acceptUserCollaborate({ senderName: message.senderName, name: selectedPerson.name, _id: message._id }) }}>Accept</button>
            <button onClick={() => { rejectUserCollaborate({ senderName: message.senderName, name: selectedPerson.name, _id: message._id }) }}>Decline</button>
          </div>
        </div>
      )}
    </div>
  ))
)}

                {global && (
  !globalcha? (
    <div className="loader-container">
      <div className="loader"></div>
      <h1>Loading...</h1>
    </div>
  ) : (
    globalChats?.map((message, index) => (
      console.log(message),
      // Check if searchQuery is empty or senderName matches searchQuery
      (!searchQuery || message.senderName.toLowerCase().includes(searchQuery.toLowerCase())
    ) && (
        <div
          key={index}
          className={`front ${message.senderName === userdata.username ? userdata.username : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: message.senderName === userdata.username ? 'end' : 'start',
            borderRadius: '7px',
          }}
        >
          {!index || (message.senderName !== globalChats[index - 1]?.senderName) ? (
            <inf
              key={index}
              style={{
                textAlign: message.senderName === userdata.username ? 'right' : 'left',
                borderRadius:'7px',
              }}
            >
              <div onClick={()=>{navigate("/profile/"+message.senderName)}}>
                <img
                  key={index}
                  src={
                    message.senderName === userdata.username
                      ? userdata.profileInfo.profilePicture.url
                      : globalPeople.find((p) => p.name === message.senderName)?.profilePic
                  }
                  className={`profilePic ${message.senderName === userdata.username ? 'me' : ''}`}
                  alt=""
                  style={{
                    float: message.senderName === userdata.username ? 'right' : 'left',
                  }}
                />
              </div>
              <inf2
                key={index}
                style={{
                  textAlign: message.senderName === userdata.username ? 'right' : 'left',
                }}
              >
                <div
                  key={index}
                  id="Name"
                  style={{
                    textAlign: message.senderName === userdata.username ? 'right' : 'left',
                  }}
                >
                  {message.senderName === userdata.username ? 'Me' : globalPeople.find((p) => p.name === message.senderName)?.name}
                </div>
                <inf3
                  key={index}
                  style={{
                    textAlign: message.senderName === userdata.username ? 'right' : 'left',
                  }}
                >
                  <span className="date">{new Date(message.timestamp).toLocaleDateString()}</span>
                  <span className="line"></span>
                  <span className="time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                </inf3>
              </inf2>
            </inf>
          ) : null}
          {message.message && (
            <div
              key={index}
              className={`chat ${message.senderName === userdata.username ? 'me' : ''}`}
              style={{ textAlign: message.senderName === userdata.username ? 'right' : 'left' }}
            >
              <p>{message.message}</p>
            </div>
          )}
          {message.img && (
            <div
              key={index}
              className={`chat ${message.senderName === userdata.username ? 'me' : ''}`}
              style={{ textAlign: message.senderName === userdata.username ? 'right' : 'left' }}
            >
              <img src={message.img} alt="Uploaded content" style={{ maxHeight: '300px', borderRadius: '8px' }} />
            </div>
          )}
        </div>
      )
    
    ))
  )
)}

              
            </div>
            {global&&(
            <div id="typingBox" >
               <textarea type="text" name="" id="type" placeholder="Type your message..." value={currentMessage} onChange={handleMessage}onKeyDown={handleKeyPress}/>
              <div id="attach">
              <div onClick={() => {handleSubmit()}}>
                  <i className="bi bi-send clickable-icon" style={{ fontSize: '25px', marginBottom: '9px'  }}></i>
              </div>
              <div>
                <input type="file" id="fileInput3" name="fileInput3" hidden  multiple  onChange={(event) => {
                  uploadChatImages(event.target.files);

                }}/>
                <label htmlFor="fileInput3" style={{ cursor: 'pointer' }}>
                  <i className="bi bi-images clickable-icon" style={{ fontSize: '25px', marginBottom: '9px' }}></i>
                </label>
              </div>

              </div>  
            </div>
            )}

            {!global&&cha&&(
            <div id="typingBox" >
               <textarea type="text" name="" id="type" placeholder="Type your message..." value={currentMessage} onChange={handleMessage}onKeyDown={handleKeyPress}/>
              <div id="attach">
              <div onClick={() => {handleSubmit()}}>
                  <i className="bi bi-send clickable-icon" style={{ fontSize: '25px', marginBottom: '9px'  }}></i>
              </div>
              <div>
                <input type="file" id="fileInput3" name="fileInput3" hidden  multiple  onChange={(event) => {
                  uploadChatImages(event.target.files);

                }}/>
                <label htmlFor="fileInput3" style={{ cursor: 'pointer' }}>
                  <i className="bi bi-images clickable-icon" style={{ fontSize: '25px', marginBottom: '9px' }}></i>
                </label>
              </div>

              </div>  
            </div>
            )}

          </div>
        </div>
      </div>
      </>
  );
};

export default ChatPage;






























































