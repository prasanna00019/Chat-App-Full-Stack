import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import UseConversation from "../zustand/UseConversation";
import notifysound from '../assets/sounds/notification.mp3'
const UseListenMessages = () => {
const {socket}=useSocketContext();
const {messages,setmessages}=UseConversation();
useEffect(()=>{
  socket?.on("newMessage",(newMessage)=>{
    const sound = new Audio(notifysound);
    sound.play();
    setmessages([...messages,newMessage]);
  })
  return ()=>socket?.off("newMessage"); 
},[socket,setmessages,messages])
}

export default UseListenMessages
