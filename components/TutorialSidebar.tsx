"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { tutorialSteps } from "./ProgressBar";
import { ChevronDown, ChevronRight, BookOpen, GraduationCap, Book } from "lucide-react";
import Link from "next/link";

// Group tutorial steps by section
const tutorialSections = {
  "OCID": tutorialSteps.filter(step => step.path.includes("/ocid/")),
  "OCA": tutorialSteps.filter(step => step.path.includes("/oca/")),
  "Smart Contract": tutorialSteps.filter(step => step.path.includes("/smart-contract")),
  "Completion": tutorialSteps.filter(step => step.path.includes("/completion"))
};

// Icons mapping for sections
const sectionIcons = {
  "OCID": <GraduationCap className="w-4 h-4 mr-2" />,
  "OCA": <BookOpen className="w-4 h-4 mr-2" />,
  "Smart Contract": <Book className="w-4 h-4 mr-2" />,
  "Completion": <GraduationCap className="w-4 h-4 mr-2" />
};

export default function TutorialSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState(() => {
    // Auto-expand the section containing the current page
    const initialState: Record<string, boolean> = {};
    
    Object.entries(tutorialSections).forEach(([key, steps]) => {
      if (steps.some(step => step.path === pathname)) {
        initialState[key] = true;
      } else {
        initialState[key] = false;
      }
    });
    
    return initialState;
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h3 className="text-lg font-semibold text-teal-800 mb-4 border-b pb-2">
        Tutorial Sections
      </h3>
      
      <div className="space-y-2">
        {Object.entries(tutorialSections).map(([section, steps]) => (
          <div key={section} className="border-b border-gray-100 pb-2 last:border-0">
            <button 
              onClick={() => toggleSection(section)}
              className="flex items-center w-full text-left text-teal-700 font-medium py-1 hover:bg-teal-50 rounded-md px-2 transition-colors"
            >
              {expandedSections[section] ? 
                <ChevronDown className="w-4 h-4 mr-1" /> : 
                <ChevronRight className="w-4 h-4 mr-1" />
              }
              {sectionIcons[section as keyof typeof sectionIcons]}
              {section}
            </button>
            
            {expandedSections[section] && (
              <div className="pl-6 mt-1 space-y-1">
                {steps.map(step => (
                  <Link 
                    key={step.path} 
                    href={step.path}
                    className={`block py-1 px-2 text-sm rounded-md ${
                      pathname === step.path 
                        ? "bg-teal-100 text-teal-800 font-medium" 
                        : "text-gray-600 hover:bg-teal-50"
                    }`}
                  >
                    {step.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 