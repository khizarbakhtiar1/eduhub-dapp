import Image from "next/image";
import React from "react";
import Link from "next/link";
import { GithubIcon, TwitterIcon, BookOpenIcon, HeartIcon, GraduationCapIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-teal-800 to-teal-900 text-white shadow-inner">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-teal-100 text-center md:text-left">
              Empowering education through blockchain technology and
              decentralized learning solutions.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpenIcon className="w-5 h-5 mr-2" />
              Educational Resources
            </h3>
            <ul className="space-y-2 text-center">
              <li>
                <Link href="/tutorial/ocid/introduction" className="text-teal-100 hover:text-white hover:underline">
                  OCID Integration
                </Link>
              </li>
              <li>
                <Link href="/tutorial/oca/introduction" className="text-teal-100 hover:text-white hover:underline">
                  OCA Integration
                </Link>
              </li>
              <li>
                <Link href="/tutorial/smart-contract" className="text-teal-100 hover:text-white hover:underline">
                  Smart Contracts
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <GraduationCapIcon className="w-5 h-5 mr-2" />
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-4">
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
              <a 
                href="https://www.opencampus.xyz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-teal-700 hover:bg-teal-600 p-2 rounded-full flex items-center justify-center transition-colors"
                aria-label="Open Campus"
              >
                <Image
                  src="/opencampus-logo.svg"
                  alt="Open Campus Logo"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-teal-700 mt-8 pt-6 flex flex-col items-center">
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
          <p className="text-xs text-teal-300 mt-2">
            Powered by Open Campus and EduChain
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
