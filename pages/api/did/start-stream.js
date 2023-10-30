/* const sessionResponse = await fetchWithRetries(`https://api.d-id.com/talks/streams`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.NEXT_PUBLIC_DID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source_url: `{AVATAR_IMAGE_URL}`,
    }),
  });

  const sessionResponseState = {
    streamInfo: {
      id: '',
      session_id: '',
      offer: '',
      ice_servers: [],
    },
  };
  
  */