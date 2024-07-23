import { useState } from "react"
import UseConversation from "../zustand/UseConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [loading, setloading] = useState(false);
  const {messages,setmessages,selectedConversation}=UseConversation();
  const sendMessage=async(message)=>{
    setloading(true);
    try {
        const res=await fetch(`/api/messages/send/${selectedConversation._id}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({message})
        })
        const data=await res.json();
        if(data.error){
            throw new Error(data.error);
        }
        setmessages([...messages,data]);
    } catch (error) {
        toast.error(error.message)
    } finally{
        setloading(false)
    }
  }
  return {sendMessage,loading}
}

export default useSendMessage
