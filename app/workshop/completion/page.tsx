"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import LoginButton from "@/components/LoginButton";
import { issueBootcampCredential } from "@/lib/oca";

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

export default function Completion() {
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
      
      if (!userInfo || !ocId || !walletAddress) {
        throw new Error("Unable to get user information. Please reconnect your OCID.");
      }
      
      console.log('Starting credential issuance for user:', ocId);
      

      const result = await issueBootcampCredential(
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
    <div className="space-y-10 max-w-2xl mx-auto text-center py-16">
      <h1 className="text-4xl font-bold text-teal-800 mb-4">Congratulations!</h1>
      <p className="text-xl text-gray-700 mb-6">
        "This was just the start of your blockchain journey, but you have made great progress. Keep building, keep learning!"
      </p>
      <div className="bg-teal-50 p-8 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-semibold text-teal-700 mb-2">Course Completed</h2>
        <p className="text-lg text-gray-800 mb-4">You have successfully completed the Blockchain Bootcamp!</p>
        
        {!isInitialized ? (
          <p>Loading...</p>
        ) : !authState.isAuthenticated ? (
          <div>
            <p className="text-md text-gray-700 mb-6">Connect your OCID to get your certificate.</p>
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
                <Button 
                  onClick={handleClaimAchievement}
                  className="bg-teal-600 hover:bg-teal-700 text-white w-full max-w-xs mx-auto"
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
      <div className="flex justify-center space-x-6">
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