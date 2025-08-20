const { test, expect } = require('@playwright/test');

test.describe('SystemHustle Website Visual Tests', () => {
  
  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AI Automation Agency/);
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    
    await page.screenshot({ 
      path: 'screenshots/homepage-full.png', 
      clip: { x: 0, y: 0, width: 1920, height: 3000 }
    });
    
    await page.screenshot({ 
      path: 'screenshots/hero-section.png',
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
  });

  test('Dark mode toggle works', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: 'screenshots/light-mode.png',
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    
    await page.locator('#themeToggle').waitFor({ state: 'visible' });
    await page.locator('#themeToggle').click();
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: 'screenshots/dark-mode.png',
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('ROI Calculator interactions', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('#roi-calculator').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    await page.locator('#teamSize').fill('80');
    await page.locator('#monthlyRevenue').fill('90');
    await page.locator('#processEfficiency').fill('3');
    
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'screenshots/roi-calculator.png',
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
  });

  test('Case Studies section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('#case-studies').scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'screenshots/case-studies.png',
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
  });

});