/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*========== sticky navbar ==========*/
    let header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /*========== remove menu icon navbar when click navbar link (scroll) ==========*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/*========== swiper ==========*/
if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 50,
        loop: true,
        grabCursor: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}


/*========== sticky navbar ==========*/
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#0ea5e9" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.2, "random": false },
            "size": { "value": 2, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#0ea5e9", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "bubble": { "distance": 200, "size": 4, "duration": 2, "opacity": 0.8, "speed": 3 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });
}

/*========== GSAP Animations ==========*/
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    const tl = gsap.timeline();

    tl.from(".home-content h3", { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" })
      .from(".home-content h1", { duration: 1, y: 30, opacity: 0, ease: "power3.out" }, "-=0.4")
      .from(".text-animate h3", { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.6")
      .from(".home-content p", { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.6")
      .from(".btn-group", { duration: 0.8, y: 30, opacity: 0, ease: "power3.out" }, "-=0.6")
      .from(".social-media a", { duration: 0.8, scale: 0, opacity: 0, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.6")
      .from(".home-img .img-box", { duration: 1.5, scale: 0.8, opacity: 0, ease: "power3.out" }, "-=1");

    // Section Headings
    gsap.utils.toArray(".heading").forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: "top 90%",
            },
            duration: 1,
            y: 30,
            opacity: 0,
            ease: "power3.out"
        });
    });

    // Cards reveal
    const cards = gsap.utils.toArray(".services-box, .portfolio-box, .skills-box, .card");
    cards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
            },
            duration: 0.8,
            y: 40,
            opacity: 0,
            ease: "power3.out",
            delay: (i % 3) * 0.1
        });
    });

    // Floating animation for home image container
    gsap.to(".home-img", {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Project Detail Page Animations
    if (document.querySelector(".project-header")) {
        gsap.to(".project-header", { duration: 0.8, y: 0, opacity: 1, ease: "power3.out", delay: 0.2 });
        gsap.to(".project-description", { duration: 0.8, y: 0, opacity: 1, ease: "power3.out", delay: 0.3 });
        gsap.to(".hero-img-container", { duration: 1, scale: 1, opacity: 1, ease: "back.out(1.2)", delay: 0.4 });
        
        gsap.utils.toArray(".project-section").forEach((section, i) => {
            gsap.to(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                },
                duration: 0.8,
                y: 0,
                opacity: 1,
                ease: "power3.out",
                delay: i * 0.1
            });
        });

        // Animate progress bars in metrics
        gsap.utils.toArray(".progress-bar").forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: "top 95%",
                },
                width: bar.style.width,
                duration: 1.5,
                ease: "power2.out"
            });
            // Reset width to 0 for initial state if not already handled by CSS
            bar.style.width = "0";
        });
    }

    // Process Timeline Animation (Home Page)
    const lifecycleItems = document.querySelectorAll(".lifecycle-item");
    const homeProgressFill = document.querySelector(".lifecycle-container .progress-fill");

    if (lifecycleItems.length > 0 && homeProgressFill) {
        ScrollTrigger.create({
            trigger: ".lifecycle-container",
            start: "top 80%",
            onEnter: () => {
                // Animate items
                lifecycleItems.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add("visible");
                    }, i * 150);
                });

                // Animate progress line
                homeProgressFill.style.height = "100%";
            },
            once: true
        });
    }

    // Project Detail Timeline Animation
    const detailTimelineItems = document.querySelectorAll(".detail-timeline-item");
    const detailProgressFill = document.querySelector(".detail-timeline .progress-fill");

    if (detailTimelineItems.length > 0) {
        ScrollTrigger.create({
            trigger: ".project-detail-section",
            start: "top 80%",
            onEnter: () => {
                // Animate detail timeline items
                detailTimelineItems.forEach((item, i) => {
                    setTimeout(() => {
                        item.classList.add("visible");
                    }, i * 200);
                });

                // Animate detail progress line
                if (detailProgressFill) {
                    detailProgressFill.style.height = "100%";
                }
            },
            once: true
        });
    }
}

/*========== Tilt.js initialization ==========*/
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".services-box, .portfolio-box"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

/*========== scroll reveal ==========*/
// Disabled in favor of GSAP
/*
if (typeof ScrollReveal !== 'undefined') {
    ...
}
*/

/*========== phone carousel ==========*/
/*========== phone carousel ==========*/
const phoneCarousels = document.querySelectorAll('.phone-container');

phoneCarousels.forEach(carousel => {
    const phoneImages = carousel.querySelectorAll('.phone-screen img');
    // Select buttons within this specific carousel container
    // We expect the HTML to use classes: .nav-btn.prev and .nav-btn.next
    // Or we can try to find them by their position or generic class if we update HTML nicely.
    // Let's assume we update HTML to have specific classes for prev/next or just rely on order.
    // But modifying existing HTML to have 'prev' and 'next' classes is cleaner.
    // For now, let's look for .nav-btn and distinguish them.
    const buttons = carousel.querySelectorAll('.nav-btn');
    const prevBtn = buttons[0]; // Assuming first button is prev
    const nextBtn = buttons[1]; // Assuming second button is next

    if (phoneImages.length > 0) {
        let currentImageIndex = 0;

        function showImage(index) {
            phoneImages.forEach(img => img.classList.remove('active'));
            phoneImages[index].classList.add('active');
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                currentImageIndex = (currentImageIndex + 1) % phoneImages.length;
                showImage(currentImageIndex);
            };
        }

        if (prevBtn) {
            prevBtn.onclick = () => {
                currentImageIndex = (currentImageIndex - 1 + phoneImages.length) % phoneImages.length;
                showImage(currentImageIndex);
            };
        }
    }
});
