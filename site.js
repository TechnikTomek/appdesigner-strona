// ─────────────────────────────────────────────────────────────
//  USTAWIENIA STRONY – zmień tylko tutaj
// ─────────────────────────────────────────────────────────────
const SITE = {
  // Link do zakupu z Lemon Squeezy (Products → Share → Checkout URL)
  buyUrl: "",
  // Kontakt: e-mail (np. "mailto:kontakt@twojadomena.pl") albo inny link
  contactUrl: "https://github.com/TechnikTomek/appdesigner-strona/issues",
  contactLabel: "formularz zgłoszeń na GitHub",
  // Sprzedawca (imię i nazwisko lub nazwa firmy)
  seller: "TechnikTomek",
};

// Uzupełnij dane w treści stron
document.querySelectorAll("[data-seller]").forEach((el) => (el.textContent = SITE.seller));
document.querySelectorAll("[data-contact]").forEach((el) => {
  if (el.dataset.contact === "label") el.textContent = SITE.contactLabel;
  el.href = SITE.contactUrl;
});
document.querySelectorAll("[data-buy]").forEach((el) => {
  if (SITE.buyUrl) {
    el.href = SITE.buyUrl;
  } else {
    el.setAttribute("aria-disabled", "true");
    el.textContent = "Sprzedaż rusza wkrótce";
  }
});
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// Karty z podglądem aplikacji
document.querySelectorAll(".tabs button").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach((x) => x.classList.toggle("on", x === b));
    document.querySelectorAll(".shot").forEach((s) => s.classList.toggle("on", s.dataset.shot === b.dataset.shot));
  }),
);

// Wejścia sekcji przy przewijaniu
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Delikatne pochylenie ramki z aplikacją za kursorem
const frame = document.querySelector(".frame");
if (frame && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  frame.addEventListener("mousemove", (e) => {
    const r = frame.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    frame.style.transform = `rotateX(${-y * 4}deg) rotateY(${x * 5}deg)`;
  });
  frame.addEventListener("mouseleave", () => (frame.style.transform = ""));
}
