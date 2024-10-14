// pages/api/reservation.js
import puppeteer from 'puppeteer';
alert('hola')
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phone, date, time, guests } = req.body;

    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      
      await page.goto('https://google.com/', { waitUntil: 'load' });

      await page.type('#date', date);
      
      await page.type('#location', location);
      await page.select('#location', location);

      await page.type('#guest', guests);
      await page.select('#guest', guests);

      await page.type('#time', time);
      await page.select('#time', time);


      await page.type('#nombre', name);
      await page.type('#telefono', phone);
      await page.click('#submit-reservation'); // Ajusta el selector según el sitio web
      await page.waitForNavigation();

      await browser.close();
      res.status(200).json({ message: 'Reserva realizada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al realizar la reserva.' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
