import blogService from "../Services/blogService.js";





class blogController{

    async createBlogController(req , res){
        try {
            
            const { title, content, category, tags } = req.body;
            const Imagefile = req.file ? req.file.filename : null;

            // const userId = req.user.id ;
            const userId ='66ffbb043ea7540d82315763';
            const blog = await blogService.createBlog({ author:userId , title, content ,coverImage:Imagefile, category, tags });
            return res.status(201).json({
                success: true,
                message: "Blog created successfully",
                blog
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Server error while creating blog",
                error: error.message
            });
        }
    }

    async getPostsController(req, res){
        try {
            const blogs = await  blogService.getAllPosts();
            console.log("here",blogs)
            return res.status(201).json({
                success: true,
                message: "Blog fetched successfully",
                blogs:blogs
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Server error while fetching blogs",
                error: error.message
            });
        }
    }

    async updateBlogController(req, res){
        try {
            const postId = req.params.id;
            const updateData = {
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags,
                category: req.body.category,
                coverImage: req.body.coverImage,
            };
            const updatedposts = await blogService.updatePostsService(postId,updateData);
        
            return res.status(201).json({
                success: true,
                message: "Blog updated successfully",
                updatedposts:updatedposts.data
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Server error while updating blog",
                error: error.message
            });
        }
    }

    async deletePost(req , res){
        try {
            const postId = req.params.id;
            await blogService.deletePost(postId)
            res.status(200).json({
                success: true,
                message: "Post deleted successfully",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Server error while deleting blog",
                error: error.message
            });
        }
    }

    async likePost(req , res){
        try {
            const { blogid , userid}  = req.params;
  
            const updatedPost = await blogService.addLikesToBlogPost(blogid , userid);
            if (updatedPost) {
                res.status(200).json({
                    success: true,
                    message: "Post liked successfully",
                    data: updatedPost
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Post not found"
                });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Server error while adding like to  blog post",
                error: error.message
            });
        }
    }


    async addComment(req , res){
        const { blogid , userid}  = req.params;
        const comment  = req.body.comment ;

        const updatedPost = blogService.addCommentToPost(blogid , userid , comment)
        if (updatedPost) {
            res.status(200).json({
                success: true,
                message: "Comment added successfully",
                data: updatedPost
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }
    }

}


export default new blogController();

