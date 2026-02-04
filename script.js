document.addEventListener('DOMContentLoaded', () => {
    // 0. Neural Preloader Logic
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderProgress = document.querySelector('.loader-progress');
    const loaderStatus = document.querySelector('.loader-status');
    
    // Typing Effect Logic
    const typeText = document.querySelector('.type-text');
    const roles = [
        "IT Specialist",
        "Marketing Professional",
        "Automation Expert",
        "System Builder",
        "AutoCAD Drafter"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typeText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    // 3D Parallax Hero Image
    const heroVisual = document.querySelector('.parallax-wrapper');
    window.addEventListener('mousemove', (e) => {
        if (!heroVisual) return;
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        heroVisual.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    let progress = 0;
    const statuses = [
        "BOOTING KERNEL...",
        "LOADING ASSETS...",
        "ESTABLISHING NEURAL NETWORK...",
        "OPTIMIZING UI...",
        "SYSTEM READY."
    ];

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loaderProgress.style.width = `${progress}%`;
        
        // Update status text based on progress
        const statusIndex = Math.floor((progress / 100) * (statuses.length - 1));
        loaderStatus.textContent = statuses[statusIndex];

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loaderWrapper.classList.add('loader-finish');
                // Trigger hero animation after loader
                document.querySelector('.hero-image').classList.add('animate-pop');
            }, 500);
        }
    }, 150);

    // 1. Mobile Menu Logic
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // 2. Dark/Light Mode Logic
    const themeBtn = document.getElementById('theme-btn');
    const html = document.documentElement;
    const themeIcon = themeBtn.querySelector('i');

    themeBtn.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'dark') {
            html.setAttribute('data-theme', 'light');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    // 3. Custom Interactive Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Smooth outline follow
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor Hover Effect
    const links = document.querySelectorAll('a, button, .project-card, .pillar');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        link.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // 4. Hero Particle System
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 80) * (canvas.width / 80)
    };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = '#6366f1';
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius + this.size) {
                if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 10;
                if (mouse.x > this.x && this.x > this.size * 10) this.x -= 10;
                if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 10;
                if (mouse.y > this.y && this.y > this.size * 10) this.y -= 10;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 3) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 2) - 1;
            let directionY = (Math.random() * 2) - 1;
            let color = '#6366f1';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height / 80) * (canvas.width / 80));
        init();
    });

    init();
    animate();

    // 5. 3D Tilt & Magnetic Button Effect
    const tiltElements = document.querySelectorAll('.project-card, .pillar, .stat-card, .resume-item');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;

            // Magnetic Button Logic
            const btn = el.querySelector('.project-btn');
            if (btn) {
                const btnRect = btn.getBoundingClientRect();
                const btnCenterX = btnRect.left + btnRect.width / 2;
                const btnCenterY = btnRect.top + btnRect.height / 2;
                const distH = e.clientX - btnCenterX;
                const distV = e.clientY - btnCenterY;
                
                btn.style.transform = `translate(${distH * 0.3}px, ${distV * 0.3}px)`;
            }
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            const btn = el.querySelector('.project-btn');
            if (btn) btn.style.transform = `translate(0, 0)`;
        });
    });

    // 6. Skill Bar Animation on Scroll
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress-line span');
    const percentageTexts = document.querySelectorAll('.skill-percentage');

    function animateCounters() {
        percentageTexts.forEach(text => {
            const target = +text.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
                const increment = target / 50;
                if (count < target) {
                    count += increment;
                    text.innerText = Math.ceil(count) + '%';
                    setTimeout(updateCount, 20);
                } else {
                    text.innerText = target + '%';
                }
            };
            updateCount();
        });
    }

    const observerOptions = { threshold: 0.5 };
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
                animateCounters();
                skillObserver.unobserve(skillsSection);
            }
        });
    }, observerOptions);

    if (skillsSection) skillObserver.observe(skillsSection);

    // 7. Project Modal Logic
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalChallenge = document.getElementById('modal-challenge');
    const modalSolution = document.getElementById('modal-solution');
    const modalTags = document.getElementById('modal-tags');
    const closeModal = document.querySelector('.close-modal');

    const projectData = {
        'AutoCAD Shopdrawings': {
            img: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2070&auto=format&fit=crop',
            tags: ['AutoCAD', 'Technical Drafting', 'Bidding'],
            challenge: 'Developing ultra-precise technical shopdrawings for high-stakes public biddings where a 1mm error could disqualify the proposal.',
            solution: 'Leveraged advanced AutoCAD layers and block systems to create standardized, error-free drafting templates that increased production speed by 40%.'
        },
        'Marketing Brochures': {
            img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
            tags: ['Photoshop', 'Branding', 'Marketing'],
            challenge: 'The company needed to transition from basic flyers to premium-grade marketing assets to compete in the high-end corporate market.',
            solution: 'Utilized professional Photoshop techniques and high-resolution layout designs to create a consistent brand identity that doubled client inquiry rates.'
        },
        'Excel Automation': {
            img: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop',
            tags: ['VBA', 'Macros', 'Data Analysis'],
            challenge: 'Managing thousands of technical quotations manually was causing significant delays and pricing errors in the bidding process.',
            solution: 'Engineered a custom internal system using VBA macros and complex Excel formulas that automated 80% of the quotation workflow, ensuring 100% price accuracy.'
        }
    };

    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectTitle = btn.closest('.project-card').querySelector('h3').innerText;
            const data = projectData[projectTitle];

            if (data) {
                modalTitle.innerText = projectTitle;
                modalImg.src = data.img;
                modalChallenge.innerText = data.challenge;
                modalSolution.innerText = data.solution;
                modalTags.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                
                modal.style.display = 'block';
                setTimeout(() => modal.classList.add('active'), 10);
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 400);
    });

    // 8. Contact Section Interactions
    const copyEmail = document.querySelector('.copy-email');
    const emailText = document.getElementById('email-text');
    const copyBadge = document.querySelector('.copy-badge');

    if (copyEmail) {
        copyEmail.addEventListener('click', () => {
            navigator.clipboard.writeText(emailText.innerText);
            copyBadge.innerText = 'Copied!';
            copyBadge.style.color = '#10b981';
            setTimeout(() => {
                copyBadge.innerText = 'Click to copy';
                copyBadge.style.color = 'var(--primary-color)';
            }, 2000);
        });
    }

    // Magnetic Social Icons
    const socials = document.querySelectorAll('.mag-social');
    socials.forEach(soc => {
        soc.addEventListener('mousemove', (e) => {
            const rect = soc.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            soc.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
        });
        soc.addEventListener('mouseleave', () => {
            soc.style.transform = `translate(0, 0)`;
        });
    });

    // 9. Tilt Effect for new elements
    const newTiltEl = document.querySelectorAll('.tilt-el');
    newTiltEl.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
        });
    });

    // 10. Scroll Progress & Parallax BG
    const scrollProgress = document.querySelector('.scroll-progress');
    const pShapes = document.querySelectorAll('.p-shape');

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollProgress) scrollProgress.style.width = `${scrolled}%`;

        // Deep Parallax BG Logic
        pShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.08; // Slightly slower for smoother flow
            const yPos = (window.scrollY * speed);
            // Add subtle horizontal drift for more life
            const xPos = Math.sin(window.scrollY * 0.001 + index) * 20;
            shape.style.transform = `translate(${xPos}px, ${yPos * 0.4}px) rotate(${window.scrollY * 0.01}deg)`;
        });
    });

    // 11. IT Command Terminal Logic
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalWindow = document.querySelector('.terminal-window');
    const minimizeBtn = document.querySelector('.t-btn.yellow');
    const closeBtn = document.querySelector('.t-btn.red');
    const terminalHeader = document.querySelector('.terminal-header');

    // Dragging Logic
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    if (terminalHeader) {
        terminalHeader.addEventListener("mousedown", dragStart);
        window.addEventListener("mousemove", drag);
        window.addEventListener("mouseup", dragEnd);
    }

    function dragStart(e) {
        if (terminalWindow.classList.contains('minimized')) return;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === terminalHeader) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, terminalWindow);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    if (terminalWindow) {
        terminalWindow.addEventListener('click', () => {
            if (terminalWindow.classList.contains('minimized')) {
                terminalWindow.classList.remove('minimized');
                // Reset position when expanding to ensure it's visible
                xOffset = 0;
                yOffset = 0;
                terminalWindow.style.transform = "none";
            } else {
                terminalInput.focus();
            }
        });

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                terminalWindow.classList.add('minimized');
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                terminalWindow.style.opacity = '0';
                setTimeout(() => terminalWindow.style.display = 'none', 500);
            });
        }
    }

    // 13. Resume Reveal Animation
    const resumeItems = document.querySelectorAll('.resume-item');
    const resumeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });

    resumeItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease-out';
        resumeObserver.observe(item);
    });

    // 14. Visitor Counter & Intelligence System
    const TELEGRAM_TOKEN = '8260349239:AAE-0dqVR-TFPUxGSynC5w1s_2o7Dg_2IJM';
    const CHAT_ID = '5543161340';

    async function sendTelegramAlert(message) {
        try {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=Markdown`);
        } catch (e) {
            console.log("Telegram Error:", e);
        }
    }

    async function initIntelligence() {
        const counterEl = document.getElementById('view-count');
        const getDevice = () => {
            const ua = navigator.userAgent;
            if (/android/i.test(ua)) return "Android Phone";
            if (/iPhone|iPad|iPod/i.test(ua)) return "iPhone/iOS";
            if (/windows/i.test(ua)) return "Windows PC";
            if (/macintosh/i.test(ua)) return "MacBook/Mac";
            return "Desktop/Other";
        };

        let realCount = "Syncing...";
        const device = getDevice();

        try {
            const countRes = await fetch('https://api.counterapi.dev/v1/xxivam_portfolio/visits/up');
            const countData = await countRes.json();
            realCount = countData.count;
            if (counterEl) counterEl.innerText = realCount.toLocaleString();
        } catch (e) {
            if (counterEl) counterEl.innerText = 'Online';
        }

        try {
            const geoRes = await fetch('https://ipapi.co/json/');
            const geoData = await geoRes.json();
            const location = `${geoData.city}, ${geoData.country_name}`;
            
            sendTelegramAlert(`🚀 *New Visitor Detected!*\n📍 Location: ${location}\n📱 Device: ${device}\n📈 Total Views: ${realCount}`);
        } catch (e) {}

        return realCount;
    }

    const totalViews = initIntelligence();

    // 15. Real-Time Activity Tracking
    // Track Resume Download
    document.querySelector('a[download]')?.addEventListener('click', () => {
        sendTelegramAlert(`📄 *Resume Downloaded!* Someone just grabbed your CV.`);
    });

    // Track Form Submissions
    const contactForm = document.getElementById('main-form');
    contactForm?.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const msg = document.getElementById('message').value;
        sendTelegramAlert(`📩 *New Contact Form Submission!*\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${msg}`);
    });

    // Update Terminal to Log Commands
    // (Inside the terminal keyboard listener)
    if (terminalInput) {
        terminalInput.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                const input = terminalInput.value.toLowerCase().trim();
                if(input !== '') {
                    sendTelegramAlert(`⌨️ *Terminal Command:* \`${input}\``);
                }
                // ... rest of the existing terminal logic
                
                if (input === 'status') {
                    const views = await totalViews;
                    response = `SYSTEM STATUS: Online | PORTFOLIO_VIEWS: ${views} | SECURITY: Active`;
                }

                if (response === 'CLEAR') {
                    terminalOutput.innerHTML = '';
                } else {
                    const line = document.createElement('div');
                    line.className = 't-line';
                    line.innerHTML = `<span class="t-prompt">mavi@it-system:~$</span> ${input}`;
                    terminalOutput.appendChild(line);
                    
                    const resLine = document.createElement('div');
                    resLine.className = 't-line';
                    resLine.style.color = 'var(--primary-color)';
                    resLine.innerText = response;
                    terminalOutput.appendChild(resLine);
                }
                
                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    // 12. Image Comparison Slider
    const compareSlider = document.getElementById('compare-slider');
    const foregroundImg = document.querySelector('.foreground-img');
    const sliderButton = document.querySelector('.slider-button');

    if (compareSlider) {
        compareSlider.addEventListener('input', (e) => {
            const sliderValue = e.target.value;
            foregroundImg.style.width = `${sliderValue}%`;
            sliderButton.style.left = `${sliderValue}%`;
        });
    }
});
