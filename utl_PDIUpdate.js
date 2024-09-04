const apiData = {
    "endpoints": {
        "instanceName": {
            "endpoint": "api/now/table/sys_properties?sys_id=instance_name",
            "message": "Sys Properties API: Instance Name - Successful",
            "error": {
                "code": 1001,
                "description": "Example error occurred getting/setting instanceName"
            }
        }
    }
};
export function setUpdateData(endpointName) {
    return apiData.endpoints[endpointName] || { "error": "Endpoint not found" };
}