import React, { useEffect, useState } from "react";
import ConnectButton from "../auth/TikTok/ConnectButton";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
const supabase = useSupabaseClient();
const user_id = useUser();
const checkAccessToken = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from("oauth2_tokens")
      .select("access_token")
      .eq("user_id", _id)
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
const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);
  
  useEffect(() => {
    const fetchAccessToken = async () => {
      const user_uuid = "user"; // Replace with the actual user_uuid
      const token = await checkAccessToken(user_id);
      setAccessToken(token);
    };

    fetchAccessToken();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TikTok</td>
            <td>{accessToken ? "Connected" : <ConnectButton supabase={supabase} user_id={user_id} />}</td>
          </tr>
          {/* Add rows for other social media platforms */}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;