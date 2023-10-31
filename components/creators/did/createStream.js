export default async function createStream() {
  const options = {
      method: 'POST',
      headers: {
          accept: 'application/json',
          'content-type': 'application/json',
         authorization: `Bearer ${process.env.NEXT_PUBLIC_DID_BEARER_TOKEN}`,
      },
      body: JSON.stringify({
          source_url: 'https://xqdkoozsrecjixhnpoou.supabase.co/storage/v1/object/public/production_avatars/e4de12e7-14b1-43dc-9e39-fa71b3a34db2.png'
      })
  };
  console.log(options);
  // Change the fetch URL to your backend proxy endpoint

  const response = await fetch(process.env["NEXT_PUBLIC_START-STREAM"], options);
  return await response.json();
}
