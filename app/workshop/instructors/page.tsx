"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Instructors() {
  return (
    <div className="space-y-12 max-w-3xl mx-auto py-16">
      <div className="flex justify-between items-center mb-6">
        <Link href="/workshop/bootcamp">
          <Button variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50">
            View Bootcamp Details
          </Button>
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold text-teal-800 mb-8 text-center">Meet your Instructors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Asharib Ali */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <Image
            src="/asharib-pic.jpeg"
            alt="Asharib Ali"
            width={160}
            height={160}
            className="rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-teal-700">Asharib Ali</h2>
          <p className="text-gray-700 text-center mt-2 mb-3">Founder @ EduHub | Trainer at GIAIC | Exploring Applied AI on Blockchain</p>
          <div className="flex space-x-4 mt-2">
            <a href="https://x.com/0xAsharib" target="_blank" rel="noopener noreferrer" aria-label="X Profile" className="text-teal-700 hover:underline">X</a>
            <a href="https://www.linkedin.com/in/asharibali/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-teal-700 hover:underline">LinkedIn</a>
            <a href="https://asharib.xyz/" target="_blank" rel="noopener noreferrer" aria-label="Personal Website" className="text-teal-700 hover:underline">Website</a>
          </div>
        </div>
        {/* Khizar Bakhtiar */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <Image
            src="/khizar-pic.jpg"
            alt="Khizar Bakhtiar"
            width={160}
            height={160}
            className="rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-teal-700">Khizar Bakhtiar</h2>
          <p className="text-gray-700 text-center mt-2 mb-3">Co-Builder @EduHub | Blockchain Engineer @ArmUp | Blockchain Speaker and Instructor</p>
          <div className="flex space-x-4 mt-2">
            <a href="https://x.com/Khizarbakhtiar1" target="_blank" rel="noopener noreferrer" aria-label="X Profile" className="text-teal-700 hover:underline">X</a>
            <a href="https://www.linkedin.com/in/khizarbakhtiar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="text-teal-700 hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
        <Link href="/workshop/day-one">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg w-full">
            Start Bootcamp
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Link href="/workshop/day-one">
          <Button variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50 w-full">
            Day 1
          </Button>
        </Link>
        <Link href="/workshop/day-two">
          <Button variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50 w-full">
            Day 2
          </Button>
        </Link>
        <Link href="/workshop/day-three">
          <Button variant="outline" className="border-teal-600 text-teal-700 hover:bg-teal-50 w-full">
            Day 3
          </Button>
        </Link>
      </div>
    </div>
  );
} 