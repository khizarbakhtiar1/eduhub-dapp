"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserCircle, GraduationCap, BookOpen } from "lucide-react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import LoginButton from "./LoginButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { ocAuth, authState, isInitialized } = useOCAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    // Redirect back to home page after logout
    await ocAuth.logout({ returnUrl: window.location.origin });
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

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
          <div className="relative" ref={menuRef}>
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-full bg-teal-700 hover:bg-teal-900 transition-colors"
              aria-label="User menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              title="User Menu"
            >
              <UserCircle className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  {isInitialized && authState.isAuthenticated ? (
                    <>
                      <Link
                        href="/user"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <div className="px-4 py-2">
                      <LoginButton />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
