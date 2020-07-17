const puppeteer = require('puppeteer');
const config = require('../../config/constants');

module.exports = {
  async generatePDF(order) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`${config.baseURL}/api/customer/order/invoice-layout/${order._id.toString()}`, { waitUntil: 'networkidle2' });
    const pdf = await page.pdf({ format: 'A4' });

    await browser.close();
    return pdf;
  }
};
