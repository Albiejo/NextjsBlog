'use client'

import axios from "axios";
import {useRouter} from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { USER_API_URL } from "@/config";


const UserSignup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name , setName] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(email , password , name);
        
        if (!email || !password || !name) {
          toast.error("Email and password and name are required."); // Notify about empty fields
          return; // Stop further execution
        }   
    
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          toast.error("Please enter a valid email address."); // Notify about invalid email
          return; // Stop further execution
        }

        const payload = {
          email,
          password,
          name
        };
        try {
          const response = await axios.post(`${USER_API_URL}/signup`, payload);
          toast.success("Signup successful!"); // Notify success
          router.push('user/login');
        } catch (error) {
          const typedError = error as any;
          toast.error(
            `signup failed: ${
              typedError.response?.data?.message || typedError.message
            }`
          ); // Notify error
          console.error("signup error:", typedError);
        }
      };



      
      return (
        <div className="min-h-screen max-w flex items-center justify-center bg-gray-100">
          <form className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto border border-gray-200">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => setName(e.target.value)}
              />
              <label
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>
      
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
      
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
      
            <button
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      );
      
};

export default UserSignup;
