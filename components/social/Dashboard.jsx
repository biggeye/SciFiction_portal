import React, { useEffect, useState } from "react";
import TikAPIConnectButton from "./TikAPIConnectButton";
import { checkAccessToken } from "./supabase"; // Assuming you have exported the checkAccessToken function

const Dashboard = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const user_uuid = "your_user_uuid"; // Replace with the actual user_uuid
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
