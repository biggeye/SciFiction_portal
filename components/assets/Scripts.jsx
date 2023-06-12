import React, { useEffect, useState } from "react";

export default function Scripts({ supabaseClient }) {
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const { data, error } = await supabaseClient.from("script_").select("*");
      if (error) throw error;
      setScripts(data);
    } catch (error) {
      console.error("Error fetching scripts:", error.message);
    }
  };

  return (
    <div>
      <h1>Scripts</h1>
      <ul>
        {scripts.map((script) => (
          <li key={script.uuid}>
            <strong>Content:</strong> {script.content},{" "}
            <strong>Title:</strong> {script.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
