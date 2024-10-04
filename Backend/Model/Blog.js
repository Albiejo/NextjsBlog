import mongoose, { mongo } from "mongoose";



const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],


    category: {
      type: String,
      enum: ["Technology", "Health", "Lifestyle", "Education", "Business"], // Example categories
      required: true,
    },


    coverImage: {
      type: String, // URL or path to the cover image
    },


    views: {
      type: Number,
      default: 0,
    },


    likes: {
      type: Number,
      default: 0,
    },


    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId, // Assuming User schema for commenters
          ref: 'User',
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
