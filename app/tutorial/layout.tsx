import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import TutorialSidebar from "@/components/TutorialSidebar";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OCID & OCA Integration Tutorial | EduKit",
  description: "Learn how to integrate Open Campus ID and Open Campus Achievements into your dApp",
};

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-teal-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 my-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-teal-700 hover:underline">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-teal-800 mt-2">
              OCID & OCA Tutorial
            </h1>
          </div>
          <ProgressBar />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <TutorialSidebar />
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white p-8 rounded-lg shadow-md">
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 