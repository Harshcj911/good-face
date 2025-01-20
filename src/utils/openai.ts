export const generateQuote = async (mood: string): Promise<{ quote: string; author: string }> => {
  const prompt = `Generate an inspiring quote about feeling ${mood}. Return it in JSON format with 'quote' and 'author' fields. Make it unique and meaningful.`;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenAI');
    }

    const content = JSON.parse(data.choices[0].message.content);
    return {
      quote: content.quote || "Life is full of surprises and opportunities.",
      author: content.author || "Anonymous"
    };
  } catch (error) {
    console.error('Error generating quote:', error);
    return {
      quote: "Life is full of surprises and opportunities.",
      author: "Anonymous"
    };
  }
};