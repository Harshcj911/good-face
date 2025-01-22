import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mood } = await req.json();
    console.log('Generating quote for mood:', mood);

    if (!geminiApiKey) {
      throw new Error('Gemini API key is not configured');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate an inspiring quote about feeling ${mood}. Return it in JSON format with quote and author fields. Make it unique and meaningful. The response should be in valid JSON format like this: {"quote": "Your quote here", "author": "Author Name"}`,
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API Error:', error);
      throw new Error(error.error?.message || 'Failed to generate quote');
    }

    const data = await response.json();
    console.log('Gemini response:', data);

    try {
      // Extract the text content from Gemini's response
      const textContent = data.candidates[0].content.parts[0].text;
      // Parse the JSON string from the text content
      const parsedContent = JSON.parse(textContent);
      
      return new Response(JSON.stringify(parsedContent), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return new Response(
        JSON.stringify({
          quote: "Life is full of surprises and opportunities.",
          author: "Anonymous"
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in generate-quote function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        quote: "Life is full of surprises and opportunities.",
        author: "Anonymous"
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});