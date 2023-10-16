import React from "react";
import TikAPIConnectButton from "../auth/TikTok/TikAPIConnectButton";

const Dashboard = () => {
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
            <td>
              <TikAPIConnectButton />
            </td>
          </tr>
          {/* Add rows for other social media platforms */}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
