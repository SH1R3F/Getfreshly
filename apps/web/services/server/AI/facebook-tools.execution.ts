const FB_API_VERSION = 'v22.0';
const FB_GRAPH_URL = `https://graph.facebook.com/${FB_API_VERSION}`;

// Utility functions from your original file
const makeGraphApiCall = async (
  url: string,
  params: Record<string, any>,
): Promise<any> => {
  try {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        urlParams.append(key, String(value));
      }
    });

    const fullUrl = `${url}?${urlParams.toString()}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return `Error making Graph API call to ${url}:` + error;
  }
};

export const facebookToolsExecution = (accessToken?: string) => ({
  list_ad_accounts: async () => {
    const url = `${FB_GRAPH_URL}/me`;
    const params = {
      access_token: accessToken,
      fields: 'adaccounts{name}',
    };
    const result = await makeGraphApiCall(url, params);
    return result;
  },
});
