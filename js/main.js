// ===== GLOBAL VARIABLES =====
let audioPlaying = false;
let currentTheme = 'default';
let diyaCount = 0;

// ===== DOM ELEMENTS =====
const elements = {
    loader: document.querySelector('.loader-wrapper'),
    audioBtn: document.getElementById('audioBtn'),
    bgMusic: document.getElementById('bgMusic'),
    userGreeting: document.getElementById('userGreeting'),
    dynamicQuote: document.getElementById('dynamicQuote'),
    lightDiyaBtn: document.getElementById('lightDiyaBtn'),
    diyaContainer: document.getElementById('diyaContainer'),   
    fireworksBtn: document.getElementById('fireworksBtn'),
    nameInput: document.getElementById('nameInput'),
    personalizeBtn: document.getElementById('personalizeBtn'),
    themeBtn: document.getElementById('themeBtn')
};

// ===== QUOTES ARRAY =====
const diwaliQuotes = [
    "May the divine light of Diwali spread peace, prosperity, happiness and good health to everyone.",
    "Let each diya you light bring a glow of happiness on your face and enlighten your soul.",
    "May the festival of lights brighten up your life with happiness, prosperity and success.",
    "This Diwali, may you be blessed with good fortune, wealth, and prosperity.",
    "May the beauty of Diwali fill your home with happiness and may the coming year be full of joy.",
    "Wishing you a Diwali sparkling with joy and glowing with warmth.",
    "May millions of lamps illuminate your life with joy, prosperity, health and wealth forever.",
    "Let's celebrate the festival in the true sense by spreading joy and lighting up the world of others."
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        elements.loader.classList.add('fade-out');
    }, 2000);

    initializeParticles();
    initializeGreeting();
    initializeQuote();
    initializeCountdown();
    initializeEventListeners();
    initializeAOS();
    initializeGSAPAnimations();
});

// ===== PARTICLES JS CONFIGURATION =====
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#FFD700', '#FFA500', '#FF6B35']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#FFD700',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ===== GREETING INITIALIZATION =====
function initializeGreeting() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    
    if (name) {
        elements.userGreeting.textContent = `Dear ${name},`;
        elements.userGreeting.style.display = 'block';
        
        // Animate name appearance
        gsap.from(elements.userGreeting, {
            duration: 1.5,
            scale: 0,
            opacity: 0,
            ease: "elastic.out(1, 0.5)",
            delay: 2.5
        });
    }
}

// ===== QUOTE INITIALIZATION =====
function initializeQuote() {
    const randomQuote = diwaliQuotes[Math.floor(Math.random() * diwaliQuotes.length)];
    elements.dynamicQuote.textContent = randomQuote;
    
    // Change quote every 10 seconds
    setInterval(() => {
        const newQuote = diwaliQuotes[Math.floor(Math.random() * diwaliQuotes.length)];
        gsap.to(elements.dynamicQuote, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                elements.dynamicQuote.textContent = newQuote;
                gsap.to(elements.dynamicQuote, {
                    opacity: 1,
                    duration: 0.5
                });
            }
        });
    }, 10000);
}

// ===== COUNTDOWN TIMER =====
function initializeCountdown() {
    // Set next Diwali date (update yearly)
    const diwaliDate = new Date('2024-11-01T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = diwaliDate - now;
        
        if (distance < 0) {
            document.querySelector('.countdown-section').innerHTML = 
                '<h2 class="text-center gradient-text">🎆 Happy Diwali! 🎆</h2>';
            launchCelebration();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== EVENT LISTENERS =====
function initializeEventListeners() {
    // Audio Control
    elements.audioBtn.addEventListener('click', toggleAudio);
    
    // Light Diya Button
    elements.lightDiyaBtn.addEventListener('click', lightVirtualDiya);
    
    // Fireworks Button
    elements.fireworksBtn.addEventListener('click', launchFireworks);
    
    // Personalize Button
    elements.personalizeBtn.addEventListener('click', personalizeGreeting);
    
    // Enter key for personalization
    elements.nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            personalizeGreeting();
        }
    });
    
    // Theme Switcher
    elements.themeBtn.addEventListener('click', toggleTheme);
}

// ===== AUDIO FUNCTIONS =====
function toggleAudio() {
    if (audioPlaying) {
        elements.bgMusic.pause();
        elements.audioBtn.classList.remove('playing');
        audioPlaying = false;
    } else {
        elements.bgMusic.play().then(() => {
            elements.audioBtn.classList.add('playing');
            audioPlaying = true;
        }).catch(error => {
            console.log('Audio playback failed:', error);
            // Try alternative audio source
            elements.bgMusic.src = 'https://cdn.pixabay.com/audio/2022/10/25/audio_4d69573b2e.mp3';
            elements.bgMusic.play().catch(e => console.log('Alternative audio also failed:', e));
        });
    }
}

// ===== VIRTUAL DIYA FUNCTIONS =====
function lightVirtualDiya() {
    if (diyaCount < 9) {
        const diya = document.createElement('span');
        diya.className = 'virtual-diya';
        diya.textContent = '🪔';
        diya.style.animationDelay = `${Math.random() * 2}s`;
        
        elements.diyaContainer.appendChild(diya);
        diyaCount++;
        
        // Animate diya appearance
        gsap.from(diya, {
            scale: 0,
            rotation: 360,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
        
        // Add click to remove
        diya.addEventListener('click', function() {
            gsap.to(this, {
                scale: 0,
                rotation: -360,
                duration: 0.5,
                onComplete: () => {
                    this.remove();
                    diyaCount--;
                }
            });
        });
        
        if (diyaCount === 9) {
            setTimeout(launchCelebration, 500);
        }
    }
}

// ===== FIREWORKS FUNCTIONS =====
function launchFireworks() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#FFD700', '#FFA500', '#FF6B35', '#FF1744', '#D500F9']
        }));
        
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#FFD700', '#FFA500', '#FF6B35', '#FF1744', '#D500F9']
        }));
    }, 250);
}

// ===== CELEBRATION FUNCTION =====
function launchCelebration() {
    // Full screen confetti burst
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        colors: ['#FFD700', '#FFA500', '#FF6B35', '#8B008B', '#FF1744']
    };
    
    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }
    
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    
    fire(0.2, {
        spread: 60,
    });
    
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

// ===== PERSONALIZATION FUNCTION =====
function personalizeGreeting() {
    const name = elements.nameInput.value.trim();
    
    if (name) {
        // Update URL
        const newUrl = window.location.pathname + '?name=' + encodeURIComponent(name);
        window.history.pushState({}, '', newUrl);
        
        // Update greeting
        elements.userGreeting.textContent = `Dear ${name},`;
        elements.userGreeting.style.display = 'block';
        
        // Animate
        gsap.from(elements.userGreeting, {
            duration: 1,
            scale: 0,
            opacity: 0,
            ease: "elastic.out(1, 0.5)"
        });
        
        // Clear input
        elements.nameInput.value = '';
        
        // Celebration
        launchFireworks();
    }
}

// ===== THEME TOGGLE =====
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    
    gsap.to(elements.themeBtn, {
        rotation: 360,
        duration: 0.5,
        ease: "power2.inOut"
    });
}

// ===== SOCIAL SHARING =====
function shareOn(platform) {
    const url = window.location.href;
    const text = 'Wishing you a Happy Diwali! Check out this amazing greeting: ';
    
    const shareUrls = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        instagram: '#'
    };
    
    if (platform === 'instagram') {
        navigator.clipboard.writeText(url);
        alert('Link copied! Share it on Instagram.');
    } else {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// ===== AOS INITIALIZATION =====
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false
        });
    }
}

// ===== GSAP ANIMATIONS =====
function initializeGSAPAnimations() {
    // Floating animation for lanterns
    gsap.to('.lantern', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        ease: "power1.inOut"
    });
    
    // Continuous rotation for mandala
    gsap.to('.mandala-img', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });
    
    // Pulse animation for buttons on hover
    document.querySelectorAll('.btn-gradient').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// ===== MOBILE TOUCH INTERACTIONS =====
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        createSparkle(touch.clientX, touch.clientY);
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = '#FFD700';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    
    document.body.appendChild(sparkle);
    
    gsap.to(sparkle, {
        scale: 3,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => sparkle.remove()
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.5);
}

// ===== PAGE VISIBILITY API =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden && audioPlaying) {
        elements.bgMusic.pause();
    } else if (!document.hidden && audioPlaying) {
        elements.bgMusic.play();
    }
});