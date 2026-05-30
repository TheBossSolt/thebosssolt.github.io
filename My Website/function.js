// ========== TYPING ANIMATION ==========
const typedTextElement = document.getElementById('typedText');
const phrases = [
    'Developer 🚀',
    'Researcher 📚',
    'Open Source Contributor 💙',
    'Problem Solver 🧩',
    'Achievement Hunter 🏆'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

// Start typing animation
typeEffect();

// ========== MOBILE MENU TOGGLE ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========== PROJECT DATA (Dynamic Loading) ==========
const projects = [
    {
        title: 'AI Accessibility Tool',
        description: 'Real-time sign language translation using computer vision and LLM assistance.',
        tags: ['Python', 'TensorFlow', 'React'],
        link: '#'
    },
    {
        title: 'Portfolio Generator',
        description: 'Open-source tool that automatically builds portfolio websites from GitHub profiles.',
        tags: ['Next.js', 'Tailwind', 'API'],
        link: '#'
    },
    {
        title: 'DataViz Library',
        description: 'Lightweight data visualization library with 500+ GitHub stars.',
        tags: ['D3.js', 'JavaScript', 'Canvas'],
        link: '#'
    },
    {
        title: 'Hackathon Platform',
        description: 'Platform that connected 10,000+ hackers during Global Hack Week.',
        tags: ['Node.js', 'Socket.io', 'MongoDB'],
        link: '#'
    },
    {
        title: 'Ethics in AI Research',
        description: 'Comprehensive framework for ethical LLM deployment in enterprise.',
        tags: ['Research', 'Policy', 'AI'],
        link: '#'
    },
    {
        title: 'Smart Home Dashboard',
        description: 'IoT dashboard with real-time sensor data visualization.',
        tags: ['Vue.js', 'MQTT', 'Chart.js'],
        link: '#'
    }
];

function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link">Learn More →</a>
            </div>
        </div>
    `).join('');
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', loadProjects);

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        formStatus.textContent = 'Sending...';
        formStatus.style.color = 'var(--primary)';
        
        // Simulate form submission (replace with actual API endpoint)
        setTimeout(() => {
            formStatus.textContent = '✨ Message sent successfully! I\'ll get back to you soon. ✨';
            formStatus.style.color = '#10b981';
            contactForm.reset();
            
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }, 1500);
    });
}

// ========== SCROLL REVEAL ANIMATION ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in effect to all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = 'var(--primary)';
        } else {
            item.style.color = '';
        }
    });
});

// ========== ADDITIONAL: VISITOR COUNTER (Local Storage Demo) ==========
function showVisitorCount() {
    let count = localStorage.getItem('portfolioVisitCount');
    if (count === null) {
        count = 1;
    } else {
        count = parseInt(count) + 1;
    }
    localStorage.setItem('portfolioVisitCount', count);
    
    // Optional: Display in console (or add to footer)
    console.log(`✨ You've visited this portfolio ${count} times ✨`);
}

showVisitorCount();

// ========== DARK MODE TOGGLE (Optional Enhancement) ==========
// Add this if you want a dark/light mode switch
function addDarkModeToggle() {
    const navbar = document.querySelector('.nav-container');
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.style.background = 'none';
    toggle.style.border = 'none';
    toggle.style.fontSize = '1.5rem';
    toggle.style.cursor = 'pointer';
    toggle.style.marginLeft = '1rem';
    toggle.title = 'Toggle Dark/Light Mode';
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        toggle.innerHTML = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
    });
    
    navbar.appendChild(toggle);
}

// Uncomment below to enable dark mode toggle
// addDarkModeToggle();

// Optional: Light mode CSS (add to styles.css if you enable)
/*
body.light-mode {
    --dark: #f8fafc;
    --light: #0f172a;
    --card-bg: #e2e8f0;
}
*/

console.log('🚀 Portfolio loaded! Customize the content in script.js and index.html');