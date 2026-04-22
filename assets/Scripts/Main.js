const header = document.getElementById('header');

const getHeaderOffset = () => {
    if (!header) {
        return 90;
    }
    return header.offsetHeight + 16;
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') {
        return;
    }

    anchor.addEventListener('click', (e) => {
        const targetElement = document.querySelector(href);
        if (!targetElement) {
            return;
        }

        e.preventDefault();
        const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    });
});

const revealElements = document.querySelectorAll(
    'h2, .hero-content > *, .hero-image, .card, .startup-image, .startup-content, .pricing-card, .footer-col, .footer-bottom'
);

revealElements.forEach((element) => {
    element.classList.add('reveal');
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach((element) => {
        element.classList.add('is-visible');
    });
} else {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}
