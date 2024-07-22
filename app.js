//
//https://docs.servicenow.com/bundle/washingtondc-api-reference/page/build/applications/concept/api-rest.html

//
//
import fetch from 'node-fetch'; // ES module import
import dotenv from 'dotenv'; // ES module import
dotenv.config(); // Load environment variables from .env file
import { getOAuthToken } from "./utl_Auth.js"

async function getPDIProperties(pdiUrl, username, password) {
    try {
        const response = await fetch(`${pdiUrl}/api/now/v1/table/sys_properties`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching version: ${response.status} ${response.statusText}`);
        }

        const responseBody = await response.text(); // Read the response body as text
        const data = JSON.parse(responseBody); // Parse the text as JSON

        let versionProperty = null;
        data.result.forEach(prop => {
            if (prop.name.includes('version')) {
                // console.log(prop.name, " --> ", prop.value, "\n\n");
                if (prop.name === 'com.glide.embedded_help.version') {
                    versionProperty = prop.value
                }
            }

        });

        // const versionProperty = data.result.find(prop => prop.name === 'com.glide.embedded_help.version.value');
        return versionProperty;
    } catch (error) {
        if (error.message.includes("Unexpected token")) {
            console.log("WAKE YOUR INSTANCE FROM THE DEVELOPER PORTAL")
            console.log("https://developer.servicenow.com")
            console.log("Instance URL: ", pdiUrl)
        } else {
            console.error(`Error fetching version: ${error.message}`);
        }
        return null;
    }
}

async function nowAPI(apiUrl, username, password) {
    try {
        const response = await fetch(`${apiUrl}`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error calling API: ${response.status} ${response.statusText}`);
        }

        const responseBody = await response.text(); // Read the response body as text
        const data = JSON.stringify(responseBody); // Parse the text as JSON

        console.log(data)

        return data

    } catch (error) {
        if (error.message.includes("Unexpected token")) {
            console.log("WAKE YOUR INSTANCE FROM THE DEVELOPER PORTAL")
        }
        console.error(`Error fetching version: ${error.message}`);
        return null;
    }
}


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

    const apiURL = PDI_URL + "/stats.do"
    const stats = await nowAPI(apiURL, PDI_UID, PDI_PWD)
    if (stats) {
        console.log("here are the stats:\n", stats)
    } else {
        console.log('Unable to retrieve PID stats.');
    }

})();
