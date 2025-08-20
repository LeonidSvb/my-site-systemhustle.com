// Global teardown for Playwright tests
// Cleans up after all tests are complete

async function globalTeardown(config) {
  console.log('🏁 All tests completed!');
  console.log('📊 Check test-results/ directory for detailed reports');
  console.log('🎯 Test artifacts saved in test-results/artifacts/');
}

module.exports = globalTeardown;