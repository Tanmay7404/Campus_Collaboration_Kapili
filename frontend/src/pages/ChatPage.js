// ChatPage.js

import React, { useState } from 'react';
import './ChatPage.css'; // Import your stylesheet
import smile from '../assets/images/smile.svg';
import clip from '../assets/images/clip.svg';
import logo from '../assets/images/logo.svg';
import search from '../assets/images/search.svg';
import io from 'socket.io-client';
import  { useEffect ,useRef} from 'react';
const socket=io('http://localhost:8080')
const ChatPage = ({  currentUser }) => {
  const [selectedPerson, setSelectedPerson] = useState(null); // Initialize with the first person
  const [currentDate, setCurrentDate] = useState(new Date());
   // Track the current date
 const [userObjectId,setUserObjectId]=useState(currentUser.id)
 const [chatList,setChatList]=useState([])
 const [userFriends, setUserFriends] = useState([]);
 const [people, setPeopleData] = useState([]);

 const selectedPersonRef = useRef(selectedPerson);

 useEffect(() => {
   selectedPersonRef.current = selectedPerson;
 }, [selectedPerson]);
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
console.log(person)
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
      if (index === -1) {
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
        const response = await fetch('http://localhost:8080/getUserChatList/' + currentUser.name, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
          // You can include additional headers or body if needed
        });
  
        const data = await response.json();
        setPeopleData(data)
        console.log(121)
        console.log(data)
        console.log(121)
         setCount(prev=>prev+1)
        for (const peep of data)
        {
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
      //   senderName:currentUser.name,
      //   message:currentMessage,
      //   timestamp:formattedDate
      //  })
  });

  // socket.on('messages', messages => {
  //     setMessages(messages);
  // });

  return () => {
    socket.off('receive_message');
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
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
   updateMessageForPerson(selectedPerson.name,{
    senderName:currentUser.name,
    message:currentMessage,
    timestamp:formattedDate
   })
   const newMessage = {
    senderName: currentUser.name,
    message: currentMessage,
    timestamp: formattedDate 
  };
  setCount(prev=>prev+1)

  setChatList(prevList => {
    
    return [...prevList, newMessage];
  });
  socket.emit("send_chat_message",{room:currChatId,message:newMessage,username:currentUser.name})
      const secondData = await secondResponse.json();
      // Handle success response for the second fetch

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
            <div id="chatinf">
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
              <input type="text" name="" id="type" placeholder="Type your message..." value={currentMessage} onChange={handleMessage}             onKeyDown={handleKeyPress}
/>
              <div id="attach">
                <button onClick={()=>{handleSubmit()}}>send</button>
                <img src={clip} id="clip" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
  );
};

export default ChatPage;
