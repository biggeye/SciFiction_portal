import { v4 as uuidv4 } from "uuid";

async function upload_avatar(image, name, description, userId, supabaseClient) {
  const response = await fetch(image);
  const imageBlob = await response.blob();
  const uuid = uuidv4();
  const url = `https://xqdkoozsrecjixhnpoou.supabase.co/storage/v1/object/public/production_avatars/${uuid}.png`;

  const { data, error } = await supabaseClient.storage
    .from("production_avatars")
    .upload(`${uuid}.png`, imageBlob);
  if (error) {
    return;
  }

  let { newUrl, newError } = await supabaseClient.rpc("add_avatar", {
    p_uuid: uuid,
    p_name: name,
    p_title: description,
    p_url: url,
    p_created_by: userId.id.toString(),
  });
  
  if (newError) {
    console.error("Error posting image data to Supabase:", error2);
    throw new Error("Error posting image data to Supabase");
  }

  return newUrl;


};
async function upload_script(content, title, user) {
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

async function upload_voiceover(audio, name, title, user) {
  // Generate UUID
  const uuid = uuidv4();

  // Upload audio to "production_voiceovers" bucket with UUID as filename
  const { data, error } = await supabaseClient.storage
    .from("production_voiceovers")
    .upload(`${uuid}.mp3`, audio);

  if (error) {
    // Handle error
    return;
  }

  // Create a row in the "voiceover_" table
  const { data: voiceoverData, error: voiceoverError } = await supabase
    .from("voiceover_")
    .insert([{ uuid, name, title, created_by: user.id }]);

  if (voiceoverError) {
    // Handle error
    return;
  }

  // Return the UUID
  return uuid;
}

export { upload_avatar, upload_voiceover, upload_script };
