import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getRecentVideos } from "../../utils/social/youtube";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { exchangeCodeForToken } from "../../utils/auth/oauth2token";

const YouTube = () => {
  const [data, setData] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState({});
  const supabaseClient = useSupabaseClient();
  const [session, setSession] = useState(null); // Add this line

  // Add this useEffect hook to listen to auth changes
  // Token handling function
  const handleToken = async (authorizationCode) => {
    const result = await exchangeCodeForToken(authorizationCode);
    const tokenPackage = {
      token: result.token,
      refreshToken: result.refreshToken,
    };

    // Store the tokens somewhere secure, like in the local storage or a cookie
    localStorage.setItem("accessToken", tokenPackage.token);
    localStorage.setItem("refreshToken", tokenPackage.refreshToken);
  };

  // useEffect hook
  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          const credential = session?.provider_token?.credentials;
          console.log("provider_token.credentials: ", credential);
          const authorizationCode = credential?.code;
          console.log("authorizationCode: ", authorizationCode);
          handleToken(authorizationCode);
        }
        else {
          console.log("No auth event")
        }
      }
    );

    // Cleanup function: removes the auth listener when component unmounts
    return () => {
      authListener.unsubscribe();
    };
  }, [supabaseClient.auth]);

  const fetchChannelId = async (accessToken) => {
    const response = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=id&mine=true",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    const json = await response.json();
    console.log("fetchChannelId: ", json);

    //  const channelId = json.items[0].id;
    return json;
  };

  /*
  useEffect(() => {
    const fetchData = async () => {
      console.log("Access Token: ",accessToken);
      const channelId = await fetchChannelId(accessToken);
      console.log("Channel ID:", channelId);
   //   const videos = await getRecentVideos(process.env.NEXT_PUBLIC_GOOGLE_API_KEY, channelId);
    //  setData(videos);
        
    }
    fetchData();
  }, []);
*/
  const handleSelectVideo = (id) => {
    setSelectedVideos((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <Box layerStyle="subPage">
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Title</th>
            <th>Description</th>
            <th>Thumbnail</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, title, description, thumbnail }) => (
            <tr key={id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedVideos[id] || false}
                  onChange={() => handleSelectVideo(id)}
                />
              </td>
              <td>{title}</td>
              <td>{description}</td>
              <td>
                <img src={thumbnail} alt={title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default YouTube;
