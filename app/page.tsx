"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, ArrowRight } from "lucide-react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useEffect, useState } from "react";
import { getProgress } from "@/lib/progress";

export default function Home() {
  const { isInitialized, authState } = useOCAuth();
  const isConnected = isInitialized && authState.isAuthenticated;
  const [workshopProgress, setWorkshopProgress] = useState<string>('');
  const [tutorialProgress, setTutorialProgress] = useState<string>('');
  
  // Check for saved progress on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { workshop, tutorial } = getProgress();
      
      if (workshop.lastVisitedPage) {
        setWorkshopProgress(workshop.lastVisitedPage);
      }
      
      if (tutorial.lastVisitedPage) {
        setTutorialProgress(tutorial.lastVisitedPage);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-teal-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 my-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-teal-800 mb-6">
            EduKit
          </h1>
          <p className="text-2xl text-teal-600 max-w-2xl mx-auto leading-relaxed">
            Learn to integrate Open Campus ID and Achievements into your dApps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Workshop Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-teal-800 mb-2">Workshop</h2>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-teal-700 mb-3">Intro to Blockchain</h3>
                <p className="text-gray-700 mb-4">
                  A comprehensive introductory level course for beginners who want to get started in blockchain 
                  and Web3 technologies. Learn the fundamentals and core concepts in this three-day bootcamp.
                </p>
                
                {/* Show continue button if progress exists */}
                {workshopProgress && (
                  <div className="bg-teal-50 p-3 rounded-md flex items-start mb-4 border border-teal-200">
                    <ArrowRight className="w-5 h-5 text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-teal-700 font-medium">
                        You have unfinished progress
                      </p>
                      <Link href={workshopProgress}>
                        <span className="text-xs text-teal-600 hover:underline">
                          Continue where you left off
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
                
                {!isConnected && (
                  <div className="bg-amber-50 p-3 rounded-md flex items-start mb-4 border border-amber-200">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      Connect your OCID before starting this workshop to track your progress.
                    </p>
                  </div>
                )}
                <Link href={isConnected ? "/workshop/day-one" : "/user?redirectTo=/workshop/day-one"}>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    {isConnected ? "Start Workshop" : "Connect OCID & Start Workshop"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Tutorial Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-teal-800 mb-2">Tutorial</h2>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-teal-700 mb-3">OCID & OCA</h3>
                <p className="text-gray-700 mb-4">
                  Learn about the OPENCAMPUS SDK. This tutorial guides you through 
                  integrating Open Campus ID (OCID) and Open Campus Achievements (OCA) 
                  into your dApps with practical examples.
                </p>
                
                {/* Show continue button if progress exists */}
                {tutorialProgress && (
                  <div className="bg-teal-50 p-3 rounded-md flex items-start mb-4 border border-teal-200">
                    <ArrowRight className="w-5 h-5 text-teal-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-teal-700 font-medium">
                        You have unfinished progress
                      </p>
                      <Link href={tutorialProgress}>
                        <span className="text-xs text-teal-600 hover:underline">
                          Continue where you left off
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
                
                {!isConnected && (
                  <div className="bg-amber-50 p-3 rounded-md flex items-start mb-4 border border-amber-200">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      You'll need to connect with your OCID to complete this tutorial and claim your achievement.
                    </p>
                  </div>
                )}
                <Link href={isConnected ? "/tutorial/ocid/introduction" : "/user?redirectTo=/tutorial/ocid/introduction"}>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    {isConnected ? "Start Tutorial" : "Connect OCID & Start Tutorial"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
