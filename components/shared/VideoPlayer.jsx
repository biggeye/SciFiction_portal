import ReactPlayer from 'react-player';
import { Box, useMediaQuery } from '@chakra-ui/react';

const VideoPlayer = ({ s3Url }) => {
  

  return (
  <Box w={400}>
  <ReactPlayer url={s3Url} controls={true} width="100%" height="100%"/>;
  </Box>
)
};

export default VideoPlayer;
