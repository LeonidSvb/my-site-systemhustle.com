# Workflow Standards 🚀

## Daily Session Protocol

### 1. Session Start (First 5 minutes)
```bash
cd /path/to/systemhustle.com
git status                    # Check current state
git pull origin main          # Get latest changes
python -m http.server 8000    # Start local server
```

**Quick Health Check:**
- [ ] Site loads on `localhost:8000`
- [ ] No console errors
- [ ] Last commit status in git

### 2. Before Any Changes
- [ ] Read current TODO list
- [ ] Update DEVLOG with session start
- [ ] Create backup branch if major changes: `git checkout -b backup-YYYY-MM-DD`

### 3. During Development
- [ ] Test changes locally before committing
- [ ] Run relevant sections of TESTING-CHECKLIST.md
- [ ] Update TODO list as tasks complete
- [ ] Document decisions in DEVLOG

### 4. Session End
- [ ] Run full TESTING-CHECKLIST.md if major changes
- [ ] Commit changes with clear messages
- [ ] Update DEVLOG with session summary
- [ ] Push to GitHub if ready for deployment

---

## File Change Protocols

### New Page Creation
**Template Process:**
```bash
# 1. Copy template structure
cp template.html new-page.html

# 2. Required elements checklist:
# [ ] Update title tag
# [ ] Update meta description  
# [ ] Update canonical URL
# [ ] Update Open Graph tags
# [ ] Update navigation active state
# [ ] Add page-specific content
# [ ] Test all links and navigation

# 3. Test with checklist
# [ ] Mobile responsiveness
# [ ] Theme toggle works
# [ ] All CTAs work
# [ ] Navigation works
```

### Component Updates
**When changing shared components:**
- [ ] Test on ALL pages that use component
- [ ] Update component version in DEVLOG
- [ ] Check mobile and desktop versions
- [ ] Verify theme compatibility

### Asset Updates (CSS/JS)
**Before changing main.css or main.js:**
- [ ] Backup current version
- [ ] Test on at least 3 different pages
- [ ] Check mobile compatibility
- [ ] Verify no breaking changes

---

## Link Management Standards

### Internal Links Audit (Monthly)
```bash
# Check for broken internal links
grep -r "href=" *.html | grep -E "(#|\/)" > internal-links.txt
# Manual review of internal-links.txt
```

### External Links Audit (Quarterly)
- [ ] Test all Calendly links
- [ ] Test all WhatsApp links  
- [ ] Test all email links
- [ ] Test all social media links
- [ ] Update broken/changed links

### Cross-Page Navigation Rules
**Every page MUST have:**
- [ ] Working logo → home link
- [ ] Working navigation to all main sections
- [ ] Working theme toggle
- [ ] Working mobile menu
- [ ] Working CTAs (Calendly, WhatsApp, Email)

---

## Content Update Protocol

### Blog Posts
1. **Create**: Use `/blog/template.html`
2. **Required Elements:**
   - [ ] SEO title and description
   - [ ] Publication date
   - [ ] Author information
   - [ ] Category tags
   - [ ] Social sharing meta tags
3. **Update Blog Index:** Add new post to `/blog/index.html`
4. **Cross-linking:** Add relevant internal links

### Product Pages  
1. **Create**: Use `/products/template.html`
2. **Required Elements:**
   - [ ] Product-specific ROI calculator (if applicable)
   - [ ] Clear CTAs to book call
   - [ ] Testimonials/case studies
   - [ ] Feature breakdown
3. **Update Navigation:** Add to products menu

### Global Content Changes
**When updating contact info, pricing, or key messaging:**
- [ ] Update config.js constants
- [ ] Search and replace across all files
- [ ] Update About Me page
- [ ] Update main landing page
- [ ] Test all contact methods

---

## Quality Assurance Standards

### Pre-Commit Checklist
- [ ] No JavaScript errors in console
- [ ] All images load correctly
- [ ] Mobile layout works
- [ ] Theme toggle works
- [ ] All links functional
- [ ] No typos in visible text
- [ ] Performance impact acceptable

### Pre-Deployment Checklist  
- [ ] Run full TESTING-CHECKLIST.md
- [ ] Test on at least 2 browsers
- [ ] Test on mobile device
- [ ] All CTAs tested and working
- [ ] Contact methods verified
- [ ] Analytics working (if implemented)

### Post-Deployment Verification
- [ ] Live site loads correctly
- [ ] All pages accessible
- [ ] Contact forms work (if any)
- [ ] External links work
- [ ] SSL certificate valid
- [ ] Mobile version works live

---

## Documentation Standards

### DEVLOG Updates
**Format for each session:**
```markdown
## YYYY-MM-DD
**type: brief description**

What was done (fact)  
Why it was done (decision)  
What was achieved (result)
```

### README Updates
**Update README when:**
- [ ] New pages added
- [ ] Architecture changes
- [ ] New features implemented
- [ ] Contact information changes
- [ ] Performance optimizations made

### Code Comments
**When to add comments:**
- Complex JavaScript functions
- Custom CSS animations  
- Third-party integrations
- Temporary solutions/hacks
- Configuration sections

---

## Backup & Recovery

### Git Workflow
```bash
# Before major changes
git checkout -b feature-YYYY-MM-DD
git add -A
git commit -m "Backup before major changes"

# After successful changes  
git checkout main
git merge feature-YYYY-MM-DD
git push origin main
git branch -d feature-YYYY-MM-DD
```

### Local Backups
- [ ] Keep local copy of working version
- [ ] Export important content separately
- [ ] Screenshot key pages before major changes

---

## Performance Monitoring

### Weekly Health Check
- [ ] Page load speeds under 3 seconds
- [ ] No 404 errors in logs
- [ ] All contact methods working
- [ ] Mobile experience smooth
- [ ] No JavaScript errors

### Monthly Deep Review
- [ ] Full TESTING-CHECKLIST.md run
- [ ] Content freshness review
- [ ] Link audit (internal/external)  
- [ ] Performance optimization check
- [ ] Security updates if needed

---

## Emergency Protocols

### Site Down
1. Check GitHub Pages status
2. Verify DNS settings
3. Roll back to last known good version
4. Contact hosting support if needed

### Broken Feature
1. Identify scope of breakage
2. Roll back specific change if possible
3. Create hotfix branch
4. Test fix thoroughly
5. Deploy and verify

### Content Issues
1. Take screenshot of issue
2. Create backup of current state
3. Fix content
4. Test affected pages
5. Update DEVLOG with incident

---

**Last Updated**: January 2025  
**Review Schedule**: Update workflow quarterly or when major changes occur