// Shared behavior for the homepage and every /for/<niche>/ landing page:
// FAQ accordion, smooth-scroll nav links, and the animated step-route line.
// One copy so a fix here doesn't need to be repeated per page.
document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute('href'));
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const routeWrap = document.getElementById('routeWrap');
const routeSvg = document.getElementById('routeLineSvg');

function layoutRouteLine() {
    if (!routeWrap || !routeSvg) return;
    const markers = routeWrap.querySelectorAll('.step-marker');
    if (markers.length < 2 || getComputedStyle(routeSvg).display === 'none') return;
    const wrapRect = routeWrap.getBoundingClientRect();
    const first = markers[0].getBoundingClientRect();
    const last = markers[markers.length - 1].getBoundingClientRect();
    const x1 = first.left - wrapRect.left + first.width / 2;
    const x2 = last.left - wrapRect.left + last.width / 2;
    const y = first.top - wrapRect.top + first.height / 2;
    routeSvg.setAttribute('viewBox', `0 0 ${wrapRect.width} ${Math.max(y * 2, 6)}`);
    routeSvg.style.top = '0';
    routeSvg.style.height = `${y * 2}px`;
    const d = `M ${x1} ${y} L ${x2} ${y}`;
    routeSvg.querySelectorAll('path').forEach(p => p.setAttribute('d', d));
}
layoutRouteLine();
window.addEventListener('resize', layoutRouteLine);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutRouteLine);

if (routeWrap && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                routeWrap.classList.add('in-view');
                io.unobserve(routeWrap);
            }
        });
    }, { threshold: 0.4 });
    io.observe(routeWrap);
} else if (routeWrap) {
    routeWrap.classList.add('in-view');
}
