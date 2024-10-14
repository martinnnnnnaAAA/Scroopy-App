// app/api/reservation/route.js
import puppeteer from 'puppeteer';

export async function POST(req) {
  try {
    const data = await req.json(); // Recibe cualquier dato necesario para hacer la reserva, como fecha y hora

    // Lógica de puppeteer para hacer la reserva
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Abre la página de reservas del restaurante Kansas
    await page.goto('https://www.kansas.com.ar/reservas');

    // Aquí iría la lógica para interactuar con la página web, por ejemplo:
    await page.type('#fecha', data.fecha); // Ejemplo de cómo seleccionar y rellenar un campo
    await page.click('#boton-reservar'); // Ejemplo de cómo hacer clic en un botón

    // Espera a que la página procese la reserva y confirme
    await page.waitForSelector('.confirmacion-reserva');

    const resultado = await page.evaluate(() => {
      return document.querySelector('.confirmacion-reserva').innerText;
    });

    await browser.close();

    return new Response(JSON.stringify({ success: true, message: resultado }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
