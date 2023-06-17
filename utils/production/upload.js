import { v4 as uuidv4 } from "uuid";

async function upload_avatar(image, name, description, user, supabaseClient) {
  const userId = user;
  const response = await fetch(image);
  const imageBlob = await response.blob();
  const uuid = uuidv4();
  const url = `https://xqdkoozsrecjixhnpoou.supabase.co/storage/v1/object/public/production_avatars/${uuid}.png`;

  const { imageData, imageError } = await supabaseClient.storage
    .from("production_avatars")
    .upload(`${uuid}.png`, imageBlob);
  if (imageError) {
    return;
  }

  let { imageTableData, imageTableError } = await supabaseClient.rpc(
    "add_avatar",
    {
      p_uuid: uuid,
      p_name: name,
      p_title: description,
      p_url: url,
      p_created_by: userId.id.toString(),
    }
  );

  if (imageTableError) {
    console.error("Error posting image data to Supabase:", error2);
    throw new Error("Error posting image data to Supabase");
  } else {
    return imageTableData;
  }
}
async function upload_script(content, title, user, supabaseClient) {
  const userId = user;
  // Generate UUID
  const uuid = uuidv4();

  // Create a row in the "script_" table
  const { data, error } = await supabaseClient
    .from("script_")
    .insert([{ uuid, content, title, created_by: user.id }]);

  if (error) {
    // Handle error
    return;
  }

  // Return the UUID
  return uuid;
}
async function upload_voiceover(audio, name, title, user, supabaseClient) {
  // Generate UUID
  const userId = user;
  const mp3 = await fetch(audio);
  const audioBlob = await mp3.blob();
  const uuid = uuidv4();
  const url = `https://xqdkoozsrecjixhnpoou.supabase.co/storage/v1/object/public/production_voiceovers/${uuid}.mp3`;

  const { audioUpload, audioError } = await supabaseClient.storage
    .from("production_voiceovers")
    .upload(`${uuid}.mp3`, audioBlob);

  if (audioError) {
    // Handle error
    return;
  } else {
    const { audioTableData, audioTableError } = await supabaseClient
      .from("voiceover_")
      .insert([{ uuid, name, title, url, created_by: userId.id.toString() }]);

    if (audioTableError) {
      // Handle error
      return;
    } else {
      // Return the UUID
      console.log(audioTableData);
      return audioTableData;
    }
  }

  // Create a row in the "voiceover_" table
}
async function upload_video(result_url, name, duration, user, supabaseClient) {
  const userId = user;
  const result_mp4 = await fetch(result_url);
  const mp4 = await result_mp4.blob();

  // advanced declaration of URL to where video will be in supabase bucket
  const uuid = uuidv4();
  const url = `https://xqdkoozsrecjixhnpoou.supabase.co/storage/v1/object/public/production_videos/${uuid}.mp4`;

  const { videoData, videoError } = await supabaseClient.storage
    .from("production_videos")
    .upload(`${uuid}.mp4`, mp4);

  if (videoError) {
    return;
  } else {
    const { videoTableData, videoTableError } = await supabaseClient  .rpc('add_video', {
      p_created_by: userId.id.toString(),
      p_duration: duration, 
      p_name: name, 
      p_url: url, 
      p_uuid: uuid,
    });

    if (videoTableError) {
      console.error("Error posting video data to Supabase:", error);
      throw new Error("Error posting video data to Supabase");
    }
    return videoTableData;
  }
}

export { upload_avatar, upload_voiceover, upload_script, upload_video };
