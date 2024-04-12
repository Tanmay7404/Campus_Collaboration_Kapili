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
const socket=io('http://localhost:8080')
const ChatPage = () => {
  
  const{userdata}=useContext(UserdataContext);

  console.log(49);
  console.log(userdata._id);
  console.log(59);
  const [selectedPerson, setSelectedPerson] = useState(null); // Initialize with the first person
  const [currentDate, setCurrentDate] = useState(new Date());
 const [userObjectId,setUserObjectId]=useState(userdata._id)
 const [chatList,  setChatList]=useState([])
 const [searchQuery, setSearchQuery] = useState('');
 const [userFriends, setUserFriends] = useState([]);
 const [people, setPeopleData] = useState([]);
 const selectedPersonRef = useRef(selectedPerson);
 const [global,setGlobal]=useState(false);
 const [globalChats,setGlobalChats]=useState([]);
 const [globalPeople,setGlobalPeople]=useState([]);
 const divRef = useRef(null);

 const handleSearch = (e) => {
 
  setSearchQuery(e.target.value);
};

const filteredPeople = people.filter((person, index) => {
  if (person.name!=undefined) {
    console.log(person.name);

    return person.name.toLowerCase().includes(searchQuery.toLowerCase())
  } 
});
useEffect(()=>{
  console.log(searchQuery)

},[searchQuery])


 //const [getAllPeople,]
 useEffect(() => {
   selectedPersonRef.current = selectedPerson;
 }, [selectedPerson]);
const fetchUserFriends = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/getuserfriends/'+userdata.username, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
      // You can include additional headers or body if needed
    });

  
    const data = await response.json();
    setUserFriends(data);
  } catch (error) {
    console.error('Error fetching user friends:', error);
  }
};
  const handlePersonClick = async(person) => {
    setSelectedPerson(person);
console.log(person)
    // const firstResponse = await fetch('http://localhost:8080/chats/personalChat', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     currUserId:selectedPerson?.name,
    //      friendId: userdata.username,
    //   }),
    // });
    // const userData = await firstResponse.json();

    // const UserResponse = await fetch('http://localhost:8080/getUser/'+userdata.username, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
     
    // });
    setCurrChatId(person.chatId)
    
    // const userId = (await UserResponse.json())._id;
    // const UserResponseasd = await fetch('http://localhost:8080/chats/getTotalChats/'+userdata.username, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
     
    // });
  if(person.messages.length===0){
    const ChatResponse = await fetch(`http://localhost:8080/chats/getAllMessages/${person.chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }); 
    var chatMessages=await ChatResponse.json()
   setChatList(chatMessages)
updateMessagesForPerson(person.name,chatMessages)
}
else
{
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
      try {
        const response = await fetch('http://localhost:8080/user/getUserChatList/'+userdata.username, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
          // You can include additional headers or body if needed
        });
  
        const data = await response.json();
        setPeopleData(data)
        // console.log(121)
        // console.log(data)
        // console.log(121)

         setCount(prev=>prev+1)
        for (const peep of data){
          socket.emit("join_room",peep.chatId)
          
        }
        //setUserFriends(data);
      } catch (error) {
        console.error('Error fetching user friends:', error);
      }
      return;
    };
    fetchData(); // Call the fetchData function
  
  }, []);

  useEffect(()=>{
    if(divRef.current){
      divRef.current?.lastElementChild?.scrollIntoView();
    }
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
        console.log(121)
        console.log(data)
        console.log(121)
       //  setCount(prev=>prev+1)
        socket.emit("join_room",data.chatId)
        const ChatResponse = await fetch(`http://localhost:8080/chats/getAllMessages/${data.chatId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }); 
        var chatMessages=await ChatResponse.json()
       setGlobalChats(chatMessages)
      }
        //setUserFriends(data);
      } catch (error) {
        console.error('Error fetching user friends:', error);
      }
      return;
    };
    
    fetchGlobalData(); // Call the fetchData function
  
  }, [global]);
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
    console.log('global received message')
    console.log(131)
    console.log(userdata.username)
    console.log(message.name)
    console.log(131)
    console.log(12)
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

  return () => {
    socket.off('receive_message');
    socket.off('receive_global_message');
  };
}, [socket]);

  
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
        }),
      });
      
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      if(global){
        console.log("global")
        const newMessage = {
          senderName: userdata.username,
          message: currentMessage,
          timestamp: formattedDate,
          img:currentImage
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
            img:currentImage

          })
          const newMessage = {
            senderName: userdata.username,
            message: currentMessage,
            timestamp: formattedDate,
            img:currentImage
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
              <input type="text" name="" id="chats-search" placeholder="Search Chats" 
              value={searchQuery}
              onChange={handleSearch}
              
              />
              <img src={search} alt="" />
            </div>)}





            {!global && (
        <div id="persons">
          {searchQuery === ''
            ? people.map((person) => (
                <div
                  key={person.id}
                  className="person"
                  onClick={() => handlePersonClick(person)}
                >
                  <img src={person.profilePic} alt="" className="profilePic" />
                  {person.name}
                </div>
              ))
            : filteredPeople.map((person) => (
                <div
                  key={person.id}
                  className="person"
                  onClick={() => handlePersonClick(person)}
                >
                  <img src={person.profilePic} alt="" className="profilePic" />
                  {person.name}
                </div>
              ))}
        </div>
      )}



          </div>
          <div id="right">
          {!global&&(
            <div id="chatinf">
              <img
                src={selectedPerson?.profilePic}
                className={`profilePic ${selectedPerson?.id === userdata._id ? 'me' : ''}`}
                alt=""
              />
              <span
                id="Name"
                style={{ textAlign: selectedPerson?.id === userdata._id ? 'right' : 'left' }}
              >
                {selectedPerson?.name}
              </span>
             
           
            </div>
               )}
                {global&&(
                  <div id="chatinf">
                    <img
                      src={selectedPerson?.profilePic}
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
              {!global&&chatList?.map((message, index) => (
                <div
                  key={index}
                  className={`front ${message.senderName=== userdata.username ? userdata.username : ''}`}
                >
                  {!index || (message.senderName !== chatList[index-1]?.senderName) ? (
                    <inf
                    style={{
                      textAlign: message.senderName === userdata.username ? 'right' : 'left',
                      
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

                    {message.message&&
                  <div
                    className={`chat ${message.senderName === userdata.username ? 'me' : ''}`}
                    // className="chat"
                    style={{ textAlign: message.senderName === userdata.username ? 'right' : 'left' }}
                  >
                    <p>{ message.message}</p>
                  </div>}
                  {message.img&&
                  <div
                    className={`chat ${message.senderName === userdata.username ? 'me' : ''}`}
                    // className="chat"
                    style={{ textAlign: message.senderName === userdata.username ? 'right' : 'left' }}
                  >
                    <img src={message.img} alt="Uploaded content" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                  </div>}




                </div>
              ))}
               {global&&globalChats?.map((message, index) => (
                console.log(message.senderName),
                <div
                  key={index}
                  className={`front ${message.senderName=== userdata.username ? userdata.username : ''}`}
                >
                  {!index || (message.senderName !== globalChats[index-1]?.senderName) ? (
                    <inf
                    style={{
                      textAlign: message.senderName === userdata.username ? 'right' : 'left',
                      
                    }}

                    >
                      <img
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
                          {message.senderName === userdata.username ? 'Me' : globalPeople.find((p) => p.name === message.senderName)?.name}
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
                  {message.message&&
                  <div
                    className={`chat ${message.senderName === userdata.username ? 'me' : ''}`}
                    // className="chat"
                    style={{ textAlign: message.senderName === userdata.username ? 'right' : 'left' }}
                  >
                    <p>{ message.message}</p>
                  </div>}
                  {message.img&&
                  <div
                    className={`chat ${message.senderName === userdata.username ? 'me' : ''}`}
                    // className="chat"
                    style={{ textAlign: message.senderName === userdata.username ? 'right' : 'left' }}
                  >
                    <img src={message.img} alt="Uploaded content" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                  </div>}
                </div>
              ))}
              
            </div>
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
          </div>
        </div>
      </div>
      </>
  );
};

export default ChatPage;

