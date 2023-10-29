import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const PAGE_SIZE = 100;
    const url = "https://api.elevenlabs.io/v1/history";
    const headers = {
      "Accept": "application/json",
      "xi-api-key": process.env.NEXT_PUBLIC_XILABS_API_KEY,
    };

    let history = [];
    let last_history_item_id = null;

    while (true) {
      const params = {
        "page_size": PAGE_SIZE,
        "start_after_history_item_id": last_history_item_id
      };
      const response = await axios.get(url, { headers, params });
      const data = response.data;

      if (data.history) {
        history = [...history, ...data.history];
        if (!data.has_more) break;
        last_history_item_id = data.last_history_item_id;
      } else {
        res.status(500).json({ error: "Response does not contain 'history' key" });
        return;
      }
    }

    res.status(200).json(history);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
