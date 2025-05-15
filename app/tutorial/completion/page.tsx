"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import LoginButton from "@/components/LoginButton";
import Link from "next/link";
import { issueCredential } from "@/lib/oca";

interface DecodedToken {
  user_id: number;
  eth_address: string;
  edu_username: string;
  iss: string;
  iat: number;
  exp: number;
  aud: string;
  [key: string]: any;
}

export default function CompletionPage() {
  const { isInitialized, authState, ocAuth } = useOCAuth();
  const [claimStatus, setClaimStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  
  // Get OCID and wallet address
  const ocId = ocAuth?.getAuthState()?.OCId || "";
  const walletAddress = ocAuth?.getAuthState()?.ethAddress || "";
  
  const handleClaimAchievement = async () => {
    setClaimStatus("loading");
    try {
      let userInfo: DecodedToken | null = null;
      
      if (authState.idToken) {
        userInfo = jwtDecode<DecodedToken>(authState.idToken);
      }
      
      if (!userInfo || !ocId) {
        throw new Error("Unable to get user information. Please reconnect your OCID.");
      }
      
      console.log('Starting credential issuance for tutorial completion:', ocId);
   
      const result = await issueCredential(
        ocId,
        userInfo.user_id.toString(), 
        `${ocId}@example.com` 
      );
      
      console.log('Credential issuance result:', result);
      setClaimStatus("success");
    } catch (error) {
      console.error("Error claiming achievement:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
      setClaimStatus("error");
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Congratulations!
      </h1>
      
      <div className="text-center">
        <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          You've Completed the OCID and OCA Integration Tutorial
        </h2>
        
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          You now have the knowledge to integrate Open Campus ID Connect and Open Campus Achievements into your dApps!
        </p>
        
        <div className="bg-teal-50 p-6 rounded-lg mb-8 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-teal-600 mb-4">
            Claim Your Achievement
          </h3>
          
          {!isInitialized ? (
            <p>Loading...</p>
          ) : !authState.isAuthenticated ? (
            <div>
              <p className="text-gray-700 mb-4">
                Connect your OCID to claim a credential for completing this tutorial.
              </p>
              <LoginButton />
            </div>
          ) : (
            <div>
              {claimStatus === "idle" && (
                <>
                  <p className="text-gray-700 mb-4">
                    You're logged in as <strong>{ocId}</strong>.
                    Click below to claim your Open Campus Achievement.
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    This will issue an OCA credential for your OCID.
                  </p>
                  <Button 
                    onClick={handleClaimAchievement}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Claim Achievement
                  </Button>
                </>
              )}
              
              {claimStatus === "loading" && (
                <div className="text-teal-700">
                  <svg className="animate-spin h-6 w-6 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Issuing your Open Campus Achievement...</p>
                </div>
              )}
              
              {claimStatus === "success" && (
                <div className="text-teal-700">
                  <p className="font-semibold mb-2">🎉 Achievement Claimed!</p>
                  <p className="mb-2">Your credential has been successfully issued.</p>
                  <div className="mt-4 p-4 bg-teal-100 rounded-lg">
                    <p className="font-semibold">View Your Credential</p>
                    <p className="text-sm mt-1">
                      Check your <a 
                        href={`https://id.sandbox.opencampus.xyz/public/credentials?username=${ocId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:underline font-medium"
                      >
                        OCID profile
                      </a> to view your new credential.
                    </p>
                  </div>
                </div>
              )}
              
              {claimStatus === "error" && (
                <div className="text-red-600">
                  <p className="mb-2">There was an error claiming your achievement:</p>
                  <p className="text-sm bg-red-50 p-2 rounded mb-3">{errorMessage}</p>
                  <Button 
                    onClick={handleClaimAchievement}
                    className="bg-teal-600 hover:bg-teal-700 text-white mt-2"
                  >
                    Retry
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto border border-gray-200">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">What's Next?</h3>
          <p className="text-gray-700 mb-4">
            Now that you've learned how to integrate OCID and OCA, you can:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Build your own dApp with OCID authentication</li>
            <li>Issue achievements for your users</li>
            <li>Explore the EDU Chain ecosystem further</li>
            <li>Join the Open Campus community</li>
          </ul>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              For more resources and support, visit the
              <a href="https://educhain.dev" target="_blank" rel="noopener noreferrer" className="text-teal-600 ml-1 hover:underline">
                EDU Chain Developer Portal
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-6 mt-8">
        <Link href="/">
          <span className="text-teal-700 underline">Back to Home</span>
        </Link>
        {claimStatus === "success" && (
          <a 
            href={`https://id.sandbox.opencampus.xyz/public/credentials?username=${ocId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 underline"
          >
            Check your Certificate
          </a>
        )}
      </div>
    </div>
  );
} 