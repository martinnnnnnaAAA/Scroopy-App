// pages/api/schedule.js
import { sendSms } from '../../services/VonageService'; // Asegúrate de que esta ruta sea correcta

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, from, text, sendAt } = req.body;

    try {
      // Parse sendAt to Date object and schedule sending
      const scheduledDate = new Date(sendAt);

      // Validate the date
      if (isNaN(scheduledDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date' });
      }

      // Schedule the message (you might use an external scheduling service here)
      scheduleMessage(scheduledDate, () => {
        sendSms(to, from, text)
          .then(response => {
            res.status(200).json({ message: 'Message scheduled successfully', sendAt });
          })
          .catch(error => {
            res.status(500).json({ error: 'Failed to send message' });
          });
      });

    } catch (error) {
      console.error('Error scheduling message:', error);
      res.status(500).json({ error: 'Failed to schedule message' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Helper function to simulate scheduling (replace with actual scheduling logic)
function scheduleMessage(date, callback) {
  const now = new Date();
  const delay = date - now;

  if (delay > 0) {
    setTimeout(callback, delay);
  } else {
    callback();
  }
}
