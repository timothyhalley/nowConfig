//
// Module Function: Main calling app / entry point for project
//

// Supporting Libraries:
import { callAPI, nowAPI2 } from "./utl_Fetch.js";
import { getEndpointData } from "./utl_APIEndPoints.js";
import { setUpdateData } from "./utl_PDIUpdate.js";
import { getPDIVersion } from './api_GetInfo.js';


(async function () {

    // Get instance Info:
    // -------------------------------------------------------------------
    // Get PDI Name:
    const apiGetName = getEndpointData("pdi_Name")
    const pdiName = await callAPI(apiGetName.endpoint);
    if (pdiName.result && pdiName.result.length > 0) {
        console.log('Instance Name:', pdiName.result[0].value);
    } else {
        console.log('Unable to retrieve PDI Name.');
    }
    // Version --> 
    const sys_prop_api = getEndpointData("sys_properties")
    const data = await callAPI(sys_prop_api.endpoint);
    if (data) {
        // Select VERSION from sys_props data
        let versionProperty = null;
        data.result.forEach(prop => {
            if (prop.name.includes('version')) {
                // console.log(prop.name, " --> ", prop.value, "\n\n");
                if (prop.name === 'com.glide.embedded_help.version') {
                    versionProperty = prop.value
                }
            }
        });
        console.log(`PDI version: ${versionProperty}`);
    } else {
        console.log('Unable to retrieve version.');
    }



    // const apiURL = PDI_URL + "/stats.do"
    // const statsHTML = await nowAPI2(PDI_UID, PDI_PWD, apiURL)
    // if (statsHTML) {
    //     console.log("\n\nHere are the stats:\n", statsHTML)
    // } else {
    //     console.log('\n\nUnable to retrieve PID stats.');
    // }

    const apiCart = "api/sn_sc/servicecatalog/cart"
    // console.log(apiCart)
    const cartItems = await callAPI(apiCart)
    if (cartItems) {
        console.log("\n\nShow cart items:\n", cartItems)
    } else {
        console.log('\n\nUnable to retrieve cart.');
    }

    const apiSysUsers = "api/now/table/sys_user"
    const apiUsers = await callAPI(apiSysUsers)
    if (apiUsers) {

        const result = apiUsers.result
            .filter(user => user.user_name === 'admin')
            .map(user => ({
                user_name: user.user_name,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                email: user.email,
                avatar: user.avatar
        }));
        console.log("\n\nShow Sys Users:\n", result)
    } else {
        console.log('\n\nUnable to get SysUsers.');
    }

})();


// Help URL:
//
//https://docs.servicenow.com/bundle/xanadu-api-reference/page/build/applications/concept/api-rest.html
//