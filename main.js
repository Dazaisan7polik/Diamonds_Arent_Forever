// Shared helpers
function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

// Mobile navigation
function initMobileNav() {
  const nav = qs("#primaryNav");
  const toggle = qs("#navToggle");
  if (!nav || !toggle) return;

  const toggleNav = () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
  };

  toggle.addEventListener("click", toggleNav);

  // Close when clicking a link (mobile)
  qsa(".nav-link", nav).forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
    })
  );
}

// Like buttons with pulse animation
function initLikeButtons() {
  const likeButtons = qsa(".like-btn");
  if (!likeButtons.length) return;

  likeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const countSpan = qs("span", btn);
      const icon = qs("i", btn);
      const isLiked = btn.classList.toggle("is-liked");

      if (countSpan) {
        const current = parseInt(countSpan.textContent || "0", 10) || 0;
        countSpan.textContent = isLiked ? current + 1 : Math.max(current - 1, 0);
      }

      if (icon) {
        icon.classList.toggle("fa-regular", !isLiked);
        icon.classList.toggle("fa-solid", isLiked);
      }

      btn.classList.remove("like-pulse");
      // Trigger reflow to restart animation
      // eslint-disable-next-line no-unused-expressions
      void btn.offsetWidth;
      btn.classList.add("like-pulse");
    });
  });
}

// Board filters and sort
function initBoardFilters() {
  const grid = qs("#boardGrid");
  const filterRow = qs("#filterRow");
  const sortSelect = qs("#sortSelect");
  const stats = qs("#boardStats");
  if (!grid || !filterRow || !sortSelect || !stats) return;

  const cards = qsa(".board-card", grid);

  function updateStats() {
    const visibleCount = cards.filter(
      (card) => card.style.display !== "none"
    ).length;
    stats.textContent = `Showing ${visibleCount} announcement${
      visibleCount === 1 ? "" : "s"
    }`;
  }

  function applyFilter(filter) {
    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const show = filter === "all" || category === filter;
      card.style.display = show ? "" : "none";
    });
    updateStats();
  }

  function applySort(mode) {
    const sorted = [...cards].sort((a, b) => {
      if (mode === "most-liked") {
        const aLikes = parseInt(a.getAttribute("data-likes") || "0", 10);
        const bLikes = parseInt(b.getAttribute("data-likes") || "0", 10);
        return bLikes - aLikes;
      }
      if (mode === "category") {
        const aCat = (a.getAttribute("data-category") || "").localeCompare(
          b.getAttribute("data-category") || ""
        );
        return aCat;
      }
      // newest by date
      const aDate = new Date(a.getAttribute("data-date") || 0);
      const bDate = new Date(b.getAttribute("data-date") || 0);
      return bDate.getTime() - aDate.getTime();
    });

    sorted.forEach((card) => grid.appendChild(card));
  }

  filterRow.addEventListener("click", (event) => {
    const target = event.target.closest(".filter-btn");
    if (!target) return;
    const filter = target.getAttribute("data-filter") || "all";

    qsa(".filter-btn", filterRow).forEach((btn) =>
      btn.classList.toggle("is-active", btn === target)
    );

    applyFilter(filter);
  });

  sortSelect.addEventListener("change", () => {
    applySort(sortSelect.value);
  });

  // Initial state
  applyFilter("all");
  applySort(sortSelect.value);
}

// Add-post form
function initAddPostForm() {
  const form = qs("#postForm");
  if (!form) return;

  const description = qs("#description", form);
  const charCounter = qs("#charCounter", form);
  const priorityInput = qs("#priority", form);
  const priorityPills = qsa(".priority-pill", form);
  const submitBtn = qs("#submitBtn", form);
  const status = qs("#formStatus", form);
  const alertBox = qs("#formAlert", form);

  if (description && charCounter) {
    const max = parseInt(description.getAttribute("maxlength") || "0", 10) || 0;
    const updateCount = () => {
      const current = description.value.length;
      charCounter.textContent = `${current} / ${max} characters`;
      charCounter.classList.toggle("char-limit", current >= max);
    };
    description.addEventListener("input", updateCount);
    updateCount();
  }

  if (priorityPills.length && priorityInput) {
    priorityPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const value = pill.getAttribute("data-priority") || "normal";
        priorityInput.value = value;

        priorityPills.forEach((p) => {
          p.classList.remove("is-active-normal", "is-active-high");
        });

        pill.classList.add(
          value === "high" ? "is-active-high" : "is-active-normal"
        );
      });
    });
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.classList.toggle("is-loading", isLoading);
    submitBtn.disabled = isLoading;
  }

  function setAlert(type, message) {
    if (!alertBox) return;
    alertBox.classList.remove("hidden", "alert-success", "alert-error");
    alertBox.classList.add(type === "success" ? "alert-success" : "alert-error");
    alertBox.textContent = message;
  }

  function clearAlert() {
    if (!alertBox) return;
    alertBox.classList.add("hidden");
    alertBox.textContent = "";
  }

  function validate() {
    clearAlert();
    let isValid = true;

    const requiredFields = ["title", "category", "description", "author"];
    requiredFields.forEach((name) => {
      const field = qs(`#${name}`, form);
      if (!field) return;
      field.classList.remove("input-error");
      if (!field.value.trim()) {
        field.classList.add("input-error");
        isValid = false;
      }
    });

    if (!isValid) {
      status.classList.remove("form-status-success");
      status.classList.add("form-status-error");
      status.textContent = "Please fill in all required fields.";
      setAlert("error", "Some required fields are missing. Check the highlighted fields.");
    } else {
      status.classList.remove("form-status-error");
      status.classList.add("form-status-success");
      status.textContent = "Looks good. Submit when you’re ready.";
    }

    return isValid;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      alert("Please complete the required fields before submitting.");
      return;
    }

    setLoading(true);
    clearAlert();

    setTimeout(() => {
      setLoading(false);
      setAlert("success", "Your announcement was submitted successfully! (Demo only)");
      alert("Announcement submitted! (This is a demo — no data is actually saved.)");
      form.reset();
      if (description && charCounter) {
        description.value = "";
        const max = parseInt(description.getAttribute("maxlength") || "0", 10) || 0;
        charCounter.textContent = `0 / ${max} characters`;
        charCounter.classList.remove("char-limit");
      }
      priorityInput.value = "normal";
      priorityPills.forEach((p) =>
        p.classList.toggle(
          "is-active-normal",
          p.getAttribute("data-priority") === "normal"
        )
      );
      priorityPills.forEach((p) =>
        p.classList.toggle(
          "is-active-high",
          p.getAttribute("data-priority") === "high" && false
        )
      );
      status.classList.remove("form-status-error");
      status.classList.add("form-status-success");
      status.textContent = "Form reset. You can submit another announcement.";
    }, 900);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initLikeButtons();
  initBoardFilters();
  initAddPostForm();
});

