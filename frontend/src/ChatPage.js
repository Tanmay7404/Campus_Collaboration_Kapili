// ChatPage.js

import React, { useState } from 'react';
import './style.css'; // Import your stylesheet
import smile from './images/smile.svg';
import clip from './images/clip.svg';
import logo from './images/logo.svg';
import search from './images/search.svg';
import green from './images/green.jpg'
import io from 'socket.io-client';
import  { useEffect } from 'react';
// const socket=io('http://localhost:8080')
const ChatPage = ({ people, currentUser,current }) => {
  const [selectedPerson, setSelectedPerson] = useState(people[1]); // Initialize with the first person
  const [currentDate, setCurrentDate] = useState(new Date());
   // Track the current date
 const [userObjectId,setUserObjectId]=useState()
 const [chatList,setChatList]=useState([])
 const [userFriends, setUserFriends] = useState([]);


const fetchUserFriends = async () => {
  try {
    const response = await fetch('http://localhost:8080/getuserfriends/'+currentUser.name, {
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
    const firstResponse = await fetch('http://localhost:8080/chats/personalChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currUserId:selectedPerson.name,
         friendId: currentUser.name,
      }),
    });
    const userData = await firstResponse.json();

    const UserResponse = await fetch('http://localhost:8080/getUser/'+currentUser.name, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
     
    });
    
    
    setCurrChatId(userData)
    
    
    const userId = (await UserResponse.json())._id;
    const UserResponseasd = await fetch('http://localhost:8080/chats/getTotalChats/'+currentUser.name, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
     
    });
    setUserObjectId(userId)
    const ChatResponse = await fetch(`http://localhost:8080/chats/getAllMessages/${userData}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }); 
    var a=await ChatResponse.json()
     await fetchUserFriends()
  // setChatList(a)
  };

//   useEffect(() => {
//     console.log('connected to localhost')
//     const newSocket = io('http://localhost:8080'); // Replace with your server URL
    
//     setSocket(newSocket);
//     return () => newSocket.close();
// }, []);

// useEffect(() => {
//   if (!socket) return;

//   socket.on('message', message => {
//       setMessages(prevMessages => [...prevMessages, message]);
//   });

//   socket.on('messages', messages => {
//       setMessages(messages);
//   });

//   return () => {
//       socket.off('message');
//       socket.off('messages');
//   };
// }, [socket]);

  const handleMessageSend = (person) => {
  
  };
  const [currentMessage, setCurrentMessage] = useState(""); // Initialize with the first person
  
  
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const formattedDate = `${day}/${month}/${year}`;
  
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    if (formattedDate === today.toLocaleDateString('en-GB')) {
      return 'Today';
    } else if (formattedDate === yesterday.toLocaleDateString('en-GB')) {
      return 'Yesterday';
    } else {
      return formattedDate;
    }
  };
  const [searchValue, setSearchValue] = React.useState('');
  
  const handleMessage = (e) => {
    setCurrentMessage(e.target.value)
  };
  
  const handleInputChange2 = (e) => {
    setSearchValue(e.target.value);
  };
  const [currUser,setCurrUser]=useState()
 const [currChatId,setCurrChatId]=useState()

  const handleSubmit = async (e) => {
    try {
      // First fetch
    
      var link="http://localhost:8080/chats/addMessage/"+currChatId
      // Second fetch
      const secondResponse = await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender:userObjectId ,
          message: currentMessage,
        }),
      });
  
      const secondData = await secondResponse.json();
      
      // Handle success response for the second fetch
    } catch (error) {
      console.error('Error:', error);
      // Handle error for both fetch calls
    }
  };



  
  

  return (
    <div>
      <div id="layer1"></div>
      <div id="layer2"></div>
      <div id="main">
        {/* Left Panel - People */}
        <nav>
          <img src={logo} id="logo" alt="" />

          <div id="search">
            <input type="text" name="" id="" placeholder="Search" />
            <img src={search} alt="" />
          </div>
          <div id="nav-part2">
            <a href="#">Explore</a>
            <a href="#">Chats</a>
            <a href="#">Profile</a>
          </div>
        </nav>

        <div id="page1">
          <div id="left">
            <p>Chats</p>
            <div id="typeButton">
              <button id="personal">Personal</button>
              <button id="global">Global</button>
            </div>
            <div id="search2">
              <input type="text" name="" id="chats-search" placeholder="Search Chats" />
              <img src={search} alt="" />
            </div>
            <div id="persons">
              {people.map((person) => (
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
          </div>

          {/* Right Panel - Text Messages */}
          <div id="right">
            <div id="inf">
              <img
                src={selectedPerson.profilePic}
                className={`profilePic ${selectedPerson.id === currentUser.id ? 'me' : ''}`}
                alt=""
              />
              <span
                id="Name"
                style={{ textAlign: selectedPerson.id === currentUser.id ? 'right' : 'left' }}
              >
                {selectedPerson.name}
              </span>
              {/* <span className="line"></span> */}
              {/* {selectedPerson.lastSeen && !selectedPerson.isGroup && (
                <span id="last-seen" style={{ textAlign: 'right' }}>
                  Last seen {formatDate(selectedPerson.lastSeen.date)} {selectedPerson.lastSeen.time}
                </span>
              )} */}
              
            </div>
            <div id="chats">
              {selectedPerson.messages.map((message, index) => (
                <div
                  key={index}
                  className={`front ${message.senderId === currentUser.id ? 'me' : ''}`}
                >
                  {!index || (message.senderId !== selectedPerson.messages[index - 1]?.senderId) ? (
                    <inf
                    style={{
                      textAlign: message.senderId === currentUser.id ? 'right' : 'left',
                    }}

                    >
                      <img
                        src={
                          message.senderId === currentUser.id
                            ? currentUser.profilePic
                            : people.find((p) => p.id === message.senderId)?.profilePic
                        }
                        className={`profilePic ${message.senderId === currentUser.id ? 'me' : ''}`}
                        alt=""
                        style={{
                          float: message.senderId === currentUser.id ? 'right' : 'left',
                        }}
                      />
                      
                      <inf2
                        style={{
                          textAlign: message.senderId === currentUser.id ? 'right' : 'left',
                        }}

                      >
                        <div
                          id="Name"
                          style={{
                            textAlign: message.senderId === currentUser.id ? 'right' : 'left',
                          }}
                        >
                          {message.senderId === currentUser.id ? 'Me' : people.find((p) => p.id === message.senderId)?.name}
                        </div>
                        <inf3
                          style={{
                            textAlign: message.senderId === currentUser.id ? 'right' : 'left',
                          }}
                        >
                          <span className="date">{formatDate(message.date)}</span>
                          <span className="line"></span>
                          <span className="time">{message.time}</span>
                        </inf3>
                            
                      </inf2>
                      
                    </inf>
                  ) : null}
                  <div
                    className={`chat ${message.senderId === currentUser.id ? 'me' : ''}`}
                    // className="chat"
                    style={{ textAlign: message.senderId === currentUser.id ? 'right' : 'left' }}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div id="typingBox">
              <input type="text" name="" id="type" placeholder="Type your message..." value={currentMessage} onChange={handleMessage}/>
              <div id="attach">
                <button onClick={()=>{handleSubmit()}}>send</button>
                <img src={clip} id="clip" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
