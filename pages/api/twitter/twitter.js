import appOnlyClient from './twitterClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const timeline = await appOnlyClient.v2.userTimeline();
    const mentions = await appOnlyClient.v2.userMentionTimeline();
    const usersLiked = await appOnlyClient.v2.tweetLikedBy('20');
    const usersReTweeted = await appOnlyClient.v2.tweetRetweetedBy('20');
    
    // Process and structure the data as needed
    const data = {
      timeline,
      mentions,
      usersLiked,
      usersReTweeted,
    };

    res.status(200).json(data);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
