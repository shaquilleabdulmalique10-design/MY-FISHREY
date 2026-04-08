(function () {
  // Dark Mode Logic
  const darkModeToggle = document.getElementById("darkModeToggle");
  const darkModeTextSpan = document.getElementById("darkModeText");
  const body = document.body;

  function setDarkMode(isDark) {
    if (isDark) {
      body.classList.add("dark");
      localStorage.setItem("aquaDarkMode", "enabled");
      if (darkModeTextSpan) darkModeTextSpan.innerText = "Light";
      if (darkModeToggle)
        darkModeToggle.innerHTML = '<i class="fas fa-sun me-1"></i> Light';
    } else {
      body.classList.remove("dark");
      localStorage.setItem("aquaDarkMode", "disabled");
      if (darkModeTextSpan) darkModeTextSpan.innerText = "Dark";
      if (darkModeToggle)
        darkModeToggle.innerHTML = '<i class="fas fa-moon me-1"></i> Dark';
    }
  }

  const savedMode = localStorage.getItem("aquaDarkMode");
  if (savedMode === "enabled") {
    setDarkMode(true);
  } else if (savedMode === "disabled") {
    setDarkMode(false);
  } else {
    // if system preference dark
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const isDark = body.classList.contains("dark");
      setDarkMode(!isDark);
    });
  }

  // Scroll animations
  const fadeElements = document.querySelectorAll(".fade-up");
  function checkFadeIn() {
    fadeElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add("visible");
      }
    });
  }
  window.addEventListener("scroll", checkFadeIn);
  window.addEventListener("resize", checkFadeIn);
  checkFadeIn();

  // Daily tips
  const tips = [
    "🐟 Tilapia can survive in low oxygen but grow best with aeration.",
    "🌊 Always quarantine new fish for at least 2 weeks to prevent disease outbreaks.",
    "🍽️ Feed your fish only what they can consume in 5 minutes to avoid water pollution.",
    "📏 Ideal pond depth for most species: 1.5–2 meters for temperature stability.",
    "🧪 Check ammonia levels weekly – high ammonia stresses fish & causes gill damage.",
    "🌿 Add natural probiotics to feed to boost immunity and reduce mortality.",
    "💧 Partial water change (20-30%) weekly maintains water quality in grow-out ponds.",
    "🐠 Catfish are nocturnal – best to feed them during late evening for efficiency.",
    "🛡️ Lime application before stocking kills pathogens and balances pH.",
    "🥇 Use floating pellets to monitor feeding behavior and reduce waste.",
  ];
  const tipParagraph = document.getElementById("dailyTip");
  const tipButton = document.getElementById("newTipBtn");
  function updateRandomTip() {
    if (tipParagraph) {
      const randomIndex = Math.floor(Math.random() * tips.length);
      tipParagraph.innerHTML = `<i class="fas fa-fish me-2"></i> ${tips[randomIndex]}`;
    }
  }
  if (tipParagraph) updateRandomTip();
  if (tipButton) {
    tipButton.addEventListener("click", () => {
      updateRandomTip();
      tipButton.style.transform = "scale(0.97)";
      setTimeout(() => {
        if (tipButton) tipButton.style.transform = "";
      }, 150);
    });
  }

  // Smooth scroll + close offcanvas
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        const offcanvasEl = document.getElementById("fisheryOffcanvas");
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (bsOffcanvas) bsOffcanvas.hide();
      }
    });
  });
})();
