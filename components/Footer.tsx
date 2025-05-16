import Image from "next/image";
import React from "react";
import Link from "next/link";
import { GithubIcon, TwitterIcon, HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-teal-800 to-teal-900 text-white shadow-inner">
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-md font-semibold">Connect With Us</h3>
            <div className="flex space-x-4 mt-2">
              <a 
                href="https://github.com/opencampus-sh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-700 hover:bg-teal-600 p-2 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/eduhub__" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-700 hover:bg-teal-600 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center mt-4 md:mt-0">
            <p className="flex items-center text-sm text-teal-100">
              Built with <HeartIcon className="w-4 h-4 mx-1 text-red-400" /> by{" "}
              <a
                href="https://eduhub.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold ml-1 hover:underline"
              >
                EduHub
              </a>
            </p>
            <p className="text-xs text-teal-300 mt-1">
              Powered by Open Campus and EduChain
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
