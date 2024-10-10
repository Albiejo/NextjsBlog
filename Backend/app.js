import express from "express";
import dotenv from 'dotenv';
dotenv.config();
// import { notFound , errorHandler } from "./middleware/errorMiddleWare.js";
import connectDB from './Config/db.js'
const port = process.env.PORT || 5000;
import userrouter from "./Routes/userRoute.js";
import adminrouter from "./Routes/adminRoute.js";
import cookieParser from "cookie-parser";
import blogRoute from "./Routes/blogRoute.js";
import cors from 'cors';
const app=express();
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's address
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // If you need cookies or session data
  }));


connectDB();

app.use('/cloud_images', express.static(path.join(__dirname, 'cloud_images')));
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