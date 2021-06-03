import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import { io } from "socket.io-client";

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import './Chat.css'

let socket:any;
const SERVER_ENDPOINT = 'localhost:7000'

const Chat=({location}:any)=>{

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

   

    useEffect(()=>{
        const {name, room}:any = queryString.parse(location.search);
        socket = io(SERVER_ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error:any) => {
            if(error) {
              alert(error);
            }
          });

    },[SERVER_ENDPOINT, location.search]);


    useEffect(()=>{
        socket.on('message', (message:any)=>{
            setMessages([...messages, message] as any)
        });

        socket.on("roomData", ({ users }:any) => {
            setUsers(users);
          });
    }, [messages]);

    // funtion for sending messages

    const sendMessage=(event:any)=>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, ()=>setMessage(''));
        }
      //  console.log(message)
        console.log(messages)

    };


    return (
       <div className="outerContainer">
           <div className="container">
               
               <InfoBar room={room}/>
               <Messages messages={messages} name={name} />

               <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
           </div>
           <TextContainer users={users}/>
       </div>
    )
}

export default Chat;