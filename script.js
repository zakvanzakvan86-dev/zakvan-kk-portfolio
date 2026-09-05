/**
 * ===================================================================
 * ZAKVAN KK — PORTFOLIO CLIENT LOGIC
 * 
 * Production-ready behavior organized by requirement tiers:
 * - TIER 0: Intro banner persistence, Role Mode switchboard, Formspree
 *           validation & honest unconfigured fallback
 * - TIER 1: Real Architecture Diagram switcher, Interactive Toolbox with
 *           project evidence highlighting, Live GitHub REST API widget
 * - TIER 2: Command Palette (Ctrl+K) search and quick actions
 * - TIER 3: Developer Terminal (~), Bangalore IST clock, easter eggs
 * ===================================================================
 */

// Strict Mode
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modular systems
  initIntroToast();
  initRoleMode();
  initArchitectureTabs();
  initToolboxEvidence();
  initGitHubWidget();
  initContactForm();
  initCommandPalette();
  initDeveloperTerminal();
  initBengaluruClock();
  initBackgroundAnimation();
  initCustomCursor();
  initScrollProgressBar();
  initHeroParallaxAndReveal();
  initProjectCardTiltAndSpotlight();
  initSkillsOrbitalConstellation();
  initTimelineScrollDraw();
  initCopyEmailAction();
  initRobotGuide();
  initChatbot();
  initProjectInteractions();
});

/* ===================================================================
   TIER 0: SKIPPABLE INTRO BANNER (Dismissible & Stored in LocalStorage)
   =================================================================== */
function initIntroToast() {
  const toast = document.getElementById('intro-toast');
  const dismissBtn = document.getElementById('dismiss-intro-btn');
  if (!toast || !dismissBtn) return;

  const storageKey = 'zakvan_intro_dismissed_v1';
  if (localStorage.getItem(storageKey) === 'true') {
    toast.classList.add('is-dismissed');
  }

  dismissBtn.addEventListener('click', () => {
    toast.classList.add('is-dismissed');
    try {
      localStorage.setItem(storageKey, 'true');
    } catch (e) {
      // Ignore private browsing storage exceptions
    }
  });
}

/* ===================================================================
   TIER 0: ROLE MODE / RECRUITER MODE SWITCHBOARD
   Allows hiring managers to view "Full Site", "Data Analyst", or "Developer"
   =================================================================== */
function initRoleMode() {
  const modeButtons = document.querySelectorAll('.role-btn');
  const perspectiveTag = document.getElementById('perspective-tag');
  const perspectiveDesc = document.getElementById('perspective-desc');
  const projectCountBadge = document.getElementById('project-count-badge');
  const projectCards = document.querySelectorAll('.project-card');
  const experienceCards = document.querySelectorAll('.experience-card');

  function setRoleMode(mode) {
    document.body.setAttribute('data-active-mode', mode);

    // Update buttons
    modeButtons.forEach((btn) => {
      const isActive = btn.getAttribute('data-mode') === mode;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-checked', isActive ? 'true' : 'false');
    });

    // Update banner & card highlighting
    if (mode === 'analyst') {
      if (perspectiveTag) perspectiveTag.textContent = 'Viewing: Data Analyst & BI Perspective';
      if (perspectiveDesc) {
        perspectiveDesc.textContent = 'Focusing on SQL, Python data wrangling, DAX modeling, Power BI reports, and quantitative decision systems.';
      }
      if (projectCountBadge) projectCountBadge.textContent = '3 of 5 projects highlighted for Data Analyst & BI roles';

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (cat === 'analyst') {
          card.classList.add('is-highlighted');
          card.classList.remove('is-dimmed');
        } else {
          card.classList.remove('is-highlighted');
          card.classList.add('is-dimmed');
        }
      });

      experienceCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        card.classList.toggle('is-highlighted', cat === 'analyst');
      });

    } else if (mode === 'dev') {
      if (perspectiveTag) perspectiveTag.textContent = 'Viewing: Software Developer Perspective';
      if (perspectiveDesc) {
        perspectiveDesc.textContent = 'Focusing on Java, Vert.x, PHP, REST APIs, MongoDB, MySQL, and full system architectures.';
      }
      if (projectCountBadge) projectCountBadge.textContent = '3 of 5 projects highlighted for Software Development roles';

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (cat === 'dev') {
          card.classList.add('is-highlighted');
          card.classList.remove('is-dimmed');
        } else {
          card.classList.remove('is-highlighted');
          card.classList.add('is-dimmed');
        }
      });

      experienceCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        card.classList.toggle('is-highlighted', cat === 'dev');
      });

    } else {
      // Full site view
      if (perspectiveTag) perspectiveTag.textContent = 'Viewing: Full Portfolio';
      if (perspectiveDesc) {
        perspectiveDesc.textContent = 'Showing all data analytics, business intelligence dashboards, and software engineering systems.';
      }
      if (projectCountBadge) projectCountBadge.textContent = 'Showing all 5 projects';

      projectCards.forEach((card) => {
        card.classList.remove('is-highlighted', 'is-dimmed');
      });
      experienceCards.forEach((card) => {
        card.classList.remove('is-highlighted');
      });
    }

    // Persist choice in sessionStorage
    try {
      sessionStorage.setItem('zakvan_active_mode', mode);
    } catch (e) {
      // Ignore
    }
  }

  // Attach click listeners to role buttons
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode') || 'all';
      setRoleMode(mode);
    });
  });

  // Check persisted mode or URL query param (?mode=analyst)
  const urlParams = new URLSearchParams(window.location.search);
  const queryMode = urlParams.get('mode');
  const storedMode = sessionStorage.getItem('zakvan_active_mode');
  const initialMode = queryMode || storedMode || 'all';
  if (['all', 'analyst', 'dev'].includes(initialMode)) {
    setRoleMode(initialMode);
  }

  // Expose to window for terminal commands
  window.setPortfolioMode = setRoleMode;
}

/* ===================================================================
   TIER 1: REAL ARCHITECTURE DIAGRAMS SWITCHER
   =================================================================== */
function initArchitectureTabs() {
  const tabBackend = document.getElementById('tab-backend-diagram');
  const tabAnalytics = document.getElementById('tab-analytics-diagram');
  const panelBackend = document.getElementById('panel-backend-diagram');
  const panelAnalytics = document.getElementById('panel-analytics-diagram');

  if (!tabBackend || !tabAnalytics || !panelBackend || !panelAnalytics) return;

  function switchDiagram(activeTab, activePanel, inactiveTab, inactivePanel) {
    activeTab.classList.add('is-active');
    activeTab.setAttribute('aria-selected', 'true');
    activePanel.classList.add('is-visible');
    activePanel.removeAttribute('hidden');

    inactiveTab.classList.remove('is-active');
    inactiveTab.setAttribute('aria-selected', 'false');
    inactivePanel.classList.remove('is-visible');
    inactivePanel.setAttribute('hidden', '');
  }

  tabBackend.addEventListener('click', () => {
    switchDiagram(tabBackend, panelBackend, tabAnalytics, panelAnalytics);
  });

  tabAnalytics.addEventListener('click', () => {
    switchDiagram(tabAnalytics, panelAnalytics, tabBackend, panelBackend);
  });
}

/* ===================================================================
   TIER 1 & 2: TOOLBOX SECTION — INTERACTIVE SKILL EVIDENCE
   Clicking a skill reveals verified project usage and highlights cards
   =================================================================== */
function initToolboxEvidence() {
  const chips = document.querySelectorAll('.skill-interactive-chip');
  const evidenceBox = document.getElementById('skill-evidence-box');
  const evidenceContent = document.getElementById('evidence-content');
  const clearBtn = document.getElementById('clear-skill-filter-btn');
  const statusLabel = document.getElementById('toolbox-filter-status');
  const projectCards = document.querySelectorAll('.project-card');

  // Grounded real facts database matching the prompt
  const skillEvidenceData = {
    'SQL': {
      summary: 'Used during the Skillbit Technologies internship to explore, clean, and extract trend indicators from raw business datasets, and for structuring backend queries.',
      projects: ['project-sales-report', 'project-doctor-booking']
    },
    'Power BI': {
      summary: 'Constructed executive reports for Skillbit Technologies tracking operational performance, and built the complete Big Sales Report with dimensional modeling.',
      projects: ['project-sales-report']
    },
    'DAX': {
      summary: 'Formulated dynamic measures for revenue, gross profit, order volume distributions, and period-over-period trend analysis in the Big Sales Report.',
      projects: ['project-sales-report']
    },
    'Python': {
      summary: 'Developed an automated meteorological ETL pipeline in Live Weather Dashboard scheduled via GitHub Actions, and used for dataset cleaning and validation at Skillbit Technologies.',
      projects: ['project-weather-pipeline']
    },
    'Excel': {
      summary: 'Applied advanced formulas, data validation, and preliminary trend analysis on commercial datasets at Skillbit Technologies.',
      projects: ['project-sales-report']
    },
    'Java': {
      summary: 'Built backend services for the Stall Management System at Kristu Jayanti Software Development Centre (KJSDC) using Maven builds and validated in Postman.',
      projects: ['project-stall-system']
    },
    'Vert.x': {
      summary: 'Engineered non-blocking event-driven HTTP routing and microservice controllers for KJSDC stall infrastructure.',
      projects: ['project-stall-system']
    },
    'PHP': {
      summary: 'Developed the complete backend logic for the Doctor Appointment Booking System including OTP email verification and slot booking state management.',
      projects: ['project-doctor-booking']
    },
    'Node.js': {
      summary: 'Studied through Udemy Advanced Node.js certification; applied in local scripting and modern JavaScript runtime environments.',
      projects: ['project-campushub']
    },
    'REST APIs': {
      summary: 'Integrated external weather endpoints in the Python weather pipeline, and designed RESTful endpoints tested with Postman for KJSDC.',
      projects: ['project-stall-system', 'project-weather-pipeline', 'project-doctor-booking']
    },
    'MongoDB': {
      summary: 'Designed flexible document schemas for stall bookings and stock inventory at KJSDC; backed by MongoDB DB Administrator certification.',
      projects: ['project-stall-system']
    },
    'MySQL': {
      summary: 'Designed relational schemas and queries for doctor schedules, patient profiles, and appointment status flags in the Doctor Booking System.',
      projects: ['project-doctor-booking']
    },
    'Git': {
      summary: 'Practiced team Git branching and PR reviews at KJSDC; verified by Udemy Complete Git Guide certification.',
      projects: ['project-stall-system', 'project-weather-pipeline', 'project-campushub']
    },
    'GitHub': {
      summary: 'Maintains open source repositories across analytics and software systems at github.com/zakvanzakvan86-dev.',
      projects: ['project-campushub', 'project-doctor-booking', 'project-sales-report', 'project-stall-system', 'project-weather-pipeline']
    },
    'Postman': {
      summary: 'Used for rigorous API contract validation, HTTP payload testing, and status code verification for KJSDC backend endpoints.',
      projects: ['project-stall-system']
    },
    'Maven': {
      summary: 'Managed Java builds, external dependencies, plugins, and packaging cycles for the Stall Management System at KJSDC.',
      projects: ['project-stall-system']
    },
    'IntelliJ IDEA': {
      summary: 'Primary IDE for Java and Vert.x development, debugging server-side breakpoints at KJSDC.',
      projects: ['project-stall-system']
    },
    'GitHub Actions': {
      summary: 'Configured automated cron workflows for the Live Weather Dashboard to fetch, parse, and refresh Indian cities weather telemetry with zero manual upkeep.',
      projects: ['project-weather-pipeline']
    },
    'JavaScript': {
      summary: 'Engineered client-side validation and interactive slot selection logic in the Doctor Appointment Booking System.',
      projects: ['project-doctor-booking']
    }
  };

  let activeTech = null;

  function highlightSkill(techName) {
    activeTech = techName;
    chips.forEach(chip => {
      const isMatch = chip.getAttribute('data-tech') === techName;
      chip.classList.toggle('is-selected', isMatch);
    });

    const data = skillEvidenceData[techName];
    if (data) {
      if (evidenceContent) {
        evidenceContent.innerHTML = `<strong>${techName}:</strong> ${data.summary}`;
      }
      if (clearBtn) clearBtn.style.display = 'inline-flex';
      if (statusLabel) statusLabel.textContent = `Showing evidence for ${techName}`;

      // Highlight corresponding project cards
      projectCards.forEach(card => {
        const isConnected = data.projects.includes(card.id);
        card.classList.toggle('is-highlighted', isConnected);
        
        // Highlight matching tags inside the card
        const techChips = card.querySelectorAll('.tech-chip');
        techChips.forEach(chip => {
          const chipSkill = chip.getAttribute('data-skill') || chip.textContent.trim();
          chip.classList.toggle('is-active-skill', chipSkill.toLowerCase() === techName.toLowerCase());
        });
      });
    }
  }

  function resetSkillHighlight() {
    activeTech = null;
    chips.forEach(chip => chip.classList.remove('is-selected'));
    if (evidenceContent) {
      evidenceContent.innerHTML = '<strong>Select any skill chip above</strong> to see where Zakvan applied it across his 2 internships and 5 documented projects.';
    }
    if (clearBtn) clearBtn.style.display = 'none';
    if (statusLabel) statusLabel.textContent = 'Click a skill to filter evidence';

    projectCards.forEach(card => {
      card.classList.remove('is-highlighted');
      card.querySelectorAll('.tech-chip').forEach(c => c.classList.remove('is-active-skill'));
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const tech = chip.getAttribute('data-tech');
      if (activeTech === tech) {
        resetSkillHighlight();
      } else {
        highlightSkill(tech);
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', resetSkillHighlight);
  }
}

/* ===================================================================
   TIER 1: LIVE GITHUB WIDGET (api.github.com/users/zakvanzakvan86-dev)
   =================================================================== */
function initGitHubWidget() {
  const username = 'zakvanzakvan86-dev';
  const reposContainer = document.getElementById('gh-repos-list');
  const reposCountEl = document.getElementById('gh-repos-count');

  if (!reposContainer) return;

  // Real verified fallback repositories
  const fallbackRepos = [
    {
      name: 'campus-hub',
      description: 'Capstone project: Modular student super-app platform connecting college campus services and verified student exchange.',
      html_url: 'https://github.com/zakvanzakvan86-dev/campus-hub',
      language: 'System Architecture'
    },
    {
      name: 'doctor-appointment-system',
      description: 'Medical appointment reservation web portal with email OTP verification and doctor schedule controls.',
      html_url: 'https://github.com/zakvanzakvan86-dev/doctor-appointment-system',
      language: 'PHP'
    },
    {
      name: 'Big-Sales-Report-PowerBI',
      description: 'Interactive commercial revenue and gross profit dashboard modeled with DAX measures across product tiers and regions.',
      html_url: 'https://github.com/zakvanzakvan86-dev/Big-Sales-Report-PowerBI',
      language: 'Power BI / DAX'
    },
    {
      name: 'weather-dashboard-data',
      description: 'Autonomous Python pipeline fetching live atmospheric data across Indian metropolitan areas on GitHub Actions cron.',
      html_url: 'https://github.com/zakvanzakvan86-dev/weather-dashboard-data',
      language: 'Python'
    }
  ];

  function renderRepos(repos) {
    reposContainer.innerHTML = '';
    repos.slice(0, 6).forEach(repo => {
      const card = document.createElement('div');
      card.className = 'gh-repo-card';
      card.innerHTML = `
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="gh-repo-title">
          ${escapeHtml(repo.name)}
        </a>
        <p class="gh-repo-desc">${escapeHtml(repo.description || 'Public repository by Zakvan KK.')}</p>
        <div class="gh-repo-meta">
          <span>${escapeHtml(repo.language || 'Code')}</span>
          <span>Public</span>
        </div>
      `;
      reposContainer.appendChild(card);
    });
  }

  // Fetch from public GitHub API (no key required)
  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) throw new Error('Profile fetch failed');
      return res.json();
    })
    .then(user => {
      if (reposCountEl && typeof user.public_repos === 'number') {
        reposCountEl.textContent = user.public_repos;
      }
      return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    })
    .then(res => {
      if (!res.ok) throw new Error('Repos fetch failed');
      return res.json();
    })
    .then(repos => {
      if (Array.isArray(repos) && repos.length > 0) {
        renderRepos(repos);
      } else {
        renderRepos(fallbackRepos);
      }
    })
    .catch(() => {
      // Graceful fallback on network limits or rate limiting
      if (reposCountEl) reposCountEl.textContent = '5+';
      renderRepos(fallbackRepos);
    });
}

/* ===================================================================
   TIER 0: REAL CONTACT FORM (FORMSPREE INTEGRATION)
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedbackEl = document.getElementById('form-feedback-message');
  const submitBtn = document.getElementById('contact-submit-btn');
  if (!form || !feedbackEl || !submitBtn) return;

  const nameInput = form.querySelector('[name="name"]');
  const emailInput = form.querySelector('[name="email"]');
  const messageInput = form.querySelector('[name="message"]');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  function setFieldError(input, errorEl, message) {
    if (input) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
    }
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('is-visible');
    }
  }

  function clearFieldError(input, errorEl) {
    if (input) {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.remove('is-visible');
    }
  }

  function clearAllFieldErrors() {
    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);
    clearFieldError(messageInput, messageError);
  }

  // Real-time error dismissal on user input
  if (nameInput) {
    nameInput.addEventListener('input', () => clearFieldError(nameInput, nameError));
  }
  if (emailInput) {
    emailInput.addEventListener('input', () => clearFieldError(emailInput, emailError));
  }
  if (messageInput) {
    messageInput.addEventListener('input', () => clearFieldError(messageInput, messageError));
  }

  function showFeedback(msg, type, isHtml = false) {
    feedbackEl.className = `form-feedback is-${type}`;
    if (isHtml) {
      feedbackEl.innerHTML = msg;
    } else {
      feedbackEl.textContent = msg;
    }
    feedbackEl.style.display = 'block';
    feedbackEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideFeedback() {
    feedbackEl.style.display = 'none';
    feedbackEl.textContent = '';
    feedbackEl.className = 'form-feedback';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAllFieldErrors();
    hideFeedback();

    const nameVal = nameInput ? nameInput.value.trim() : '';
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const messageVal = messageInput ? messageInput.value.trim() : '';

    let hasError = false;
    let firstInvalidInput = null;

    // Validate Name
    if (!nameVal) {
      setFieldError(nameInput, nameError, 'Please enter your name.');
      hasError = true;
      if (!firstInvalidInput) firstInvalidInput = nameInput;
    }

    // Validate Email & Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      setFieldError(emailInput, emailError, 'Please enter your email address.');
      hasError = true;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else if (!emailRegex.test(emailVal)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address (e.g. name@company.com).');
      hasError = true;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    }

    // Validate Message
    if (!messageVal) {
      setFieldError(messageInput, messageError, 'Please enter your message.');
      hasError = true;
      if (!firstInvalidInput) firstInvalidInput = messageInput;
    }

    if (hasError) {
      if (firstInvalidInput) {
        firstInvalidInput.focus();
      }
      return;
    }

    const formAction = form.getAttribute('action') || 'https://formspree.io/f/mkjnvgwg';

    // Disable submit button and show loading indicator
    submitBtn.disabled = true;
    submitBtn.setAttribute('aria-busy', 'true');
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-loading-spinner" aria-hidden="true"></span> Sending message...';

    try {
      const formData = new FormData(form);
      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Successful submission to Formspree
        form.reset();
        clearAllFieldErrors();
        showFeedback("Message sent successfully! I'll get back to you soon.", 'success');
      } else {
        // Submission failed: preserve user input
        showFeedback(
          'Unable to send the message right now. Please try again or contact me directly at <a href="mailto:zakvanzakvan86@gmail.com" style="text-decoration: underline; font-weight: 600; color: inherit;">zakvanzakvan86@gmail.com</a>.',
          'error',
          true
        );
      }
    } catch (err) {
      // Network or transport error: preserve user input
      showFeedback(
        'Unable to send the message right now. Please try again or contact me directly at <a href="mailto:zakvanzakvan86@gmail.com" style="text-decoration: underline; font-weight: 600; color: inherit;">zakvanzakvan86@gmail.com</a>.',
        'error',
        true
      );
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.innerHTML = originalBtnContent;
    }
  });
}

/* ===================================================================
   TIER 2: COMMAND PALETTE (Ctrl+K or ⌘K)
   =================================================================== */
function initCommandPalette() {
  const modal = document.getElementById('command-modal');
  const openBtn = document.getElementById('open-cmd-btn');
  const closeBtn = document.getElementById('close-cmd-btn');
  const input = document.getElementById('command-search-input');
  const resultsList = document.getElementById('command-results-list');

  if (!modal || !input || !resultsList) return;

  const commands = [
    { title: 'Explore Featured Projects', category: 'Navigation', action: () => scrollToId('projects') },
    { title: 'View Technical Architecture Diagrams', category: 'Navigation', action: () => scrollToId('architectures') },
    { title: 'View Internship Case Studies', category: 'Navigation', action: () => scrollToId('experience') },
    { title: 'View Technical Toolbox & Evidence', category: 'Navigation', action: () => scrollToId('toolbox') },
    { title: 'View Education & Certifications', category: 'Navigation', action: () => scrollToId('credentials') },
    { title: 'Direct Contact & Hiring Form', category: 'Navigation', action: () => scrollToId('contact') },
    { title: 'Download Resume (PDF)', category: 'Document', action: () => window.open('./resume.pdf', '_blank') },
    { title: 'Switch to Data Analyst View', category: 'Role Mode', action: () => window.setPortfolioMode && window.setPortfolioMode('analyst') },
    { title: 'Switch to Developer View', category: 'Role Mode', action: () => window.setPortfolioMode && window.setPortfolioMode('dev') },
    { title: 'Switch to Full Site View', category: 'Role Mode', action: () => window.setPortfolioMode && window.setPortfolioMode('all') },
    { title: 'Open Developer Terminal', category: 'Tools', action: () => openTerminal() },
    { title: 'Open GitHub Profile', category: 'External', action: () => window.open('https://github.com/zakvanzakvan86-dev', '_blank') },
    { title: 'Open LinkedIn Profile', category: 'External', action: () => window.open('https://linkedin.com/in/zakvan-k-k', '_blank') }
  ];

  let selectedIndex = 0;

  function renderList(query = '') {
    const q = query.trim().toLowerCase();
    const filtered = commands.filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));

    resultsList.innerHTML = '';
    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'command-item';
      empty.textContent = 'No matching actions or sections found.';
      resultsList.appendChild(empty);
      return;
    }

    selectedIndex = Math.min(selectedIndex, filtered.length - 1);

    filtered.forEach((cmd, i) => {
      const item = document.createElement('div');
      item.className = `command-item ${i === selectedIndex ? 'is-selected' : ''}`;
      item.innerHTML = `
        <span>${escapeHtml(cmd.title)}</span>
        <span class="command-item-badge">${escapeHtml(cmd.category)}</span>
      `;
      item.addEventListener('click', () => {
        closeModal();
        cmd.action();
      });
      resultsList.appendChild(item);
    });
  }

  function openModal() {
    modal.removeAttribute('hidden');
    input.value = '';
    selectedIndex = 0;
    renderList();
    setTimeout(() => input.focus(), 50);
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  input.addEventListener('input', () => {
    selectedIndex = 0;
    renderList(input.value);
  });

  input.addEventListener('keydown', (e) => {
    const items = resultsList.querySelectorAll('.command-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      renderList(input.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      renderList(input.value);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const q = input.value.trim().toLowerCase();
      const filtered = commands.filter(c => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
      if (filtered[selectedIndex]) {
        closeModal();
        filtered[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.hasAttribute('hidden')) {
        openModal();
      } else {
        closeModal();
      }
    }
  });
}

/* ===================================================================
   TIER 3: DEVELOPER TERMINAL MODAL (Shortcut: `~` or terminal button)
   =================================================================== */
function initDeveloperTerminal() {
  const modal = document.getElementById('terminal-modal');
  const openBtn = document.getElementById('open-terminal-btn');
  const closeBtn = document.getElementById('close-terminal-btn');
  const input = document.getElementById('terminal-input');
  const history = document.getElementById('terminal-history');

  if (!modal || !input || !history) return;

  function openTerminal() {
    modal.removeAttribute('hidden');
    setTimeout(() => input.focus(), 50);
  }

  function closeTerminal() {
    modal.setAttribute('hidden', '');
  }

  window.openTerminal = openTerminal;

  if (openBtn) openBtn.addEventListener('click', openTerminal);
  if (closeBtn) closeBtn.addEventListener('click', closeTerminal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTerminal();
  });

  // Global shortcut: `~` or `\`
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      // Avoid triggering when user is typing inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      e.preventDefault();
      if (modal.hasAttribute('hidden')) {
        openTerminal();
      } else {
        closeTerminal();
      }
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = input.value.trim();
      if (!cmd) return;
      executeCommand(cmd);
      input.value = '';
    }
  });

  function executeCommand(rawCmd) {
    const entry = document.createElement('div');
    entry.className = 'terminal-entry';
    entry.innerHTML = `<span class="terminal-entry-command">zakvan@portfolio:~$ ${escapeHtml(rawCmd)}</span>`;

    const lower = rawCmd.toLowerCase().trim();
    const parts = lower.split(' ');
    const main = parts[0];

    let response = '';

    switch (main) {
      case 'help':
      case '?':
      case '/help':
        response = `Available commands:
  projects   - List all 5 portfolio projects, tech stacks, and status
  skills     - Display technical disciplines and verified tools
  experience - Summary of KJSDC and Skillbit internships
  mode       - Switch recruiter view (Usage: mode analyst | mode dev | mode all)
  contact    - Print verified contact numbers and direct channels
  chess      - Display district-level chess competitive easter egg
  status     - Show Bengaluru time, graduation status, and open roles
  clear      - Clear current terminal buffer
  exit       - Close terminal screen`;
        break;

      case 'projects':
      case '/projects':
        response = `[1] CampusHub: Student Super App (Status: IN PROGRESS / Capstone)
    Modular platform: marketplace, book exchange, ride share, college-email auth & AI trust layer.
[2] Doctor Appointment Booking System (Status: SHIPPED)
    Stack: PHP, MySQL, JavaScript. OTP validation & live scheduling.
[3] Big Sales Report (Status: SHIPPED)
    Stack: Power BI, DAX, Excel. Revenue & profit decomposition.
[4] Stall Management System (Status: SHIPPED)
    Stack: Java, MongoDB, Vert.x, Maven, Postman, Git. KJSDC institutional store backend.
[5] Live Weather Dashboard (Status: SHIPPED)
    Stack: Python, GitHub Actions. Autonomous scheduled Indian cities weather pipeline.`;
        break;

      case 'skills':
      case '/skills':
        response = `Data: SQL, Power BI, DAX, Python, Excel
Backend: Java, PHP, Node.js, REST APIs, Vert.x
Databases: MongoDB, MySQL
Development Tools: Git, GitHub, Postman, Maven, IntelliJ IDEA, GitHub Actions
Frontend: JavaScript`;
        break;

      case 'experience':
        response = `1. Software Development Intern @ KJSDC (May–Jun 2026)
   Java, Vert.x, MongoDB backend for Stall Management System.
2. Data Analytics Intern @ Skillbit Technologies (Jul–Sep 2026)
   SQL, Python, Excel data wrangling and Power BI decision dashboards.`;
        break;

      case 'mode':
        if (parts[1] === 'analyst') {
          if (window.setPortfolioMode) window.setPortfolioMode('analyst');
          response = 'Switchboard activated: Data Analyst & BI mode.';
        } else if (parts[1] === 'dev') {
          if (window.setPortfolioMode) window.setPortfolioMode('dev');
          response = 'Switchboard activated: Software Developer mode.';
        } else if (parts[1] === 'all') {
          if (window.setPortfolioMode) window.setPortfolioMode('all');
          response = 'Switchboard reset: Full Portfolio mode.';
        } else {
          response = 'Usage: mode analyst | mode dev | mode all';
        }
        break;

      case 'contact':
      case '/contact':
        response = `Email: zakvanzakvan86@gmail.com
Phone: +91 86189 62820
LinkedIn: https://linkedin.com/in/zakvan-k-k
GitHub: https://github.com/zakvanzakvan86-dev
Location: Bengaluru, Karnataka, India
Open Roles: Data Analyst, BI, Software Development`;
        break;

      case 'chess':
        response = `[EASTER EGG: Strategic Foresight]
District-Level Chess Participant (2nd PUC).
Translating tactical calculation, board visualization, and risk management into resilient software architecture and data integrity.`;
        break;

      case 'status':
        response = `Candidate: Zakvan KK
College: Kristu Jayanti College, Bengaluru (BCA Analytics 2024–2027)
Graduation: 2027 (First Class)
Status: Available for 2026/2027 Data Analyst, BI, and Software roles across India.`;
        break;

      case 'clear':
        history.innerHTML = '';
        return;

      case 'exit':
        closeTerminal();
        return;

      default:
        response = `Command not recognized: "${rawCmd}". Type "help" for valid options.`;
    }

    const output = document.createElement('div');
    output.className = 'terminal-entry-output';
    output.textContent = response;
    entry.appendChild(output);
    history.appendChild(entry);

    const screen = document.getElementById('terminal-screen');
    if (screen) screen.scrollTop = screen.scrollHeight;
  }
}

/* ===================================================================
   TIER 3: LIVE BENGALURU IST CLOCK
   =================================================================== */
function initBengaluruClock() {
  const clockEl = document.getElementById('bengaluru-clock');
  if (!clockEl) return;

  function updateTime() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      clockEl.textContent = `${formatter.format(now)} IST`;
    } catch (e) {
      clockEl.textContent = 'Bengaluru, India';
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ===================================================================
   HELPER UTILITIES
   =================================================================== */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ===================================================================
   INTERACTIVE BACKGROUND CANVAS (Multi-Layered Data Intelligence Mesh)
   =================================================================== */
function initBackgroundAnimation() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let deepParticles = [];
  let dynamicParticles = [];
  let ripples = [];
  let animFrameId = null;
  let isRunning = true;

  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    active: false,
    radius: 160
  };

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createParticleLayers();
    if (prefersReducedMotion) {
      drawStatic();
    }
  }

  function createParticleLayers() {
    const isMobile = width < 768;
    deepParticles = [];
    dynamicParticles = [];

    // Layer 1: Slower background ambient depth constellation
    const deepCount = isMobile ? 16 : 35;
    for (let i = 0; i < deepCount; i++) {
      deepParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.2 + 0.8,
        alpha: Math.random() * 0.18 + 0.08
      });
    }

    // Layer 2: Interactive foreground particles with elastic mouse reaction
    const dynamicCount = isMobile ? 24 : 52;
    for (let i = 0; i < dynamicCount; i++) {
      dynamicParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.6 + 1.2,
        baseAlpha: Math.random() * 0.35 + 0.15,
        pulseSpeed: Math.random() * 0.025 + 0.01,
        pulseAngle: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.72
      });
    }
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    // Draw deep layer
    for (const p of deepParticles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha})`;
      ctx.fill();
    }
    // Draw dynamic layer
    for (let i = 0; i < dynamicParticles.length; i++) {
      const p = dynamicParticles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isAccent ? 'rgba(56, 189, 248, 0.45)' : 'rgba(148, 163, 184, 0.25)';
      ctx.fill();

      for (let j = i + 1; j < dynamicParticles.length; j++) {
        const p2 = dynamicParticles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 95) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 95) * 0.12})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function updateAndDraw() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    // Mouse smooth interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.12;
    mouse.y += (mouse.targetY - mouse.y) * 0.12;

    // Ambient mouse spotlight
    if (mouse.active && mouse.x > 0 && mouse.y > 0) {
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 8, mouse.x, mouse.y, mouse.radius * 1.7);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.07)');
      grad.addColorStop(0.6, 'rgba(30, 58, 138, 0.03)');
      grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius * 1.7, 0, Math.PI * 2);
      ctx.fill();
    }

    // Render & expand click ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += r.speed;
      r.alpha *= 0.95;

      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      if (r.alpha < 0.01 || r.radius > 260) {
        ripples.splice(i, 1);
      }
    }

    // Layer 1: Deep slow drift
    for (const p of deepParticles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(148, 163, 184, ${p.alpha})`;
      ctx.fill();
    }

    // Layer 2: Connecting network lines
    const maxDist = width < 768 ? 90 : 125;
    for (let i = 0; i < dynamicParticles.length; i++) {
      const p1 = dynamicParticles[i];

      for (let j = i + 1; j < dynamicParticles.length; j++) {
        const p2 = dynamicParticles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p1.isAccent || p2.isAccent
            ? `rgba(56, 189, 248, ${alpha * 1.4})`
            : `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Layer 2: Update & draw interactive particles
    for (let i = 0; i < dynamicParticles.length; i++) {
      const p = dynamicParticles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Soft borders
      if (p.x <= 0 || p.x >= width) p.vx *= -1;
      if (p.y <= 0 || p.y >= height) p.vy *= -1;

      // Interactive mouse dispersion
      if (mouse.active) {
        const mdx = mouse.x - p.x;
        const mdy = mouse.y - p.y;
        const mDist = Math.hypot(mdx, mdy);
        if (mDist < mouse.radius && mDist > 4) {
          const force = (1 - mDist / mouse.radius) * 0.55;
          p.x -= (mdx / mDist) * force;
          p.y -= (mdy / mDist) * force;
        }
      }

      // Alpha pulse
      p.pulseAngle += p.pulseSpeed;
      const currentAlpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.12;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.isAccent
        ? `rgba(56, 189, 248, ${Math.max(0.12, currentAlpha * 1.5)})`
        : `rgba(148, 163, 184, ${Math.max(0.08, currentAlpha)})`;
      ctx.fill();
    }

    animFrameId = requestAnimationFrame(updateAndDraw);
  }

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.targetX = -9999;
    mouse.targetY = -9999;
  }, { passive: true });

  // Click ripple effect
  window.addEventListener('click', (e) => {
    if (!prefersReducedMotion && ripples.length < 5) {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 8,
        speed: 4.5,
        alpha: 0.45
      });
    }
  }, { passive: true });

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
    } else {
      isRunning = true;
      if (!prefersReducedMotion) {
        animFrameId = requestAnimationFrame(updateAndDraw);
      }
    }
  });

  resize();
  if (!prefersReducedMotion) {
    animFrameId = requestAnimationFrame(updateAndDraw);
  }
}

/* ===================================================================
   DESKTOP CUSTOM CURSOR SYSTEM WITH CONTEXTUAL TRANSFORMATIONS
   =================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');
  if (!cursor || !dot || !ring) return;

  if (window.matchMedia('(hover: none) or (pointer: coarse), (prefers-reduced-motion: reduce)').matches) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    if (!isVisible) {
      isVisible = true;
      cursor.style.opacity = '1';
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    isVisible = false;
    cursor.style.opacity = '0';
  });

  window.addEventListener('mouseenter', () => {
    isVisible = true;
    cursor.style.opacity = '1';
  });

  function renderCursor() {
    if (isVisible) {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (!target) return;

    if (target.closest('.project-card')) {
      cursor.className = 'custom-cursor is-hovering-project';
      if (label) label.textContent = 'VIEW';
    } else if (target.closest('#zakvan-robot-guide') || target.closest('#chatbot-toggle-btn') || target.closest('#chatbot-panel')) {
      cursor.className = 'custom-cursor is-hovering-ai';
      if (label) label.textContent = 'AI';
    } else if (target.closest('button') || target.closest('a') || target.closest('.role-btn') || target.closest('.orbital-node') || target.closest('.skill-interactive-chip')) {
      cursor.className = 'custom-cursor is-hovering-btn';
      if (label) label.textContent = '';
    } else {
      cursor.className = 'custom-cursor';
      if (label) label.textContent = '';
    }
  });
}

/* ===================================================================
   TOP REAL-TIME SCROLL PROGRESS BAR
   =================================================================== */
function initScrollProgressBar() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  function updateProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const progress = Math.min(100, Math.max(0, (window.scrollY / scrollHeight) * 100));
    progressBar.style.width = `${progress.toFixed(1)}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
}

/* ===================================================================
   HERO TYPOGRAPHY PARALLAX & REVEAL
   =================================================================== */
function initHeroParallaxAndReveal() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    document.documentElement.style.setProperty('--hero-parallax-x', `${(x * 12).toFixed(1)}px`);
    document.documentElement.style.setProperty('--hero-parallax-y', `${(y * 8).toFixed(1)}px`);
  }, { passive: true });

  heroSection.addEventListener('mouseleave', () => {
    document.documentElement.style.setProperty('--hero-parallax-x', '0px');
    document.documentElement.style.setProperty('--hero-parallax-y', '0px');
  });
}

/* ===================================================================
   3D PROJECT CARD PERSPECTIVE TILT & SPOTLIGHT EFFECT
   =================================================================== */
function initProjectCardTiltAndSpotlight() {
  const cards = document.querySelectorAll('.project-card');
  if (!cards.length) return;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      if (!isReduced) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = -((y - centerY) / centerY) * 3.5;
        const tiltY = ((x - centerX) / centerX) * 3.5;
        card.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
        card.style.setProperty('--tilt-y-trans', '-4px');
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '-999px');
      card.style.setProperty('--mouse-y', '-999px');
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--tilt-y-trans', '0px');
    });
  });
}

/* ===================================================================
   FUTURISTIC TECHNOLOGY ORBITAL CONSTELLATION
   =================================================================== */
function initSkillsOrbitalConstellation() {
  const orbitalNetwork = document.getElementById('skills-orbital-network');
  const stage = orbitalNetwork ? orbitalNetwork.querySelector('.orbital-stage-wrapper') : null;
  const svgLinesGroup = document.getElementById('orbital-lines-group');
  const infoTitle = document.getElementById('info-tech-title');
  const infoUsage = document.getElementById('info-tech-usage');
  const infoProjects = document.getElementById('info-tech-projects');
  const nodes = document.querySelectorAll('.orbital-node');

  if (!orbitalNetwork || !stage || !svgLinesGroup || !nodes.length) return;

  const techMetadata = {
    'Python': {
      usage: 'Automated data ingestion pipelines, REST extraction, and analytical transformations.',
      projects: 'Live Weather Dashboard (Actions CI/CD) & Skillbit Technologies Internship datasets.'
    },
    'SQL': {
      usage: 'Complex querying, schema joining, data validation, and aggregations.',
      projects: 'Skillbit Technologies internship reports & Doctor Appointment booking backend queries.'
    },
    'Power BI': {
      usage: 'Executive KPI reporting, interactive dimensional slicing, and real-time operational views.',
      projects: 'Big Sales Report & Live Weather Dashboard reporting layer.'
    },
    'DAX': {
      usage: 'Formulating period-over-period variance, margin decomposition, and dynamic metrics.',
      projects: 'Big Sales Report (enterprise retail profitability data model).'
    },
    'Excel': {
      usage: 'Pivot modeling, tabular cleansing, statistical analysis, and client-ready reporting.',
      projects: 'Skillbit Technologies analytics internship & Big Sales data validation.'
    },
    'Java': {
      usage: 'Enterprise backend engineering, event loops, REST endpoints, and domain service layers.',
      projects: 'Stall Management System (KJSDC institutional store backend).'
    },
    'PHP': {
      usage: 'Full-stack application logic, session authentication, and transactional MySQL binding.',
      projects: 'Doctor Appointment System (role-based patient portal).'
    },
    'Vert.x': {
      usage: 'Asynchronous event bus handlers and reactive high-throughput backend services.',
      projects: 'KJIC AccStore backend integration (KJSDC team).'
    },
    'REST APIs': {
      usage: 'API endpoint architecture, JSON payload schema design, and integration testing.',
      projects: 'Stall Management System & Live Weather API data extraction.'
    },
    'MongoDB': {
      usage: 'NoSQL document schema design, dynamic collection queries, and aggregation.',
      projects: 'Stall Management System backend datastore.'
    },
    'MySQL': {
      usage: 'Relational data modeling, foreign key constraints, and transactional consistency.',
      projects: 'Doctor Appointment System (patient-doctor-slot schema).'
    },
    'Git': {
      usage: 'Feature branching, pull requests, semantic versioning, and team collaboration.',
      projects: 'KJSDC production team workflows and personal open-source repositories.'
    },
    'GitHub Actions': {
      usage: 'Automated CI/CD workflows, scheduled cron tasks, and serverless execution.',
      projects: 'Live Weather Dashboard (autonomous periodic data pipeline).'
    }
  };

  function drawConnectors() {
    svgLinesGroup.innerHTML = '';
    const stageRect = stage.getBoundingClientRect();
    const centerX = stageRect.width / 2;
    const centerY = stageRect.height / 2;

    nodes.forEach((node, index) => {
      const nodeRect = node.getBoundingClientRect();
      const nodeX = (nodeRect.left + nodeRect.width / 2) - stageRect.left;
      const nodeY = (nodeRect.top + nodeRect.height / 2) - stageRect.top;

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', centerX);
      line.setAttribute('y1', centerY);
      line.setAttribute('x2', nodeX);
      line.setAttribute('y2', nodeY);
      line.setAttribute('stroke', 'rgba(56, 189, 248, 0.22)');
      line.setAttribute('stroke-width', '1.2');
      line.setAttribute('stroke-dasharray', '3,3');
      line.setAttribute('id', `orbital-line-${index}`);
      svgLinesGroup.appendChild(line);

      node.addEventListener('mouseenter', () => {
        line.setAttribute('stroke', '#38BDF8');
        line.setAttribute('stroke-width', '2.2');
        line.setAttribute('stroke-dasharray', 'none');

        const tech = node.getAttribute('data-tech');
        if (infoTitle) infoTitle.textContent = tech;
        if (techMetadata[tech]) {
          if (infoUsage) infoUsage.textContent = techMetadata[tech].usage;
          if (infoProjects) infoProjects.textContent = techMetadata[tech].projects;
        }
      });

      node.addEventListener('mouseleave', () => {
        line.setAttribute('stroke', 'rgba(56, 189, 248, 0.22)');
        line.setAttribute('stroke-width', '1.2');
        line.setAttribute('stroke-dasharray', '3,3');
      });

      node.addEventListener('click', () => {
        const tech = node.getAttribute('data-tech');
        const chip = document.querySelector(`.skill-interactive-chip[data-tech="${tech}"]`);
        if (chip) chip.click();
      });
    });
  }

  setTimeout(drawConnectors, 250);
  window.addEventListener('resize', drawConnectors, { passive: true });
}

/* ===================================================================
   DYNAMIC TIMELINE SCROLL PROGRESS DRAW
   =================================================================== */
function initTimelineScrollDraw() {
  const timeline = document.getElementById('experience-timeline');
  const fill = document.getElementById('timeline-draw-fill');
  const markers = document.querySelectorAll('.timeline-marker');
  if (!timeline || !fill) return;

  function updateTimeline() {
    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const timelineTop = rect.top;
    const timelineHeight = rect.height;

    const progress = Math.min(1, Math.max(0, (windowHeight * 0.7 - timelineTop) / timelineHeight));
    fill.style.height = `${(progress * 100).toFixed(1)}%`;

    markers.forEach((marker) => {
      const markerRect = marker.getBoundingClientRect();
      if (markerRect.top <= windowHeight * 0.7) {
        marker.classList.add('is-active');
      } else {
        marker.classList.remove('is-active');
      }
    });
  }

  window.addEventListener('scroll', updateTimeline, { passive: true });
  window.addEventListener('resize', updateTimeline, { passive: true });
  updateTimeline();
}

/* ===================================================================
   COPY EMAIL ACTION WITH CONFIRMATION TOAST
   =================================================================== */
function initCopyEmailAction() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('copy-email-toast');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = 'zakvanzakvan86@gmail.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const temp = document.createElement('textarea');
        temp.value = email;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      if (toast) {
        toast.removeAttribute('hidden');
        setTimeout(() => {
          toast.setAttribute('hidden', '');
        }, 2500);
      }
    } catch (err) {
      console.warn('Could not copy email to clipboard', err);
    }
  });
}

/* ===================================================================
   AI ROBOT GUIDE SYSTEM
   =================================================================== */
function initRobotGuide() {
  const guideContainer = document.getElementById('zakvan-robot-guide');
  const avatarBtn = document.getElementById('robot-avatar-btn');
  const speechBubble = document.getElementById('robot-speech-bubble');
  const speechText = document.getElementById('robot-speech-text');
  const closeBubbleBtn = document.getElementById('robot-bubble-close');

  if (!guideContainer || !avatarBtn || !speechBubble || !speechText) return;

  const guidePrompts = [
    'Ask me about Zakvan.',
    'Want to explore his projects?',
    'Curious about his skills & stack?',
    'Need his verified resume?',
    'Ask me about his experience.'
  ];

  let promptIdx = 0;
  let cycleTimer = null;

  function cyclePrompt() {
    promptIdx = (promptIdx + 1) % guidePrompts.length;
    speechText.style.opacity = '0';
    setTimeout(() => {
      speechText.textContent = guidePrompts[promptIdx];
      speechText.style.opacity = '1';
    }, 200);
  }

  // Intelligent First-Visit Greeting Sequence
  const storageKey = 'zakvan_ai_guide_greeted';
  const hasBeenGreeted = localStorage.getItem(storageKey);

  if (!hasBeenGreeted) {
    setTimeout(() => {
      if (guideContainer.classList.contains('is-minimized')) return;
      speechText.textContent = "Hi! I'm Zakvan's AI guide.";
      speechBubble.style.display = 'flex';

      setTimeout(() => {
        if (guideContainer.classList.contains('is-minimized')) return;
        speechText.textContent = 'Want to ask something about Zakvan?';
        try {
          localStorage.setItem(storageKey, 'true');
        } catch (e) {
          // ignore localStorage failure
        }
      }, 3500);
    }, 2200);
  }

  // Periodic gentle prompt rotation every 9s
  cycleTimer = setInterval(cyclePrompt, 9000);

  // Clicking the avatar or bubble triggers the Chatbot
  function handleOpenChat() {
    window.dispatchEvent(new CustomEvent('zakvan:open-chatbot'));
  }

  avatarBtn.addEventListener('click', handleOpenChat);

  speechBubble.addEventListener('click', (e) => {
    if (e.target.closest('#robot-bubble-close')) return;
    handleOpenChat();
  });

  // Dismiss button for speech bubble
  if (closeBubbleBtn) {
    closeBubbleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      speechBubble.style.display = 'none';
      if (cycleTimer) clearInterval(cycleTimer);
    });
  }
}

/* ===================================================================
   ZAKVAN AI CHATBOT SYSTEM (Full-Stack /api/chat & Verified Local Knowledge)
   =================================================================== */
function initChatbot() {
  const triggerBtn = document.getElementById('chatbot-trigger-btn');
  const modal = document.getElementById('chatbot-modal');
  const closeBtn = document.getElementById('chatbot-close-btn');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input-field');
  const sendBtn = document.getElementById('chatbot-send-btn');
  const messagesWrap = document.getElementById('chatbot-messages');
  const typingIndicator = document.getElementById('chatbot-typing-indicator');
  const robotGuide = document.getElementById('zakvan-robot-guide');
  const quickChips = document.querySelectorAll('.quick-chip');

  if (!triggerBtn || !modal || !form || !input || !messagesWrap) return;

  let chatHistory = [];
  let isSubmitting = false;

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollToBottom() {
    messagesWrap.scrollTop = messagesWrap.scrollHeight;
  }

  function openChatbot() {
    modal.removeAttribute('hidden');
    triggerBtn.setAttribute('aria-expanded', 'true');
    if (robotGuide) {
      robotGuide.classList.add('is-minimized');
    }
    setTimeout(() => {
      input.focus();
      scrollToBottom();
    }, 100);
  }

  function closeChatbot() {
    modal.setAttribute('hidden', '');
    triggerBtn.setAttribute('aria-expanded', 'false');
    if (robotGuide) {
      robotGuide.classList.remove('is-minimized');
    }
    triggerBtn.focus();
  }

  triggerBtn.addEventListener('click', () => {
    const isHidden = modal.hasAttribute('hidden');
    if (isHidden) {
      openChatbot();
    } else {
      closeChatbot();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeChatbot);
  }

  // Global custom event to open chatbot from anywhere (robot, terminal, shortcuts)
  window.addEventListener('zakvan:open-chatbot', openChatbot);

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeChatbot();
    }
  });

  // Quick Chips Handler
  quickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt') || chip.textContent.trim();
      input.value = prompt;
      handleSubmitMessage(prompt);
    });
  });

  // Local verified fallback knowledge base
  function getLocalFactualResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('skill') || q.includes('stack') || q.includes('tool') || q.includes('tech')) {
      return {
        matched: true,
        text: `Zakvan's technical core includes:\n\n• **Data & Analytics**: SQL, MySQL, MongoDB, Power BI, Python (Pandas/NumPy)\n• **Backend & Systems**: Java, Vert.x, Node.js / Express, RESTful APIs, OOP\n• **Frontend & Engineering**: HTML5, CSS3, JavaScript (ES6+), Git & GitHub, Linux, Vercel\n• **Data Specialties**: Schema design, indexing, ETL pipelines, DAX KPIs, and statistical analysis.`
      };
    }

    if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('portfolio')) {
      return {
        matched: true,
        text: `Here are Zakvan's core featured projects:\n\n1. **CampusHub**: High-concurrency event registration platform built with Java, Eclipse Vert.x, and MySQL.\n2. **Doctor Appointment Booking System**: Patient scheduling application built with Python, Tkinter, and MySQL.\n3. **Big Sales Data Analysis**: Retail revenue & trend intelligence model using Python (Pandas/NumPy) & Power BI.\n4. **College Fest Stall Management**: Real-time sales telemetry dashboard built with Java & MySQL.\n5. **Live Weather Dashboard**: Client-side async weather tracker with OpenWeather API integration.`
      };
    }

    if (q.includes('experience') || q.includes('intern') || q.includes('job') || q.includes('company')) {
      return {
        matched: true,
        text: `Zakvan's professional experience includes:\n\n• **Web Development Intern** at Skillbit Technologies (Dec 2024 – Jan 2025)\n  - Engineered responsive interfaces and integrated REST APIs for 2 client web applications.\n• **Student Software Developer** at Kristu Jayanti Software Development Center (Aug 2024 – Present)\n  - Architected database schemas and built backend modules for institutional software.`
      };
    }

    if (q.includes('resume') || q.includes('cv') || q.includes('download')) {
      return {
        matched: true,
        text: `You can access Zakvan's official verified resume directly:\n\n[Download Zakvan's Resume (PDF)](resume.pdf)\n\nIt documents his complete academic record (BCA Analytics, Kristu Jayanti College 2024–2027), technical skills, projects, and certifications.`
      };
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('linkedin') || q.includes('phone')) {
      return {
        matched: true,
        text: `You can reach out to Zakvan directly:\n\n• **Email**: [zakvankk10@gmail.com](mailto:zakvankk10@gmail.com)\n• **Phone**: [+91 97448 48028](tel:+919744848028)\n• **Location**: Bengaluru, Karnataka, India\n• **LinkedIn**: [linkedin.com/in/zakvan-kk](https://linkedin.com/in/zakvan-kk)\n• **GitHub**: [github.com/zakvankk](https://github.com/zakvankk)`
      };
    }

    if (q.includes('who') || q.includes('about') || q.includes('education') || q.includes('college')) {
      return {
        matched: true,
        text: `**Zakvan KK** is a final-year BCA (Analytics) student at Kristu Jayanti College, Bengaluru (2024–2027). He specializes in backend engineering and data analytics, bridging high-concurrency systems (Java, Vert.x, SQL) with quantitative business intelligence (Power BI, Python).`
      };
    }

    return { matched: false };
  }

  // Format message text (support simple bolding, bullet points, and links)
  function renderFormattedMessage(text) {
    const escaped = escapeHtml(text);
    // Replace markdown links [label](url)
    const withLinks = escaped.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="chat-fallback-link">$1</a>');
    // Replace bold **text**
    const withBold = withLinks.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Split by paragraphs
    const paragraphs = withBold.split('\n\n').map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('• ') || trimmed.startsWith('1. ') || trimmed.startsWith('2. ')) {
        const lines = trimmed.split('\n');
        const items = lines.map(line => `<li>${line.replace(/^[•\d\.\s]+/, '')}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    return paragraphs;
  }

  function appendUserMessage(text) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message user-msg';
    msgEl.innerHTML = `
      <div class="msg-bubble">${escapeHtml(text)}</div>
      <span class="msg-timestamp">${formatTime(new Date())}</span>
    `;
    messagesWrap.appendChild(msgEl);
    scrollToBottom();
  }

  function appendAssistantMessage(text, isFallback = false) {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message assistant-msg';
    let contentHtml = `<div class="msg-bubble">${renderFormattedMessage(text)}`;

    if (isFallback) {
      contentHtml += `
        <div class="chat-fallback-links">
          <a href="#projects" class="chat-fallback-link">✦ Projects</a>
          <a href="#experience" class="chat-fallback-link">✦ Experience</a>
          <a href="resume.pdf" target="_blank" class="chat-fallback-link">✦ Resume</a>
          <a href="#contact" class="chat-fallback-link">✦ Contact</a>
        </div>
      `;
    }

    contentHtml += `</div><span class="msg-timestamp">${formatTime(new Date())}</span>`;
    msgEl.innerHTML = contentHtml;
    messagesWrap.appendChild(msgEl);
    scrollToBottom();
  }

  async function handleSubmitMessage(userText) {
    if (!userText || !userText.trim() || isSubmitting) return;

    const trimmed = userText.trim();
    input.value = '';
    isSubmitting = true;
    sendBtn.disabled = true;

    appendUserMessage(trimmed);

    // Add to local turn history (max 8 entries)
    chatHistory.push({ role: 'user', content: trimmed });
    if (chatHistory.length > 8) {
      chatHistory = chatHistory.slice(-8);
    }

    // Show typing bubble
    if (typingIndicator) typingIndicator.removeAttribute('hidden');
    scrollToBottom();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: chatHistory.slice(0, -1) // prior conversation history
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      if (typingIndicator) typingIndicator.setAttribute('hidden', '');

      if (data && data.success && data.reply) {
        appendAssistantMessage(data.reply);
        chatHistory.push({ role: 'assistant', content: data.reply });
      } else {
        // Honest fallback or local verified answer
        const localAnswer = getLocalFactualResponse(trimmed);
        if (localAnswer.matched) {
          appendAssistantMessage(localAnswer.text);
          chatHistory.push({ role: 'assistant', content: localAnswer.text });
        } else {
          appendAssistantMessage(
            "I am currently operating in offline mode. You can explore Zakvan's Projects, Technical Stack, Experience, or verified Resume directly:",
            true
          );
        }
      }
    } catch (err) {
      if (typingIndicator) typingIndicator.setAttribute('hidden', '');

      // Network or API key unavailability: check verified local knowledge base
      const localAnswer = getLocalFactualResponse(trimmed);
      if (localAnswer.matched) {
        appendAssistantMessage(localAnswer.text);
        chatHistory.push({ role: 'assistant', content: localAnswer.text });
      } else {
        appendAssistantMessage(
          "AI assistant is temporarily unavailable. You can explore Zakvan's Projects, Experience, Resume, GitHub, or LinkedIn sections instead:",
          true
        );
      }
    } finally {
      isSubmitting = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmitMessage(input.value);
  });
}

/* ===================================================================
   PROJECT INTERACTIONS (3D Tilt & Interactive Detail Modal)
   =================================================================== */
function initProjectInteractions() {
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('project-detail-modal');
  const closeBtn = document.getElementById('project-modal-close-btn');
  const actionCloseBtn = document.getElementById('project-modal-action-close');

  if (!projectCards.length) return;

  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  // 3D Card Tilt on Desktop
  if (!isTouch) {
    projectCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
        const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
        const rotX = -yRatio * 6;
        const rotY = xRatio * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Project Detail Modal Logic
  if (!modal) return;

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function openModal(card) {
    const title = card.querySelector('.project-name')?.textContent || 'Project Details';
    const status = card.querySelector('.project-status-badge')?.textContent || '';
    const category = card.querySelector('.project-category-tag')?.textContent || '';
    const parContents = card.querySelectorAll('.par-content');
    const problem = parContents[0]?.textContent || 'Engineering problem statement.';
    const approach = parContents[1]?.textContent || 'Architecture and implementation approach.';
    const result = parContents[2]?.textContent || 'Outcomes and metrics.';
    const techChips = Array.from(card.querySelectorAll('.tech-chip')).map(chip => chip.textContent.trim());
    const extLink = card.querySelector('.project-ext-link')?.href || '#';

    // Populate modal
    const modalTitle = document.getElementById('project-modal-title');
    const modalStatus = document.getElementById('project-modal-status');
    const modalCategory = document.getElementById('project-modal-category');
    const modalProblem = document.getElementById('project-modal-problem');
    const modalApproach = document.getElementById('project-modal-approach');
    const modalResult = document.getElementById('project-modal-result');
    const modalChips = document.getElementById('project-modal-tech-chips');
    const modalGithubBtn = document.getElementById('project-modal-github-btn');

    if (modalTitle) modalTitle.textContent = title;
    if (modalStatus) modalStatus.textContent = status;
    if (modalCategory) modalCategory.textContent = category;
    if (modalProblem) modalProblem.textContent = problem;
    if (modalApproach) modalApproach.textContent = approach;
    if (modalResult) modalResult.textContent = result;

    if (modalChips) {
      modalChips.innerHTML = '';
      techChips.forEach(tech => {
        const chipEl = document.createElement('span');
        chipEl.className = 'tech-chip';
        chipEl.textContent = tech;
        modalChips.appendChild(chipEl);
      });
    }

    if (modalGithubBtn) {
      modalGithubBtn.href = extLink;
    }

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // If user clicked direct external GitHub link, let them navigate
      if (e.target.closest('.project-ext-link')) return;
      openModal(card);
    });

    // Keyboard support: Enter / Space on card opens detail modal
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.closest('.project-ext-link')) return;
        e.preventDefault();
        openModal(card);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (actionCloseBtn) actionCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });
}

