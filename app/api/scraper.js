import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { sede, fecha, ubicacion, personas, hora } = req.body;

    let driver;

    try {
      // Configurar el driver de Selenium
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build();

      // Navegar a la página de reservas
      await driver.get('https://reservaskansas.com.ar/');

      // Cerrar el pop-up si existe
      try {
        const closeButton = await driver.findElement(By.css('.close-button'));
        await closeButton.click();
      } catch (error) {
        console.log('No se encontró pop-up o no se pudo cerrar');
      }

      // Seleccionar la sede
      const sedeButton = await driver.findElement(By.xpath(`//button[contains(text(), '${sede}')]`));
      await sedeButton.click();

      // Esperar a que se cargue la página de selección de fecha
      await driver.wait(until.elementLocated(By.css('.calendar')), 10000);

      // Seleccionar la fecha (esto puede requerir lógica adicional dependiendo de cómo esté implementado el calendario)
      const fechaElement = await driver.findElement(By.xpath(`//td[@data-date='${fecha}']`));
      await fechaElement.click();

      // Seleccionar ubicación
      const ubicacionSelect = await driver.findElement(By.css('select[name="ubicacion"]'));
      await ubicacionSelect.sendKeys(ubicacion);

      // Seleccionar número de personas
      const personasSelect = await driver.findElement(By.css('select[name="personas"]'));
      await personasSelect.sendKeys(personas);

      // Seleccionar hora
      const horaButton = await driver.findElement(By.xpath(`//button[contains(text(), '${hora}')]`));
      await horaButton.click();

      // Esperar a que se cargue la página final de reserva
      await driver.wait(until.urlContains('picker_step=2'), 10000);

      // Obtener la URL final
      const finalUrl = await driver.getCurrentUrl();

      res.status(200).json({ success: true, reservationUrl: finalUrl });
    } catch (error) {
      console.error('Error durante el scraping:', error);
      res.status(500).json({ success: false, error: error.message });
    } finally {
      if (driver) {
        await driver.quit();
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}