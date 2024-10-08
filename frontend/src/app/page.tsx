'use client'


import BlogCard from "@/components/BlogCard";
import { Button } from "@material-tailwind/react";
import {BLOG_API_URL} from '../config.js'
import axios from "axios";
import { useState , useEffect } from "react";


export default function Home() {

  const blogs = [
    {
      id: 1,
      title: "First Blog",
      content: "This is the content of the first blog",
      author: "John Doe",
      tags: ["Technology", "Next.js"],
      category: "Web Development",
      image: "C:/Users/CLOUDESIN/Desktop/Projects/BlogApp/frontend/src/public/images/space1.jpg",
    },
    {
      id: 2,
      title: "Second Blog",
      content: "This is the content of the second blog",
      author: "Jane Doe",
      tags: ["JavaScript", "Tailwind CSS"],
      category: "Frontend Development",
      image: "../public/images/space1.jpg",
    },
    // Add more blogs here
  ];

  const [Blogs , setBlogs] = useState([])

  useEffect(()=>{
    getBlogs();
   },[])
 
   const getBlogs = async () => {
    try {
        const res = await axios.get(`${BLOG_API_URL}/posts`);
        setBlogs(res.data.blogs); // Update state
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
};


  return (
    <main className="px-6 mx-auto mt-6">

     

     <div className="flex flex-col items-center space-y-10">

        {
          Blogs.map((blog)=>(

            <div key={blog.id} className="max-w-2xl w-full border-gray-800">
                <BlogCard
                  title={blog.title}
                  content={blog.content}
                  author={blog.author}
                  tags={blog.tags}
                  category={blog.category}
                  image={blog.image}
                />
            </div>
          ))
        }
     </div>
    </main>
  );
}
