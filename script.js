const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

navSlide();
// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

const contactForm = document.getElementById('contact-form');
const successBox = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic Validation Check
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        let isValid = true;

        if (name.trim() === "") {
            document.getElementById('name-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('name-error').style.display = 'none';
        }

        // Simple Email Regex
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!email.match(emailPattern)) {
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('email-error').style.display = 'none';
        }

        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button');
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.style.display = 'none';
                successBox.style.display = 'block';
            }, 1500);
        }
    });
}

/* --- PDF Modal Logic --- */

// Modal aur Iframe ko select karo
const modal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");

// Function to Open Modal
function openPdfModal(pdfPath) {
    if (!pdfPath) {
        alert("PDF file not found!");
        return;
    }
    // PDF ka path set karo
    pdfFrame.src = pdfPath;
    // Modal dikhao
    modal.style.display = "block";
    // Body scroll band kar do taaki peeche ka page na hile
    document.body.style.overflow = "hidden";
}

// Function to Close Modal
function closePdfModal() {
    modal.style.display = "none";
    pdfFrame.src = ""; // Source hata do taaki next time refresh ho
    document.body.style.overflow = "auto"; // Scroll wapas chalu karo
}

// Window ke bahar click karne par bhi band ho jaye
window.onclick = function(event) {
    if (event.target == modal) {
        closePdfModal();
    }
}