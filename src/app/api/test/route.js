import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    // Log the API key existence (not the actual key)
    console.log('Checking API key...');
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY is not set in environment variables');
    }
    console.log('API key exists:', !!process.env.GOOGLE_API_KEY);

    // Initialize Gemini
    console.log('Initializing Gemini...');
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Try a simple test prompt
    console.log('Testing Gemini with a simple prompt...');
    const result = await model.generateContent('Say "test successful" if you can read this.');
    const response = await result.response;
    const text = response.text();

    console.log('Test response:', text);

    return new Response(
      JSON.stringify({ 
        status: 'success',
        message: 'Gemini API connection test successful',
        response: text
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Test endpoint error:', error);
    return new Response(
      JSON.stringify({ 
        status: 'error',
        message: error.message,
        details: {
          name: error.name,
          stack: error.stack
        }
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
} 