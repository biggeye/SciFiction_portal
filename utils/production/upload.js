async function upload_avatar(image, name, title, user) {
    // Generate UUID
    const uuid = YOUR_UUID_GENERATION_LOGIC;
  
    // Upload image to "production_avatars" bucket with UUID as filename
    const { data, error } = await supabaseClient.storage
    .from("production_avatars")
    .upload(`${uuid}.png`, image);

  if (error) {
    // Handle error
    return;
  }

  // Create a row in the "avatar_" table
  const { data: avatarData, error: avatarError } = await supabase
    .from("avatar_")
    .insert([{ uuid, name, title, created_by: user.id }]);

  if (avatarError) {
    // Handle error
    return;
  }

  // Return the UUID
  return uuid;
};

async function upload_script(content, title, user) {
    // Generate UUID
    const uuid = YOUR_UUID_GENERATION_LOGIC;

  // Create a row in the "script_" table
  const { data, error } = await supabaseClient.from("script_").insert([{ uuid, content, title, created_by: user.id }]);

  if (error) {
    // Handle error
    return;
  }

  // Return the UUID
  return uuid;
};


async function upload_voiceover(audio, name, title, user) {
    // Generate UUID
    const uuid = YOUR_UUID_GENERATION_LOGIC;
  
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
};




export { upload_avatar, upload_voiceover, upload_script };