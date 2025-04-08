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
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const responseBox = document.getElementById("responseMessage");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault(); // ✋ Prevent HTML form from submitting

    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://email-sender-1-mpwz.onrender.com/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ name, email, message }),
      });

      const data = await response.text();

      if (response.ok) {
        responseBox.innerText = data;

        responseBox.classList.add("show");
        setTimeout(() => {
          responseBox.classList.remove("show");
          responseBox.innerText = "";
        }, 5000);

        responseBox.style.color = "lightgreen";
      } else {
        responseBox.innerText = `Failed to send: ${data}`;
        responseBox.style.color = "red";
        responseBox.classList.add("show");
      }

      form.reset();
      setTimeout(() => (responseBox.innerText = ""), 5000);
    } catch (err) {
      responseBox.innerText = "Something went wrong. Try again later.";
      responseBox.style.color = "red";
      console.error("Error submitting form:", err);
    }
  });
});
window.addEventListener("load", createParticles);