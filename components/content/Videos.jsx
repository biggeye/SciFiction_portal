import CreateTalk from "./CreateTalk";
import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Card } from "@chakra-ui/react";
import VideoPlayer from "../shared/VideoPlayer";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Videos() {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [deleteVideoUuid, setDeleteVideoUuid] = useState("");

  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    fetchVideos(supabaseClient);
  }, []);

  useEffect(() => {
    if (deleteVideoUuid) {
      deleteVideo();
    }
  }, [deleteVideoUuid]);

  const fetchVideos = async (supabaseClient) => {
    try {
      const { data, error } = await supabaseClient.from("videos_").select("*");
      if (error) throw error;
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  };

  const deleteVideo = async (event) => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("videos_")
      .delete()
      .eq("uuid", deleteVideoUuid);
    if (!error) {
      setIsLoading(false);

      fetchAvatars(supabaseClient);
    }
  };

  return (
    <Box layerStyle="subPage">
      <CreateTalk />
      <Flex
        p={50}
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap" // allow cards to wrap to new lines
      >
        {videos &&
          videos.map((video) => (
            <Card key={video.uuid}>
              <VideoPlayer s3Url={video.url} />
              {video.name}

              <Button
                isLoading={isLoading}
                size="xs"
                onClick={() => setDeleteVideoUuid(avatar.uuid)}
              >
                delete
              </Button>
            </Card>
          ))}
        <hr />
      </Flex>
    </Box>
  );
}
