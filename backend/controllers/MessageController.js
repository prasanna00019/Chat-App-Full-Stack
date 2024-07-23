import Conversation from "../models/ConversationModel.js";
import Message from "../models/MessageModel.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage=async(req,res)=>{
 try {
    const {message}=req.body;
    const {id:recieverId}=req.params;
    const senderId=req.user._id;
   let conversation= await Conversation.findOne({
        participants:{
            $all:[senderId,recieverId]
        },
    })
    if(!conversation){
      conversation=await Conversation.create({
         participants:[senderId,recieverId],
      })
    }
    const newMessage=new Message ({
      senderId:senderId,
      recieverId:recieverId,
      message,
    })
    if(newMessage){
      conversation.messages.push(newMessage._id);
    }

   //  await conversation.save();
   //  await newMessage.save();
await Promise.all([conversation.save(),newMessage.save()]);
const receiverSocketId=getRecieverSocketId(recieverId);
   if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage',newMessage);
   }
    res.status(201).json(newMessage);   
 } catch (error) {
    console.log("error in sending message controller",error.message)
    res.status(500).json({error:"INTERNAL SERVER ERROR"})
 }
}
export const getMessages=async(req,res)=>{
   try {
      const{id:userTochatId}=req.params; 
      const senderId=req.user._id;
      const conversation=await Conversation.findOne({
         participants:{$all:[senderId,userTochatId]},
      }).populate("messages");
      if(!conversation){return res.status(200).json([]);}
      const messages=conversation.messages;
      res.status(200).json(messages);
      
   } catch (error) {
      console.log("error in getMessages controller",error.message)
      res.status(500).json({error:"INTERNAL SERVER ERROR"})
   }
}
