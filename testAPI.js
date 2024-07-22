// testAPI: read a file, create an array of API to send and test
//
// API DOC: 
//
import fetch from 'node-fetch'; // ES module import
import dotenv from 'dotenv'; // ES module import
dotenv.config(); // Load environment variables from .env file

(async function () {

    // get environment vars from .env
    const PDI_URL = process.env.PDI_URL
    const PDI_UID = process.env.PDI_UID
    const PDI_PWD = process.env.PDI_PWD

    // call functions
    const version = await getPDIProperties(PDI_URL, PDI_UID, PDI_PWD);
    if (version) {
        console.log(`PDI version: ${version}`);
    } else {
        console.log('Unable to retrieve version.');
    }

})();