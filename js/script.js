// js\script.js
// JavaScript for Jacob Portfolio Website

document.addEventListener("DOMContentLoaded", function () {
  // Navigation functionality
  initNavigation();

  // Service accordion functionality
  initServiceAccordion();

  // Mobile menu functionality
  initMobileMenu();

  // Smooth scrolling for anchor links
  initSmoothScrolling();

  // Testimonial slider
  initTestimonialSlider();

  // Load more functionality
  initLoadMore();

  // Initialize file upload
  initFileUpload();
});

// Navigation between sections
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");

  // Hide all sections initially
  sections.forEach((section) => section.classList.remove("active"));

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all nav links
      navLinks.forEach((nav) => nav.classList.remove("active"));

      // Add active class to clicked nav link
      this.classList.add("active");

      // Hide all sections
      sections.forEach((section) => section.classList.remove("active"));

      // Show target section
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active");
      }

      // Close mobile menu if open
  const sidebar = document.querySelector(".sidebar");
  const toggles = document.querySelectorAll(".mobile-menu-toggle");
  sidebar.classList.remove("open");
  toggles.forEach(btn => btn.innerHTML = "☰");
    });
  });
}

// Service accordion functionality
function initServiceAccordion() {
  const serviceItems = document.querySelectorAll(".service-item");

  serviceItems.forEach((item) => {
    const header = item.querySelector(".service-header");

    header.addEventListener("click", function () {
      // Close all other service items
      serviceItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const toggle = otherItem.querySelector(".service-toggle");
          toggle.textContent = "+";
        }
      });

      // Toggle current item
      item.classList.toggle("active");
      const toggle = item.querySelector(".service-toggle");
      toggle.textContent = item.classList.contains("active") ? "−" : "+";
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  // Create mobile menu toggle button
  const mobileToggle = document.createElement("button");
  mobileToggle.className = "mobile-menu-toggle";
  mobileToggle.innerHTML = "☰";
  mobileToggle.setAttribute("aria-label", "Toggle mobile menu");
  document.body.appendChild(mobileToggle);

  const sidebar = document.querySelector(".sidebar");

  mobileToggle.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    this.innerHTML = sidebar.classList.contains("open") ? "✕" : "☰";
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
      sidebar.classList.remove("open");
      mobileToggle.innerHTML = "☰";
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href.length <= 1) return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Contact form handling
function initContactForm() {
  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = this.querySelector('input[placeholder="NAME"]').value;
      const email = this.querySelector('input[placeholder="EMAIL"]').value;
      const message = this.querySelector(
        'textarea[placeholder="MESSAGE"]'
      ).value;

      // Basic validation
      if (!name || !email || !message) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Simulate form submission
      const submitBtn = this.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        showNotification(
          "Thank you! Your message has been sent successfully.",
          "success"
        );
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#4CAF50"
            : type === "error"
            ? "#f44336"
            : "#2196F3"
        };
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideInRight 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-in";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Testimonial slider functionality
function initTestimonialSlider() {
  const testimonials = [
    {
      quote:
        "File storage made easy – including powerful features you won't find anywhere else. Whether you're",
      author: "Larry Diamond",
      position: "Chief Executive Officer, Besnik",
    },
    {
      quote:
        "Jacob's design skills are exceptional. He delivered exactly what we needed for our project.",
      author: "Sarah Johnson",
      position: "Marketing Director, TechCorp",
    },
    {
      quote:
        "Professional, creative, and reliable. I highly recommend Jacob for any design project.",
      author: "Michael Chen",
      position: "Founder, StartupXYZ",
    },
  ];

  let currentTestimonial = 0;
  const testimonialCard = document.querySelector(".testimonial-card");
  const prevBtn = document.querySelector(".nav-prev");
  const nextBtn = document.querySelector(".nav-next");

  if (testimonialCard && prevBtn && nextBtn) {
    function updateTestimonial() {
      const testimonial = testimonials[currentTestimonial];
      const blockquote = testimonialCard.querySelector("blockquote");
      const cite = testimonialCard.querySelector("cite");

      if (blockquote && cite) {
        blockquote.textContent = `"${testimonial.quote}"`;
        cite.innerHTML = `<strong>~${testimonial.author}</strong><br>${testimonial.position}`;
      }
    }

    prevBtn.addEventListener("click", function () {
      currentTestimonial =
        (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      updateTestimonial();
    });

    nextBtn.addEventListener("click", function () {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial();
    });

    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      updateTestimonial();
    }, 5000);
  }
}

// Load more functionality
function initLoadMore() {
  const loadMoreBtns = document.querySelectorAll(".load-more");

  loadMoreBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const originalText = this.textContent;
      this.textContent = "Loading...";
      this.disabled = true;

      // Simulate loading more content
      setTimeout(() => {
        showNotification("More content loaded successfully!", "success");
        this.textContent = originalText;
        this.disabled = false;
      }, 1500);
    });
  });
}

// File upload functionality
function initFileUpload() {
  const fileUpload = document.querySelector(".file-upload");

  if (fileUpload) {
    // Create hidden file input
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.style.display = "none";
    fileInput.accept = ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png";

    fileUpload.appendChild(fileInput);

    fileUpload.addEventListener("click", function () {
      fileInput.click();
    });

    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const fileName = file.name;
        const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
        fileUpload.innerHTML = `📎 ${fileName} (${fileSize}MB)`;
        showNotification(
          `File "${fileName}" attached successfully!`,
          "success"
        );
      }
    });
  }
}

// Add CSS animations for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        transition: all 0.3s ease;
    }
    
    .notification:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.3) !important;
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out";
        entry.target.style.opacity = "1";
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  const animateElements = document.querySelectorAll(
    ".project-item, .blog-post, .service-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
}

// Initialize scroll animations
document.addEventListener("DOMContentLoaded", function () {
  initScrollAnimations();
});

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const sidebar = document.querySelector(".sidebar");
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      if (mobileToggle) {
        mobileToggle.innerHTML = "☰";
      }
    }
  }

  // Arrow keys for testimonial navigation
  if (e.key === "ArrowLeft") {
    const prevBtn = document.querySelector(".nav-prev");
    if (prevBtn && document.activeElement.closest(".testimonial-section")) {
      prevBtn.click();
    }
  }

  if (e.key === "ArrowRight") {
    const nextBtn = document.querySelector(".nav-next");
    if (nextBtn && document.activeElement.closest(".testimonial-section")) {
      nextBtn.click();
    }
  }
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
  const imageElements = document.querySelectorAll(
    ".project-image, .blog-image, .hero-person, .profile-image"
  );

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Add loaded class for any additional styling
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  imageElements.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", function () {
  initLazyLoading();
});

// Theme switching functionality (bonus feature)
function initThemeSwitch() {
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = "🌙";
  themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: var(--primary-bg);
        color: var(--text-white);
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: var(--transition);
        box-shadow: var(--shadow-md);
    `;

  document.body.appendChild(themeToggle);

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    this.innerHTML = document.body.classList.contains("dark-theme")
      ? "☀️"
      : "🌙";
  });
}

// Initialize theme switch
document.addEventListener("DOMContentLoaded", function () {
  initThemeSwitch();
});
