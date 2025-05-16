"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import LoginButton from "@/components/LoginButton";
import { issueBootcampCredential } from "@/lib/oca";
import WorkshopProgress from "@/components/WorkshopProgress";
import { hasClaimedCredential } from "@/utils/credentialStorage";

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
  
  // Check if already claimed when component loads
  const alreadyClaimed = ocId ? hasClaimedCredential(ocId, "bootcamp") : false;
  if (alreadyClaimed && claimStatus === "idle") {
    setClaimStatus("success");
  }
  
  const handleClaimAchievement = async () => {
    // If already claimed, just show success
    if (alreadyClaimed) {
      setClaimStatus("success");
      return;
    }
    
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
      
      // Check for already issued errors
      if (result.alreadyIssued) {
        setClaimStatus("success");
        return;
      }
      
      if (!result.success) {
        throw new Error(result.message || "Failed to issue credential");
      }
      
      setClaimStatus("success");
    } catch (error) {
      console.error("Error claiming achievement:", error);
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
      setClaimStatus("error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Workshop Progress */}
      <WorkshopProgress />
      
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Bootcamp Completed!
      </h1>
      
      <div className="bg-teal-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-6">
          Congratulations on Completing the Web3 Developer Bootcamp! 
        </h2>
        
        <p className="text-gray-700 mb-6">
          You've successfully finished all three days of our intensive blockchain developer workshop.
          Now you have the knowledge and skills to build your own decentralized applications.
        </p>
        
        <h3 className="text-xl font-semibold text-teal-700 mb-4">
          What You've Learned:
        </h3>
        
        <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
          <li>Setting up a complete Web3 development environment</li>
          <li>Writing, testing and deploying smart contracts</li>
          <li>Building a frontend that interacts with the blockchain</li>
          <li>Working with MetaMask and other Web3 wallets</li>
          <li>Best practices for blockchain development</li>
        </ul>
        
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold text-teal-700 mb-4">
            Claim Your Achievement
          </h3>
          
          {!isInitialized || !authState.isAuthenticated ? (
            <div>
              <p className="text-gray-700 mb-4">
                Connect your OCID to claim your bootcamp completion credential.
              </p>
              <LoginButton />
            </div>
          ) : (
            <div>
              <p className="text-gray-700 mb-4">
                {claimStatus !== "success" 
                  ? "You can now claim your Web3 Developer Bootcamp credential. This verifiable credential will be added to your OCID profile."
                  : "You've successfully claimed your Web3 Developer Bootcamp credential."}
              </p>
              
              {claimStatus === "idle" && (
                <Button 
                  onClick={handleClaimAchievement}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  Claim Achievement
                </Button>
              )}
              
              {claimStatus === "loading" && (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border-2 border-t-teal-600 border-r-teal-600 border-b-transparent border-l-transparent animate-spin"></div>
                  <span className="text-teal-700">Processing...</span>
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
      </div>
      
      <div className="flex justify-between">
        <Link href="/workshop/day-three">
          <Button variant="outline">
            ← Back to Day Three
          </Button>
        </Link>
        
        <Link href="/">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
} 