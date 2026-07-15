// Hair by Syd — shared site scripts

// Header shadow on scroll
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
}

// Mobile menu
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');
if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => nav.classList.toggle('mobile-open'));
    nav.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => nav.classList.remove('mobile-open'))
    );
}

// Scroll-in animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .step, .about-text, .split-text, .visit-item')
    .forEach(el => observer.observe(el));

// Generic fading carousel
// Usage: initCarousel({ root, slideSel, dotsSel, prevSel, nextSel, delay })
function initCarousel(opts) {
    const root = document.querySelector(opts.root);
    if (!root) return;
    const slides = root.querySelectorAll(opts.slideSel);
    const dotsContainer = opts.dotsSel ? root.querySelector(opts.dotsSel) : null;
    const prevBtn = opts.prevSel ? root.querySelector(opts.prevSel) : null;
    const nextBtn = opts.nextSel ? root.querySelector(opts.nextSel) : null;
    if (slides.length < 2) return;

    let current = 0;
    let timer = null;

    let dots = [];
    if (dotsContainer) {
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', () => { go(i); restart(); });
            dotsContainer.appendChild(dot);
        });
        dots = Array.from(dotsContainer.children);
    }

    function go(i) {
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (i + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    const next = () => go(current + 1);
    const prev = () => go(current - 1);

    function start() { if (opts.delay) timer = setInterval(next, opts.delay); }
    function stop() { clearInterval(timer); }
    function restart() { stop(); start(); }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restart(); });

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);

    // Swipe support
    let startX = 0;
    root.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; stop(); }, { passive: true });
    root.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) (diff > 0 ? next : prev)();
        start();
    }, { passive: true });

    start();
}

initCarousel({
    root: '.ba-carousel',
    slideSel: '.ba-slide',
    dotsSel: '.carousel-dots',
    prevSel: '.carousel-prev',
    nextSel: '.carousel-next',
    delay: 4500
});

initCarousel({
    root: '.reviews-wrap',
    slideSel: '.review-slide',
    dotsSel: '.carousel-dots',
    prevSel: '.carousel-prev',
    nextSel: '.carousel-next',
    delay: 7000
});
