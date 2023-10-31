export default (req, res) => {
    // Handle the request here
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/proxy', async (req, res) => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://api.d-id.com/talks/streams',
            headers: req.headers,
            data: req.body
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

};