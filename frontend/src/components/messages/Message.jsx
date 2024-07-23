import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import UseConversation from '../../zustand/UseConversation'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {
  const {Authuser }=useAuthContext()
  const formattedTime = extractTime(message.createdAt);
  const{selectedConversation}= UseConversation();
  const fromMe=message.senderId===Authuser._id;
  const chatclassname=fromMe?'chat-end':"chat-start"
  const profilePic=fromMe?Authuser.profilePic:selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
		<div className={`chat ${chatclassname}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
        <img alt='Tailwind CSS chat bubble component' src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}  pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message