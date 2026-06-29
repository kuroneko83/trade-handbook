(function () {
  'use strict';

  const STORAGE_KEY = 'trade-handbook-lang';
  const DEFAULT_LANG = 'pt';

  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

  const langButtons = document.querySelectorAll('.lang-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const menuToggle = document.getElementById('menuToggle');
  const tocLinks = document.querySelectorAll('.toc a');
  const sections = document.querySelectorAll('.section[id]');

  function setLang(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en' : 'ja';

    langButtons.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    var els = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < els.length; i++) {
      var key = els[i].dataset.i18n;
      var text = I18N[lang][key];
      if (text !== undefined) {
        els[i].innerHTML = text;
      }
    }
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    menuToggle.classList.remove('open');
  }

  function toggleSidebar() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
    menuToggle.classList.toggle('open');
  }

  function updateActiveToc() {
    var scrollY = window.scrollY + 100;
    var currentId = '';
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (section.offsetTop <= scrollY) {
        currentId = section.id;
      }
    }
    for (var j = 0; j < tocLinks.length; j++) {
      var link = tocLinks[j];
      var href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === currentId);
    }
  }

  // --- Event listeners ---

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(this.dataset.lang);
    });
  });

  menuToggle.addEventListener('click', toggleSidebar);

  overlay.addEventListener('click', closeSidebar);

  tocLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      closeSidebar();
    });
  });

  window.addEventListener('scroll', updateActiveToc);

  // --- Init ---
  setLang(currentLang);
  updateActiveToc();
})();
