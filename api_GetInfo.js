export async function getPDIVersion(pdiURI) {
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
