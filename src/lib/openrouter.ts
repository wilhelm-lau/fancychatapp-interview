import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';

// Add validation BEFORE creating the openrouter instance
if (!process.env.OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY is not set');
}

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY!,
});

export async function generateAIResponse(
  messages: Array<{ role: string; content: string }>,
  model: string = 'microsoft/phi-3-mini-128k-instruct' // Changed default model
) {
  try {
    const { text } = await generateText({
      model: openrouter(model),
      messages: messages.map(({ role, content }) => {
        // Map to the expected ModelMessage type
        if (role === 'system' || role === 'user' || role === 'assistant') {
          return { role, content };
        }
        // Fallback: treat as user message if unknown role
        return { role: 'user', content };
      }),
      temperature: 0.7,
    });

    return text;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
}

// Available models you can use
export const AVAILABLE_MODELS = [
  { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B' },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' },
  { id: 'openai/gpt-4o', name: 'GPT-4o' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
  { id: 'google/gemini-pro-1.5', name: 'Gemini Pro 1.5' },
  { id: 'microsoft/phi-3-mini-128k-instruct', name: 'Phi-3 Mini' },
  { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B' },
];
