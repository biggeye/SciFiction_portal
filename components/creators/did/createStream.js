export default async function createStream() {
  const options = {
      method: 'POST',
      headers: {
          accept: 'application/json',
          'content-type': 'application/json',
         authorization: process.env.NEXT_PUBLIC_DID_BEARER_TOKEN,
      },
      body: JSON.stringify({
          source_url: 'https://xqdkoozsrecjixhnpoou.supabase.co/storage/v1/object/public/production_avatars/e4de12e7-14b1-43dc-9e39-fa71b3a34db2.png'
      })
  };

  // Change the fetch URL to your backend proxy endpoint
  fetch(process.env.NEXT_PUBLIC_STARTSTREAM, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
}

const responseState = {
  streamInfo: {
      id: '',
      session_id: '',
      offer: '',
      ice_servers: [],
  },
};
