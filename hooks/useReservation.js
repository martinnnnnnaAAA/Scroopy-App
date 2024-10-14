// hooks/useReservation.js
export const useReservation = async ({ name, phone, date, time, guests }) => {
    alert('si')
    try {
      const response = await fetch('../api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, date, time, guests }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, message: data.message };
      } else {
        throw new Error('Error al realizar la reserva.');
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Error al realizar la reserva.' };
    }
  };
  