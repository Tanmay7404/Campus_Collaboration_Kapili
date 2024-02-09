// ChatPage.js

import React, { useState } from 'react';
import './style.css'; // Import your stylesheet
import smile from './images/smile.svg';
import clip from './images/clip.svg';
import logo from './images/logo.svg';
import search from './images/search.svg';
import green from './images/green.jpg'
import io from 'socket.io-client';

const ChatPage = ({ people, currentUser,current }) => {
  const [selectedPerson, setSelectedPerson] = useState(people[1]); // Initialize with the first person
  const [currentDate, setCurrentDate] = useState(new Date()); // Track the current date
  const handlePersonClick = (person) => {
  
    setSelectedPerson(person);
  };

  useEffect(() => {
    console.log('connected to localhost')
    const newSocket = io('http://localhost:8080'); // Replace with your server URL
    
    setSocket(newSocket);
    return () => newSocket.close();
}, []);

useEffect(() => {
  if (!socket) return;

  socket.on('message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
  });

  socket.on('messages', messages => {
      setMessages(messages);
  });

  return () => {
      socket.off('message');
      socket.off('messages');
  };
}, [socket]);

  const handleMessageSend = (person) => {
  
  };
  const [currentMessage, setCurrentMessage] = useState(""); // Initialize with the first person
  
  
  const formatDate = (dateString) => {
    const messageDate = new Date(dateString);
    const daysAgo = Math.floor((currentDate - messageDate) / (1000 * 60 * 60 * 24));
  
    if (daysAgo === 0) {
      return 'Today';
    } else if (daysAgo === 1) {
      return 'Yesterday';
    } else {
      // You can customize the date format further based on your requirement
      return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };
  const [searchValue, setSearchValue] = React.useState('');
  
  const handleMessage = (e) => {
    console.log(e.target.value)
    setCurrentMessage(e.target.value)
  };
  
  const handleInputChange2 = (e) => {
    console.log(e.target.value)
    setSearchValue(e.target.value);
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
              <div id="online">
                <img src={green} alt="" />
                {current} online
              </div>
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
                    className="chat"
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
                <button onClick={()=>{}}>send</button>
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
