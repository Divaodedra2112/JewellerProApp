import { get } from './api';

export interface AssociationInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  workingHours: {
    [key: string]: string; // e.g., "Monday": "9:00 AM - 5:00 PM"
  };
}

/**
 * Fetches association information from the API
 * @returns Association information including name, address, contact details, and working hours
 */
export const getAssociationInfo = async (): Promise<AssociationInfo> => {
  try {
    // TODO: Replace with your actual API endpoint
    // Example: const response = await get<AssociationInfo>('/association/info');
    // return response.data;
    
    // For now, returning mock data - replace with actual API call
    // This allows you to test the UI while setting up the backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'Sample Association',
          address: '123 Main Street, City, State 12345',
          phone: '+1234567890',
          email: 'info@association.com',
          workingHours: {
            Monday: '9:00 AM - 5:00 PM',
            Tuesday: '9:00 AM - 5:00 PM',
            Wednesday: '9:00 AM - 5:00 PM',
            Thursday: '9:00 AM - 5:00 PM',
            Friday: '9:00 AM - 5:00 PM',
            Saturday: '10:00 AM - 2:00 PM',
            Sunday: 'Closed',
          },
        });
      }, 500); // Simulate network delay
    });
  } catch (error) {
    console.error('Error fetching association info:', error);
    throw error;
  }
};


