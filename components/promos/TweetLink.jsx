import { useEffect, useRef } from 'react';

const TweetLink = ({ tweetId }) => {
  const tweetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://platform.twitter.com/widgets.js';
    tweetRef.current.appendChild(script);

    return () => {
      tweetRef.current.removeChild(script);
    };
  }, []);

  return (
    <div ref={tweetRef}>
      <a
        className="twitter-share-button"
        href={`https://twitter.com/intent/retweet?tweet_id=${tweetId}&quote=true`}
        target="_blank"
        rel="noopener noreferrer"
      >
        !
      </a>
    </div>
  );
};

export default TweetLink;
