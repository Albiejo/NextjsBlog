import blogService from "../Services/blogService.js";





class blogController{


    async createBlogController(req , res){
        try {
            
            const { title, content, coverImage, category, tags } = req.body;

            const userId = req.user.id ;
            const blog = await blogService.createBlog({ title, content, coverImage, category, tags });
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
            const blogs = blogService.getAllPosts();
            return res.status(201).json({
                success: true,
                message: "Blog created successfully",
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


    async updateBlogController(){
        try {
            const postId = req.params.id;
            const updateData = {
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags,
                category: req.body.category,
                coverImage: req.body.coverImage,
            };
            const updatedposts = blogService.updatePostsService(postId,updateData);
            return res.status(201).json({
                success: true,
                message: "Blog updated successfully",
                updatedposts:updatedposts
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



    async deletePost(){
        try {
            const postId = req.params.id;
            await blogService.deletePost(postId)
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Server error while deleting blog",
                error: error.message
            });
        }
    }

}


export default new blogController();

