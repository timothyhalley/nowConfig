import axios from 'axios';
import { JSDOM } from 'jsdom';
import dotenv from 'dotenv'; // ES module import
dotenv.config(); // Load environment variables from .env file

// get environment vars from .env
const PDI_URL = process.env.PDI_URL
const PDI_UID = process.env.PDI_UID
const PDI_PWD = process.env.PDI_PWD

const STATS_URL = PDI_URL + 'status.do'

console.log("URL: ", STATS_URL)

async function fetchStats() {
    try {
        const response = await axios.get(STATS_URL, {
            auth: {
                username: PDI_UID,
                password: PDI_PWD
            }
        });
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        console.log("Here is the document: \n\n", document)

        const stats = {};
        document.querySelectorAll('tr').forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length === 2) {
                const key = cells[0].textContent.trim();
                const value = cells[1].textContent.trim();
                stats[key] = value;
            }
        });

        console.log(JSON.stringify(stats, null, 2));
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

fetchStats();