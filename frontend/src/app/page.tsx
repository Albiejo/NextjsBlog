'use client'


import BlogCard from "@/components/BlogCard";
import { Button } from "@material-tailwind/react";
import {BLOG_API_URL} from '../config.js'
import axios from "axios";
import { useState , useEffect } from "react";
import { Metadata } from 'next';


type Blog = {
  _id: string; // Assuming '_id' is used in MongoDB
  title: string;
  content: string;
  author: string;
  tags: string[];
  category: string;
  coverImage: string | null; // Image might be null if not provided
};



export default function Home() {

  const [Blogs , setBlogs] = useState<Blog[]>([])

  useEffect(()=>{
    getBlogs();
   },[])
 
   const getBlogs = async () => {
    try {
        const res = await axios.get(`${BLOG_API_URL}/posts`);
        console.log('Blogs fetched:', res.data.blogs);
        setBlogs(res.data.blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
};



  return (
    <main className="px-6 mx-auto mt-6">

     <div className="flex flex-col items-center space-y-10">

        {
          Blogs.map((blog)=>(
            
            <div key={blog._id} className="max-w-2xl w-full border-gray-800">
                <BlogCard
                  title={blog.title}
                  content={blog.content}
                  author={blog.author}
                  tags={blog.tags}
                  category={blog.category}
                  image={blog.coverImage}
                />
            </div>
            
          ))
        }
     </div>
    </main>
  );
}
