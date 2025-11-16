// src/api/gemini.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // This is a server-side check
    console.error("GEMINI_API_KEY is not set on the server.");
    return res.status(500).json({ error: 'Server configuration error: API key not set.' });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'A prompt is required to ask the AI.' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const responseData = await geminiResponse.json();

    if (!geminiResponse.ok) {
      // If Google returns an error, log it and forward it
      console.error("Error from Gemini API:", responseData);
      throw new Error(responseData.error?.message || 'An unknown error occurred with the AI service.');
    }

    const text = responseData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
        // This can happen if the response is blocked for safety reasons
        console.error("Gemini response was blocked or empty:", responseData);
        throw new Error("The AI's response was empty or blocked due to safety settings.");
    }
    
    res.status(200).json({ text });

  } catch (error) {
    // This catches both our thrown errors and any other network errors
    console.error("Error in gemini.js handler:", error.message);
    res.status(500).json({ error: error.message });
  }
}
