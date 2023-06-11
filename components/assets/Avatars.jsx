import React, { useEffect, useState } from "react";
import ElaiAvatars from "../creators/elai/ElaiAvatars";

export default function Avatars() {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    fetchAvatars();
  }, []);

  const fetchAvatars = async () => {
    try {
      const { data, error } = await supabaseClient.from("avatar_").select("*");
      if (error) throw error;
      setAvatars(data);
    } catch (error) {
      console.error("Error fetching avatars:", error.message);
    }
  };

  return (
    <div>
      <h1>Avatars</h1>
      <ul>
        {avatars.map((avatar) => (
          <li key={avatar.uuid}>
            <strong>Name:</strong> {avatar.name},{" "}
            <strong>Title:</strong> {avatar.title}, <strong>URL:</strong>{" "}
            {avatar.url}
          </li>
        ))}
      </ul>
      <h1>Elai Avatars</h1>
      <ElaiAvatars />
    </div>
  );
}
