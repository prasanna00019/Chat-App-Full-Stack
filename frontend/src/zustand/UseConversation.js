import {create} from "zustand"
const UseConversation=create((set)=>({
    selectedConversation:null,
    setselectedConversation:(selectedConversation)=>set({selectedConversation}),
    messages:[],
    setmessages:(messages)=>set({messages}),
}))

export default UseConversation;