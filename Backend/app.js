import express from "express";
import dotenv from 'dotenv';
dotenv.config();
// import { notFound , errorHandler } from "./middleware/errorMiddleWare.js";
import connectDB from './Config/db.js'
const port = process.env.PORT || 3000;
import userrouter from "./Routes/userRoute.js";
import adminrouter from "./Routes/adminRoute.js";
import cookieParser from "cookie-parser";
import blogRoute from "./Routes/blogRoute.js";


connectDB();

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.use('/api/v1/user' , userrouter)
app.use('/api/v1/admin' , adminrouter)
app.use('/api/v1/blog' , blogRoute)


app.get('/' , (req,res)=>{
    res.send("server is running..")
})

// app.use(notFound)
// app.use(errorHandler)

app.listen(port , ()=>{
    console.log(`server now running on ${port}`);
})