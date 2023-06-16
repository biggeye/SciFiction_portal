import axios from 'axios';
import { upload_video } from "../../../utils/production/upload";
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'


const handler = async (req, res) => {
  
  if (req.method !== 'POST') {
    // Handle the error. For example:
    res.status(405).send({ error: 'Method not allowed. Expected POST' });
    return;
  }

  const supabaseClient = createRouteHandlerClient();
  const voiceover = req.body.voiceoverUrl;
  const avatar = req.body.avatarUrl;
  const title = req.body.name;
  const userId = req.body.userId;

  const createTalkOptions = {
  method: 'POST',
  url: 'https://api.d-id.com/talks',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmQtaWQuY29tLyIsInN1YiI6ImF1dGgwfDY0MjhiNjgyMWU2MDA2YjY1N2VhZTNmOSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NjY2ODc3MSwiZXhwIjoxNjg2NzU1MTcxLCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBvZmZsaW5lX2FjY2VzcyJ9.3FnKv2-Ysi_pTQwu56EINMnNnp1VE1oanbrRMkz7hGwVWshR--9xsdvegRzPX0_CGVEbVVUV3raVKAt-mMsrA-nY16s0BjqBrYdCEnrDCgChg2vN84k0wqGMT-TfAP8HkxU1BHLXt3v4LLmhgbyjCjuWGi0QLTuqGgmC-rOL8VRz81brIiJI2x3UuXU6u6Ggt-27UBWiNIkf4gHi-5wV5OgETB6iqzeArSJV400xOumfu4KCQgyO2_fkwG3bp0-swCYFJaEp3WVlMqnfIcsNt6VmNPf5Irdzd2_5JQrN36QDjO7BsE7p_VmuuX2uLQSB23E14qLxz4JP-C84nkhQHQ',
  
  },
  data: {
    script: {
      type: 'audio',
      subtitles: 'false',
      ssml: 'false',
      reduce_noise: 'false',
      audio_url: voiceover,
    },
    config: {fluent: 'false', pad_audio: '0.0'},
    source_url: avatar,
    name: title
  }
};

const createTalk = async() => {
  return await axios.request(createTalkOptions);
};

const createTalkResponse = await createTalk();
const newId = createTalkResponse.data.id;

const getTalkOptions = {
  url: `https://api.d-id.com/talks/${newId}`,
  headers: {
    accept: 'application/json',
    authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik53ek53TmV1R3ptcFZTQjNVZ0J4ZyJ9.eyJodHRwczovL2QtaWQuY29tL2ZlYXR1cmVzIjoidGFsa3MiLCJodHRwczovL2QtaWQuY29tL2N4X2xvZ2ljX2lkIjoiIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmQtaWQuY29tLyIsInN1YiI6ImF1dGgwfDY0MjhiNjgyMWU2MDA2YjY1N2VhZTNmOSIsImF1ZCI6WyJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL2QtaWQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NjY2ODc3MSwiZXhwIjoxNjg2NzU1MTcxLCJhenAiOiJHenJOSTFPcmU5Rk0zRWVEUmYzbTN6M1RTdzBKbFJZcSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBvZmZsaW5lX2FjY2VzcyJ9.3FnKv2-Ysi_pTQwu56EINMnNnp1VE1oanbrRMkz7hGwVWshR--9xsdvegRzPX0_CGVEbVVUV3raVKAt-mMsrA-nY16s0BjqBrYdCEnrDCgChg2vN84k0wqGMT-TfAP8HkxU1BHLXt3v4LLmhgbyjCjuWGi0QLTuqGgmC-rOL8VRz81brIiJI2x3UuXU6u6Ggt-27UBWiNIkf4gHi-5wV5OgETB6iqzeArSJV400xOumfu4KCQgyO2_fkwG3bp0-swCYFJaEp3WVlMqnfIcsNt6VmNPf5Irdzd2_5JQrN36QDjO7BsE7p_VmuuX2uLQSB23E14qLxz4JP-C84nkhQHQ'
  }
};

const retrieveTalk = async() => {
  return await axios.request(getTalkOptions);
};

const retrieveTalkResponse = await retrieveTalk();

const result_url = retrieveTalkResponse.data.result_url;
const name = retrieveTalkResponse.data.name;
const duration = retrieveTalkResponse.data.duration;

const videoData = await upload_video(result_url, name, duration, userId, supabaseClient);
console.log(videoData.response);
}

export default handler;