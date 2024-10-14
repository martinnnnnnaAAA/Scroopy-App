// hooks/useReservation.js
const puppeteer = require('puppeteer');

export const useReservation = async (date, time) => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('https://reservaskansas.com.ar/al-rio/');
        
        // Simula seleccionar fecha y hora en el sitio web
        await page.evaluate((date, time) => {
            // Ajusta estos selectores de acuerdo al sitio real
            document.querySelector('input[name="date"]').value = date;
            document.querySelector('select[name="time"]').value = time;
        }, date, time);

        // Finaliza la reserva
        await page.click('button[type="submit"]'); // Ajusta este selector según el botón de reserva real

    } catch (error) {
        console.error("Error al hacer la reserva:", error);
    } finally {
        await browser.close();
    }
};
