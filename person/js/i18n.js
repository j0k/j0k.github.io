(function () {
  var params = new URLSearchParams(window.location.search);
  var lang = (params.get('lang') || 'ru').toLowerCase();
  if (lang !== 'en' && lang !== 'ru') lang = 'ru';

  window.getLang = function () { return lang; };

  function getByPath(obj, key) {
    var parts = key.split('.');
    var v = obj;
    for (var i = 0; i < parts.length; i++) v = v && v[parts[i]];
    return typeof v === 'string' ? v : '';
  }

  window.t = function (key) {
    return window.i18n ? getByPath(window.i18n, key) : '';
  };

  function applyToDOM() {
    if (!window.i18n) return;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (key) el.textContent = window.t(key);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', window.t(key));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', window.t(key));
    });

    document.querySelectorAll('.lang-option').forEach(function (el) {
      var l = el.getAttribute('data-lang');
      el.href = (location.pathname || '/') + '?lang=' + l + (location.hash || '');
      el.classList.toggle('active', l === lang);
    });
  }

  window.i18nReady = fetch('person/data/i18n/' + lang + '.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      window.i18n = data;
      applyToDOM();
      return data;
    })
    .catch(function () {
      window.i18n = {};
      document.documentElement.lang = lang;
      return {};
    });
})();
