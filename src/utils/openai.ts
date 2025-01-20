import { supabase } from "@/integrations/supabase/client";

export const generateQuote = async (mood: string): Promise<{ quote: string; author: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-quote', {
      body: { mood },
    });

    if (error) {
      console.error('Error calling generate-quote function:', error);
      return {
        quote: "Life is full of surprises and opportunities.",
        author: "Anonymous"
      };
    }

    return {
      quote: data.quote || "Life is full of surprises and opportunities.",
      author: data.author || "Anonymous"
    };
  } catch (error) {
    console.error('Error generating quote:', error);
    return {
      quote: "Life is full of surprises and opportunities.",
      author: "Anonymous"
    };
  }
};