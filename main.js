// Shared helpers
function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

const STORAGE_KEYS = {
  announcements: "cb:announcements",
  prefs: "cb:prefs",
  boardState: "cb:boardState",
  formDraft: "cb:addPostDraft",
  scroll: "cb:scroll"
};

const DEFAULT_PREFS = {
  lang: "en",
  theme: "auto"
};

const CATEGORIES = {
  "events": { badgeClass: "badge-blue", key: "categories.events" },
  "academics": { badgeClass: "badge-purple", key: "categories.academics" },
  "lost-found": { badgeClass: "badge-amber", key: "categories.lostFound" },
  "jobs": { badgeClass: "badge-green", key: "categories.jobs" },
  "for-sale": { badgeClass: "badge-amber", key: "categories.forSale" }
};

const TRANSLATIONS = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.board": "Board",
    "nav.addPost": "Add Post",
    "home.hero.title": "Stay in the loop on campus life.",
    "home.hero.body":
      "CampusBoard is your central hub for events, announcements, and opportunities. One clean board, everything that matters.",
    "home.hero.ctaPrimary": "View All Announcements",
    "home.hero.ctaSecondary": "Add New Post",
    "home.section.popularTitle": "Popular Announcements",
    "home.section.popularSubtitle":
      "Curated posts students are checking out right now.",
    "home.section.latestTitle": "Latest Announcements",
    "home.section.latestSubtitle":
      "Fresh posts from across campus, updated as new announcements are added.",
    "home.section.viewAll": "View All Announcements",
    "home.stats.boards": "Active boards",
    "home.stats.weekly": "Weekly posts",
    "home.stats.orgs": "Student orgs",
    "board.kicker": "Campus Board",
    "board.title": "All announcements in one place.",
    "board.subtitle":
      "Browse events, deadlines, and opportunities. Use filters to narrow down to what matters most to you.",
    "filters.all": "All",
    "filters.events": "Events",
    "filters.academics": "Academics",
    "filters.lostFound": "Lost & Found",
    "filters.jobs": "Jobs",
    "filters.forSale": "For Sale",
    "sort.label": "Sort by",
    "sort.newest": "Newest",
    "sort.mostLiked": "Most liked",
    "sort.category": "Category",
    "board.sidebar.tipsTitle": "Tips for posting",
    "board.sidebar.tagsTitle": "Popular tags",
    "board.sidebar.shareTitle": "Want to share something?",
    "board.sidebar.shareBody": "Post your own announcement in just a few steps.",
    "board.sidebar.shareCta": "Add a new post",
    "add.kicker": "Add announcement",
    "add.title": "Share an update with your campus.",
    "add.subtitle":
      "Use clear titles and categories so students can quickly understand what your announcement is about.",
    "form.title": "Title",
    "form.titleHint": "E.g. “Volunteer Tutoring Sign-ups”",
    "form.category": "Category",
    "form.categoryHint": "Where should this appear?",
    "form.categoryPlaceholder": "Select a category",
    "categories.events": "🎉 Events",
    "categories.academics": "📚 Academics",
    "categories.lostFound": "🔎 Lost & Found",
    "categories.jobs": "💼 Jobs",
    "categories.forSale": "🏷️ For Sale",
    "form.priority": "Priority",
    "form.priorityHint": "Use High for time-sensitive posts",
    "priority.normal": "Normal",
    "priority.default": "Default",
    "priority.high": "High",
    "priority.timeSensitive": "Time-sensitive",
    "form.description": "Description",
    "form.descriptionHint": "Include date, time, and location.",
    "form.author": "Your name",
    "form.authorHint": "How should we credit this post?",
    "form.contact": "Contact (email or link)",
    "form.contactHint": "Optional",
    "form.status.default": "Required fields are marked with",
    "form.status.invalid": "Please fill in all required fields.",
    "form.status.ready": "Looks good. Submit when you’re ready.",
    "form.status.reset": "Form reset. You can submit another announcement.",
    "form.submit": "Submit announcement",
    "form.clear": "Clear form",
    "form.errorRequired": "Some required fields are missing. Check the highlighted fields.",
    "form.successDemo":
      "Your announcement was submitted successfully! (Demo only)",
    "toast.added": "Announcement added (saved locally).",
    "toast.cleared": "Form cleared.",
    "toast.like": "You liked this announcement.",
    "toast.unlike": "You unliked this announcement.",
    "footer.team": "Our Team",
    "footer.announcements": "Announcements"
  },
  ru: {
    "nav.home": "Главная",
    "nav.about": "О сервисе",
    "nav.board": "Доска",
    "nav.addPost": "Добавить объявление",
    "home.hero.title": "Будь в курсе жизни кампуса.",
    "home.hero.body":
      "CampusBoard — это единая доска событий, объявлений и возможностей. Всё важное в одном месте.",
    "home.hero.ctaPrimary": "Все объявления",
    "home.hero.ctaSecondary": "Новое объявление",
    "home.section.popularTitle": "Популярные объявления",
    "home.section.popularSubtitle":
      "Подборка постов, которые сейчас просматривают студенты.",
    "home.section.latestTitle": "Свежие объявления",
    "home.section.latestSubtitle":
      "Новые сообщения со всего кампуса, обновляются по мере добавления.",
    "home.section.viewAll": "Смотреть все объявления",
    "home.stats.boards": "Активные доски",
    "home.stats.weekly": "Постов в неделю",
    "home.stats.orgs": "Студенческие организации",
    "board.kicker": "Доска кампуса",
    "board.title": "Все объявления в одном месте.",
    "board.subtitle":
      "Смотрите события, дедлайны и возможности. Фильтруйте по тому, что важно именно вам.",
    "filters.all": "Все",
    "filters.events": "События",
    "filters.academics": "Учёба",
    "filters.lostFound": "Бюро находок",
    "filters.jobs": "Работа",
    "filters.forSale": "Продажа",
    "sort.label": "Сортировать",
    "sort.newest": "Сначала новые",
    "sort.mostLiked": "По лайкам",
    "sort.category": "По категории",
    "board.sidebar.tipsTitle": "Как оформить объявление",
    "board.sidebar.tagsTitle": "Популярные теги",
    "board.sidebar.shareTitle": "Хотите что‑то объявить?",
    "board.sidebar.shareBody": "Опубликуйте объявление за пару шагов.",
    "board.sidebar.shareCta": "Добавить объявление",
    "add.kicker": "Новое объявление",
    "add.title": "Поделитесь новостью с кампусом.",
    "add.subtitle":
      "Формулируйте заголовок и категорию так, чтобы студент сразу понял суть объявления.",
    "form.title": "Заголовок",
    "form.titleHint": "Например: «Набор волонтёров в тьюторский центр»",
    "form.category": "Категория",
    "form.categoryHint": "Где показать это объявление?",
    "form.categoryPlaceholder": "Выберите категорию",
    "categories.events": "🎉 События",
    "categories.academics": "📚 Учёба",
    "categories.lostFound": "🔎 Бюро находок",
    "categories.jobs": "💼 Работа",
    "categories.forSale": "🏷️ Продажа",
    "form.priority": "Приоритет",
    "form.priorityHint": "Используйте «Высокий» для срочных объявлений",
    "priority.normal": "Обычный",
    "priority.default": "По умолчанию",
    "priority.high": "Высокий",
    "priority.timeSensitive": "Срочно",
    "form.description": "Описание",
    "form.descriptionHint": "Укажите дату, время и место.",
    "form.author": "Имя",
    "form.authorHint": "Как подписать это объявление?",
    "form.contact": "Контакты (e‑mail или ссылка)",
    "form.contactHint": "Необязательно",
    "form.status.default": "Обязательные поля отмечены",
    "form.status.invalid": "Пожалуйста, заполните все обязательные поля.",
    "form.status.ready": "Отлично, можно отправлять.",
    "form.status.reset": "Форма очищена. Можно отправить ещё одно объявление.",
    "form.submit": "Отправить объявление",
    "form.clear": "Очистить форму",
    "form.errorRequired":
      "Не заполнены некоторые обязательные поля. Проверьте выделенные поля.",
    "form.successDemo":
      "Ваше объявление отправлено! (Демо‑режим — данные не сохраняются на сервере.)",
    "toast.added": "Объявление добавлено (сохранено локально).",
    "toast.cleared": "Форма очищена.",
    "toast.like": "Вы отметили объявление.",
    "toast.unlike": "Лайк снят.",
    "footer.team": "Наша команда",
    "footer.announcements": "Объявления"
  }
};

let appPrefs = { ...DEFAULT_PREFS };

function loadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors in this demo
  }
}

function detectInitialPrefs() {
  const stored = loadJSON(STORAGE_KEYS.prefs, null);
  if (stored) {
    appPrefs = { ...DEFAULT_PREFS, ...stored };
    return;
  }
  const userLang = (navigator.language || "en").toLowerCase().startsWith("ru")
    ? "ru"
    : "en";
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  appPrefs = {
    lang: userLang,
    theme: prefersDark ? "auto" : "auto"
  };
}

function applyTheme() {
  const root = document.documentElement;
  const body = document.body;
  let effective = appPrefs.theme;
  if (effective === "auto") {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    effective = prefersDark ? "dark" : "light";
  }
  root.setAttribute("data-theme", effective);
  body.setAttribute("data-theme", effective);

  const icon = qs("#themeToggleIcon");
  if (icon) {
    icon.className = "";
    icon.classList.add(
      "fa-solid",
      effective === "dark" ? "fa-moon" : "fa-sun"
    );
  }
}

function applyLanguage() {
  const dict = TRANSLATIONS[appPrefs.lang] || TRANSLATIONS.en;
  qsa("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = dict[key];
    if (text) {
      el.textContent = text;
    }
  });

  const label = qs("#langToggleLabel");
  if (label) {
    label.textContent = appPrefs.lang === "ru" ? "RU" : "EN";
  }
}

function initPreferencesControls() {
  detectInitialPrefs();
  applyTheme();
  applyLanguage();

  const langBtn = qs("#langToggle");
  const themeBtn = qs("#themeToggle");

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      appPrefs.lang = appPrefs.lang === "en" ? "ru" : "en";
      saveJSON(STORAGE_KEYS.prefs, appPrefs);
      applyLanguage();
      initHomePersonalization();
      renderHomeAnnouncements();
      renderBoardFromData();
      initAddPostPreview(); // update labels in preview
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next =
        appPrefs.theme === "auto"
          ? "light"
          : appPrefs.theme === "light"
          ? "dark"
          : "auto";
      appPrefs.theme = next;
      saveJSON(STORAGE_KEYS.prefs, appPrefs);
      applyTheme();
    });
  }
}

function t(key) {
  const dict = TRANSLATIONS[appPrefs.lang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}

// Toast notifications
function showToast(key, type = "success") {
  const container = qs("#toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type === "error" ? "toast-error" : "toast-success"}`;
  const msg = document.createElement("span");
  msg.textContent = t(key);
  const close = document.createElement("button");
  close.className = "toast-close";
  close.type = "button";
  close.setAttribute("aria-label", "Dismiss notification");
  close.textContent = "×";
  close.addEventListener("click", () => {
    toast.style.animation = "toast-out 0.18s ease-in forwards";
    setTimeout(() => toast.remove(), 190);
  });
  toast.appendChild(msg);
  toast.appendChild(close);
  container.appendChild(toast);
  setTimeout(() => {
    if (!toast.isConnected) return;
    toast.style.animation = "toast-out 0.18s ease-in forwards";
    setTimeout(() => toast.remove(), 190);
  }, 3000);
}

// Announcements data
function seedAnnouncements() {
  const now = new Date();
  const baseDate = (offset) =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset).toISOString();
  return [
    {
      id: "seed-1",
      title: "Spring Club Fair 2026",
      category: "events",
      content:
        "Meet student orgs, collect swag, and enjoy live performances on the main quad. Open to all students.",
      author: "Student Affairs",
      meta: "Tomorrow · 4:00 PM · Quad",
      likes: 124,
      createdAt: baseDate(1),
      priority: "high",
      language: "en"
    },
    {
      id: "seed-2",
      title: "Final Exam Study Nights at the Library",
      category: "academics",
      content:
        "Extended hours, free coffee, and quiet group spaces available all week in Library East Wing.",
      author: "Library Services",
      meta: "Apr 18, 2026 · 7:00 PM",
      likes: 58,
      createdAt: baseDate(3),
      priority: "normal",
      language: "en"
    },
    {
      id: "seed-3",
      title: "On-Campus Summer Research Assistants",
      category: "jobs",
      content:
        "Paid positions supporting faculty research in CS, Biology, and Psychology departments.",
      author: "Career Services",
      meta: "Apply by May 1",
      likes: 75,
      createdAt: baseDate(5),
      priority: "high",
      language: "en"
    },
    {
      id: "seed-4",
      title: "Found: Silver Hydro Flask in Science Hall",
      category: "lost-found",
      content:
        "Describe your stickers and initials to claim at the Campus Security front desk.",
      author: "Campus Security",
      meta: "Science Hall · Front desk",
      likes: 19,
      createdAt: baseDate(4),
      priority: "normal",
      language: "en"
    },
    {
      id: "seed-5",
      title: "Used Textbooks - CS & Math",
      category: "for-sale",
      content:
        "Gently used calculus and programming textbooks. Discount for bundle purchases.",
      author: "Maya · Sophomore",
      meta: "DM via campus email",
      likes: 43,
      createdAt: baseDate(2),
      priority: "normal",
      language: "en"
    }
  ];
}

function loadAnnouncements() {
  const stored = loadJSON(STORAGE_KEYS.announcements, null);
  if (stored && Array.isArray(stored)) return stored;
  const seeded = seedAnnouncements();
  saveJSON(STORAGE_KEYS.announcements, seeded);
  return seeded;
}

function saveAnnouncements(list) {
  saveJSON(STORAGE_KEYS.announcements, list);
}

let announcements = [];

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

  qsa(".nav-link", nav).forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
    })
  );
}

// Like buttons with pulse animation + persistence
function attachLikeHandler(button, id) {
  button.addEventListener("click", () => {
    const countSpan = qs("span", button);
    const icon = qs("i", button);
    const isLiked = button.classList.toggle("is-liked");
    const key = "toast." + (isLiked ? "like" : "unlike");

    const idx = announcements.findIndex((a) => a.id === id);
    if (idx !== -1) {
      const currentLikes = announcements[idx].likes || 0;
      announcements[idx].likes = Math.max(
        0,
        currentLikes + (isLiked ? 1 : -1)
      );
      saveAnnouncements(announcements);
    }

    if (countSpan) {
      const current = parseInt(countSpan.textContent || "0", 10) || 0;
      countSpan.textContent = isLiked ? current + 1 : Math.max(current - 1, 0);
    }

    if (icon) {
      icon.classList.toggle("fa-regular", !isLiked);
      icon.classList.toggle("fa-solid", isLiked);
    }

    button.classList.remove("like-pulse");
    // eslint-disable-next-line no-unused-expressions
    void button.offsetWidth;
    button.classList.add("like-pulse");
    showToast(key, "success");
  });
}

// Board rendering, filters & sorting
let boardState = {
  filter: "all",
  sort: "newest"
};

function loadBoardState() {
  boardState = {
    ...boardState,
    ...loadJSON(STORAGE_KEYS.boardState, {})
  };
}

function saveBoardState() {
  saveJSON(STORAGE_KEYS.boardState, boardState);
}

function formatDateForCard(iso) {
  if (!iso) return "";
  try {
    const date = new Date(iso);
    return date.toLocaleDateString(appPrefs.lang === "ru" ? "ru-RU" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return "";
  }
}

function renderBoardFromData() {
  const grid = qs("#boardGrid");
  const stats = qs("#boardStats");
  if (!grid || !announcements.length) return;

  const filtered = announcements.filter((a) => {
    if (boardState.filter === "all") return true;
    return a.category === boardState.filter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (boardState.sort === "most-liked") {
      return (b.likes || 0) - (a.likes || 0);
    }
    if (boardState.sort === "category") {
      return (a.category || "").localeCompare(b.category || "");
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  grid.innerHTML = "";
  sorted.forEach((a) => {
    const catConf = CATEGORIES[a.category] || CATEGORIES.events;
    const article = document.createElement("article");
    article.className = "board-card";
    article.setAttribute("data-category", a.category);
    article.setAttribute("data-likes", String(a.likes || 0));
    article.setAttribute("data-id", a.id);
    article.innerHTML = `
      <div class="board-card-header">
        <div>
          <div class="card-badge-row">
            <span class="badge ${catConf.badgeClass}">${t(catConf.key)}</span>
          </div>
          <h2 class="board-card-title">${a.title}</h2>
        </div>
        <button class="like-btn" type="button" aria-label="Like announcement">
          <i class="fa-regular fa-heart"></i>
          <span>${a.likes || 0}</span>
        </button>
      </div>
      <p class="board-card-snippet">
        ${a.content}
      </p>
      <div class="board-card-footer">
        <div class="board-card-meta">
          <span>${a.author || ""}</span>
          <span>${formatDateForCard(a.createdAt)}${a.meta ? " · " + a.meta : ""}</span>
        </div>
      </div>
    `;
    const likeBtn = qs(".like-btn", article);
    if (likeBtn) {
      attachLikeHandler(likeBtn, a.id);
    }
    grid.appendChild(article);
  });

  if (stats) {
    const count = sorted.length;
    stats.textContent = `${
      appPrefs.lang === "ru" ? "Показано" : "Showing"
    } ${count} ${
      appPrefs.lang === "ru"
        ? count === 1
          ? "объявление"
          : count < 5
          ? "объявления"
          : "объявлений"
        : `announcement${count === 1 ? "" : "s"}`
    }`;
  }
}

function initBoardFilters() {
  const grid = qs("#boardGrid");
  const filterRow = qs("#filterRow");
  const sortSelect = qs("#sortSelect");
  const stats = qs("#boardStats");
  if (!grid || !filterRow || !sortSelect || !stats) return;

  loadBoardState();

  qsa(".filter-btn", filterRow).forEach((btn) => {
    const filter = btn.getAttribute("data-filter");
    const isActive = filter === boardState.filter;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-checked", String(isActive));
  });

  sortSelect.value = boardState.sort;

  filterRow.addEventListener("click", (event) => {
    const target = event.target.closest(".filter-btn");
    if (!target) return;
    const filter = target.getAttribute("data-filter") || "all";
    boardState.filter = filter;
    saveBoardState();
    qsa(".filter-btn", filterRow).forEach((btn) => {
      const isActive = btn === target;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-checked", String(isActive));
    });
    renderBoardFromData();
  });

  sortSelect.addEventListener("change", () => {
    boardState.sort = sortSelect.value;
    saveBoardState();
    renderBoardFromData();
  });

  renderBoardFromData();
}

// Add-post form + preview + draft persistence
function initAddPostPreview() {
  const form = qs("#postForm");
  if (!form) return;
  let preview = qs("#announcementPreview");
  if (!preview) {
    preview = document.createElement("section");
    preview.id = "announcementPreview";
    preview.className = "section";
    preview.innerHTML = `
      <div class="section-header">
        <h2>${appPrefs.lang === "ru" ? "Предпросмотр объявления" : "Announcement preview"}</h2>
        <p>${
          appPrefs.lang === "ru"
            ? "Так будет выглядеть ваше объявление на доске."
            : "This is how your announcement will look on the board."
        }</p>
      </div>
      <div class="card-grid">
        <article class="card" id="previewCard">
          <div class="card-badge-row">
            <span class="badge badge-blue" id="previewCategoryBadge">Events</span>
          </div>
          <h3 id="previewTitle"></h3>
          <p class="card-snippet" id="previewContent"></p>
          <div class="card-meta">
            <span id="previewAuthor"></span>
            <span id="previewDate"></span>
          </div>
        </article>
      </div>
    `;
    form.insertAdjacentElement("afterend", preview);
  }

  const title = qs("#title", form);
  const desc = qs("#description", form);
  const author = qs("#author", form);
  const category = qs("#category", form);

  function updatePreview() {
    const nowStr = new Date().toLocaleDateString(
      appPrefs.lang === "ru" ? "ru-RU" : "en-US",
      { year: "numeric", month: "short", day: "numeric" }
    );

    const badge = qs("#previewCategoryBadge", preview);
    const titleEl = qs("#previewTitle", preview);
    const contentEl = qs("#previewContent", preview);
    const authorEl = qs("#previewAuthor", preview);
    const dateEl = qs("#previewDate", preview);

    if (badge && category) {
      const val = category.value || "events";
      const conf = CATEGORIES[val] || CATEGORIES.events;
      badge.className = `badge ${conf.badgeClass}`;
      badge.textContent = t(conf.key);
    }

    if (titleEl) titleEl.textContent = title && title.value ? title.value : "";
    if (contentEl) contentEl.textContent = desc && desc.value ? desc.value : "";
    if (authorEl) authorEl.textContent = author && author.value ? author.value : "";
    if (dateEl) dateEl.textContent = nowStr;
  }

  ["input", "change"].forEach((evt) => {
    form.addEventListener(evt, updatePreview);
  });
  updatePreview();
}

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
  const clearBtn = qs("#clearFormBtn", form);

  const draft = loadJSON(STORAGE_KEYS.formDraft, null);
  if (draft) {
    ["title", "category", "description", "author", "contact"].forEach((name) => {
      const field = qs("#" + name, form);
      if (field && draft[name]) field.value = draft[name];
    });
    if (draft.priority && priorityInput) {
      priorityInput.value = draft.priority;
    }
  }

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
      const value = pill.getAttribute("data-priority") || "normal";
      const isActive = priorityInput.value === value;
      pill.classList.toggle(
        "is-active-normal",
        value === "normal" && isActive
      );
      pill.classList.toggle("is-active-high", value === "high" && isActive);
      pill.setAttribute("aria-checked", String(isActive));

      pill.addEventListener("click", () => {
        priorityInput.value = value;
        priorityPills.forEach((p) => {
          const v = p.getAttribute("data-priority") || "normal";
          const active = v === value;
          p.classList.toggle("is-active-normal", v === "normal" && active);
          p.classList.toggle("is-active-high", v === "high" && active);
          p.setAttribute("aria-checked", String(active));
        });
        saveDraft();
        initAddPostPreview();
      });
    });
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.classList.toggle("is-loading", isLoading);
    submitBtn.disabled = isLoading;
  }

  function setAlert(type, messageKey) {
    if (!alertBox) return;
    alertBox.classList.remove("hidden", "alert-success", "alert-error");
    alertBox.classList.add(type === "success" ? "alert-success" : "alert-error");
    alertBox.textContent = t(messageKey);
  }

  function clearAlert() {
    if (!alertBox) return;
    alertBox.classList.add("hidden");
    alertBox.textContent = "";
  }

  function saveDraft() {
    const data = {
      title: qs("#title", form)?.value || "",
      category: qs("#category", form)?.value || "",
      description: qs("#description", form)?.value || "",
      author: qs("#author", form)?.value || "",
      contact: qs("#contact", form)?.value || "",
      priority: qs("#priority", form)?.value || "normal"
    };
    saveJSON(STORAGE_KEYS.formDraft, data);
  }

  form.addEventListener("input", saveDraft);
  form.addEventListener("change", saveDraft);

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
      status.textContent = t("form.status.invalid");
      setAlert("error", "form.errorRequired");
    } else {
      status.classList.remove("form-status-error");
      status.classList.add("form-status-success");
      status.textContent = t("form.status.ready");
    }

    return isValid;
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      const confirmText =
        appPrefs.lang === "ru"
          ? "Очистить форму? Введённые данные будут удалены."
          : "Clear the form? Entered data will be removed.";
      if (!window.confirm(confirmText)) return;
      form.reset();
      saveJSON(STORAGE_KEYS.formDraft, null);
      if (charCounter && description) {
        const max =
          parseInt(description.getAttribute("maxlength") || "0", 10) || 0;
        charCounter.textContent = `0 / ${max} characters`;
        charCounter.classList.remove("char-limit");
      }
      if (priorityInput) {
        priorityInput.value = "normal";
      }
      priorityPills.forEach((p) => {
        const value = p.getAttribute("data-priority") || "normal";
        const active = value === "normal";
        p.classList.toggle("is-active-normal", value === "normal" && active);
        p.classList.toggle("is-active-high", value === "high" && active);
        p.setAttribute("aria-checked", String(active));
      });
      status.classList.remove("form-status-error");
      status.classList.add("form-status-success");
      status.textContent = t("form.status.reset");
      showToast("toast.cleared", "success");
      initAddPostPreview();
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) {
      const msg =
        appPrefs.lang === "ru"
          ? "Пожалуйста, заполните обязательные поля."
          : "Please complete the required fields before submitting.";
      alert(msg);
      return;
    }

    const newAnnouncement = {
      id: `local-${Date.now()}`,
      title: qs("#title", form)?.value.trim(),
      category: qs("#category", form)?.value || "events",
      content: qs("#description", form)?.value.trim(),
      author: qs("#author", form)?.value.trim(),
      meta: qs("#contact", form)?.value.trim(),
      likes: 0,
      createdAt: new Date().toISOString(),
      priority: qs("#priority", form)?.value || "normal",
      language: appPrefs.lang
    };

    announcements.push(newAnnouncement);
    saveAnnouncements(announcements);

    setLoading(true);
    clearAlert();

    setTimeout(() => {
      setLoading(false);
      setAlert("success", "form.successDemo");
      showToast("toast.added", "success");
      alert(
        appPrefs.lang === "ru"
          ? "Объявление отправлено! (Демо — данные сохранены только локально.)"
          : "Announcement submitted! (Demo — data is saved locally only.)"
      );
      form.reset();
      saveJSON(STORAGE_KEYS.formDraft, null);
      if (description && charCounter) {
        description.value = "";
        const max =
          parseInt(description.getAttribute("maxlength") || "0", 10) || 0;
        charCounter.textContent = `0 / ${max} characters`;
        charCounter.classList.remove("char-limit");
      }
      if (priorityInput) {
        priorityInput.value = "normal";
      }
      priorityPills.forEach((p) => {
        const value = p.getAttribute("data-priority") || "normal";
        const active = value === "normal";
        p.classList.toggle("is-active-normal", value === "normal" && active);
        p.classList.toggle("is-active-high", value === "high" && active);
        p.setAttribute("aria-checked", String(active));
      });
      status.classList.remove("form-status-error");
      status.classList.add("form-status-success");
      status.textContent = t("form.status.reset");
      initAddPostPreview();
      renderHomeAnnouncements();
      renderBoardFromData();
    }, 900);
  });

  initAddPostPreview();
}

// Home page dynamic content & personalization
function initHomePersonalization() {
  const greetingEl = qs("#heroGreeting");
  const dateEl = qs("#heroDate");
  if (!greetingEl || !dateEl) return;

  const now = new Date();
  const hours = now.getHours();
  let greeting;
  if (appPrefs.lang === "ru") {
    if (hours < 12) greeting = "Доброе утро";
    else if (hours < 18) greeting = "Добрый день";
    else greeting = "Добрый вечер";
  } else {
    if (hours < 12) greeting = "Good morning";
    else if (hours < 18) greeting = "Good afternoon";
    else greeting = "Good evening";
  }
  greetingEl.textContent = greeting;

  dateEl.textContent = now.toLocaleDateString(
    appPrefs.lang === "ru" ? "ru-RU" : "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );

  const weeklyEl = qs("#heroWeeklyCount");
  if (weeklyEl) {
    weeklyEl.textContent = `${announcements.length}`;
  }
}

function renderHomeAnnouncements() {
  const popularGrid = qs("#homePopularGrid");
  const latestGrid = qs("#homeLatestGrid");
  if (!popularGrid || !latestGrid || !announcements.length) return;

  const sortedByLikes = [...announcements].sort(
    (a, b) => (b.likes || 0) - (a.likes || 0)
  );
  const popular = sortedByLikes.slice(0, 4);

  const sortedByDate = [...announcements].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const latest = sortedByDate.slice(0, 4);

  function buildCard(a) {
    const conf = CATEGORIES[a.category] || CATEGORIES.events;
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-badge-row">
        <span class="badge ${conf.badgeClass}">${t(conf.key)}</span>
      </div>
      <h3>${a.title}</h3>
      <p class="card-snippet">${a.content}</p>
      <div class="card-meta">
        <span>${a.author || ""}</span>
        <span>${formatDateForCard(a.createdAt)}</span>
      </div>
    `;
    return card;
  }

  popularGrid.innerHTML = "";
  popular.forEach((a) => popularGrid.appendChild(buildCard(a)));

  latestGrid.innerHTML = "";
  latest.forEach((a) => latestGrid.appendChild(buildCard(a)));
}

// Scroll state preservation
function saveScrollPosition() {
  const key = `${STORAGE_KEYS.scroll}:${window.location.pathname}`;
  saveJSON(key, { y: window.scrollY });
}

function restoreScrollPosition() {
  const key = `${STORAGE_KEYS.scroll}:${window.location.pathname}`;
  const data = loadJSON(key, null);
  if (!data) return;
  window.scrollTo(0, data.y || 0);
}

document.addEventListener("DOMContentLoaded", () => {
  announcements = loadAnnouncements();
  initPreferencesControls();
  initMobileNav();
  initBoardFilters();
  initAddPostForm();
  initHomePersonalization();
  renderHomeAnnouncements();
  restoreScrollPosition();
});

window.addEventListener("beforeunload", saveScrollPosition);
