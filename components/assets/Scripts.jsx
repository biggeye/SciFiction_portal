import React, { useEffect, useState } from "react";
import { Input, Box, Card, Textarea, Button } from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { upload_script } from "../../utils/production/upload";

export default function Scripts() {
  const [isLoading, setIsLoading] = useState(false);
  const [scripts, setScripts] = useState([]);
  const [script, setScript] = useState("");
  const [title, setTitle] = useState("");
  const [deleteScriptUuid, setDeleteScriptUuid] = useState("");

  const user = useUser();
  const supabaseClient = useSupabaseClient();
  
  useEffect(() => {
    fetchScripts();
  }, []);

  useEffect(() => {
    if (deleteScriptUuid) {
        deleteScript();
    }
}, [deleteScriptUuid]);


  const fetchScripts = async () => {
    try {
      const { data, error } = await supabaseClient.from("script_").select("*");
      if (error) throw error;
      setScripts(data);
    } catch (error) {
      console.error("Error fetching scripts:", error.message);
    }
  };



  const submitScript = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const newScriptUuid = await upload_script(
      script,
      title,
      user,
      supabaseClient
    );
    if (!newScriptUuid) {  // Corrected here
      console.log("Script upload failed.");
    } else return newScriptUuid;
    
    setIsLoading(false);
    fetchScripts(supabaseClient);
  };
  
  const deleteScript = async (event) => {
    setIsLoading(true);
  const { data, error } = await supabaseClient
  .from('script_')
  .delete()
  .eq('uuid', deleteScriptUuid);
  if (!error) {
  setIsLoading(false);
   
  fetchScripts(supabaseClient);
}
  };


  return (
<Box layerStyle="subPage" p={3}>
              {scripts.map((script) => (
          <Card key={script.uuid} p={2} mb={4}>
                <strong>Title:</strong> {script.title}
            <strong>Content:</strong> {script.content},{" "}
        
            <Button isLoading={isLoading} size="xs" onClick={() => setDeleteScriptUuid(script.uuid)}>delete</Button>
        </Card>
        ))}
      
    
      <Card>
        <Input onChange={(event) => setTitle(event.target.value)} placeholder="Title" />
      <Textarea onChange={(event) => setScript(event.target.value)} placeholder="Enter script here" />
        <Button onClick={submitScript}>Save</Button>        
      </Card>
  </Box>
  );
}
