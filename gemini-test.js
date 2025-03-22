// Simple test script for Gemini API
// Run with: node gemini-test.js YOUR_API_KEY
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiAPI() {
  // Get API key from command line argument
  const apiKey = process.argv[2];
  
  if (!apiKey) {
    console.error('Please provide an API key as a command line argument');
    console.error('Usage: node gemini-test.js YOUR_API_KEY');
    process.exit(1);
  }

  console.log('Testing with provided API key...');
  
  try {
    // Initialize with simpler configuration
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Try both models
    console.log('Testing gemini-1.5-pro...');
    await testModel('gemini-1.5-pro');
    
    console.log('\nTesting gemini-pro...');
    await testModel('gemini-pro');
    
    async function testModel(modelName) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = "Hello, can you verify this connection is working?";
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        
        console.log(`✅ Success with ${modelName}!`);
        console.log('First 100 chars of response:', response.slice(0, 100));
      } catch (error) {
        console.error(`❌ Error with ${modelName}:`, error.message);
      }
    }
  } catch (error) {
    console.error('❌ Error initializing API:', error.message);
  }
}

testGeminiAPI(); 