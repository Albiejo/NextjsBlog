import blogService from "../Services/blogService.js";





class blogController{


    async createBlog(req , res){
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


}


export default new blogController();

