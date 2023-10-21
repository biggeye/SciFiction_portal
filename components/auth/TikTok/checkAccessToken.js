

const checkAccessToken = async (user_id, supabase) => {
    try {
      const { data, error } = await supabase
        .from("oauth2_tokens")
        .select("access_token")
        .eq("user_id", user_id)
        .eq("provider", "tiktok");
  
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
  
  export default checkAccessToken;
  