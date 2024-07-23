import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
// import { io } from "../../../backend/socket/socket";
import io from 'socket.io-client'
const SocketContext=createContext()
export const useSocketContext=()=>{
    return useContext(SocketContext);
}
export const SocketContextProvider=({children})=>{
    const [socket,setsocket]=useState(null);
    const [onlineUsers, setonlineUsers] = useState([]);
    const{Authuser}=useAuthContext()
    useEffect(()=>{
        if(Authuser){
            const socket=io('https://chat-app-production-r60l.onrender.com/',{
                query:{
                    userId:Authuser._id
                }
            });
            setsocket(socket);
            socket.on("getOnlineUsers",(users)=>{
                setonlineUsers(users)
            })
            return ()=>socket.close();
        }
        else{
            if(socket){
                socket.close();
                setsocket(null);
            }
        }
    },[Authuser])
    return <SocketContext.Provider value={{socket,onlineUsers}}>{children} </SocketContext.Provider>
    
}
