const http = require('http');
const https = require('https');

// Define the base URLs to test
const baseUrls = [
  'http://localhost:8000',
  'http://127.0.0.1:8000',
  'http://localhost:3000/api',  // In case the API is proxied through Next.js
  'http://localhost:5000'       // Another common port
];

// Define the endpoints to test
const endpoints = [
  '/',                // Root endpoint
  '/api/analyze',
  '/api/optimize', 
  '/api/convert',
  '/api/explain'
];

// Function to make a GET request to an endpoint
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    console.log(`Testing endpoint: ${url}`);
    
    // Choose http or https module based on URL
    const client = url.startsWith('https') ? https : http;
    
    const request = client.get(url, (response) => {
      let data = '';
      
      // Handle response data
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      // When the response is complete
      response.on('end', () => {
        console.log(`Status code: ${response.statusCode}`);
        if (response.statusCode >= 200 && response.statusCode < 300) {
          console.log(`Success! Response from ${url}:`);
          try {
            const parsedData = JSON.parse(data);
            console.log(JSON.stringify(parsedData, null, 2));
          } catch (e) {
            console.log(data);
          }
          resolve(true);
        } else {
          console.log(`Error: ${response.statusCode} from ${url}`);
          console.log(data);
          resolve(false);
        }
      });
    });
    
    // Handle request errors
    request.on('error', (error) => {
      console.error(`Error when connecting to ${url}: ${error.message}`);
      reject(error);
    });
    
    // Set timeout
    request.setTimeout(5000, () => {
      request.abort();
      console.error(`Request to ${url} timed out`);
      reject(new Error('Request timed out'));
    });
  });
}

// Test all endpoints
async function testEndpoints() {
  console.log('Starting backend API tests...');
  
  let totalSuccessCount = 0;
  
  for (const baseUrl of baseUrls) {
    console.log(`\nTesting base URL: ${baseUrl}`);
    let successCount = 0;
    
    for (const endpoint of endpoints) {
      try {
        const url = endpoint === '/' ? baseUrl : `${baseUrl}${endpoint}`;
        const success = await makeRequest(url);
        if (success) {
          successCount++;
          totalSuccessCount++;
        }
        console.log('-'.repeat(50));
      } catch (error) {
        console.log('-'.repeat(50));
      }
    }
    
    console.log(`Results for ${baseUrl}: ${successCount} of ${endpoints.length} endpoints are accessible.`);
  }
  
  console.log(`\nTest completed. ${totalSuccessCount} endpoints are accessible across all base URLs.`);
  
  if (totalSuccessCount === 0) {
    console.log('\nPossible issues:');
    console.log('1. The backend server is not running');
    console.log('2. The backend server is running on a different port');
    console.log('3. There are CORS issues preventing access');
    console.log('4. The API endpoints in the frontend do not match those in the backend');
    console.log('5. Check if the backend requires POST requests instead of GET');
  }
}

testEndpoints(); 