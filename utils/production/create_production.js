async function create_production(avatar_uuid, voiceover_uuid, script_uuid, user) {
  // Create a row in the "production_" table
  const { data, error } = await supabaseClient.from("production_").insert([{ avatar: avatar_uuid, voiceover: voiceover_uuid, script: script_uuid, created_by: user.id }]);

  if (error) {
    // Handle error
    return;
  }

  // Return the UUID of the created production
  return data[0].uuid;
}

export default create_production;