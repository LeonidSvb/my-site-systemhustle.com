(function () {
    var ICONS = {
        warehouse: '<path d="M3 10l9-6 9 6v10a1 1 0 01-1 1H4a1 1 0 01-1-1V10z"></path><path d="M9 21V13h6v8"></path>',
        ship: '<path d="M3 17l1.5-6h15L21 17"></path><path d="M6 11V6h5l3 5"></path><path d="M2 20c1.5 1 3.5 1 5 0s3.5-1 5 0 3.5 1 5 0 3.5-1 5 0"></path>',
        handshake: '<path d="M8 12l3 3 6-6"></path><path d="M2 12l5-5 4 2 4-2 5 5-4 4-1-1-3 3-3-3-1 1z"></path>',
        dollar: '<path d="M12 2v20"></path><path d="M17 6.5c0-1.9-2.2-3.5-5-3.5s-5 1.6-5 3.5S9.2 10 12 10s5 1.6 5 3.5-2.2 3.5-5 3.5-5-1.6-5-3.5"></path>',
        document: '<path d="M14 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z"></path><path d="M14 3v5h5"></path><path d="M9 13h6M9 17h6"></path>',
        chart: '<path d="M3 3v18h18"></path><path d="M7 15l4-5 3 3 5-7"></path>'
    };

    // Repeats the title list enough times that the ticker track is always
    // wider than the viewport, so the CSS loop never shows a short, jumpy
    // sliver of text instead of a continuous scroll.
    function renderTicker(el, titles) {
        if (!el || !titles || !titles.length) return;
        var REPEATS = 6;
        var parts = [];
        for (var r = 0; r < REPEATS; r++) {
            titles.forEach(function (t, i) {
                parts.push(r === 0 && i === 0 ? '<b>' + t + '</b>' : t);
            });
        }
        var group = parts.join(' &nbsp;·&nbsp; ') + ' &nbsp;·&nbsp; ';
        var track = document.createElement('div');
        track.className = 'ticker-track';
        track.innerHTML = '<span>' + group + '</span><span>' + group + '</span>';
        el.appendChild(track);
    }

    function renderSignals(carouselEl, dotsEl, signals) {
        if (!carouselEl || !signals || !signals.length) return;
        signals.forEach(function (s, i) {
            var slide = document.createElement('div');
            slide.className = 'signal-slide' + (i === 0 ? ' active' : '');
            slide.innerHTML =
                '<div class="signal-icon"><svg viewBox="0 0 24 24">' + (ICONS[s.icon] || ICONS.chart) + '</svg></div>' +
                '<p>' + s.text + '</p>';
            carouselEl.appendChild(slide);

            if (dotsEl) {
                var dot = document.createElement('span');
                if (i === 0) dot.className = 'active';
                dotsEl.appendChild(dot);
            }
        });

        if (signals.length < 2) return;
        var slides = carouselEl.querySelectorAll('.signal-slide');
        var dots = dotsEl ? dotsEl.querySelectorAll('span') : [];
        var current = 0;
        setInterval(function () {
            slides[current].classList.remove('active');
            if (dots[current]) dots[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
            if (dots[current]) dots[current].classList.add('active');
        }, 4000);
    }

    function initRoiCalculator(root) {
        if (!root) return;
        var dealInput = root.querySelector('[data-roi-deal]');
        var yearsInput = root.querySelector('[data-roi-years]');
        var out = root.querySelector('[data-roi-result]');
        if (!dealInput || !yearsInput || !out) return;

        function fmt(n) {
            return '$' + Math.round(n).toLocaleString('en-US');
        }

        function update() {
            var annual = parseFloat(dealInput.value) || 0;
            var years = parseFloat(yearsInput.value) || 0;
            out.textContent = fmt(annual * years);
        }

        dealInput.addEventListener('input', update);
        yearsInput.addEventListener('input', update);
        update();
    }

    function initFaqAndNav() {
        document.querySelectorAll('.faq-question').forEach(function (q) {
            q.addEventListener('click', function () {
                var item = q.parentElement;
                var isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(function (f) { f.classList.remove('active'); });
                if (!isActive) item.classList.add('active');
            });
        });

        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var target = document.querySelector(a.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    function initRouteLine() {
        var routeWrap = document.getElementById('routeWrap');
        var routeSvg = document.getElementById('routeLineSvg');
        if (!routeWrap || !routeSvg) return;

        function layout() {
            var markers = routeWrap.querySelectorAll('.step-marker');
            if (markers.length < 2 || getComputedStyle(routeSvg).display === 'none') return;
            var wrapRect = routeWrap.getBoundingClientRect();
            var first = markers[0].getBoundingClientRect();
            var last = markers[markers.length - 1].getBoundingClientRect();
            var x1 = first.left - wrapRect.left + first.width / 2;
            var x2 = last.left - wrapRect.left + last.width / 2;
            var y = first.top - wrapRect.top + first.height / 2;
            routeSvg.setAttribute('viewBox', '0 0 ' + wrapRect.width + ' ' + Math.max(y * 2, 6));
            routeSvg.style.top = '0';
            routeSvg.style.height = (y * 2) + 'px';
            var d = 'M ' + x1 + ' ' + y + ' L ' + x2 + ' ' + y;
            routeSvg.querySelectorAll('path').forEach(function (p) { p.setAttribute('d', d); });
        }

        layout();
        window.addEventListener('resize', layout);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        routeWrap.classList.add('in-view');
                        io.unobserve(routeWrap);
                    }
                });
            }, { threshold: 0.4 });
            io.observe(routeWrap);
        } else {
            routeWrap.classList.add('in-view');
        }
    }

    function initNichePage(data) {
        document.addEventListener('DOMContentLoaded', function () {
            renderTicker(document.getElementById('titlesTicker'), data.titles);
            renderSignals(document.getElementById('signalCarousel'), document.getElementById('signalDots'), data.signals);
            initRoiCalculator(document.getElementById('roiBox'));
            initFaqAndNav();
            initRouteLine();
        });
    }

    window.SystemHustleNiche = { init: initNichePage };
})();
