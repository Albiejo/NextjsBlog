import React, { useState } from 'react';
import { Button,   
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter, } from '@material-tailwind/react';



  const CreateBlogModal = ({ open, handleClose, onSubmit }) => {

      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [tags, setTags] = useState('');
      const [category, setCategory] = useState('');
      const [image, setImage] = useState(null);

      const handleImageUpload = (event) => {
          setImage(event.target.files[0]);
        };

        const handleSubmit = () => {
        
          
          const formData = new FormData();
          formData.append('title', title);
          formData.append('content', content);
          formData.append('tags', tags.split(',').map(tag => tag.trim())); // Convert tags to an array
          formData.append('category', category);
          if (image) {
            formData.append('image', image); // Only append the image if one was uploaded
          }
      
          // Pass the formData to onSubmit
          onSubmit(formData);
      
          // Reset form fields
          setTitle('');
          setContent('');
          setTags('');
          setCategory('');
          setImage(null);
          handleClose();
        };


    return (
        <Dialog open={open} handler={handleClose}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <DialogHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
        className='flex justify-center'
        >Create New Blog</DialogHeader>
        <DialogBody  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <form>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
  
            <div className="mt-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="4"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
  
            <div className="mt-4">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
  
            <div className="mt-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                required
              />
            </div>
  
            <div className="mt-4">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image Upload
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageUpload}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                accept="image/*"
                required
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <Button color="gray" onClick={handleClose}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Cancel
          </Button>
          <Button color="blue" onClick={handleSubmit}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            Create Blog
          </Button>
        </DialogFooter>
      </Dialog>
      );
  
}

export default CreateBlogModal