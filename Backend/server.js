import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import pool from './config/database.js';
import AuthRouter from './routes/Authroutes.js';
import Adminrouter from './routes/Adminroutes.js';
import Approuter from './routes/Approutes.js';
import logRouter from './routes/logroutes.js';
import { userProfilesRouter } from './routes/Userprofilesroutes.js';

const app=express()
dotenv.config();


const port=process.env.PORT;

app.use(express.json())
app.use(cors())


// app.use("/",(req,res)=>{
//    res.send("Api is Working")
// })


app.use("/api/auth",AuthRouter)
app.use("/api/admin",Adminrouter)
app.use('/api/admin/apps',Approuter)
app.use('/apps',logRouter)
app.use("/api/userprofiles",userProfilesRouter)

app.listen(port,()=>{
    console.log("Server is Running on Port:",port)
})

