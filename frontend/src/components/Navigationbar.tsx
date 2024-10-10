"use client";

import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useState , useEffect } from "react";
import CreateBlogModal from "./CreateBlogModal";
import { createBlog } from "../config.js";
import { toast } from "react-toastify";
import { useRouter , usePathname } from 'next/navigation';
import { Try } from "@mui/icons-material";
import { selectIsAuthenticated  , logout} from '../app/features/auth/authSlice';
import {  useDispatch,useSelector } from "react-redux";


const Navbar = () => {

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname()
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateBlog = async (blogData) => {
    try {
      const res = await createBlog(blogData);
      if (res.data?.message) {
        toast.success("Blog created successfully!");
      }
    } catch (error: unknown) {
      const typedError = error as any;
      toast.error(
        `Error creating blog: ${
          typedError.response?.data?.message || typedError.message
        }`
      );
      console.error("Error creating blog:", typedError);
    }
  };

    const handleCreateBlogButton=()=>{
      if (!isAuthenticated &&  pathName !== '/user/login') {
        router.push('user/login');
      } else {
        handleOpen(); 
      }
    }

  const handleLogout = () => {
    // Dispatch the logout action to clear authentication state
    dispatch(logout());
    // Redirect to home or login page after logout
    router.push('/');
  };

  return (
    <nav className="bg-black p-4 shadow-xl z-10 sticky top-0 mb-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-white   text-2xl font-bold hover:text-blue-800"
        >
          NEXTJS
        </Link>

        <div className="hidden sm:flex  justify-center mb-6">
          <Button
            className="bg-blue-gray-700 text-white"
            size="lg"
            onClick={handleCreateBlogButton}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Create Blog
          </Button>
        </div>

        <CreateBlogModal
          open={open}
          handleClose={handleClose}
          onSubmit={handleCreateBlog}
        />

        {/* Right side - Nav links */}
        <div className="hidden sm:flex space-x-4">
          {isAuthenticated ? (<>
            <Button
              className="bg-white text-black font-semibold"
              onClick={handleLogout}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                Logout
              </Button>
          </>) : (<>
          <Link href={"/user/login"}>
            <Button
              className="bg-white text-black font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Log in
            </Button>
          </Link>
          <Link href={"/user/signup"}>
            <Button
              className="bg-white text-black font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Sign Up
            </Button>
          </Link>
          </>)}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu (only visible when opened) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden mt-4 flex flex-col space-y-2">
          <Link href={"user/login"}>
            <Button
              className="bg-white text-blue-gray-600 font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Log in
            </Button>
          </Link>
          <Link href={"user/signup"}>
            <Button
              className="bg-white text-blue-gray-600 font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Sign Up
            </Button>
          </Link>
          <div className="flex justify-center mb-6">
            <Button
              className="bg-blue-gray-700 text-white"
              size="lg"
              onClick={() => {}}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              + Create Blog
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
