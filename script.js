// Smooth scroll for in-page links with subtle offset for the sticky header
document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href === "#") return;

  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();

  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 0;
  const rect = target.getBoundingClientRect();
  const offsetTop = rect.top + window.pageYOffset - headerHeight - 12;

  window.scrollTo({
    top: offsetTop,
    behavior: "smooth",
  });
});

// Lightweight client-side validation + message for the application form
const form = document.getElementById("apply-form");
const messageEl = document.getElementById("form-message");

if (form && messageEl) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    messageEl.textContent = "";
    messageEl.classList.remove("error", "success");

    const requiredFields = Array.from(
      form.querySelectorAll("[required]")
    );

    const invalid = requiredFields.find((field) => {
      return !field.value || !String(field.value).trim();
    });

    if (invalid) {
      invalid.focus();
      messageEl.textContent =
        "Please fill in all required fields before submitting.";
      messageEl.classList.add("error");
      return;
    }

    form.reset();
    messageEl.textContent =
      "Thank you. Your request has been recorded. We’ll reply within a few days.";
    messageEl.classList.add("success");
  });
}

