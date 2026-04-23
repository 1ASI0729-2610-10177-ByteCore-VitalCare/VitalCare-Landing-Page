const header = document.getElementById('header');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

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

const setHeaderState = () => {
    if (!header) {
        return;
    }
    header.classList.toggle('is-scrolled', window.scrollY > 16);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const revealSelectors = [
    '.hero-content h1',
    '.hero-content p',
    '.hero-content .btn',
    '.hero-image',
    '#problematica h2',
    '#problematica .card',
    '#beneficios h2',
    '#beneficios .benefit-card',
    '#startup h2',
    '#startup .startup-image',
    '#startup .startup-content',
    '#planes h2',
    '#planes .pricing-card',
    '.footer-col',
    '.footer-bottom'
];

const revealElements = document.querySelectorAll(revealSelectors.join(', '));

revealElements.forEach((element) => {
    element.classList.add('reveal');
});

document.querySelectorAll('.hero-content h1, #problematica h2, #beneficios h2, #startup h2, #planes h2').forEach((element) => {
    element.classList.add('reveal--soft');
});

document.querySelectorAll('.hero-image, #startup .startup-image').forEach((element) => {
    element.classList.add('reveal--right');
});

document.querySelectorAll('#startup .startup-content, #beneficios .benefit-card:last-child').forEach((element) => {
    element.classList.add('reveal--left');
});

document.querySelectorAll('.pricing-card, #problematica .card').forEach((element) => {
    element.classList.add('reveal--zoom');
});

document.querySelectorAll('.grid-3 .card, .pricing-grid .pricing-card, .footer-grid .footer-col').forEach((element, index) => {
    element.style.transitionDelay = `${(index % 3) * 90}ms`;
});

document.querySelectorAll('.check-list li').forEach((element, index) => {
    element.classList.add('reveal', 'reveal--left');
    element.style.transitionDelay = `${(index % 5) * 60}ms`;
});

if (reducedMotionQuery.matches) {
    revealElements.forEach((element) => {
        element.classList.add('is-visible');
    });
    document.querySelectorAll('.check-list li').forEach((element) => {
        element.classList.add('is-visible');
    });
} else {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    entry.target.classList.remove('is-visible');
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

    document.querySelectorAll('.check-list li').forEach((element) => {
        revealObserver.observe(element);
    });
}


