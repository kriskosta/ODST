/**
 * HALO ODST - Interactive Homepage Script
 * Handles parallax scrolling, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initLoadingScreen();
    initParallax();
    initNavigation();
    initRain();
    initTicker();
    initSquadCarousel();
    initArsenalSelector();
    initScrollAnimations();
    initGlitchEffects();

    initLightbox();
    initScrollVideo();
    initZoomMask();
});

/**
 * Loading Screen
 */
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="visr-overlay">
            <div class="visr-corner top-left"></div>
            <div class="visr-corner top-right"></div>
            <div class="visr-corner bottom-left"></div>
            <div class="visr-corner bottom-right"></div>
        </div>
        <img src="images/halo-superintendent.gif" alt="Superintendent" class="loading-logo-gif">
        <div class="loading-bar">
            <div class="loading-progress"></div>
        </div>
        <div class="loading-text">>>INITIALIZING<<</div>
    `;
    document.body.prepend(loadingScreen);

    // Hide loading screen after animation
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
    }, 2500);
}

/**
 * Parallax Scrolling Effect
 */
function initParallax() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;

        parallaxBgs.forEach((bg) => {
            const section = bg.parentElement;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            // Only update if section is in view
            if (scrollY + window.innerHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                const relativeScroll = scrollY - sectionTop;
                const parallaxOffset = relativeScroll * 0.3;
                bg.style.transform = `translateY(${parallaxOffset}px)`;
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/**
 * Navigation Scroll Effects
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('#hero, .parallax-section');

    // Scroll detection for nav background
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });

        lastScroll = currentScroll;
    });

    // Smooth scroll for nav links
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Floating Particles Effect
 */
function initParticles() {
    const particleContainer = document.getElementById('heroParticles');
    if (!particleContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random positioning and animation
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 15;
    const delay = Math.random() * 10;

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(particle);
}

/**
 * Scroll-Driven Video Playback
 */
function initScrollVideo() {
    const section = document.querySelector('.scroll-video-section');
    const video = section ? section.querySelector('.scroll-video') : null;
    if (!section || !video) return;

    // On mobile, skip video init and use text fallback instead
    if (window.innerWidth <= 768) {
        initMobilePrologue();
        return;
    }

    let videoReady = false;
    let targetTime = 0;
    let currentTime = 0;
    let animating = false;
    let isVisible = false;
    const LERP_FACTOR_FAST = 0.25;
    const LERP_FACTOR_SLOW = 0.15;
    const SNAP_THRESHOLD = 0.02;

    // Only run scroll/animation logic when section is visible
    const visibilityObserver = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible && videoReady && video.duration) {
            targetTime = getScrollProgress() * video.duration;
            startAnimating();
        }
    }, { threshold: 0 });
    visibilityObserver.observe(section);

    video.addEventListener('loadedmetadata', () => {
        videoReady = true;
        video.pause();
        targetTime = getScrollProgress() * video.duration;
        currentTime = targetTime;
        video.currentTime = currentTime;
    });

    function getScrollProgress() {
        const rect = section.getBoundingClientRect();
        const scrollableDistance = section.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        return Math.max(0, Math.min(1, scrolled / scrollableDistance));
    }

    function animate() {
        if (!isVisible || !videoReady || !video.duration) {
            animating = false;
            return;
        }

        const diff = targetTime - currentTime;

        if (Math.abs(diff) < SNAP_THRESHOLD) {
            currentTime = targetTime;
            video.currentTime = currentTime;
            animating = false;
            return;
        }

        const factor = Math.abs(diff) > 0.5 ? LERP_FACTOR_FAST : LERP_FACTOR_SLOW;
        currentTime += diff * factor;
        if (Math.abs(currentTime - video.currentTime) > 0.016) {
            video.currentTime = currentTime;
        }

        requestAnimationFrame(animate);
    }

    function startAnimating() {
        if (!animating) {
            animating = true;
            requestAnimationFrame(animate);
        }
    }

    window.addEventListener('scroll', () => {
        if (!isVisible || !videoReady || !video.duration) return;
        targetTime = getScrollProgress() * video.duration;
        startAnimating();
    }, { passive: true });
}

/**
 * Mobile Prologue Text — fade-in on scroll
 */
function initMobilePrologue() {
    const lines = document.querySelectorAll('.prologue-line');
    if (!lines.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.3 });

    lines.forEach(line => observer.observe(line));
}

/**
 * WE ARE ODST - Zoom Mask Effect
 */
function initZoomMask() {
    const section = document.querySelector('.zoom-mask-section');
    if (!section) return;

    const textEl = section.querySelector('.zoom-mask-text');
    const video = section.querySelector('.zoom-mask-video');
    const fadeEl = section.querySelector('.zoom-mask-fade');
    if (!textEl || !video) return;

    // On mobile, mask is hidden — play video when visible, no zoom effect
    if (window.innerWidth <= 768) {
        const playVideo = () => video.play().catch(() => {});
        // Play/pause based on visibility (helps mobile autoplay restrictions)
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) playVideo();
                else video.pause();
            });
        }, { threshold: 0.25 });
        io.observe(section);
        // Also try on first user interaction as fallback
        document.addEventListener('touchstart', () => playVideo(), { once: true });
        return;
    }

    const MAX_SCALE = 25;
    let ticking = false;
    let isVisible = false;

    // Play/pause video based on visibility
    const visibilityObserver = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
        if (isVisible) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, { threshold: 0.1 });
    visibilityObserver.observe(section);

    function getScrollProgress() {
        const rect = section.getBoundingClientRect();
        const scrollableDistance = section.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        return Math.max(0, Math.min(1, scrolled / scrollableDistance));
    }

    function updateZoom() {
        const progress = getScrollProgress();
        const scale = 1 + progress * (MAX_SCALE - 1);

        // Fade out the mask starting at 80% progress, fully gone by 90%
        const fadeStart = 0.45;
        const fadeEnd = 0.55;
        let opacity = 1;
        if (progress >= fadeStart) {
            opacity = 1 - Math.min(1, (progress - fadeStart) / (fadeEnd - fadeStart));
        }

        // Show bottom fade as mask dissolves
        const fadeGradStart = 0.65;
        const fadeGradEnd = 0.9;
        let fadeOpacity = 0;
        if (progress >= fadeGradStart) {
            fadeOpacity = Math.min(1, (progress - fadeGradStart) / (fadeGradEnd - fadeGradStart));
        }

        textEl.style.transform = `scale(${scale})`;
        textEl.style.opacity = opacity;
        if (fadeEl) fadeEl.style.opacity = fadeOpacity;

        if (opacity <= 0) {
            textEl.classList.add('zoom-complete');
        } else {
            textEl.classList.remove('zoom-complete');
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!isVisible) return;
        if (!ticking) {
            requestAnimationFrame(updateZoom);
            ticking = true;
        }
    }, { passive: true });

    // Fallback autoplay on first user interaction
    document.addEventListener('click', () => {
        if (isVisible) video.play().catch(() => {});
    }, { once: true });

}

/**
 * Adventure Ticker Carousel
 */
function initTicker() {
    const carousel = document.getElementById('tickerCarousel');
    const track = document.getElementById('tickerTrack');
    const tickerText = document.querySelector('.ticker-text');
    const tickerLabel = document.querySelector('.ticker-label');
    const tickerTitle = document.querySelector('.ticker-title');
    const tickerDesc = document.querySelector('.ticker-desc');
    const tickerData = document.querySelectorAll('.ticker-data > div');

    if (!carousel || !track) return;

    const slides = track.querySelectorAll('.ticker-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isDragging = false;
    let startY = 0;
    let currentY = 0;
    let autoAdvanceInterval;

    // Use existing indicators container
    const indicatorsContainer = document.getElementById('tickerIndicators');
    if (indicatorsContainer) {
        slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `ticker-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Position slides initially
    updateSlidePositions();

    // Update slide positions based on current index
    function updateSlidePositions() {
        slides.forEach((slide, index) => {
            const relativePosition = getRelativePosition(index, currentIndex, totalSlides);
            slide.setAttribute('data-position', relativePosition);
        });

        // Update indicators
        const indicators = indicatorsContainer.querySelectorAll('.ticker-indicator');
        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === currentIndex);
        });

        // Update text content with transition
        updateTextContent();
    }

    function getRelativePosition(index, current, total) {
        let diff = index - current;

        // Handle wrapping
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        if (diff === 0) return 'active';
        if (diff === -1) return 'prev';
        if (diff === 1) return 'next';
        if (diff === -2 || diff === total - 2) return 'prev-2';
        if (diff === 2 || diff === -(total - 2)) return 'next-2';
        return 'hidden';
    }

    function updateTextContent() {
        if (!tickerData[currentIndex]) return;

        // Add transitioning class
        tickerText.classList.add('transitioning');

        setTimeout(() => {
            const data = tickerData[currentIndex];
            tickerLabel.textContent = data.getAttribute('data-label');
            tickerTitle.textContent = data.getAttribute('data-title');
            tickerDesc.textContent = data.getAttribute('data-desc');

            // Remove transitioning class
            tickerText.classList.remove('transitioning');
        }, 200);
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex >= totalSlides) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        updateSlidePositions();
        resetAutoAdvance();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Auto-advance
    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoAdvance() {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
        // Only restart if not hovering
        if (!isHovering) {
            startAutoAdvance();
        }
    }

    // Track hover state (defined before use)
    let isHovering = false;

    startAutoAdvance();

    // Drag/swipe functionality
    carousel.addEventListener('mousedown', handleDragStart);
    carousel.addEventListener('touchstart', handleDragStart, { passive: true });

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('touchmove', handleDragMove, { passive: true });

    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);

    function handleDragStart(e) {
        isDragging = true;
        startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
        carousel.style.cursor = 'grabbing';
        clearInterval(autoAdvanceInterval);
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    }

    function handleDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';

        const diff = startY - currentY;
        const threshold = 50;

        if (diff > threshold) {
            nextSlide();
        } else if (diff < -threshold) {
            prevSlide();
        }

        resetAutoAdvance();
    }

    // Click on slides to navigate
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (index !== currentIndex) {
                goToSlide(index);
            }
        });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        isHovering = true;
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
    });

    carousel.addEventListener('mouseleave', () => {
        isHovering = false;
        if (!isDragging) {
            startAutoAdvance();
        }
    });

    // Also pause when hovering over the text area
    if (tickerText) {
        tickerText.addEventListener('mouseenter', () => {
            isHovering = true;
            clearInterval(autoAdvanceInterval);
            autoAdvanceInterval = null;
        });

        tickerText.addEventListener('mouseleave', () => {
            isHovering = false;
            if (!isDragging) {
                startAutoAdvance();
            }
        });
    }

    // Mouse wheel support with debounce to prevent skipping
    let wheelTimeout = null;
    let isWheelLocked = false;

    carousel.addEventListener('wheel', (e) => {
        e.preventDefault();

        // Prevent rapid scrolling from skipping slides
        if (isWheelLocked) return;

        isWheelLocked = true;

        if (e.deltaY > 0) {
            nextSlide();
        } else if (e.deltaY < 0) {
            prevSlide();
        }

        // Lock wheel input for a short period to prevent skipping
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            isWheelLocked = false;
        }, 500);
    }, { passive: false });
}

/**
 * Rain Effect for Story Section
 */
function initRain() {
    const rainContainer = document.getElementById('rain');
    if (!rainContainer) return;

    const raindrops = 100;

    for (let i = 0; i < raindrops; i++) {
        createRaindrop(rainContainer);
    }
}

function createRaindrop(container) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';

    const left = Math.random() * 100;
    const duration = Math.random() * 1 + 0.5;
    const delay = Math.random() * 3;
    const height = Math.random() * 20 + 10;

    drop.style.cssText = `
        left: ${left}%;
        height: ${height}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    container.appendChild(drop);
}

/**
 * Squad Carousel
 */
function initSquadCarousel() {
    const carousel = document.getElementById('squadCarousel');
    const prevBtn = document.getElementById('prevMember');
    const nextBtn = document.getElementById('nextMember');
    const dotsContainer = document.getElementById('carouselDots');

    if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

    const members = carousel.querySelectorAll('.squad-member');
    let currentIndex = 0;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let isHovering = false;

    // Create dots
    members.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        const memberWidth = members[0].offsetWidth + 32; // Including gap
        carousel.scrollTo({
            left: currentIndex * memberWidth,
            behavior: 'smooth'
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update active member styling
        members.forEach((member, index) => {
            member.classList.toggle('active', index === currentIndex);
        });
    }

    function updateIndexFromScroll() {
        const memberWidth = members[0].offsetWidth + 32;
        const newIndex = Math.round(carousel.scrollLeft / memberWidth);
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < members.length) {
            currentIndex = newIndex;
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            // Update active member styling
            members.forEach((member, index) => {
                member.classList.toggle('active', index === currentIndex);
            });
        }
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % members.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + members.length) % members.length;
        updateCarousel();
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Drag to scroll functionality
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        carousel.classList.add('dragging');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        clearInterval(autoAdvance);
    });

    carousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            carousel.classList.remove('dragging');
            updateIndexFromScroll();
        }
        if (!isHovering) {
            startAutoAdvance();
        }
    });

    carousel.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            carousel.classList.remove('dragging');
            updateIndexFromScroll();
        }
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    carousel.addEventListener('touchstart', (e) => {
        isDragging = true;
        carousel.classList.add('dragging');
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        clearInterval(autoAdvance);
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        isDragging = false;
        carousel.classList.remove('dragging');
        updateIndexFromScroll();
        if (!isHovering) {
            startAutoAdvance();
        }
    });

    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    }, { passive: true });

    // Auto-advance carousel
    let autoAdvance;

    function startAutoAdvance() {
        autoAdvance = setInterval(nextSlide, 5000);
    }

    startAutoAdvance();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        isHovering = true;
        clearInterval(autoAdvance);
    });

    carousel.addEventListener('mouseleave', () => {
        isHovering = false;
        if (!isDragging) {
            startAutoAdvance();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
}

/**
 * Arsenal Weapon Selector
 */
function initArsenalSelector() {
    const weaponIcons = document.querySelectorAll('.weapon-icon');
    const weaponData = document.querySelectorAll('.weapon-data > div');
    const weaponInfo = document.querySelector('.weapon-info');
    const weaponImageContainer = document.querySelector('.weapon-image-container');

    if (!weaponIcons.length || !weaponData.length || !weaponInfo || !weaponImageContainer) return;

    // Preload all weapon images to prevent slow loading when switching
    const preloadedImages = {};
    weaponData.forEach(data => {
        const imageSrc = data.getAttribute('data-image');
        if (imageSrc) {
            const img = new Image();
            img.src = imageSrc;
            preloadedImages[imageSrc] = img;
        }
    });

    // Get elements to update
    const categoryEl = weaponInfo.querySelector('.weapon-category');
    const nameEl = weaponInfo.querySelector('.weapon-name');
    const taglineEl = weaponInfo.querySelector('.weapon-tagline');
    const descEl = weaponInfo.querySelector('.weapon-desc');
    const imageEl = weaponImageContainer.querySelector('.weapon-detail-image');
    const statFills = weaponInfo.querySelectorAll('.stat-fill');

    weaponIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const weaponId = icon.getAttribute('data-weapon');

            // Update active state
            weaponIcons.forEach(i => i.classList.remove('active'));
            icon.classList.add('active');

            // Find weapon data
            const data = document.querySelector(`.weapon-data > div[data-weapon="${weaponId}"]`);
            if (!data) return;

            // Animate out
            weaponInfo.style.opacity = '0';
            weaponInfo.style.transform = 'translateX(-20px)';
            imageEl.style.opacity = '0';
            imageEl.style.transform = 'scale(0.9)';

            // Update content after brief delay
            setTimeout(() => {
                categoryEl.textContent = data.getAttribute('data-category');
                nameEl.textContent = data.getAttribute('data-name');
                taglineEl.textContent = data.getAttribute('data-tagline');
                descEl.textContent = data.getAttribute('data-desc');
                imageEl.src = data.getAttribute('data-image');
                imageEl.alt = data.getAttribute('data-name');

                // Update stats
                const damage = data.getAttribute('data-damage');
                const range = data.getAttribute('data-range');
                const firerate = data.getAttribute('data-firerate');
                const accuracy = data.getAttribute('data-accuracy');

                if (statFills[0]) statFills[0].style.width = damage + '%';
                if (statFills[1]) statFills[1].style.width = range + '%';
                if (statFills[2]) statFills[2].style.width = firerate + '%';
                if (statFills[3]) statFills[3].style.width = accuracy + '%';

                // Animate in
                setTimeout(() => {
                    weaponInfo.style.opacity = '1';
                    weaponInfo.style.transform = 'translateX(0)';
                    imageEl.style.opacity = '1';
                    imageEl.style.transform = 'scale(1)';
                }, 50);
            }, 200);
        });
    });

    // Add transition styles
    weaponInfo.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    imageEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .gear-item, .section-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'visible');
                // Add staggered animation delay for multiple elements
                const siblings = entry.target.parentElement.querySelectorAll('.glass-card, .gear-item');
                siblings.forEach((sibling, index) => {
                    sibling.style.transitionDelay = `${index * 0.1}s`;
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el) => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/**
 * Glitch Effect on Hover
 */
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.hero-title .title-line-2');

    glitchElements.forEach((el) => {
        el.setAttribute('data-text', el.textContent);

        el.addEventListener('mouseenter', () => {
            el.classList.add('glitch');
            setTimeout(() => el.classList.remove('glitch'), 500);
        });
    });

    // Random glitch effect
    setInterval(() => {
        glitchElements.forEach((el) => {
            if (Math.random() > 0.95) {
                el.classList.add('glitch');
                setTimeout(() => el.classList.remove('glitch'), 200);
            }
        });
    }, 3000);
}


/**
 * Notification Toast
 */
function showNotification(message, color = 'var(--color-primary)') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(10, 10, 12, 0.95);
        border: 1px solid ${color};
        padding: 1rem 2rem;
        font-family: 'Orbitron', sans-serif;
        font-size: 0.8rem;
        letter-spacing: 0.2em;
        color: ${color};
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

/**
 * Mouse Trail Effect (Optional Easter Egg)
 */
let mouseTrailEnabled = false;
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            enableMouseTrail();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function enableMouseTrail() {
    if (mouseTrailEnabled) return;
    mouseTrailEnabled = true;

    showNotification('SPARTAN LASER ACTIVATED', '#ff3333');

    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #ff3333;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${e.clientX - 4}px;
            top: ${e.clientY - 4}px;
            box-shadow: 0 0 10px #ff3333;
            transition: all 0.5s ease;
        `;
        document.body.appendChild(trail);

        requestAnimationFrame(() => {
            trail.style.transform = 'scale(0)';
            trail.style.opacity = '0';
        });

        setTimeout(() => trail.remove(), 500);
    });
}

/**
 * Button Ripple Effect
 */
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-enlist').forEach((btn) => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/**
 * Typewriter Effect for Hero Tagline
 */
function typewriterEffect() {
    const tagline = document.querySelector('.hero-tagline');
    if (!tagline) return;

    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';

    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            // Add blinking cursor
            tagline.innerHTML += '<span class="cursor">|</span>';
        }
    }, 100);
}

// Add cursor animation
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor {
        animation: blink 1s step-end infinite;
    }
    @keyframes blink {
        50% { opacity: 0; }
    }
`;
document.head.appendChild(cursorStyle);

// Initialize typewriter after loading screen
setTimeout(typewriterEffect, 3000);

/**
 * Smooth Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #153146, #60a3be);
        z-index: 10001;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / scrollHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

initScrollProgress();

console.log('%c ODST ', 'background: #ffd700; color: #0a0a0c; font-family: "Orbitron", sans-serif; font-size: 24px; font-weight: 900; padding: 10px 20px;');
console.log('%c Feet first into hell. ', 'color: #888899; font-family: "Rajdhani", sans-serif; font-size: 14px;');
console.log('%c Try the Konami Code for a surprise! ', 'color: #ff3333; font-family: "Rajdhani", sans-serif; font-size: 12px;');

/**
 * Lightbox Gallery
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Collect all gallery images
    const galleryItems = document.querySelectorAll('[data-lightbox="gallery"]');
    let currentImageIndex = 0;
    let images = [];

    // Build images array
    galleryItems.forEach((item, index) => {
        const img = item.tagName === 'IMG' ? item : item.querySelector('img');
        if (img) {
            images.push({
                src: img.src,
                alt: img.alt
            });

            // Add click listener
            item.addEventListener('click', () => {
                currentImageIndex = index;
                openLightbox();
            });
        }
    });

    function openLightbox() {
        if (images.length === 0) return;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex].src;
        lightboxImage.alt = images[currentImageIndex].alt;
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Close on background click
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
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        if (!lightbox.classList.contains('active')) return;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) < swipeThreshold) return;

        if (swipeDistance < 0) {
            // Swiped left - next image
            nextImage();
        } else {
            // Swiped right - previous image
            prevImage();
        }
    }
}
