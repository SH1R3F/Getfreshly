import { TokenResponse } from '@/types/facebook';

export function getFacebookOAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`,
    scope: 'ads_management,ads_read,read_insights',
  });

  return `https://www.facebook.com/v22.0/dialog/oauth?${params.toString()}`;
}

export class FacebookTokenService {
  static async exchangeCodeForToken(code: string) {
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`,
      client_secret: process.env.FACEBOOK_APP_SECRET!,
      code,
    });
    const url = `https://graph.facebook.com/v22.0/oauth/access_token?${params.toString()}`;

    const response = await fetch(url);
    const tokenData: TokenResponse = await response.json();

    if (!response.ok) {
      throw new Error(tokenData.error?.message || 'Failed to get access token');
    }

    return {
      accessToken: tokenData.access_token,
      expiresIn: tokenData.expires_in,
    };
  }
}
