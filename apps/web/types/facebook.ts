export interface FacebookConfig {
  appId: string;
  appSecret: string;
  redirectUri: string;
  baseUrl: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  error?: {
    message: string;
  };
}
