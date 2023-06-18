import { Box } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { getRecentVideos } from '../../utils/social/youtube';


const YouTube = () => {
  const [data, setData] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const videos = await getRecentVideos(process.env.NEXT_PUBLIC_GOOGLE_API_KEY, process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID);
      setData(videos);
    }
    fetchData();
  }, []);

  const handleSelectVideo = (id) => {
    setSelectedVideos(prevState => ({
      ...prevState,
      [id]: !prevState[id]
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
              <td><img src={thumbnail} alt={title}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  )
}

export default YouTube;