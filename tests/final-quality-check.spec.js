// FINAL QUALITY CHECK - Fast & Focused
const { test, expect } = require('@playwright/test');

test.describe('Final Quality Check - 10/10', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
    await page.waitForTimeout(3000); // Simple wait instead of networkidle
  });

  test('✅ 1. Navigation - Clean & Unified', async ({ page }) => {
    console.log('🧪 Testing Navigation...');
    
    // Should have unified navigation
    const navLinks = page.locator('nav a');
    await expect(navLinks.filter({ hasText: 'Home' }).first()).toBeVisible();
    await expect(navLinks.filter({ hasText: 'About Me' }).first()).toBeVisible();
    await expect(navLinks.filter({ hasText: 'Products' }).first()).toBeVisible();
    await expect(navLinks.filter({ hasText: 'Blog' }).first()).toBeVisible();
    
    // Should NOT have internal links in navigation
    await expect(navLinks.filter({ hasText: 'Services' })).toHaveCount(0);
    await expect(navLinks.filter({ hasText: 'Reality' })).toHaveCount(0);
    await expect(navLinks.filter({ hasText: 'Process' })).toHaveCount(0);
    
    await page.screenshot({ path: 'screenshots/final-1-nav.png' });
    console.log('✅ Navigation: PASSED');
  });

  test('✅ 2. CTA System - Discovery Call Prominent', async ({ page }) => {
    console.log('🧪 Testing CTA System...');
    
    // Primary CTA should be visible and properly styled
    const primaryCTA = page.locator('.cta-primary').first();
    await expect(primaryCTA).toBeVisible();
    await expect(primaryCTA).toHaveAttribute('href', /calendly/);
    
    // Mobile CTA should be visible on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    const mobileCTA = page.locator('.cta-mobile').first();
    await expect(mobileCTA).toBeVisible();
    
    await page.screenshot({ path: 'screenshots/final-2-cta.png' });
    console.log('✅ CTA System: PASSED');
  });

  test('✅ 3. Branding - No Extra S', async ({ page }) => {
    console.log('🧪 Testing Branding...');
    
    // Check SystemHustle branding (no extra S)
    const logoText = page.locator('[data-brand="logo"]').first();
    await expect(logoText).toContainText('SystemHustle');
    
    // Should not have standalone "S" icons
    const iconElements = page.locator('[data-brand="icon"]');
    for (let i = 0; i < await iconElements.count(); i++) {
      const text = await iconElements.nth(i).textContent();
      expect(text?.trim()).not.toBe('S');
    }
    
    await page.screenshot({ path: 'screenshots/final-3-branding.png' });
    console.log('✅ Branding: PASSED');
  });

  test('✅ 4. Footer - Universal & Complete', async ({ page }) => {
    console.log('🧪 Testing Footer...');
    
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    
    // Should have legal links
    await expect(footer.locator('text=Privacy Policy')).toBeVisible();
    await expect(footer.locator('text=Terms of Service')).toBeVisible();
    
    // Should have contact info
    await expect(footer.locator('text=WhatsApp Chat')).toBeVisible();
    
    await page.screenshot({ path: 'screenshots/final-4-footer.png' });
    console.log('✅ Footer: PASSED');
  });

  test('✅ 5. Cross-Page Navigation Works', async ({ page }) => {
    console.log('🧪 Testing Cross-Page Navigation...');
    
    // Test About Me navigation
    await page.click('a[href="/about-me.html"]');
    await page.waitForTimeout(2000);
    await expect(page).toHaveTitle(/About/);
    await expect(page.locator('h3:has-text("Ready to Scale Your Business?")')).toBeVisible();
    
    // Test Products navigation
    await page.click('a[href="/products/index.html"]:visible');
    await page.waitForTimeout(2000);
    await expect(page).toHaveTitle(/Products/);
    
    // Test Blog navigation
    await page.click('a[href="/blog/index.html"]:visible');
    await page.waitForTimeout(2000);
    await expect(page).toHaveTitle(/Blog/);
    
    await page.screenshot({ path: 'screenshots/final-5-cross-nav.png' });
    console.log('✅ Cross-Navigation: PASSED');
  });

  test('🎯 FINAL VERDICT - Quality Score', async ({ page }) => {
    console.log('🎯 FINAL QUALITY ASSESSMENT...');
    
    let score = 0;
    let maxScore = 8;
    const issues = [];
    
    try {
      // Check 1: Navigation structure (2 points)
      const nav = page.locator('nav').first();
      await expect(nav.locator('a[href="/about-me.html"]')).toBeVisible();
      await expect(nav.locator('a[href="/products/index.html"]')).toBeVisible();
      score += 2;
    } catch (e) {
      issues.push('Navigation structure incomplete');
    }
    
    try {
      // Check 2: CTA visibility and functionality (2 points)
      const primaryCTA = page.locator('.cta-primary').first();
      await expect(primaryCTA).toBeVisible();
      await expect(primaryCTA).toHaveAttribute('href', /calendly/);
      score += 2;
    } catch (e) {
      issues.push('CTA system not working properly');
    }
    
    try {
      // Check 3: Footer completeness (2 points)
      const footer = page.locator('footer').first();
      await expect(footer.locator('text=Privacy Policy')).toBeVisible();
      await expect(footer.locator('text=Terms of Service')).toBeVisible();
      score += 2;
    } catch (e) {
      issues.push('Footer incomplete');
    }
    
    try {
      // Check 4: Branding consistency (2 points)
      const logo = page.locator('[data-brand="logo"]').first();
      await expect(logo).toContainText('SystemHustle');
      score += 2;
    } catch (e) {
      issues.push('Branding issues');
    }
    
    const qualityScore = Math.round((score / maxScore) * 10);
    
    await page.screenshot({ path: 'screenshots/final-verdict.png', fullPage: true });
    
    console.log(`\n🏆 FINAL QUALITY SCORE: ${qualityScore}/10`);
    console.log(`📊 Points: ${score}/${maxScore}`);
    
    if (issues.length > 0) {
      console.log(`❌ Issues found: ${issues.join(', ')}`);
    } else {
      console.log('🎉 NO ISSUES FOUND!');
    }
    
    if (qualityScore >= 10) {
      console.log('🥇 EXCELLENT - 10/10 QUALITY ACHIEVED!');
    } else if (qualityScore >= 8) {
      console.log('🥈 GOOD - High quality, minor improvements needed');
    } else {
      console.log('🥉 NEEDS WORK - Major issues to fix');
    }
    
    // Must pass with high score
    expect(qualityScore).toBeGreaterThanOrEqual(8);
  });
});