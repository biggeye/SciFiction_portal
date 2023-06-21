const axios = require('axios');


export async function exchangeCodeForToken(code) {
    const response = await axios({
      method: 'post',
      url: 'https://oauth2.googleapis.com/token',
      data: qs.stringify({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID, // Replace with your client ID
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_SECRET, // Replace with your client secret
        code: code, // The authorization code received from the OAuth flow
        grant_type: 'authorization_code',
        redirect_uri: "https://xqdkoozsrecjixhnpoou.supabase.co/auth/v1/callback", // Replace with your redirect URI
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    });
  
    const { access_token, refresh_token } = response.data;
    return { access_token, refresh_token };
  };