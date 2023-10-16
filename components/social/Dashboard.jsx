import React, { useEffect, useState } from "react";
import TikAPIConnectButton from "../auth/TikTok/TikAPI";
import { checkAccessToken } from "./checkAccessToken"; // Assuming you have exported the checkAccessToken function
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
const supabase = useSupabaseClient();
const user = useUser();
const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);
  
  useEffect(() => {
    const fetchAccessToken = async () => {
      const user_uuid = "user"; // Replace with the actual user_uuid
      const token = await checkAccessToken(user_uuid);
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
            <td>{accessToken ? "Connected" : <TikAPIConnectButton />}</td>
          </tr>
          {/* Add rows for other social media platforms */}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
