import React, { useEffect, useState } from "react";
import XilabsVoiceovers from "../creators/xilabs/XilabsVoiceovers";

export default function Voiceovers({ supabaseClient }) {
  const [voiceovers, setVoiceovers] = useState([]);

  useEffect(() => {
    fetchVoiceovers();
  }, []);

  const fetchVoiceovers = async () => {
    try {
      const { data, error } = await supabaseClient.from("voiceover_").select("*");
      if (error) throw error;
      setVoiceovers(data);
    } catch (error) {
      console.error("Error fetching voiceovers:", error.message);
    }
  };

  return (
    <div>
      <h1>Voiceovers</h1>
      <ul>
        {voiceovers.map((voiceover) => (
          <li key={voiceover.uuid}>
            <strong>Name:</strong> {voiceover.name},{" "}
            <strong>Title:</strong> {voiceover.title}, <strong>URL:</strong>{" "}
            {voiceover.url}
          </li>
        ))}
      </ul>
      <h1>ElevenLabs Content</h1>
      <XilabsVoiceovers />
    </div>
  );
}
