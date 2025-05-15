"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BootcampIndex() {
  const [fullSizeImage, setFullSizeImage] = useState<string | null>(null);

  const openFullSize = (src: string) => {
    setFullSizeImage(src);
  };

  const closeFullSize = () => {
    setFullSizeImage(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-teal-800 mb-4">
          Introduction to Blockchain and Web3
        </h1>
        <p className="text-xl text-gray-700">
          A comprehensive bootcamp for beginners
        </p>
      </div>

      <div className="bg-teal-50 p-6 rounded-lg mb-8">
        <div className="flex flex-col gap-8">
          <div className="w-full relative cursor-pointer" onClick={() => openFullSize("/blockchain-architecture.webp")}>
            <Image
              src="/blockchain-architecture.webp"
              alt="Blockchain Architecture"
              width={1000}
              height={600}
              className="rounded-lg w-full h-auto hover:opacity-90 transition-opacity"
            />
            <div className="absolute bottom-2 right-2 bg-teal-700 text-white text-xs p-1 rounded opacity-70">
              Click to enlarge
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-teal-700 mb-4">
              About this Bootcamp
            </h2>
            <p className="text-gray-700 mb-4">
              This bootcamp is designed for beginners who want to understand the fundamentals of blockchain technology 
              and start their journey in Web3 development. Over three days, we'll explore key concepts, 
              from the basic architecture to practical applications and development approaches.
            </p>
            <p className="text-gray-700 mb-4">
              No prior knowledge of blockchain is required. All you need is basic programming knowledge 
              and curiosity about this revolutionary technology.
            </p>
            <div className="mt-6 space-x-4">
              <Link href="/workshop/day-one">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  Start Day 1
                </Button>
              </Link>
              <Link href="/workshop/instructors">
                <Button variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50">
                  Meet The Instructors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm flex flex-col h-full">
          <div>
            <h2 className="text-xl font-bold text-teal-700 mb-3">Day 1</h2>
            <p className="text-gray-600 mb-4">
              Blockchain Architecture Fundamentals: blocks, hashing, consensus mechanisms, 
              decentralization, smart contracts, security, and real-world applications.
            </p>
          </div>
          <div className="mt-auto">
            <Link href="/workshop/day-one">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Start Day 1
              </Button>
            </Link>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm flex flex-col h-full">
          <div>
            <h2 className="text-xl font-bold text-teal-700 mb-3">Day 2</h2>
            <p className="text-gray-600 mb-4">
              Web3 Development Basics: Smart contract development, tools for blockchain programming, 
              Web3 libraries, and building decentralized applications.
            </p>
          </div>
          <div className="mt-auto">
            <Link href="/workshop/day-two">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Start Day 2
              </Button>
            </Link>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm flex flex-col h-full">
          <div>
            <h2 className="text-xl font-bold text-teal-700 mb-3">Day 3</h2>
            <p className="text-gray-600 mb-4">
              Advanced Topics: NFTs, DeFi concepts, blockchain security best practices, 
              and the future of blockchain technology.
            </p>
          </div>
          <div className="mt-auto">
            <Link href="/workshop/day-three">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                Start Day 3
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Full-size image modal */}
      {fullSizeImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeFullSize}
        >
          <div className="relative max-w-5xl max-h-screen">
            <button 
              onClick={closeFullSize}
              className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>
            <Image
              src={fullSizeImage}
              alt="Full size image"
              width={1200}
              height={800}
              className="max-h-screen w-auto h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
} 