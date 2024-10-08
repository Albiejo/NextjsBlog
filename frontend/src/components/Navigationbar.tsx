"use client";

import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { useState , useEffect } from "react";
import CreateBlogModal from "./CreateBlogModal";
import { createBlog } from "../config.js";
import { toast } from "react-toastify";

import { Try } from "@mui/icons-material";

const Navbar = () => {
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
            onClick={handleOpen}
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
          <Link href={"/login"}>
            <Button
              className="bg-white text-black font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Log in
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button
              className="bg-white text-black font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Sign Up
            </Button>
          </Link>
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
          <Link href={"/login"}>
            <Button
              className="bg-white text-blue-gray-600 font-semibold"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Log in
            </Button>
          </Link>
          <Link href={"/signup"}>
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
