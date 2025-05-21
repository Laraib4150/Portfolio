// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});

// Typing animation
const typingText = document.querySelector('.typing-text');
const text = "Software Developer";
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
    const currentText = text.substring(0, charIndex);
    typingText.textContent = currentText;

    if (!isDeleting && charIndex < text.length) {
        charIndex++;
        typingDelay = 100;
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        typingDelay = 50;
    }

    if (charIndex === text.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at the end
    } else if (charIndex === 0) {
        isDeleting = false;
        typingDelay = 500; // Pause before starting again
    }

    setTimeout(type, typingDelay);
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    setTimeout(type, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)'; // Semi-transparent white when scrolling down
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--primary-color)'; // Use the primary color background at the top
        navbar.style.boxShadow = 'none';
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("7lfdZ32DhAmpVEUx0"); // Replace with your EmailJS public key
})();

// Form submission handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = {
        from_name: contactForm.querySelector('input[type="text"]').value,
        from_email: contactForm.querySelector('input[type="email"]').value,
        message: contactForm.querySelector('textarea').value,
        to_email: 'laraibmomin057@gmail.com'
    };
    
    // Send email using EmailJS
    emailjs.send('service_416nqsi', 'template_naq0o36', formData)
        .then(function() {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        })
        .catch(function(error) {
            // Show error message
            alert('Sorry, there was an error sending your message. Please try again later.');
            console.error('EmailJS error:', error);
        })
        .finally(function() {
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-card, .timeline-item, .project-card').forEach(element => {
    observer.observe(element);
});

// Add hover effect to skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Active link highlighting based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    hero.style.backgroundPositionY = `${scroll * 0.5}px`;
}); 