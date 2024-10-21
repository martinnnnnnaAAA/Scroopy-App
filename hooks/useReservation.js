import { useState } from 'react';

export function useReservation() {
  const [isLoading, setIsLoading] = useState(false);

  const makeReservation = async (formData) => {
    setIsLoading(true);
    try {
      console.log('Sending reservation request with data:', formData);
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Received response:', data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data.success;
    } catch (error) {
      console.error('Error in makeReservation:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { makeReservation, isLoading };
}
