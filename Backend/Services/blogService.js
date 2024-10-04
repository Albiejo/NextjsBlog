import { CustomError } from "../Error/customError.js";
import Blog from "../Model/Blog.js";





class blogService {
    
  async createBlog(blogdata) {
    try {

      console.log(blogdata)
      const newBlog = new Blog(blogdata);

      // Save the blog in the database
      await newBlog.save();

      return newBlog;
    } catch (error) {
        console.error('Error during blog creation:', error);

      if (error instanceof CustomError) {
        throw error; // Rethrow custom errors for handling in controller
      }
      // Handle any other errors
      throw new CustomError("Server error during blog creation", 500);
    }
  }
}

export default new blogService();
