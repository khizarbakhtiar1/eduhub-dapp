"use client";

import TutorialNavigation from "@/components/TutorialNavigation";

export default function OCAVerification() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-teal-800 mb-6">
        Verifying Open Campus Achievements
      </h1>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Understanding Credential Verification
        </h2>
        
        <p className="text-gray-700 mb-4">
          Verification is a crucial aspect of Open Campus Achievements. It ensures that credentials are:
        </p>
        
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li><strong>Authentic</strong> - Issued by the claimed issuer</li>
          <li><strong>Unaltered</strong> - Content has not been modified since issuance</li>
          <li><strong>Valid</strong> - Not expired or revoked</li>
        </ul>
        
        <p className="text-gray-700 mb-4">
          OCAs use cryptographic proofs and blockchain technology to enable secure verification. This provides 
          a higher level of trust compared to traditional credentials that can be easily forged.
        </p>
        
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Verification Methods
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-3">1. OC ID Dashboard</h3>
            <p className="text-gray-700 mb-2">
              The simplest way to verify an achievement is through the Open Campus ID Dashboard. Anyone can view 
              a user's public profile to see their verified credentials.
            </p>
            <p className="text-gray-700 mb-2">
              Public profile URL format:
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm">https://id.opencampus.xyz/profile/credentials?username=&lt;OC_ID&gt;</pre>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-3">2. Blockchain Verification</h3>
            <p className="text-gray-700 mb-2">
              OCAs are stored as NFTs on the EDU Chain, providing an immutable record. You can verify a credential's 
              existence and metadata by checking the blockchain directly.
            </p>
            <p className="text-gray-700 mb-2">
              Use the EDU Chain Explorer to check the NFT associated with a credential:
            </p>
            <pre className="bg-gray-100 p-2 rounded text-sm">https://explorer.educhain.dev/nft/&lt;CONTRACT_ADDRESS&gt;/&lt;TOKEN_ID&gt;</pre>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-teal-600 mb-3">3. Programmatic Verification</h3>
            <p className="text-gray-700 mb-2">
              For applications that need to verify credentials programmatically, you can use the verification API 
              or implement your own verification logic using the credential's digital signature.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Implementing Verifiable Presentation (VP)
        </h2>
        
        <p className="text-gray-700 mb-4">
          A Verifiable Presentation (VP) allows a credential holder to present a proof of their credential to a verifier 
          in a secure, privacy-preserving way. The holder can choose which credentials or claims to share.
        </p>
        
        <div className="bg-gray-900 text-white p-4 rounded-md mb-6 overflow-x-auto">
          <pre>{`// Example of building a Verifiable Presentation
async function createVerifiablePresentation(credential, recipientDid) {
  // In a real implementation, you would:
  // 1. Select the specific credential(s) to include
  // 2. Create a VP structure that includes the credential
  // 3. Sign the VP with the holder's private key
  // 4. Send the VP to the verifier
  
  const verifiablePresentation = {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "type": ["VerifiablePresentation"],
    "verifiableCredential": [credential],
    "holder": holderDid,
    // Additional claims or disclosures
  };
  
  // Sign the presentation
  // const signedVP = await signPresentation(verifiablePresentation);
  
  return verifiablePresentation;
}`}</pre>
        </div>
        
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Credential Revocation
        </h2>
        
        <p className="text-gray-700 mb-4">
          In some cases, issuers may need to revoke credentials that were incorrectly issued or are no longer valid. 
          The OCA system supports credential revocation through the Open Campus API.
        </p>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-teal-600 mb-2">Revocation Process</h3>
          <p className="text-gray-700 mb-2">
            Only the original issuer can revoke a credential. The process involves:
          </p>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            <li>Identifying the specific credential by its ID</li>
            <li>Calling the revocation API with proper authorization</li>
            <li>Updating the revocation status on the blockchain</li>
          </ol>
          <p className="text-gray-700 mt-3">
            Once revoked, the credential will be marked as invalid in the Open Campus ID Dashboard 
            and through verification APIs.
          </p>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
          <p className="text-yellow-700">
            <strong>Important:</strong> Revocation should be used judiciously. Since credentials are stored on 
            the blockchain, revocation doesn't delete the credential but marks it as invalid.
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Building a Verification UI
        </h2>
        
        <p className="text-gray-700 mb-4">
          If you want to implement credential verification in your application, consider creating a user-friendly 
          verification UI. Here's an example approach:
        </p>
        
        <div className="bg-white p-5 rounded-lg border border-gray-200 mb-6">
          <ol className="list-decimal list-inside text-gray-700 space-y-3">
            <li><strong>Input Method:</strong> Allow users to submit a credential for verification by:
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Entering a credential ID</li>
                <li>Uploading a JSON credential file</li>
                <li>Scanning a QR code</li>
              </ul>
            </li>
            <li><strong>Verification Process:</strong> Show a clear indication that verification is in progress</li>
            <li><strong>Results Display:</strong> Present verification results with:
              <ul className="list-disc list-inside ml-6 mt-1">
                <li>Clear success/failure indication</li>
                <li>Issuer information</li>
                <li>Issuance and expiration dates</li>
                <li>Achievement details</li>
              </ul>
            </li>
          </ol>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
          <p className="text-blue-700">
            <strong>Best Practice:</strong> Always check the credential status (valid, expired, revoked) 
            as part of your verification process. Display this status prominently to users.
          </p>
        </div>
        
        <h2 className="text-2xl font-semibold text-teal-700 mt-8 mb-4">
          Privacy Considerations
        </h2>
        
        <p className="text-gray-700 mb-4">
          When implementing verification solutions, consider these privacy aspects:
        </p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <svg className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-gray-700">
              <strong>Consent:</strong> Always get user consent before verifying their credentials
            </p>
          </div>
          
          <div className="flex items-start">
            <svg className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-gray-700">
              <strong>Selective Disclosure:</strong> Support sharing only necessary credential information
            </p>
          </div>
          
          <div className="flex items-start">
            <svg className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-gray-700">
              <strong>Data Minimization:</strong> Only collect and store verification data that's necessary
            </p>
          </div>
          
          <div className="flex items-start">
            <svg className="h-6 w-6 text-teal-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-gray-700">
              <strong>Transparency:</strong> Clearly communicate how verification data will be used
            </p>
          </div>
        </div>
      </div>
      
      <TutorialNavigation />
    </div>
  );
} 