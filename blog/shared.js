// Shared site chrome for /blog/ — header, footer, per-post CTA block, and
// "Read next" cross-links. Header/footer markup never varies between pages.
// CTA content is per-post: declare window.POST_CTA before this script runs.
// Read next needs window.BLOG_POST_SLUG (the current post's slug) and
// window.BLOG_POSTS (from posts-data.js, loaded before this file).
(function(){

  function renderHeader(){
    var mount = document.getElementById("site-header");
    if(!mount) return;
    mount.outerHTML =
      '<header class="top">' +
        '<div class="top-inner">' +
          '<a class="mark" href="/blog/">systemhustle<span>.</span>blog</a>' +
          '<a href="https://systemhustle.com" style="color: var(--ink-3); text-decoration: none;">systemhustle.com ↗</a>' +
        '</div>' +
      '</header>';
  }

  function renderFooter(){
    var mount = document.getElementById("site-footer");
    if(!mount) return;
    mount.outerHTML =
      '<footer class="bottom">' +
        '<div><a href="https://systemhustle.com">systemhustle.com</a> — real numbers, nothing made up. · <a href="/blog/">all posts</a></div>' +
      '</footer>';
  }

  function ctaCardHtml(card, i){
    var action;
    if(card.href){
      action = '<a class="cta-link" href="' + card.href + '">' + card.linkText + '</a>';
    } else if(card.copyText){
      action = '<button type="button" class="cta-link copy-btn" data-copy-idx="' + i + '">' + card.linkText + '</button>';
    } else {
      action = '<span class="cta-link" style="opacity:0.55; border-top-color: transparent;">' + card.linkText + '</span>';
    }
    return (
      '<div class="cta-card' + (card.lead ? ' lead' : '') + '">' +
        '<span class="tag">' + card.tag + '</span>' +
        '<p>' + card.text + '</p>' +
        action +
      '</div>'
    );
  }

  function renderCTA(){
    var cfg = window.POST_CTA;
    var mount = document.getElementById("post-cta");
    if(!mount || !cfg) return;

    mount.outerHTML =
      '<div class="cta-section">' +
        '<h2>' + cfg.heading + '</h2>' +
        '<p>' + cfg.intro + '</p>' +
        '<div class="cta-grid">' + cfg.cards.map(ctaCardHtml).join("") + '</div>' +
        '<div class="whatsapp-row"><a class="whatsapp-btn" href="' + cfg.whatsappHref + '">Message me on WhatsApp →</a></div>' +
      '</div>';

    cfg.cards.forEach(function(card, i){
      if(!card.copyText) return;
      var btn = document.querySelector('[data-copy-idx="' + i + '"]');
      if(!btn) return;
      var original = card.linkText;
      btn.addEventListener("click", function(){
        function done(){
          btn.textContent = "Copied — paste it to your agent";
          setTimeout(function(){ btn.textContent = original; }, 2500);
        }
        try{
          navigator.clipboard.writeText(card.copyText).then(done).catch(function(){
            window.prompt("Copy this to your coding agent:", card.copyText);
          });
        }catch(e){
          window.prompt("Copy this to your coding agent:", card.copyText);
        }
      });
    });
  }

  function renderReadNext(){
    var slug = window.BLOG_POST_SLUG;
    var box = document.getElementById("read-next");
    var grid = document.getElementById("read-next-grid");
    if(!slug || !box || !grid) return;
    try{
      var posts = (window.BLOG_POSTS || []).filter(function(p){ return p.slug !== slug; });
      if(!posts.length) return;
      posts.slice(0, 2).forEach(function(p){
        var a = document.createElement("a");
        a.className = "read-next-card";
        a.href = "/blog/" + p.slug + "/";
        a.innerHTML = '<span class="tag">' + p.tags[0] + '</span><h3>' + p.title + '</h3><p>' + p.excerpt + '</p>';
        grid.appendChild(a);
      });
      box.hidden = false;
    }catch(e){}
  }

  renderHeader();
  renderFooter();
  renderCTA();
  renderReadNext();
})();
