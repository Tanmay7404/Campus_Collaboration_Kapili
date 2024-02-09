import React from 'react';
import './style.css'; // Import your stylesheet
import smile from './images/smile.svg';
import clip from './images/clip.svg';
import logo from './images/logo.svg';
import search from './images/search.svg';

const GlobalChat = ({ peopleArray, currentUser }) => {

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
              <button id="global">Personal</button>
              <button id="personal">Global</button>
            </div>
          </div>

          {/* Right Panel - Text Messages */}
          <div id="right">
            <div id="inf">
              <img src={logo} className="profilePic" alt="" />
              <span id="Name">Global Forum</span>
            </div>

            <div id="chats">
              {peopleArray[0].messages.map((message, index) => (
                <div key={index} className={`front ${message.senderId === currentUser.id ? 'me' : ''}`}>
                  <inf>
                    <img
                      src={message.image}
                      className="profilePic"
                      alt=""
                    />
                    <inf2>
                      <div
                        id="Name"
                        style={{
                          textAlign: message.senderId === currentUser.id ? 'right' : 'left',
                        }}
                      >
                        {message.senderId === currentUser.id ? 'Me' : message.senderName}
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
              <input type="text" name="" id="type" placeholder="Type your message..." />
              <div id="attach">
                
                <img src={clip} id="clip" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
