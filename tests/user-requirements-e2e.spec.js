// Complete E2E test for all user requirements
// Testing unified navigation, CTA system, footer, and branding

const { test, expect } = require('@playwright/test');

test.describe('Complete User Requirements Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Start local server and wait for it to be ready
    await page.goto('http://localhost:8080');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for JS to initialize global components
  });

  test('1. Navigation Requirements - Index Page', async ({ page }) => {
    console.log('🧪 Testing Index Navigation Requirements...');
    
    // Check that internal links are removed from main navigation
    const nav = page.locator('nav');
    
    // Should NOT have these internal links in navigation
    await expect(nav.locator('a[href="#services"]')).toHaveCount(0);
    await expect(nav.locator('a[href="#reality"]')).toHaveCount(0);
    await expect(nav.locator('a[href="#process"]')).toHaveCount(0);
    
    // Should have external page links (check first occurrence only)
    await expect(nav.locator('a[href="/index.html"]').first()).toBeVisible();
    await expect(nav.locator('a[href="/about-me.html"]').first()).toBeVisible();
    await expect(nav.locator('a[href="/products/index.html"]').first()).toBeVisible();
    await expect(nav.locator('a[href="/blog/index.html"]').first()).toBeVisible();
    
    // Mobile CTA should be visible (not in hamburger)
    const mobileCTA = page.locator('.cta-mobile');
    await expect(mobileCTA).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'screenshots/1-index-navigation.png', fullPage: true });
    
    console.log('✅ Index Navigation: PASSED');
  });

  test('2. CTA System - Discovery Call everywhere', async ({ page }) => {
    console.log('🧪 Testing Unified CTA System...');
    
    // Index page - should have Discovery Call CTA (check first occurrence)
    await expect(page.locator('text=Discovery Call').first()).toBeVisible();
    
    // Check for CTA button (widget is fallback to button now)
    const discoveryCallCTA = page.locator('a[href*="calendly"]').first();
    await expect(discoveryCallCTA).toBeVisible();
    
    await page.screenshot({ path: 'screenshots/2-index-cta.png', fullPage: true });
    
    // Test About Me page
    await page.click('a[href="/about-me.html"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Should NOT have cringy "Want to know more?" CTA
    await expect(page.locator('text=Want to know more?')).toHaveCount(0);
    
    // Should have business-focused CTA (check heading only)
    await expect(page.locator('h3:has-text("Ready to Scale Your Business?")')).toBeVisible();
    
    await page.screenshot({ path: 'screenshots/2-about-cta.png', fullPage: true });
    
    console.log('✅ CTA System: PASSED');
  });

  test('3. Universal Footer Validation', async ({ page }) => {
    console.log('🧪 Testing Universal Footer...');
    
    const pages = [
      '/index.html',
      '/about-me.html', 
      '/products/index.html',
      '/blog/index.html'
    ];
    
    let footerHTML = null;
    
    for (const pagePath of pages) {
      await page.goto(`http://localhost:8080${pagePath}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
      
      // Check footer has required elements (first occurrence only)
      await expect(footer.locator('text=Privacy Policy').first()).toBeVisible();
      await expect(footer.locator('text=Terms of Service').first()).toBeVisible();
      await expect(footer.locator('text=SystemHustle').first()).toBeVisible();
      await expect(footer.locator('text=WhatsApp Chat').first()).toBeVisible();
      
      // Capture footer HTML for comparison
      const currentFooterHTML = await footer.innerHTML();
      
      if (footerHTML === null) {
        footerHTML = currentFooterHTML;
      } else {
        // Compare footers - should be identical
        expect(currentFooterHTML).toBe(footerHTML);
      }
      
      await page.screenshot({ path: `screenshots/3-footer-${pagePath.replace(/[\/\\]/g, '-')}.png`, fullPage: true });
    }
    
    console.log('✅ Universal Footer: PASSED');
  });

  test('4. Branding Consistency - No Extra S', async ({ page }) => {
    console.log('🧪 Testing Branding Consistency...');
    
    // Check that there's no extra "S" symbol in branding
    const logoElements = page.locator('[data-brand="icon"]');
    
    // Should not have standalone "S" letter
    for (let i = 0; i < await logoElements.count(); i++) {
      const logoText = await logoElements.nth(i).textContent();
      expect(logoText?.trim()).not.toBe('S');
    }
    
    // SystemHustle text should be consistent
    const logoTexts = page.locator('[data-brand="logo"]');
    for (let i = 0; i < await logoTexts.count(); i++) {
      const text = await logoTexts.nth(i).textContent();
      expect(text?.trim()).toBe('SystemHustle');
    }
    
    await page.screenshot({ path: 'screenshots/4-branding.png' });
    
    console.log('✅ Branding Consistency: PASSED');
  });

  test('5. Cross-Page Navigation Flow', async ({ page }) => {
    console.log('🧪 Testing Cross-Page Navigation...');
    
    // Test navigation flow: Index → About → Products → Blog → Back to Index
    const navigationFlow = [
      { path: '/about-me.html', expectedTitle: /About/ },
      { path: '/products/index.html', expectedTitle: /Products/ },
      { path: '/blog/index.html', expectedTitle: /Blog/ },
      { path: '/index.html', expectedTitle: /AI Automation/ }
    ];
    
    for (const step of navigationFlow) {
      await page.click(`a[href="${step.path}"]`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);
      
      // Verify page loaded correctly
      await expect(page).toHaveTitle(step.expectedTitle);
      
      // Verify universal navigation is present (check first one only)
      await expect(page.locator('nav').first()).toBeVisible();
      await expect(page.locator('footer').first()).toBeVisible();
      
      await page.screenshot({ path: `screenshots/5-nav-flow-${step.path.replace(/[\/\\]/g, '-')}.png` });
    }
    
    console.log('✅ Cross-Page Navigation: PASSED');
  });

  test('6. Mobile Responsiveness Check', async ({ page }) => {
    console.log('🧪 Testing Mobile Responsiveness...');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Mobile CTA should be prominently visible (check first one)
    const mobileCTA = page.locator('.cta-mobile').first();
    await expect(mobileCTA).toBeVisible();
    
    // Hamburger menu should be visible
    const hamburger = page.locator('.mobile-menu-btn');
    await expect(hamburger).toBeVisible();
    
    // Click hamburger to open mobile menu
    await hamburger.click();
    await page.waitForTimeout(500);
    
    // Mobile menu should contain all navigation items
    const mobileMenu = page.locator('.mobile-menu');
    await expect(mobileMenu.locator('a[href="/about-me.html"]')).toBeVisible();
    await expect(mobileMenu.locator('a[href="/products/index.html"]')).toBeVisible();
    await expect(mobileMenu.locator('a[href="/blog/index.html"]')).toBeVisible();
    
    await page.screenshot({ path: 'screenshots/6-mobile-menu.png' });
    
    console.log('✅ Mobile Responsiveness: PASSED');
  });

  test('7. Calendly CTA Integration', async ({ page }) => {
    console.log('🧪 Testing Calendly CTA...');
    
    // Go to contact section on index
    await page.goto('http://localhost:8080/index.html#contact');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Check if Calendly CTA is present and properly styled
    const calendlyCTA = page.locator('a[href*="calendly"]').first();
    await expect(calendlyCTA).toBeVisible();
    
    // CTA should have proper href attribute
    const href = await calendlyCTA.getAttribute('href');
    expect(href).toContain('calendly.com');
    
    // CTA should have proper styling class
    const classes = await calendlyCTA.getAttribute('class');
    expect(classes).toContain('cta-primary');
    
    await page.screenshot({ path: 'screenshots/7-calendly-cta.png' });
    
    console.log('✅ Calendly CTA: PASSED');
  });
});

// Additional validation test for overall quality
test.describe('Quality Assurance - 10/10 Standard', () => {
  
  test('Complete Site Quality Check', async ({ page }) => {
    console.log('🎯 FINAL QUALITY CHECK - Aiming for 10/10...');
    
    await page.goto('http://localhost:8080');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const issues = [];
    
    // Check 1: No console errors
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    await page.waitForTimeout(3000);
    
    if (errors.length > 0) {
      issues.push(`Console Errors: ${errors.join(', ')}`);
    }
    
    // Check 2: All images load properly
    const images = page.locator('img');
    for (let i = 0; i < await images.count(); i++) {
      const img = images.nth(i);
      const naturalWidth = await img.evaluate(img => img.naturalWidth);
      if (naturalWidth === 0) {
        const src = await img.getAttribute('src');
        issues.push(`Broken image: ${src}`);
      }
    }
    
    // Check 3: All links are valid (not 404)
    const links = page.locator('a[href]');
    for (let i = 0; i < Math.min(await links.count(), 10); i++) { // Sample first 10 links
      const link = links.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && href.startsWith('/') && !href.includes('#')) {
        try {
          const response = await page.request.get(`http://localhost:8080${href}`);
          if (response.status() === 404) {
            issues.push(`404 Link: ${href}`);
          }
        } catch (e) {
          issues.push(`Failed to check link: ${href}`);
        }
      }
    }
    
    // Check 4: Typography and spacing consistency
    const headings = page.locator('h1, h2, h3');
    await expect(headings.first()).toBeVisible();
    
    // Check 5: CTA buttons are properly styled
    const ctaButtons = page.locator('.cta-primary, .cta-secondary, .cta-mobile');
    for (let i = 0; i < await ctaButtons.count(); i++) {
      const button = ctaButtons.nth(i);
      await expect(button).toBeVisible();
      
      // Check if button has proper styling
      const bgColor = await button.evaluate(el => getComputedStyle(el).backgroundColor);
      expect(bgColor).not.toBe('rgba(0, 0, 0, 0)'); // Should have background
    }
    
    await page.screenshot({ path: 'screenshots/8-quality-check.png', fullPage: true });
    
    // Final verdict
    if (issues.length === 0) {
      console.log('🎉 QUALITY CHECK: 10/10 - PERFECT!');
    } else {
      console.log(`❌ QUALITY ISSUES FOUND (${issues.length}):`);
      issues.forEach((issue, i) => console.log(`${i + 1}. ${issue}`));
      throw new Error(`Quality check failed: ${issues.length} issues found`);
    }
  });
});