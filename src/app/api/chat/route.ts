import { NextResponse } from 'next/server';

type ChatRequest = {
  message: string;
  suggestionPicked: boolean;
};

export async function POST(request: Request) {
  const { message, suggestionPicked }: ChatRequest = await request.json();
  const API_KEY = process.env.GOOGLE_API_KEY;  // Store your API key in .env.local
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

  try {
    let reply: string;

    if (suggestionPicked) {
      // Respond with predefined answers
      reply = `Here's the answer for your question: "${message}"`;
    } else {
      // Send a request to OpenAI's API
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      };
      const response = await fetch(`${endpoint}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const reply = data?.candidates[0]?.content?.parts?.[0]?.text || "No text found";
      return NextResponse.json({ reply });
      } else {
        return NextResponse.json({ error: 'Failed to generate content', details: data }, { status: 500 });
      }
  
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json({ error: 'Failed to get a response' }, { status: 500 });
  }
}
