import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Scripts() {
  const [scripts, setScripts] = useState([]);

  const user = useUser();
  const supabaseClient = useSupabaseClient();
  
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
<Box layerStyle="subPage">
      <h1>Scripts</h1>
      <ul>
        {scripts.map((script) => (
          <li key={script.uuid}>
            <strong>Content:</strong> {script.content},{" "}
            <strong>Title:</strong> {script.title}
          </li>
        ))}
      </ul>
      </Box>
  );
}
