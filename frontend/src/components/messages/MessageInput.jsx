import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const{loading,sendMessage}=	useSendMessage()
		const [message,setmessage]=useState("");
	const handleSubmit=async(e)=>{
		e.preventDefault();
		if(!message) return;
		await sendMessage(message);
		setmessage("");
	}
	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-xl rounded-lg block w-full p-2.5  bg-gray-300 border-gray-600 text-black'
					placeholder='Send a message'
					value={message}
					onChange={(e)=>setmessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading? <span className="loading loading-spinner"></span>:<BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;