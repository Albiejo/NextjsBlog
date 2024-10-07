import { CustomError } from "../Error/customError.js";
import Blog from "../Model/Blog.js";





class blogService {
    
  async createBlog(blogdata) {
    try {

      const newBlog = new Blog(blogdata);

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


  async getAllPosts(){
   try {
    const data = await Blog.find();
    return data
   } catch (error) {
    console.error('Error during blog fetching:', error);
    if (error instanceof CustomError) {
      throw error; // Rethrow custom errors for handling in controller
    }
    // Handle any other errors
    throw new CustomError("Server error during blog fetching", 500);
   }
  }


  async updatePostsService(postid , updateData){
    try {
      const post = await Blog.findOne({_id:postid});
      if (!post) {
        throw new CustomError('Blog post not found', 404);
      }
      // Update the post fields
    post.title = updateData.title || post.title;
    post.content = updateData.content || post.content;
    post.tags = updateData.tags || post.tags;
    post.category = updateData.category || post.category;
    post.coverImage = updateData.coverImage || post.coverImage;

    // Save the updated post to the database
    const updatedPost = await post.save();

    return {
      success: true,
      data: updatedPost,
      message: 'Blog post updated successfully',
    };
    } catch (error) {
    console.error('Error during blog update:', error);
    if (error instanceof CustomError) {
      throw error; // Rethrow custom errors for handling in controller
    }
    throw new CustomError("Server error during blog updation", 500);
    }
  }


  async deletePost(postid){
    try {
      const result = await Blog.findByIdAndDelete(postid)
      return result ? true : false ;
    } catch (error) {
      console.error('Error during blog update:', error);
      if (error instanceof CustomError) {
        throw error; // Rethrow custom errors for handling in controller
      }
      throw new CustomError("Server error during blog deletion", 500);
      }
  }


  async addLikesToBlogPost(blogid , userid){
    try {
      
      const updatedPost = await Blog.findByIdAndUpdate(blogid , {$inc:{likes:1}} , {new:true});
      if(!updatedPost){
        return null
      }

      return updatedPost;

    } catch (error) {
      console.error('Error during blog liking:', error);
      if (error instanceof CustomError) {
        throw error; 
      }
      throw new CustomError("Server error during blog liking", 500);
      }
    }


    async addCommentToPost(blogid , userid , comment){
      try {
        const blogPost = await Blog.findById(blogid);

        if(!blogPost){
          return null;
        }

        blogPost.comments.push({
          user: userid, 
          comment: comment,
          createdAt: Date.now()
        })

        const updatedPost = await blogPost.save();
        return updatedPost;

      } catch (error) {
        console.error('Error during blog commenting:', error);
        if (error instanceof CustomError) {
          throw error; 
        }
        throw new CustomError("Server error during blog commenting", 500);
      }
    }
  

}

export default new blogService();
