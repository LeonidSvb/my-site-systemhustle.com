// Single source of truth for the blog listing + cross-links.
// Add a new object here every time a post ships. Nothing else needs touching
// for it to show up in /blog/ and in "Read next" on other posts.
window.BLOG_POSTS = [
  {
    slug: "how-to-scrape-10k-company-websites-in-15-minutes-for-free",
    title: "How to Scrape 10,000 Company Websites in 15 Minutes for Free",
    date: "2026-09-18",
    tags: ["scraping", "infrastructure", "cost"],
    excerpt: "Most scraping APIs charge the same price whether a site is plain HTML or a JavaScript fortress. Most sites aren't fortresses. How I built a free HTTP scraper that covers 76% of a niche, plus the rate-limit lesson, the DNS bug, and the worker-pool trick that made it fast."
  },
  {
    slug: "how-to-process-10k-leads-with-an-llm-for-5-usd",
    title: "How to Process 10,000 Leads With an LLM for $5",
    date: "2026-09-18",
    tags: ["infrastructure", "llm", "cost"],
    excerpt: "How routing and concurrency settings on OpenRouter cut LLM enrichment cost from $34.50 to $5 per 10,000 domains — named providers, real numbers, nothing held back."
  }
];
