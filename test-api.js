// Create this file temporarily to test
const OPENROUTER_API_KEY=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; // Replace with your real key

console.log('Testing API key...');

fetch('https://openrouter.ai/api/v1/models', {
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Response status:', response.status);
  return response.json();
})
.then(data => {
  console.log('API Key works! Found', data.data?.length || 0, 'models');
  console.log('First few models:', data.data?.slice(0, 3));
})
.catch(error => {
  console.error('API Key failed:', error);
});
