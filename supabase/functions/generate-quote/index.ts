import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

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

    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant that generates inspiring quotes based on moods. Return quotes in JSON format with quote and author fields.'
          },
          { 
            role: 'user', 
            content: `Generate an inspiring quote about feeling ${mood}. Make it unique and meaningful.`
          }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error(error.error?.message || 'Failed to generate quote');
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    try {
      const content = JSON.parse(data.choices[0].message.content);
      return new Response(JSON.stringify(content), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
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