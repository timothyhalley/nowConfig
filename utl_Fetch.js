// get environment vars from .env
import dotenv from 'dotenv'; // ES module import
dotenv.config(); // Load environment variables from .env file
const PDI_URL = process.env.PDI_URL
const PDI_UID = process.env.PDI_UID
const PDI_PWD = process.env.PDI_PWD


export async function getAPI(apiURI) {
    try {
        const apiURL = PDI_URL + apiURI
        const response = await fetch(`${apiURL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${btoa(`${PDI_UID}:${PDI_PWD}`)}`,
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error calling API: ${response.status} ${response.statusText}`);
        }

        // const responseBody = await response.text(); // Read the response body as text
        // const data = JSON.stringify(responseBody); // Parse the text as JSON

        const data = await response.json()
        // console.log(data)

        return data

    } catch (error) {
        if (error.message.includes("Unexpected token")) {
            console.log("WAKE YOUR INSTANCE FROM THE DEVELOPER PORTAL")
        }
        console.error(`Error fetching version: ${error.message}`);
        return null;
    }
}

export async function putAPI(apiURI) {
    try {
        const apiURL = PDI_URL + apiURI
        const response = await fetch(`${apiURL}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Basic ${btoa(`${PDI_UID}:${PDI_PWD}`)}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Error calling API: ${response.status} ${response.statusText}`);
        }

        // const responseBody = await response.text(); // Read the response body as text
        // const data = JSON.stringify(responseBody); // Parse the text as JSON

        const data = await response.text()
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