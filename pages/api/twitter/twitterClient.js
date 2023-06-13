import { TwitterApi } from 'twitter-api-v2';

const appOnlyClient = new TwitterApi({
  appBearerToken: process.env.twitter_bearer_token,

});

export default appOnlyClient;
