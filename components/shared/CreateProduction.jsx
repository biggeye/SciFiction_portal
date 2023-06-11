import { upload_avatar, upload_voiceover, upload_script } from "../../../../utils/production/upload";
import { create_production } from "../../../../utils/production/create_production"

function CreateProduction() {
  // Access the supabaseClient from the context or props within this component

  async function handleCreateProduction(avatar_uuid, voiceover_uuid, script_uuid, user) {
    const result = await create_production(avatar_uuid, voiceover_uuid, script_uuid, user);
  }

  async function handleAvatarUpload(image, name, title, user) {
    const result = await upload_avatar(image, name, title, user);
    // Handle the result or any errors
  }

  async function handleScriptUpload(content, title, user) {
    const result = await upload_script(content, title, user);
    // Handle the result or any errors
  }

  async function handleVoiceoverUpload(audio, name, title, user) {
    const result = await upload_voiceover(audio, name, title, user);
    // Handle the result or any errors
  }

}

export default CreateProduction;