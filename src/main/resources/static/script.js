// Smooth scrolling for nav links using event delegation
document.addEventListener("click", (e) => {
    const target = e.target.closest("a[href^='#']");
    if (target) {
        e.preventDefault();
        const targetElement = document.querySelector(target.getAttribute("href"));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

            // Close mobile nav if open
            const hamburger = document.querySelector(".hamburger");
            const navItems = document.querySelector(".nav-items");
            if (window.innerWidth <= 768) {
                hamburger?.classList.remove("active");
                navItems?.classList.remove("active");
                hamburger?.setAttribute("aria-expanded", "false");
            }
        }
    }
});

// Firefox video inline fix
const video = document.getElementById('myVideo');
if (video && navigator.userAgent.includes('Firefox')) {
    video.removeAttribute('playsinline');
    video.muted = true; // ensure autoplay works in Firefox
}

// Toggle hamburger menu
document.querySelector(".hamburger")?.addEventListener("click", function () {
    const navItems = document.querySelector(".nav-items");
    const expanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !expanded);
    this.classList.toggle("active");
    navItems?.classList.toggle("active");
});

// Scroll-triggered animations using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".section").forEach((section) => observer.observe(section));

// Lazy loading for images and videos
function lazyLoadMedia() {
    const media = document.querySelectorAll("img, video");
    if ("loading" in HTMLImageElement.prototype) {
        media.forEach((el) => el.setAttribute("loading", "lazy"));
    } else {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
        document.body.appendChild(script);
    }
}
lazyLoadMedia();

// Click outside to close menu
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });

        if (window.innerWidth <= 768) {
            const hamburger = document.querySelector(".hamburger");
            const navItems = document.querySelector(".nav-items");
            hamburger?.classList.remove("active");
            navItems?.classList.remove("active");
            hamburger?.setAttribute("aria-expanded", "false");
        }
    });
});


// Add loading state and hide loader
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    document.querySelector(".loader")?.classList.add("hidden");
    createParticles();
});

// Particle animation
function createParticles() {
    const particlesContainer = document.querySelector(".particles");
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            Object.assign(particle.style, {
                position: "absolute",
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: "rgba(0, 255, 255, 0.5)",
                borderRadius: "50%",
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                animation: `particleMove ${Math.random() * 5 + 5}s infinite linear, fadeIn 0.5s ease-in`,
            });
            particlesContainer.appendChild(particle);
        }
    }
}

// Contact Form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const responseBox = document.getElementById("responseMessage");

    form?.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            submitBtn.disabled = true;

            const response = await fetch("https://email-sender-73cw.onrender.com/api/contact/send", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ name, email, message }),
            });

            const data = await response.text();

            responseBox.innerText = data;
            responseBox.classList.add("show");
            responseBox.style.color = response.ok ? "lightgreen" : "red";

            if (response.ok) {
                form.reset();
                setTimeout(() => {
                    responseBox.classList.remove("show");
                    responseBox.innerText = "";
                }, 5000);
            }

        } catch (err) {
            responseBox.innerText = "Something went wrong. Try again later.";
            responseBox.style.color = "red";
            console.error("Error submitting form:", err);
        } finally {
            submitBtn.disabled = false;
            setTimeout(() => {
                responseBox.classList.remove("show");
                responseBox.innerText = "";
            }, 5000);
        }
    });
});

// Optional: Theme toggle (insert a button with id="theme-toggle" somewhere to activate this)
const themeToggle = document.getElementById("theme-toggle");
themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
