// Credential storage utility

interface ClaimRecord {
  holderOcId: string;
  credentialType: string;
  issuedAt: number;
}

// Local storage key for storing claimed credentials
const CLAIMED_CREDENTIALS_KEY = 'eduhub_claimed_credentials';

/**
 * Check if a credential has already been claimed
 * @param holderOcId The user's OC ID
 * @param credentialType The type of credential ('bootcamp' or default tutorial)
 * @returns boolean indicating if the credential was already claimed
 */
export function hasClaimedCredential(holderOcId: string, credentialType: string): boolean {
  // Don't attempt localStorage access during SSR
  if (typeof window === 'undefined') return false;
  
  try {
    const storedData = localStorage.getItem(CLAIMED_CREDENTIALS_KEY);
    if (!storedData) return false;
    
    const claimedCredentials: Record<string, Record<string, number>> = JSON.parse(storedData);
    return !!(claimedCredentials[holderOcId] && claimedCredentials[holderOcId][credentialType]);
  } catch (error) {
    console.error('Error checking claimed credentials:', error);
    return false;
  }
}

/**
 * Store a claimed credential in localStorage
 * @param record The claim record returned from the API
 */
export function storeClaimedCredential(record: ClaimRecord): void {
  // Don't attempt localStorage access during SSR
  if (typeof window === 'undefined') return;
  
  try {
    const { holderOcId, credentialType, issuedAt } = record;
    
    // Get existing records or initialize an empty object
    const storedData = localStorage.getItem(CLAIMED_CREDENTIALS_KEY);
    const claimedCredentials: Record<string, Record<string, number>> = 
      storedData ? JSON.parse(storedData) : {};
    
    // Make sure the user's record exists
    if (!claimedCredentials[holderOcId]) {
      claimedCredentials[holderOcId] = {};
    }
    
    // Store the claim record
    claimedCredentials[holderOcId][credentialType] = issuedAt;
    
    // Save back to localStorage
    localStorage.setItem(CLAIMED_CREDENTIALS_KEY, JSON.stringify(claimedCredentials));
  } catch (error) {
    console.error('Error storing claimed credential:', error);
  }
}

/**
 * Get all credentials claimed by a user
 * @param holderOcId The user's OC ID
 * @returns Object with credential types as keys and claim timestamps as values
 */
export function getUserClaimedCredentials(holderOcId: string): Record<string, number> {
  // Don't attempt localStorage access during SSR
  if (typeof window === 'undefined') return {};
  
  try {
    const storedData = localStorage.getItem(CLAIMED_CREDENTIALS_KEY);
    if (!storedData) return {};
    
    const claimedCredentials: Record<string, Record<string, number>> = JSON.parse(storedData);
    return claimedCredentials[holderOcId] || {};
  } catch (error) {
    console.error('Error getting user claimed credentials:', error);
    return {};
  }
}

/**
 * Clear all stored credential claims (useful for debugging or testing)
 */
export function clearClaimedCredentials(): void {
  // Don't attempt localStorage access during SSR
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(CLAIMED_CREDENTIALS_KEY);
  } catch (error) {
    console.error('Error clearing claimed credentials:', error);
  }
} 