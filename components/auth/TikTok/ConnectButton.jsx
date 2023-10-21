import React, { useState } from 'react';

const ConnectButton = ({ supabase, user_id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);

    // Open TikAPI authentication popup
    const authWindow = window.open('https://tikapi.io/account/authorize?client_id=c_BCLMWJVHOJ&redirect_uri=https://tik-api-sandbox.vercel.app/dashboard&scope=view_profile+explore+live', '_blank');

    // Listen for the access token from the popup window
    window.addEventListener('message', async (event) => {
      if (event.origin === 'https://tikapi.io' && event.data.access_token) {
        const accessToken = event.data.access_token;

        // Store the access token in the oauth2tokens table
        const { data, error } = await supabase.from('oauth2_tokens').insert([{ user_id: user_id, platform: 'tiktok', access_token: accessToken }]);

        if (error) {
          console.error('Error storing access token:', error);
        } else {
          console.log('Access token stored successfully:', data);
        }

        // Close the authentication popup
        authWindow?.close();
      }
    });
  };

  return (
    <button onClick={handleConnect}>
      Connect to TikTok
    </button>
  );
};

export default ConnectButton;