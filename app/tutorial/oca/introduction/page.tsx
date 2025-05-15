"use client";

import TutorialNavigation from "@/components/TutorialNavigation";

export default function OCAIntroduction() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Introduction to Open Campus Achievements
      </h1>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          What are Open Campus Achievements (OCA)?
        </h2>
        <p className="text-gray-700 mb-4">
          Open Campus Achievements (OCA) are digital, verifiable credentials that adhere to the 
          <a href="https://www.imsglobal.org/spec/ob/v3p0" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer"> Open Badges </a> 
          standard. They allow organizations to issue, manage, and display achievements and certifications on the Open Campus ID platform.
        </p>
        
        <p className="text-gray-700 mb-4">
          These achievements are encrypted and stored on decentralized storage (via Terminal3) and also as 
          NFTs on the blockchain. This ensures transparency, security, and immutability of the credentials.
        </p>
        
        <div className="bg-teal-50 p-6 rounded-lg my-8">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">Key Features of OCA</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Verifiable:</strong> Cryptographically secured via blockchain</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Portable:</strong> Can be displayed across platforms</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Standardized:</strong> Follows Open Badges v3.0 standard</span>
            </li>
            <li className="flex items-start">
              <svg className="h-6 w-6 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span><strong>Decentralized:</strong> Stored both on IPFS and blockchain</span>
            </li>
          </ul>
        </div>
        
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          High-Level Architecture of OCA
        </h2>
        
        <p className="text-gray-700 mb-4">
          The OCA system consists of several components working together:
        </p>
        
        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
          <li>
            <strong>OC ID Connect:</strong> Enables users to authenticate and share their OC ID handles
          </li>
          <li>
            <strong>Achievements Issuance API:</strong> Allows organizations to issue verifiable credentials
          </li>
          <li>
            <strong>OC ID Dashboard:</strong> Where users manage and display their achievements
          </li>
          <li>
            <strong>Blockchain Storage:</strong> Provides immutable record of achievements
          </li>
        </ol>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
          <p className="text-yellow-700">
            <strong>Note:</strong> To issue OCAs, you'll need an OC ID (as the issuer) and an API key from 
            Open Campus. Contact your Open Campus Ambassador to obtain these credentials.
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Benefits of Integrating OCA
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">For Organizations</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Issue verifiable digital credentials</li>
              <li>Reduce certificate fraud</li>
              <li>Integrate with existing systems</li>
              <li>Enhance value of educational offerings</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow p-5 border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-2">For Learners</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Own and control their credentials</li>
              <li>Share achievements securely</li>
              <li>Build a verifiable learning profile</li>
              <li>Eliminate need for credential verification</li>
            </ul>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Getting Started with OCA
        </h2>
        
        <p className="text-gray-700 mb-4">
          To integrate OCA into your application, you'll need:
        </p>
        
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>An OC ID for your organization (used as the issuer ID)</li>
          <li>Implementation of OC ID Connect for your users</li>
          <li>An API key for production access</li>
        </ul>
        
        <p className="text-gray-700 mb-4">
          In the next sections, we'll explore how to use the OCA API to issue and verify credentials.
        </p>
      </div>
      
      <TutorialNavigation />
    </div>
  );
} 