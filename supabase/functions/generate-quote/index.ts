import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
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
            text: `Generate a unique, meaningful, and inspiring quote that reflects the feeling of being ${mood}. The quote should be different each time and specifically tailored to this emotion. Return it in JSON format like this: {"quote": "Your quote here", "author": "Author Name"}. Make sure the quote is not generic and truly captures the essence of feeling ${mood}.`,
          }]
        }],
        generationConfig: {
          temperature: 0.9,
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
      const textContent = data.candidates[0].content.parts[0].text;
      const parsedContent = JSON.parse(textContent);
      
      // Validate the response
      if (!parsedContent.quote || !parsedContent.author || 
          parsedContent.quote === "Life is full of surprises and opportunities." ||
          parsedContent.author === "Anonymous") {
        throw new Error('Invalid quote generated');
      }
      
      return new Response(JSON.stringify(parsedContent), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      throw new Error('Failed to parse quote');
    }
  } catch (error) {
    console.error('Error in generate-quote function:', error);
    // Generate a fallback quote based on mood instead of using the same generic quote
    const fallbackQuotes = {
      happy: {
        quote: "Joy is the simplest form of gratitude.",
        author: "Karl Barth"
      },
      energetic: {
        quote: "Energy and persistence conquer all things.",
        author: "Benjamin Franklin"
      },
      calm: {
        quote: "Peace comes from within. Do not seek it without.",
        author: "Buddha"
      },
      reflective: {
        quote: "Life can only be understood backwards; but it must be lived forwards.",
        author: "Søren Kierkegaard"
      },
      sad: {
        quote: "Even the darkest night will end and the sun will rise.",
        author: "Victor Hugo"
      },
      stressed: {
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela"
      }
    };
    
    const mood = req.json().then(data => data.mood).catch(() => 'happy');
    const fallbackQuote = fallbackQuotes[await mood] || fallbackQuotes.happy;
    
    return new Response(JSON.stringify(fallbackQuote), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});