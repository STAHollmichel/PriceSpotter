import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeAmazonProduct(url: string) {
    if(!url) return;

    // curl --proxy brd.superproxy.io:22225 --proxy-user 
    // brd-customer-hl_e8be35f2-zone-unblocker:yqt5c7vapndg 
    // -k https://lumtest.com/myip.json

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random() ) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        //Fetch the product page
        const response = await axios.get(url, options);
        
        console.log(response.data);
    }   catch (error: any){
        throw  new Error(`Failed to scrape produt: ${error.message}`)
    }
}