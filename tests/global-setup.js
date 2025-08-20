// Global setup for Playwright tests
// Prepares the environment before running tests

async function globalSetup(config) {
  console.log('🚀 Starting SystemHustle.com test suite...');
  console.log(`📡 Server will run on: ${config.use?.baseURL || 'http://localhost:4000'}`);
  console.log('⚡ Preparing test environment...');
  
  // Add any global setup logic here
  // For example: database setup, authentication, etc.
  
  return async () => {
    console.log('🧹 Cleaning up test environment...');
  };
}

module.exports = globalSetup;