import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request) {
  try {
    const { date, location, guest, time, first_name, last_name, email, telephone } = await request.json();
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(`https://reservaskansas.com.ar/palermo/reservation?picker_step=2&location=1&date=${date.toString()}&time=${time}&guest=${guest}&sdateTime=${date.toString()}+${time}`);

    // Completar el formulario en la página web
    await page.type('input[name="first_name"]', first_name);
    await page.type('input[name="last_name"]', last_name);
    await page.type('input[name="email"]', email);
    await page.type('input[name="telephone"]', telephone);

    // Enviar formulario
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    const confirmationMessage = await page.evaluate(() => {
      return document.querySelector('.confirmation-message')?.innerText || 'No se encontró mensaje de confirmación';
    });

    await browser.close();

    return NextResponse.json({
      success: true,
      data: { confirmationMessage },
    });
  } catch (error) {
    console.error('Scraping error:', error); // Mostrará el error específico en la consola del servidor
    return NextResponse.json(
      {
        success: false,
        error: `Error al procesar la reserva: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
