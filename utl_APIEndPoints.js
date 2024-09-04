const apiData = {
    "endpoints": {
        "sys_properties": {
            "endpoint": "api/now/table/sys_properties",
            "message": "Sys Properties API - Successful",
            "error": {
                "code": 1001,
                "description": "Example error occurred"
            }
        },
        "pdi_Name": {
            "endpoint": "api/now/table/sys_properties?sysparm_query=name=instance_name",
            "message": "Sys Properties API: PDI Name - Successful",
            "error": {
                "code": 1001,
                "description": "Example error occurred"
            }
        },
        "service_catalog_cart": {
            "endpoint": "api/sn_sc/servicecatalog/cart",
            "message": "Service Catalog Cart Info",
            "error": {
                "code": 1002,
                "description": "Another error occurred"
            }
        },
        "sys_users": {
            "endpoint": "api/now/table/sys_user",
            "message": "System User Info",
            "error": {
                "code": 1002,
                "description": "Another error occurred"
            }
        }
    }
};
export function getEndpointData(endpointName) {
    return apiData.endpoints[endpointName] || { "error": "Endpoint not found" };
}