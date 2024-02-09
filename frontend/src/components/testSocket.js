import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);

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

    const sendMessage = () => {
        if (messageInput.trim() !== '') {
            socket.emit('message', { text: messageInput });
            setMessageInput('');
        }
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message.text}</li>
                ))}
            </ul>
            <input type="text" value={messageInput} onChange={e => setMessageInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
