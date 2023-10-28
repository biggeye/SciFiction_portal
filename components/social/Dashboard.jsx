import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Dashboard() {
  const supabase = createClientComponentClient();
  const [accessToken, setAccessToken] = useState(null);
  const [connected, setConnected] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const user_id = supabase.auth.getUser();

  useEffect(() => {
    if (accessToken) {
      setConnected(true);
      fetchUserInfo(accessToken);
    }
  }, [accessToken]);

  const connectToTikTok = async () => {
    const authWindow = window.open('https://tikapi.io/account/authorize?client_id=c_BCLMWJVHOJ&redirect_uri=https://tik-api-sandbox.vercel.app/dashboard&scope=view_profile+explore+live');
    window.addEventListener('message', async (event) => {
      if (event.origin === 'https://tikapi.io' && event.data.access_token) {
        const accessToken = event.data.access_token;

        // Store the access token in the oauth2tokens table
        const { data, error } = await supabase.from('oauth2tokens').insert([{ user_id: user_id, platform: 'tiktok', access_token: accessToken }]);

        if (error) {
          console.error('Error storing access token:', error);
        } else {
          console.log('Access token stored successfully:', data);
        }

        // Close the authentication popup
        authWindow?.close();

        setConnected(true);
        setUserInfo(accessToken);
      }
    });
  };

  return (
    <div>
      {!connected ? (
        <Button onClick={connectToTikTok}>Connect TikTok</Button>
      ) : (
        <div>
          <h1>User Profile</h1>
          {accessToken}
        </div>
      )}
    </div>
  );
}