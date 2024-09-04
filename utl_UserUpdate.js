import axios from 'axios';

const instance = '<your-instance>';
const password = '<your-password>';

export const updateUserPhoneNumber = async (username, phoneNumber) => {
    const url = `https://${instance}.service-now.com/api/now/table/sys_user`;
    const auth = Buffer.from(`${username}:${password}`).toString('base64');

    // Fetch the user ID based on the username
    try {
        const userResponse = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Basic ${auth}`
            },
            params: {
                sysparm_query: `user_name=${username}`
            }
        });

        if (userResponse.data.result.length === 0) {
            throw new Error('User not found');
        }

        const userId = userResponse.data.result[0].sys_id;

        // Update the user's phone number
        const updateUrl = `${url}/${userId}`;
        const data = {
            phone: phoneNumber
        };

        const updateResponse = await axios.patch(updateUrl, data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${auth}`
            }
        });

        console.log('User phone number updated:', updateResponse.data);
    } catch (error) {
        console.error('Error updating user phone number:', error);
    }
};
