// ChatPage.js

import React, { useState } from 'react';
import './style.css'; // Import your stylesheet
import smile from '../assets/images/smile.svg';
import clip from '../assets/images/clip.svg';
import logo from '../assets/images/logo.svg';
import search from '../assets/images/search.svg';
import io from 'socket.io-client';
import  { useEffect } from 'react';
// const socket=io('http://localhost:8080')
const ChatPage = ({  currentUser }) => {
  const [selectedPerson, setSelectedPerson] = useState(null); // Initialize with the first person
  const [currentDate, setCurrentDate] = useState(new Date());
   // Track the current date
 const [userObjectId,setUserObjectId]=useState(currentUser.id)
 const [chatList,setChatList]=useState([])
 const [userFriends, setUserFriends] = useState([]);
 const [people, setPeopleData] = useState([]);


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
  console.log(person)
    setSelectedPerson(person);

    // const firstResponse = await fetch('http://localhost:8080/chats/personalChat', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     currUserId:selectedPerson?.name,
    //      friendId: currentUser.name,
    //   }),
    // });
    // const userData = await firstResponse.json();

    // const UserResponse = await fetch('http://localhost:8080/getUser/'+currentUser.name, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
     
    // });
    
    
    setCurrChatId(person.chatId)
    
    // const userId = (await UserResponse.json())._id;
    // const UserResponseasd = await fetch('http://localhost:8080/chats/getTotalChats/'+currentUser.name, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
     
    // });
  //  setUserObjectId(userId)
  if(person.messages.length===0){
    const ChatResponse = await fetch(`http://localhost:8080/chats/getAllMessages/${person.chatId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }); 
    var chatMessages=await ChatResponse.json()
    console.log(chatMessages);
   setChatList(chatMessages)
//setPeopleData()
updateMessagesForPerson(person.name,chatMessages)
}
else
{
  console.log('repeat')
  setChatList(person.messages)

}
  };


  const updateMessagesForPerson = (personName, newMessages) => {
    console.log("11 "+personName)
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
    console.log("22")

    setPeopleData(prevPeople => {
      // Find the index of the person in the people array
      const index = prevPeople.findIndex(person => person.name === personName);
      if (index === -1) {
        console.error(`Person with name '${personName}' not found.`);
        return prevPeople; // Return the original state if person not found
      }
  
      // Create a new array with the updated person object
      const updatedPeople = [...prevPeople];
      console.log(121)
      console.log(updatedPeople)
      console.log(121)

      updatedPeople[index] = {
        ...updatedPeople[index], // Copy the existing person object
        messages: [...updatedPeople[index].messages] // Update the messages array by appending new messages
      };
  
      return updatedPeople; // Return the updated state
    });
  };
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Dead')
        const response = await fetch('http://localhost:8080/getUserChatList/' + currentUser.name, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
          // You can include additional headers or body if needed
        });
  
        const data = await response.json();
        setPeopleData(data)
        //console.log(data)
        //setUserFriends(data);
      } catch (error) {
        console.error('Error fetching user friends:', error);
      }
    };
  
    fetchData(); // Call the fetchData function
  
  }, []);
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
  
  
 
  const [searchValue, setSearchValue] = React.useState('');
  
  const handleMessage = (e) => {
    setCurrentMessage(e.target.value)
  };
  

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
          senderName:currentUser.name,
          message: currentMessage,
        }),
      });
  //  updateMessageForPerson(selectedPerson.name,{
  //   senderName:currentUser.name,
  //   message:currentMessage,
  //   timestamp:Date.now
  //  })
   chatList.push({
    senderName:currentUser.name,
    message:currentMessage,
    timestamp:Date.now
   })
      const secondData = await secondResponse.json();
      console.log(chatList)
      // Handle success response for the second fetch
    } catch (error) {
      console.error('Error:', error);
      // Handle error for both fetch calls
    }
  };



  
  

  return (
    <div >
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
                src={selectedPerson?.profilePic}
                className={`profilePic ${selectedPerson?.id === currentUser.id ? 'me' : ''}`}
                alt=""
              />
              <span
                id="Name"
                style={{ textAlign: selectedPerson?.id === currentUser.id ? 'right' : 'left' }}
              >
                {selectedPerson?.name}
              </span>
              {/* <span className="line"></span> */}
              {/* {selectedPerson.lastSeen && !selectedPerson.isGroup && (
                <span id="last-seen" style={{ textAlign: 'right' }}>
                  Last seen {formatDate(selectedPerson.lastSeen.date)} {selectedPerson.lastSeen.time}
                </span>
              )} */}
              
            </div>
            <div id="chats" style={{height:'65vh'}} >
              {chatList?.map((message, index) => (
                <div
                  key={index}
                  className={`front ${message.senderName=== currentUser.name ? currentUser.name : ''}`}
                >
                  {!index || (message.senderName !== chatList[index-1]?.senderName) ? (
                    <inf
                    style={{
                      textAlign: message.senderName === currentUser.name ? 'right' : 'left',
                      
                    }}

                    >
                      <img
                        src={
                          message.senderName === currentUser.name
                            ? currentUser.profilePic
                            : people.find((p) => p.name === message.senderName)?.profilePic
                        }
                        className={`profilePic ${message.senderName === currentUser.name ? 'me' : ''}`}
                        alt=""
                        style={{
                          float: message.senderName === currentUser.name ? 'right' : 'left',
                        }}
                      />
                      
                      <inf2
                        style={{
                          textAlign: message.senderName === currentUser.name ? 'right' : 'left',
                        }}

                      >
                        <div
                          id="Name"
                          style={{
                            textAlign: message.senderName === currentUser.name ? 'right' : 'left',
                          }}
                        >
                          {message.senderName === currentUser.name ? 'Me' : people.find((p) => p.name === message.senderName)?.name}
                        </div>
                        <inf3
                          style={{
                            textAlign: message.senderName === currentUser.name ? 'right' : 'left',
                          }}
                        >
                          <span className="date">{new Date(message.timestamp).toLocaleDateString()}</span>
                          <span className="line"></span>
                          <span className="time">{new Date(message.timestamp).toLocaleTimeString()}</span>
                        </inf3>
                            
                      </inf2>
                      
                    </inf>
                  ) : null}
                  <div
                    className={`chat ${message.senderName === currentUser.name ? 'me' : ''}`}
                    // className="chat"
                    style={{ textAlign: message.senderName === currentUser.name ? 'right' : 'left' }}
                  >
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
              
            </div>
            <div id="typingBox" >
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
