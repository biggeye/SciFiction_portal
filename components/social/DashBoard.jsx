import { useEffect, useState } from 'react';

export default function DashBoard() {

  const [timeline, setTimeline] = useState([]);
  const [mentions, setMentions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/twitter');
      const data = await response.json();
      setTimeline(data.timeline);
      setMentions(data.mentions);
    }

    fetchData();
  }, []);





return(
<p> {timeline} </p>
)

}