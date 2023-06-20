import axios from 'axios';
import multer from 'multer';
import nextConnect from 'next-connect';
import { v4 as uuidv4 } from 'uuid';

// Middleware to handle file uploading
const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => cb(null, uuidv4())
  }),
});

const handler = nextConnect();

handler.use(upload.single('video'));

handler.post(async (req, res) => {
  const { title, description, privacyStatus } = req.body;

  const videoId = await uploadVideo(req.file.path, {
    title,
    description,
    privacyStatus
  });

  if (videoId) {
    res.json({ success: true, videoId });
  } else {
    res.json({ success: false });
  }
});

async function uploadVideo(filePath, videoMetaData) {
  const url = `https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status`;

  const data = {
    snippet: {
      title: videoMetaData.title,
      description: videoMetaData.description,
      categoryID: '22', // Category for "People & Blogs"
    },
    status: {
      privacyStatus: videoMetaData.privacyStatus // 'private', 'public', or 'unlisted'
    },
  };

  const headers = {
    'Authorization': `Bearer ${process.env.YOUTUBE_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    'X-Upload-Content-Length': filePath.size,
    'X-Upload-Content-Type': 'video/*',
  };

  try {
    const response = await axios.post(url, data, { headers });
    
    if (response.status !== 200) {
      throw new Error(`Error: Received response code ${response.status}`);
    }

    const uploadUrl = response.headers.location;
    
    const uploadResponse = await axios.put(uploadUrl, filePath, { headers: {'Content-Type': 'video/*'} });

    if (uploadResponse.status !== 200) {
      throw new Error(`Error: Received response code ${uploadResponse.status}`);
    }

    return uploadResponse.data.id;

  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return null;
  }
}

export default handler;
