import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config()
import authRoutes from './routes/AuthRoutes.js'
import messageRoutes from './routes/MessageRoutes.js'
import userRoutes from './routes/UserRoutes.js'
;import connectDB from "./db/connectDB.js";
import { app, server } from "./socket/socket.js";
const PORT=process.env.PORT || 5000
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send("hello world sever 5000")
})
//middleware
app.use('/api/auth',authRoutes); 
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);
server.listen(PORT,()=>{
    console.log(`hello ${PORT}`);
    connectDB();

})
