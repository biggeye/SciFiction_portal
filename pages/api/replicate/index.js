import fetch from 'node-fetch';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
    // Create authenticated Supabase Client
    const supabase = createPagesServerClient({ req, res })
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()
  
    if (!session)
      return res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated',
      })

  try {
    // Increase payload limit to 50MB
    req.body = await new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
        // Check payload size limit (50MB)
        if (body.length > 50 * 1024 * 1024) {
          reject(new Error('Payload size exceeds limit'));
        }
      });
      req.on('end', () => {
        resolve(body);
      });
    });

    req.body = JSON.parse(req.body);

    const modelId = req.body.version;
    const image = req.body.image;
    const input_image = req.body.input_image;
    const prompt = req.body.prompt;
    const negative_prompt = req.body.negative_prompt;

    const bodyData = {
      version: modelId,
      input: {

      },
    };
    
    if (image) {
      bodyData.input.image = image;
    }

    if (input_image) {
      bodyData.input.input_image = input_image
    }
 
    if (negative_prompt) {
      bodyData.input.negative_prompt = negative_prompt;
    }

    if (prompt) {
      bodyData.input.prompt = prompt;
    }

    if (Object.keys(bodyData.input).length === 0) {
      return res.status(400).json({ error: 'Missing input parameters' });
    }
    
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    if (response.status !== 201) {
      const error = await response.json();
      return res.status(500).json({ detail: error.detail });
    }

    const prediction = await response.json();
    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}