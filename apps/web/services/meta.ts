export default function getFacebookOAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`,
    scope: 'ads_management,ads_read,read_insights',
  });

  return `https://www.facebook.com/v22.0/dialog/oauth?${params.toString()}`;
}

export async function getAdAccounts(accessToken: string) {
  const url = `https://graph.facebook.com/v22.0/me/adaccounts`;
  const params = new URLSearchParams({
    access_token: accessToken,
    fields: 'name,account_id',
  });

  const response = await fetch(`${url}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch ad accounts');
  }

  const data = await response.json();
  return data.data.map((account: any) => ({
    id: account.account_id,
    name: account.name,
  }));
}
