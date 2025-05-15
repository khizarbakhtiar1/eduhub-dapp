"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { tutorialSteps } from "./ProgressBar";

export default function TutorialNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const currentIndex = tutorialSteps.findIndex(step => step.path === pathname);
  
  const goNext = () => {
    if (currentIndex < tutorialSteps.length - 1) {
      router.push(tutorialSteps[currentIndex + 1].path);
    }
  };
  
  const goPrevious = () => {
    if (currentIndex > 0) {
      router.push(tutorialSteps[currentIndex - 1].path);
    }
  };
  
  // If we're not on a tutorial page, don't render navigation
  if (currentIndex === -1) {
    return null;
  }
  
  return (
    <div className="flex justify-between mt-8">
      <Button 
        onClick={goPrevious} 
        disabled={currentIndex === 0}
        variant="outline"
        className="text-teal-700 border-teal-300 hover:bg-teal-50"
      >
        <span className="mr-2">←</span> Previous
      </Button>
      <Button 
        onClick={goNext} 
        disabled={currentIndex === tutorialSteps.length - 1}
        className="bg-teal-600 hover:bg-teal-700 text-white"
      >
        {currentIndex === tutorialSteps.length - 2 ? "Complete" : "Next"} <span className="ml-2">→</span>
      </Button>
    </div>
  );
} 