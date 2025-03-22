// Script to test Gemini API key with different models
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testApiKey() {
  // Get API key from command line arguments or environment variables
  const apiKey = process.argv[2] || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('Error: No API key provided');
    console.log('Usage: node test-key.js YOUR_API_KEY');
    process.exit(1);
  }

  // Initialize Google AI client
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Only test the model that works
  const model = 'gemini-1.5-pro';
  const testPrompt = "Hello, are you working properly? Respond very briefly.";
  
  try {
    console.log(`\nTesting model: ${model}`);
    const modelClient = genAI.getGenerativeModel({ model });
    const result = await modelClient.generateContent(testPrompt);
    const response = result.response.text();
    console.log(`Response: ${response}`);
    console.log(`✅ Model ${model} is working successfully!`);
  } catch (error) {
    console.log(`❌ Error with model ${model}:`);
    console.log(error.message);
  }
  
  console.log('\nTest complete.');
}

// Run the test
testApiKey(); 