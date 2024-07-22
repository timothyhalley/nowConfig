
export async function getOAuthToken() {

  // Make an HTTP request to get the token
  // (You can use a library like Axios or fetch)
  const response = await fetch(`${instanceUrl}/oauth_token.do`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
  });

  const data = await response.json();
  const accessToken = data.access_token;

}

