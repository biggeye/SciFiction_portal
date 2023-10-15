import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xqdkoozsrecjixhnpoou.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZGtvb3pzcmVjaml4aG5wb291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY1ODc3MjQsImV4cCI6MjAwMjE2MzcyNH0.0EJtIbu2eJjtpgJqSCOO1wNrjHnMSOQUuLpRtOvOrTI';
const supabase = createClient(supabaseUrl, supabaseKey);

async function performOAuth2Authentication(authorizationUrl, scopes, platformName) {
  // Open a popup or redirect the user to the authorization URL
  // Handle the callback from the OAuth2 provider and extract the access token

  // After successfully obtaining the access token, store it in your Supabase table
  const oauth2TokenData = {
    id: 'YOUR_UUID',
    user_id: 'USER_UUID',
    provider: platformName,
    access_token: 'YOUR_ACCESS_TOKEN',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const { data: insertedData, error } = await supabase
      .from('oauth2_tokens')
      .upsert([oauth2TokenData]);

    if (error) {
      console.error(`Error inserting ${platformName} data:`, error);
    } else {
      console.log(`${platformName} data inserted successfully:`, insertedData);
    }
  } catch (error) {
    console.error(`Error inserting ${platformName} data:`, error);
  }
}

export default performOAuth2Authentication;
