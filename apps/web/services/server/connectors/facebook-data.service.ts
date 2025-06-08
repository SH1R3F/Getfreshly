export class FacebookDataService {
  static async getAccountInfo(accessToken: string) {
    const params = new URLSearchParams({
      access_token: accessToken,
      fields: 'id,name',
    });
    const url = `https://graph.facebook.com/v22.0/me?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch account info');
    }

    return await response.json();
  }

  static async getAdAccounts(accessToken: string) {
    const params = new URLSearchParams({
      access_token: accessToken,
      fields: 'id,name',
    });
    const url = `https://graph.facebook.com/v22.0/me/adaccounts?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch ad accounts');
    }

    const { data } = await response.json();

    return data;
  }
}
