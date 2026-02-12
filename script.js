const resumeBtn = document.getElementById("resumeBtn");
const toast = document.getElementById("toast");
const countEl = document.getElementById("resumeCount");
const toggle = document.getElementById("theme-toggle");

/* ===== Resume Download Counter ===== */
let count = localStorage.getItem("resumeCount") || 0;
countEl.textContent = `(${count})`;

resumeBtn.addEventListener("click", () => {
  count++;
  localStorage.setItem("resumeCount", count);
  countEl.textContent = `(${count})`;

  toast.classList.add("show");

  const link = document.createElement("a");
  link.href = "assets/Ashok_Varma_Resume.pdf";
  link.download = "Ashok_Varma_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => toast.classList.remove("show"), 2000);
});

/* ===== Dark Mode ===== */
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* ===== Scroll Animations ===== */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".animate, .animate-item").forEach(el => {
  observer.observe(el);
});

/* ===== PROJECT MODAL LOGIC ===== */

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalTech = document.getElementById("modalTech");
  const modalLink = document.getElementById("modalLink");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".card.project").forEach(card => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.description;
      modalTech.textContent = card.dataset.tech;
      modalLink.href = card.dataset.link;

      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});
