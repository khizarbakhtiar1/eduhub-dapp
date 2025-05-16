import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserCircle, GraduationCap, BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full fixed top-0 bg-gradient-to-r from-teal-600 to-teal-800 text-white shadow-lg z-50" role="banner">
      <div className="container mx-auto flex items-center justify-between  relative">
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-teal-700 transition-colors duration-300"
            aria-label="Go to home page"
            role="button"
            title="Home"
          >
            <Image
              src="/eduhub.png"
              alt="EduHub Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-xl font-bold hidden sm:inline-block">EduHub</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center flex-grow">
          <div className="bg-teal-700/50 rounded-full px-6 py-1 flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            <h1 className="text-lg font-medium">
              EduHub is building community and developer tools for EduChain
            </h1>
            <BookOpen className="ml-2 h-5 w-5" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/user" 
            className="p-2 rounded-full bg-teal-700 hover:bg-teal-900 transition-colors"
            aria-label="Go to user profile"
            role="button"
            title="User Profile"
          >
            <UserCircle className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
