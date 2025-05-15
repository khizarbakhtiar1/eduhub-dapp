import { NextRequest, NextResponse } from 'next/server';

// Replace with your actual API key from Open Campus Developer Account
const API_KEY = '7884e98a-3460-4cb4-a73c-c4d7625ff7de'; // OCA API Key
const ISSUER_DID = 'did:key:zUC7FwJUeo1pR6j1tyiF2owzLw66UDV9SCNq11mpDv9sKboW23PfvMnDAbWyr8vp3gAczpwPfwWFeSDzhWrVuoBnB1TkQLNei37ZipaVwGsXm6FD1aBSStxwEVMetREjwYH1vUw';

// OCA API endpoints
const OCA_API_SANDBOX = 'https://api.vc.staging.opencampus.xyz/issuer/vc';
const OCA_API_PRODUCTION = 'https://api.vc.opencampus.xyz/issuer/vc';

// Use sandbox by default, change to production when ready
const OCA_API_URL = OCA_API_SANDBOX;

export async function POST(request: NextRequest) {
  try {
    // Log the incoming request
    console.log('======== CREDENTIAL REQUEST RECEIVED ========');
    
    const body = await request.json();
    console.log('Request body:', JSON.stringify(body, null, 2));
    
    const { credentialType, holderOcId, userName, userEmail } = body;
    
    if (!holderOcId || !userName || !userEmail) {
      console.error('Missing required parameters:', { holderOcId, userName, userEmail });
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    console.log('Processing credential request with params:', { credentialType, holderOcId, userName, userEmail });
    
    // Format credentialPayload based on OCA API documentation
    // https://devdocs.educhain.xyz/start-building/open-campus-achievements/api-specifications
    let credentialPayload;
    
    // Get current date in ISO format for the timestamps
    const currentDate = new Date().toISOString();
    
    // Format payload based on credential type
    if (credentialType === 'bootcamp') {
      credentialPayload = {
        validFrom: currentDate,
        awardedDate: currentDate,
        description: "Completed the Educhain Web3 Developer Bootcamp",
        credentialSubject: {
          name: userName,
          type: "Person",
          email: userEmail,
          image: "https://khizarbakhtiar1.sirv.com/eduhub.png",
          profileUrl: `https://id.opencampus.xyz/profile/${holderOcId}`,
          achievement: {
            name: "Web3 Developer Bootcamp",
            identifier: `edukit:bootcamp:${Date.now()}`,
            description: "Successfully completed the Web3 Developer Bootcamp",
            achievementType: "Certificate"
          }
        }
      };
    } else {
      // Default tutorial credential
      credentialPayload = {
        validFrom: currentDate,
        awardedDate: currentDate,
        description: "Completed the OCID and OCA Integration Tutorial",
        credentialSubject: {
          name: userName,
          type: "Person",
          email: userEmail,
          image: "https://khizarbakhtiar1.sirv.com/eduhub.png",
          profileUrl: `https://id.opencampus.xyz/profile/${holderOcId}`,
          achievement: {
            name: "OCID & OCA Integration Master",
            identifier: `edukit:${Date.now()}`,
            description: "Successfully completed the comprehensive tutorial on integrating OCID Connect and Open Campus Achievements into dApps.",
            achievementType: "Certificate"
          }
        }
      };
    }

    // Exact structure according to docs:
    // https://devdocs.educhain.xyz/start-building/open-campus-achievements/api-specifications
    const payload = {
      credentialPayload: credentialPayload,
      holderOcId: holderOcId
    };

    console.log('======== SENDING TO OCA API ========');
    console.log('OCA API URL:', OCA_API_URL);
    console.log('Request payload:', JSON.stringify(payload, null, 2));

    const ocaResponse = await fetch(OCA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY, 
      },
      body: JSON.stringify(payload),
    });

    // Log response status for debugging
    console.log('======== OCA API RESPONSE ========');
    console.log('Status code:', ocaResponse.status);
    console.log('Status text:', ocaResponse.statusText);
    
    // Log a few important headers without using iterator
    const headers = {
      'content-type': ocaResponse.headers.get('content-type'),
      'content-length': ocaResponse.headers.get('content-length'),
      'date': ocaResponse.headers.get('date')
    };
    console.log('Headers:', headers);
    
    // Handle error responses
    if (!ocaResponse.ok) {
      let errorText = '';
      let errorData = null;
      
      try {
        errorData = await ocaResponse.json();
        errorText = JSON.stringify(errorData, null, 2);
        console.error('OCA API error response (JSON):', errorData);
      } catch (e) {
        try {
          errorText = await ocaResponse.text();
          console.error('OCA API error response (Text):', errorText);
        } catch (textError) {
          errorText = 'Could not parse response body';
          console.error('Failed to read response body:', textError);
        }
      }
      
      return NextResponse.json(
        { 
          error: `OCA API error: HTTP ${ocaResponse.status}`,
          details: errorText,
          data: errorData
        },
        { status: ocaResponse.status }
      );
    }

    // Parse and return the successful response
    const data = await ocaResponse.json();
    console.log('OCA API success response:', JSON.stringify(data, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Credential issued successfully',
      data: data
    });
  } catch (error) {
    console.error('======== ERROR IN API ROUTE ========');
    console.error('Error:', error);
    
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Error issuing credential',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 