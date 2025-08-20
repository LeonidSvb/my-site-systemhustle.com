# Website Testing Checklist 🧪

## Quick Test Commands
```bash
# Start local server
python -m http.server 8000

# Test URL: http://localhost:8000
```

---

## 🔗 Navigation & Links Test

### Global Navigation (Every Page)
- [ ] Logo links to home (`/`)
- [ ] Home link works
- [ ] Services link (`/#services`) scrolls to services section
- [ ] Reality link (`/#reality`) scrolls to reality check section  
- [ ] About Me link (`/about-me`) loads about page
- [ ] Process link (`/#process`) scrolls to process section
- [ ] Blog link (`/blog`) loads blog index
- [ ] Contact link (`/#contact`) scrolls to contact section

### Mobile Navigation
- [ ] Mobile menu opens/closes
- [ ] All mobile nav links work
- [ ] Mobile theme toggle works
- [ ] Hamburger animation works

### Internal Links (Per Page)
- [ ] All anchor links scroll to correct sections
- [ ] Cross-page links work (e.g., blog → home sections)
- [ ] Back to top button appears after scroll
- [ ] Back to top button scrolls to top

---

## 📱 Responsive Design Test

### Breakpoints to Test
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px) 
- [ ] Desktop (1024px+)

### Layout Elements
- [ ] Navigation adapts correctly
- [ ] Hero section stacks properly on mobile
- [ ] Cards/grids reflow appropriately
- [ ] Text remains readable at all sizes
- [ ] Images scale properly
- [ ] CTAs remain accessible

---

## 🎨 Theme & Visual Test

### Dark/Light Theme
- [ ] Theme toggle works on desktop
- [ ] Theme toggle works on mobile
- [ ] Theme persists on page reload
- [ ] Theme persists across page navigation
- [ ] All colors adapt properly in dark mode
- [ ] Icons change color appropriately

### Visual Elements
- [ ] All images load properly
- [ ] Animations trigger on scroll
- [ ] Hover effects work on interactive elements
- [ ] Loading states work correctly
- [ ] No layout shifts during load

---

## 📞 Contact Integration Test

### Primary CTAs
- [ ] Calendly links open correctly (`calendly.com/standartdevelop/30min`)
- [ ] WhatsApp links work (`+6281757575553`)
- [ ] Email links open mail client (`leo@systemhustle.com`)
- [ ] GitHub links work (if added)

### Contact Forms (if present)
- [ ] Form validation works
- [ ] Success/error messages display
- [ ] Form submission works

---

## ⚡ Performance Test

### Loading Speed
- [ ] Pages load under 3 seconds
- [ ] Images have lazy loading
- [ ] CSS loads without blocking
- [ ] JavaScript loads without errors

### Browser Console
- [ ] No JavaScript errors
- [ ] No 404 errors for assets
- [ ] No console warnings

---

## 🔍 Content Test

### Pages to Check
- [ ] **Index** (`/`) - All sections present
- [ ] **About Me** (`/about-me`) - Personal content loads
- [ ] **Blog Index** (`/blog`) - Posts list loads
- [ ] **Blog Posts** (`/blog/posts/*`) - Individual articles load
- [ ] **Products** (`/products/*`) - Product pages load

### Content Elements
- [ ] All text is readable and formatted
- [ ] All statistics/counters animate correctly
- [ ] All testimonials/case studies display
- [ ] All images have alt text
- [ ] Meta tags are present and accurate

---

## 🌐 Cross-Browser Test

### Browsers to Test
- [ ] Chrome (latest)
- [ ] Firefox (latest) 
- [ ] Safari (if available)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari Mobile
- [ ] Samsung Internet (if Android)

---

## 📋 SEO & Meta Test

### Every Page Should Have
- [ ] Title tag (unique per page)
- [ ] Meta description
- [ ] Canonical URL
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Favicon loads correctly

### Structure
- [ ] H1 tag present and unique
- [ ] Heading hierarchy (H1 → H2 → H3)
- [ ] Alt text on all images
- [ ] Descriptive link text (no "click here")

---

## 🚨 Error Handling Test

### Test Scenarios
- [ ] Navigate to non-existent page (404 handling)
- [ ] Disable JavaScript (graceful degradation)
- [ ] Slow network simulation
- [ ] Offline behavior (if PWA features added)

---

## ✅ Final Checklist

### Before Publishing
- [ ] All links tested and working
- [ ] All images optimized and loading
- [ ] Mobile experience tested
- [ ] Contact methods verified
- [ ] Analytics tracking working (if implemented)
- [ ] Performance meets standards
- [ ] No broken functionality

### After Publishing
- [ ] Test live URLs
- [ ] Verify DNS and SSL
- [ ] Check search console (if available)
- [ ] Monitor for 404s
- [ ] Verify contact forms work in production

---

## 🔧 Testing Tools

### Browser DevTools
- Network tab for loading issues
- Console for JavaScript errors  
- Lighthouse for performance
- Mobile view for responsive testing

### External Tools
- [GTmetrix](https://gtmetrix.com) - Performance
- [WebPageTest](https://webpagetest.org) - Loading speed
- [W3C Validator](https://validator.w3.org) - HTML validation
- [Broken Link Checker](https://ahrefs.com/broken-link-checker) - Link validation

---

## 📝 Bug Report Template

```markdown
**Bug**: Brief description
**Page**: URL where found
**Browser**: Chrome 120.0 / Mobile Safari
**Steps**: 
1. Navigate to X
2. Click Y
3. Error occurs

**Expected**: What should happen
**Actual**: What actually happens
**Screenshot**: (if applicable)
**Priority**: High/Medium/Low
```

---

**Usage**: Run this checklist after every major change, before publishing, and monthly for maintenance.