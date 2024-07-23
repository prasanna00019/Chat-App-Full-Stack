import { useEffect, useState } from "react"
import UseConversation from "../zustand/UseConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
 const [loading,setloading]=useState(false);
 const {messages,setmessages,selectedConversation}=UseConversation();
 useEffect(()=>{
   const getMessages=async()=>{
    setloading(true)
    try {
        const res=await fetch(`/api/messages/${selectedConversation._id}`);
        const data=await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        setmessages(data);
    } catch (error) {
        toast.error(error.message);
    }finally{
      setloading(false)
    }
   }
   if(selectedConversation?._id) {getMessages();}
 },[selectedConversation?._id,setmessages])
 return {loading,messages}
}

export default useGetMessages
