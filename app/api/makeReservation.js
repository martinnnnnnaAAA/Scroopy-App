import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { date, time, name, contact } = req.body;

    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      await page.goto('https://www.kansasgrillandbar.com.ar/reservas.php', {
        waitUntil: 'networkidle2',
      });

      // Completa el formulario de reserva
      await page.select('select[name="fecha"]', date); // Cambia el selector si es necesario
      await page.select('select[name="hora"]', time); // Cambia el selector si es necesario
      await page.type('input[name="nombre"]', name); // Cambia el selector si es necesario
      await page.type('input[name="contacto"]', contact); // Cambia el selector si es necesario

      // Envía la reserva
      await Promise.all([
        page.click('button[type="submit"]'), // Cambia el selector si es necesario
        page.waitForNavigation(),
      ]);

      const successMessage = await page.evaluate(() => {
        return document.querySelector('.success-message')?.innerText;
      });

      await browser.close();
      res.status(200).json({ message: successMessage || 'Reserva realizada con éxito' });
    } catch (err) {
      console.error('Error en la reserva:', err); // Agregado para ver errores en la consola del servidor
      res.status(500).json({ error: 'Error al realizar la reserva: ' + err.message });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
