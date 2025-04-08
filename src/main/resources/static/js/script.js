// Smooth scrolling for nav links using event delegation
document.addEventListener("click", (e) => {
    const target = e.target.closest("a[href^='#']");
    if (target) {
        e.preventDefault();
        const targetElement = document.querySelector(target.getAttribute("href"));
        targetElement?.scrollIntoView({ behavior: "smooth" });
    }
});
const video = document.getElementById('myVideo');
  if (navigator.userAgent.includes('Firefox')) {
    video.removeAttribute('playsinline'); // Optional fallback behavior
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
}, { threshold: 0.1 });

document.querySelectorAll(".section").forEach((section) => observer.observe(section));

// Lazy loading for images and videos
document.querySelectorAll("img, video").forEach((media) => {
    if ("loading" in HTMLImageElement.prototype) {
        media.setAttribute("loading", "lazy");
    } else {
        // Fallback for older browsers
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
        document.body.appendChild(script);
    }
});

// Click outside to close menu
document.addEventListener("click", (event) => {
    const navLinks = document.querySelector(".nav-links");
    const hamburger = document.querySelector(".hamburger");
    if (navLinks && hamburger && !navLinks.contains(event.target) && !hamburger.contains(event.target)) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    }
});

// Add loading state and hide loader
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    document.querySelector(".loader")?.classList.add("hidden");
});

// Contact form submission with fetch API
document.getElementById("contact-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = e.target.querySelector('input[name="name"]').value.trim();
    const email = e.target.querySelector('input[name="email"]').value.trim();
    const message = e.target.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/contact/send", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ name, email, message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
        document.getElementById("responseMessage").innerText = data;
        e.target.reset();
    } catch (error) {
        console.error("Error:", error);
    }
});

// Optional: Add particle animation
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

window.addEventListener("load", createParticles);
