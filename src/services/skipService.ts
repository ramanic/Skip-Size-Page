
import { Skip } from '../stores/skipStore';

const API_BASE_URL = 'https://app.wewantwaste.co.uk/api';

export const fetchSkipsByLocation = async (postcode: string, area: string): Promise<Skip[]> => {
  const url = `${API_BASE_URL}/skips/by-location?postcode=${postcode}&area=${area}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch skips: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Ensure we return an array even if API returns a single object
  return Array.isArray(data) ? data : [data];
};
