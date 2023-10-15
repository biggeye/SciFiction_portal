import React, { useState } from "react";
import TikAPIConnectButton from "../auth/TikTok/TikAPI"; // Import your TikAPIConnectButton component

const Dashboard = () => {
  const [connections, setConnections] = useState({
    TikTok: false,
    YouTube: false,
    Facebook: false,
    Instagram: false,
    Rumble: false,
  });

  // Function to handle connecting/disconnecting for a platform
  const handleConnect = (platform) => {
    setConnections((prevConnections) => ({
      ...prevConnections,
      [platform]: !prevConnections[platform],
    }));
  };

  return (
    <div>
      <h1>Connection Status</h1>
      <table>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(connections).map((platform) => (
            <tr key={platform}>
              <td>{platform}</td>
              <td>
                {platform === "TikTok" ? (
                  <TikAPIConnectButton /> // Place the TikAPIConnectButton component here
                ) : connections[platform] ? (
                  <span>Connected</span>
                ) : (
                  <button onClick={() => handleConnect(platform)}>
                    Connect
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
