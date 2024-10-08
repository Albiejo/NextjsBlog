import axios from 'axios';


export const BLOG_API_URL = 'http://localhost:5000/api/v1/blog'; 

export const USER_API_URL = 'http://localhost:5000/api/v1/user';

export const ADMIN_API_URL = 'http://localhost:5000/api/v1/admin';


export const createBlog = async (blogData) => {
    try {

      const response = await axios.post(BLOG_API_URL, blogData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      return response
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
};