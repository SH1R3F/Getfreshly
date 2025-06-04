export default function getFacebookOAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`,
    scope: 'ads_management,ads_read,read_insights',
  });

  return `https://www.facebook.com/v22.0/dialog/oauth?${params.toString()}`;
}

export async function getAccountInfo(accessToken: string) {
  const url = `https://graph.facebook.com/v22.0/me`;
  const params = new URLSearchParams({
    access_token: accessToken,
    fields: 'id,name',
  });

  const response = await fetch(`${url}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch account info');
  }

  return await response.json();
}
