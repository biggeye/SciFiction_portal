export default async function uploadPrediction(
  fileUrl,
  userId,
  modelId,
  predictionId,
  prompt,
  supabase
) {
    const imagePrompt = prompt;
    const imageModelId = modelId;
    const imagePredictionId = predictionId;

    const url = `https://pckovrpqrkyqinifydcs.supabase.co/storage/v1/object/public/replicate_predictions/${imagePredictionId}`;
    const user_id = userId;

    const response = await fetch(fileUrl);
    const imageBlob = await response.blob();
    

    const { bucket, error } = await supabase.storage
      .from('replicate_predictions')
      .upload(`${imagePredictionId}`, imageBlob, { cacheControl: '3600', upsert: false });

    if (error) {
      console.error('Error uploading image to Supabase:', error);
      throw new Error('Error uploading image to Supabase');
    }

    console.log('Image uploaded successfully:');

    const { table, error2 } = await supabase
      .from('replicate_predictions')
      .insert([
        {
          user_id: user_id,
          modelId: imageModelId,
          predictionId: imagePredictionId,
          prompt: imagePrompt,
          url: url,
        },
      ]);

    if (error2) {
      console.error('Error posting image data to Supabase:', error2);
      throw new Error('Error posting image data to Supabase');  
    }

    return url;
 
};