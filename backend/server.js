import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
dotenv.config()
import authRoutes from './routes/AuthRoutes.js'
import messageRoutes from './routes/MessageRoutes.js'
import userRoutes from './routes/UserRoutes.js'
;import connectDB from "./db/connectDB.js";
import path from "path";
import { app, server } from "./socket/socket.js";
const PORT=process.env.PORT || 5000
const __dirname=path.resolve()
app.use(express.json());
app.use(cookieParser());
// app.get('/',(req,res)=>{
//     res.send("hello world sever 5000")
// })
//middleware
app.use('/api/auth',authRoutes); 
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);
app.use(express.static(path.join(__dirname,"frontend/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})
server.listen(PORT,()=>{
    console.log(`hello ${PORT}`);
    connectDB();

})
