import Image from "next/image";
import React from "react";
import Link from "next/link";
import { GithubIcon, TwitterIcon, HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-teal-800 to-teal-900 text-white shadow-inner">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-center items-center">
          <div className="flex flex-row items-center">
            <p className="flex items-center text-base md:text-lg text-teal-100 font-medium">
              Built with <HeartIcon className="w-5 h-5 mx-2 text-red-400" /> by{" "}
              <a
                href="https://eduhub.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold ml-2 hover:underline"
              >
                EduHub
              </a>
            </p>
            
            <span className="mx-4 text-teal-300">|</span>
            
            <div className="flex items-center text-base md:text-lg text-teal-100 font-medium">
              <span>Follow us on</span>
              <a 
                href="https://x.com/eduhub__" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 hover:underline flex items-center"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5 mx-1" /> X
              </a>
            </div>
            
            <span className="mx-4 text-teal-300">|</span>
            
            <p className="text-sm md:text-base text-teal-300">
              Powered by Open Campus and EduChain
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
