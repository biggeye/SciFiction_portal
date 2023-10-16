import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
const supabase = useSupabaseClient();
const user = useUser();
const checkAccessToken = async (user) => {
  try {
    const { data, error } = await supabase
      .from("oauth2_tokens")
      .select("access_token")
      .eq("user_id", user)
      .eq("provider", "TikTok");

    if (error) {
      console.error(error);
      return null;
    }

    if (data && data.length > 0) {
      // Access token exists
      return data[0].access_token;
    } else {
      // Access token does not exist
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
