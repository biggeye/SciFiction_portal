import ReactPlayer from 'react-player';

const VideoPlayer = ({ s3Url }) => {
  return <ReactPlayer url={s3Url} controls={true} />;
};

export default VideoPlayer;
