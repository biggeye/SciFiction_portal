const fetchGalleryImages = async (id, supabase) => { 
const data = 
  await supabase 
  .from('replicate_predictions') 
  .select('url, created_at, prompt') 
  .eq('user_id', id) 
  .order('created_at'); // add order method to sort the data chronologically

const extractedData = data.data.map(item => {
  const { url, prompt } = item;
  return {
    url,
    prompt
  };
});


return extractedData;
};
export default fetchGalleryImages;