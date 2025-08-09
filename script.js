// Smooth scrolling for nav links
    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll("button.filter-btn");
    const projectCards = document.querySelectorAll("[data-category]");

    filterButtons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.textContent.toLowerCase();

        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Scroll to top button show/hide
    const scrollBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.style.display = "flex";
      } else {
        scrollBtn.style.display = "none";
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.remove("font-bold", "text-[#7A85C1]"); // Updated class
              if (link.getAttribute("href").substring(1) === entry.target.id) {
                link.classList.add("font-bold", "text-[#7A85C1]"); // Updated class
              }
            });
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Contact form submission
    document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      const name = this.name.value;
      const messageBox = document.createElement("div");
      messageBox.className =
        "fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-xl z-50";
      messageBox.textContent = `Thank you, ${name}! Your message has been sent.`;
      document.body.appendChild(messageBox);

      setTimeout(() => messageBox.remove(), 3000);
      this.reset();
    });