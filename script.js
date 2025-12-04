// ===== STARFIELD ANIMATION =====
const starfieldCanvas = document.getElementById('starfield');
const starfieldCtx = starfieldCanvas.getContext('2d');
const galaxyCanvas = document.getElementById('galaxy');
const galaxyCtx = galaxyCanvas.getContext('2d');

// Set canvas sizes
function resizeCanvas() {
    starfieldCanvas.width = window.innerWidth;
    starfieldCanvas.height = window.innerHeight;
    galaxyCanvas.width = window.innerWidth;
    galaxyCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star class for twinkling stars
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * starfieldCanvas.width;
        this.y = Math.random() * starfieldCanvas.height;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random();
        this.twinkleSpeed = Math.random() * 0.02 + 0.01;
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
        // Twinkling effect
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity <= 0 || this.opacity >= 1) {
            this.twinkleDirection *= -1;
        }

        // Slow drift
        this.y += this.speed;
        if (this.y > starfieldCanvas.height) {
            this.y = 0;
            this.x = Math.random() * starfieldCanvas.width;
        }
    }

    draw() {
        starfieldCtx.save();
        starfieldCtx.globalAlpha = this.opacity;
        starfieldCtx.fillStyle = '#ffffff';
        starfieldCtx.shadowBlur = 3;
        starfieldCtx.shadowColor = '#ffffff';
        starfieldCtx.beginPath();
        starfieldCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        starfieldCtx.fill();
        starfieldCtx.restore();
    }
}

// Shooting star class
class ShootingStar {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * starfieldCanvas.width;
        this.y = Math.random() * starfieldCanvas.height / 2;
        this.length = Math.random() * 80 + 40;
        this.speed = Math.random() * 10 + 15;
        this.size = Math.random() * 1 + 1;
        this.opacity = 1;
        this.angle = Math.PI / 4; // 45 degrees
        this.active = false;
    }

    update() {
        if (!this.active) return;

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.015;

        if (this.opacity <= 0 || this.x > starfieldCanvas.width || this.y > starfieldCanvas.height) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;

        starfieldCtx.save();
        starfieldCtx.globalAlpha = this.opacity;

        const gradient = starfieldCtx.createLinearGradient(
            this.x, this.y,
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#667eea');
        gradient.addColorStop(1, 'transparent');

        starfieldCtx.strokeStyle = gradient;
        starfieldCtx.lineWidth = this.size;
        starfieldCtx.lineCap = 'round';

        starfieldCtx.beginPath();
        starfieldCtx.moveTo(this.x, this.y);
        starfieldCtx.lineTo(
            this.x - Math.cos(this.angle) * this.length,
            this.y - Math.sin(this.angle) * this.length
        );
        starfieldCtx.stroke();
        starfieldCtx.restore();
    }

    launch() {
        this.reset();
        this.active = true;
    }
}

// Galaxy particle class
class GalaxyParticle {
    constructor(centerX, centerY) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.reset();
    }

    reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 300 + 50;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.002 + 0.001;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = this.getGalaxyColor();
    }

    getGalaxyColor() {
        const colors = [
            'rgba(102, 126, 234, ',
            'rgba(118, 75, 162, ',
            'rgba(240, 147, 251, ',
            'rgba(79, 172, 254, ',
            'rgba(138, 43, 226, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.angle += this.speed;

        // Spiral effect
        this.radius += Math.sin(this.angle * 2) * 0.5;

        if (this.radius > 400) {
            this.radius = 50;
        }
    }

    draw() {
        const x = this.centerX + Math.cos(this.angle) * this.radius;
        const y = this.centerY + Math.sin(this.angle) * this.radius;

        galaxyCtx.save();
        galaxyCtx.globalAlpha = this.opacity;
        galaxyCtx.fillStyle = this.color + this.opacity + ')';
        galaxyCtx.shadowBlur = 5;
        galaxyCtx.shadowColor = this.color + '0.8)';
        galaxyCtx.beginPath();
        galaxyCtx.arc(x, y, this.size, 0, Math.PI * 2);
        galaxyCtx.fill();
        galaxyCtx.restore();
    }
}

// Create stars and particles
const stars = Array.from({ length: 200 }, () => new Star());
const shootingStars = Array.from({ length: 5 }, () => new ShootingStar());
const galaxyParticles = Array.from({ length: 150 }, () =>
    new GalaxyParticle(galaxyCanvas.width / 2, galaxyCanvas.height / 2)
);

// Randomly trigger shooting stars
setInterval(() => {
    const inactiveStar = shootingStars.find(s => !s.active);
    if (inactiveStar && Math.random() > 0.7) {
        inactiveStar.launch();
    }
}, 1000);

// Animation loop
function animateStarfield() {
    starfieldCtx.clearRect(0, 0, starfieldCanvas.width, starfieldCanvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    shootingStars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animateStarfield);
}

function animateGalaxy() {
    galaxyCtx.clearRect(0, 0, galaxyCanvas.width, galaxyCanvas.height);

    // Update galaxy center based on window size
    const centerX = galaxyCanvas.width / 2;
    const centerY = galaxyCanvas.height / 2;

    galaxyParticles.forEach(particle => {
        particle.centerX = centerX;
        particle.centerY = centerY;
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateGalaxy);
}

animateStarfield();
animateGalaxy();

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(29, 29, 31, 0.95)';
    } else {
        nav.style.background = 'rgba(29, 29, 31, 0.8)';
    }
});

// Hero section animations
gsap.from('.hero-greeting', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
});

gsap.from('.hero-name', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out'
});

gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out'
});

gsap.from('.hero-cta', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.6,
    ease: 'power3.out'
});

// Floating cards animation
gsap.from('.floating-card', {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    stagger: 0.2,
    delay: 0.8,
    ease: 'back.out(1.7)'
});

// Section title animations
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
});

// Section line animations
gsap.utils.toArray('.section-line').forEach(line => {
    gsap.from(line, {
        scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        scaleX: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// About section animations
gsap.from('.about-description', {
    scrollTrigger: {
        trigger: '.about-content',
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

gsap.from('.stat-item', {
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

gsap.from('.about-contact', {
    scrollTrigger: {
        trigger: '.about-contact',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
});

// Skills section animations
gsap.utils.toArray('.skill-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Animate skill progress bars
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const progressBar = card.querySelector('.progress-bar');
            const progressFill = card.querySelector('.progress-fill');
            const progress = progressBar.dataset.progress;

            card.classList.add('animate');
            progressFill.style.width = progress + '%';

            // Animate the percentage number
            const label = card.querySelector('.progress-label');
            let currentProgress = 0;
            const interval = setInterval(() => {
                if (currentProgress >= progress) {
                    clearInterval(interval);
                } else {
                    currentProgress++;
                    label.textContent = currentProgress + '%';
                }
            }, 20);

            skillObserver.unobserve(card);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Projects section animations
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
    });
});

// Contact section animations
gsap.from('.contact-description', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
});

gsap.from('.contact-method', {
    scrollTrigger: {
        trigger: '.contact-methods',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
});

// Footer animation
gsap.from('.footer-content', {
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
});

// Parallax effect for gradient orbs
gsap.to('.orb-1', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 200,
    rotation: 45,
    ease: 'none'
});

gsap.to('.orb-2', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: -150,
    rotation: -30,
    ease: 'none'
});

gsap.to('.orb-3', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 100,
    rotation: 60,
    ease: 'none'
});

// Cursor trail effect (optional premium feature)
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.6), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(trail);

    document.addEventListener('mousemove', (e) => {
        trail.style.left = e.clientX - 10 + 'px';
        trail.style.top = e.clientY - 10 + 'px';
    });
};

// Uncomment to enable cursor trail
// createCursorTrail();

// Add magnetic effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function (e) {
        gsap.to(this, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', function (e) {
        gsap.to(this, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(this, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', function (e) {
        gsap.to(this, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// Add tilt effect to cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        gsap.to(this, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000
        });
    });

    card.addEventListener('mouseleave', function (e) {
        gsap.to(this, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        z-index: 10000;
        transform-origin: left;
        transform: scaleX(0);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = scrolled / scrollHeight;
        progressBar.style.transform = `scaleX(${progress})`;
    });
};

createScrollProgress();

// Console message for developers
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cThis portfolio was built with ❤️ using HTML, CSS, and JavaScript with GSAP animations.', 'font-size: 14px; color: #764ba2;');
console.log('%cInterested in collaborating? Reach out to Ahmed Mandour!', 'font-size: 14px; color: #f093fb;');

// ===== GALLERY LIGHTBOX FUNCTIONALITY =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentImageIndex = 0;
const images = [
    { src: 'gallery-4.jpg', alt: 'Beach Sunset', title: 'Beach Sunset', description: 'Peaceful moment by the ocean' },
    { src: 'gallery-5.jpg', alt: 'Personal Photo', title: 'Behind the Scenes', description: 'Capturing the moment' }
];

// Open lightbox
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Update lightbox image
function updateLightboxImage() {
    const image = images[currentImageIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = `${image.title} - ${image.description}`;
}

// Navigate to previous image
function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

// Navigate to next image
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

// Event listeners for gallery items
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Event listeners for lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrevImage);
lightboxNext.addEventListener('click', showNextImage);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Gallery items scroll animation
gsap.utils.toArray('.gallery-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out'
    });
});
