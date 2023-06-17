import { TwitterApi } from "twitter-api-v2";


export default async function Handler (req, res) {

    const tweet = req.body.userTweet;

    const client = new TwitterApi({ appKey: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY, appSecret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET });

      try{
      const { data: createdTweet } = await client.v2.tweet(tweet, {
        poll: { duration_minutes: 120, options: ['Absolutely', 'For sure!'] },
      });
      console.log('Tweet', createdTweet.id, ':', createdTweet.text);
      res.status(200).json(createdTweet);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}

