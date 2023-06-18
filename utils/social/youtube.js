import axios from 'axios';
import fetch from 'node-fetch';

export async function queryYoutubeStats(channelId, apiKey) {
  // API endpoint for retrieving channel statistics
  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

  try {
    // Send GET request to the YouTube API
    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Error: Received response code ${response.status}`);
    }

    // Parse the response JSON
    const data = response.data;

    // Extract desired statistics from the response
    const statistics = data.items[0].statistics;
    const subscriberCount = parseInt(statistics.subscriberCount, 10);
    const videoCount = parseInt(statistics.videoCount, 10);

    return { subscriberCount, videoCount };

  } catch (error) {
    console.error(`An error occurred: ${error}`);
    return { subscriberCount: null, videoCount: null };
  }
}

export async function getRecentVideos(apiKey, channelId) {
    const API_KEY = apiKey;
    const CHANNEL_ID = channelId;
    const baseUrl = 'https://www.googleapis.com/youtube/v3/search?';
    const maxResults = 10;
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const publishedAfter = date.toISOString();
  
    const url = `${baseUrl}key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=${maxResults}&publishedAfter=${publishedAfter}`;
  
    const response = await fetch(url);
    const data = await response.json();
    return data.items.map(item => {
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url,
      }
    });
  }