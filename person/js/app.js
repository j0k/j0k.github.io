(function () {
  var episodes = [];
  var products = [];
  var map = null;
  var episodeMap = null;

  function getLang() {
    return (window.getLang && window.getLang()) || 'ru';
  }

  function getText(obj, key) {
    if (!obj) return '';
    var lang = getLang();
    var v = obj[key + '_' + lang] || obj[key];
    return typeof v === 'string' ? v : '';
  }

  function t(key) {
    return window.t ? window.t(key) : '';
  }

  function getBase() {
    var base = document.querySelector('script[src*="app.js"]');
    return base ? base.src.replace(/\/js\/app\.js.*$/, '/') : '';
  }

  function fetchJSON(url) {
    return fetch(url).then(function (r) { return r.json(); });
  }

  function loadEpisodes() {
    return fetchJSON('person/data/episodes.json').then(function (ids) {
      return Promise.all(ids.map(function (id) {
        return fetchJSON('person/data/' + id + '/episode.json');
      }));
    }).then(function (list) {
      episodes = list;
      return episodes;
    });
  }

  function loadProducts() {
    return fetchJSON('person/data/products.json').then(function (list) {
      products = Array.isArray(list) ? list : [];
      return products;
    });
  }

  function renderProducts() {
    var track = document.getElementById('productsTrack');
    if (!track) return;
    track.innerHTML = products.map(function (p) {
      var title = escapeHtml(getText(p, 'title') || '');
      var sub = getText(p, 'subtitle');
      var titleAttr = sub.trim() ? ' title="' + escapeHtml(sub.trim()) + '"' : '';
      return '<li class="product-card"' + titleAttr + '><span class="product-card-placeholder"></span><span class="product-card-title">' + title + '</span></li>';
    }).join('');
  }

  function renderCarousel() {
    var track = document.getElementById('episodesTrack');
    if (!track) return;
    track.innerHTML = episodes.map(function (ep) {
      var cover = ep.cover
        ? '<div class="episode-cover"><img src="person/' + ep.cover + '" alt=""></div>'
        : '<div class="episode-cover episode-cover-placeholder"></div>';
      var typeKey = ep.type || 'chapter';
      var typeLabel = t('episodeTypes.' + typeKey) || typeKey;
      var title = escapeHtml(getText(ep, 'title') || '');
      return '<li class="episode-card">' +
        '<a href="' + (location.pathname || '') + '?lang=' + getLang() + '#' + ep.id + '" class="episode-card-link">' +
        cover +
        '<span class="episode-type">' + escapeHtml(typeLabel) + '</span>' +
        '<span class="episode-title">' + title + '</span>' +
        '<span class="episode-year">' + (ep.year || '') + '</span>' +
        '</a></li>';
    }).join('');

    var cardWidth = 180 + 20;
    var scrollAmount = cardWidth * 2;
    var prevBtn = document.querySelector('.episodes-nav-btn.prev');
    var nextBtn = document.querySelector('.episodes-nav-btn.next');
    if (prevBtn) prevBtn.addEventListener('click', function () { track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
    if (nextBtn) nextBtn.addEventListener('click', function () { track.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
  }

  function escapeHtml(s) {
    if (!s) return '';
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function initMap() {
    var container = document.getElementById('map');
    if (!container || map) return;
    map = L.map('map').setView([55.7558, 37.6173], 2);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var bounds = [];
    episodes.forEach(function (ep) {
      (ep.locations || []).forEach(function (loc) {
        var lat = loc.lat, lon = loc.lon;
        bounds.push([lat, lon]);
        var epTitle = getText(ep, 'title');
        var locName = getText(loc, 'name');
        L.marker([lat, lon]).addTo(map).bindPopup('<strong>' + escapeHtml(epTitle) + '</strong><br>' + escapeHtml(locName));
      });
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [20, 20], maxZoom: 10 });
  }

  function showEpisode(id) {
    var ep = episodes.find(function (e) { return e.id === id; });
    if (!ep) return;

    var detail = document.getElementById('episodeDetail');
    var home = document.getElementById('homePage');
    var episodesSection = document.getElementById('episodesSection');
    var productsSection = document.getElementById('productsSection');
    var mapSection = document.getElementById('mapSection');
    if (detail) detail.hidden = false;
    if (home) home.hidden = true;
    if (episodesSection) episodesSection.hidden = true;
    if (productsSection) productsSection.hidden = true;
    if (mapSection) mapSection.hidden = true;

    var typeKey = ep.type || 'chapter';
    document.getElementById('episodeDetailType').textContent = t('episodeTypes.' + typeKey) || typeKey;
    document.getElementById('episodeDetailTitle').textContent = getText(ep, 'title');
    document.getElementById('episodeDetailYear').textContent = ep.year || '';

    var desc = getText(ep, 'description');
    var body = document.getElementById('episodeDetailBody');
    body.innerHTML = '<p>' + escapeHtml(desc || '').replace(/\n/g, '</p><p>') + '</p>';

    var backLink = document.getElementById('episodeBack');
    if (backLink) backLink.href = (location.pathname || '') + '?lang=' + getLang() + '#';

    var timelineWrap = document.getElementById('episodeTimelineWrap');
    var timelineEl = document.getElementById('episodeTimeline');
    if (ep.events && ep.events.length > 0 && timelineWrap && timelineEl) {
      timelineWrap.hidden = false;
      timelineEl.innerHTML = '<div class="timeline-line" aria-hidden="true"></div>' +
        '<div class="timeline-events">' +
        ep.events.map(function (ev) {
          return '<div class="timeline-event">' +
            '<span class="timeline-dot"></span>' +
            '<span class="timeline-date">' + escapeHtml(ev.date || '') + '</span>' +
            '<span class="timeline-label">' + escapeHtml(getText(ev, 'label') || '') + '</span>' +
            '</div>';
        }).join('') +
        '</div>';
    } else {
      if (timelineWrap) timelineWrap.hidden = true;
    }

    var locEl = document.getElementById('episodeDetailLocations');
    if (ep.locations && ep.locations.length) {
      locEl.innerHTML = '<h3>' + t('episode.locations') + '</h3><ul class="location-list">' +
        ep.locations.map(function (l) { return '<li>' + escapeHtml(getText(l, 'name')) + '</li>'; }).join('') + '</ul>';
      locEl.hidden = false;
    } else {
      locEl.hidden = true;
    }

    var mapWrap = document.getElementById('episodeMapWrap');
    if (ep.locations && ep.locations.length) {
      if (mapWrap) mapWrap.hidden = false;
      if (!episodeMap) {
        episodeMap = L.map('episodeMap').setView([ep.locations[0].lat, ep.locations[0].lon], 10);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(episodeMap);
      }
      episodeMap.eachLayer(function (layer) {
        if (layer instanceof L.Marker) episodeMap.removeLayer(layer);
      });
      var b = ep.locations.map(function (l) { return [l.lat, l.lon]; });
      ep.locations.forEach(function (l) {
        L.marker([l.lat, l.lon]).addTo(episodeMap).bindPopup(escapeHtml(getText(l, 'name')));
      });
      episodeMap.fitBounds(b, { padding: [20, 20], maxZoom: 14 });
    } else {
      if (mapWrap) mapWrap.hidden = true;
    }

    var linksEl = document.getElementById('episodeDetailLinks');
    if (ep.links && ep.links.length) {
      linksEl.innerHTML = '<h3>' + t('episode.links') + '</h3><ul class="episode-links-list">' +
        ep.links.map(function (l) {
          return '<li><a href="' + escapeHtml(l.url) + '" target="_blank" rel="noopener">' + escapeHtml(getText(l, 'label') || l.url) + ' →</a></li>';
        }).join('') + '</ul>';
      linksEl.hidden = false;
    } else {
      linksEl.hidden = true;
    }

    var photosEl = document.getElementById('episodeDetailPhotos');
    if (ep.photos && ep.photos.length) {
      photosEl.innerHTML = '<h3>' + t('episode.photos') + '</h3><div class="episode-photos-grid">' +
        ep.photos.map(function (src) {
          var url = (src.indexOf('http') === 0 || src.indexOf('//') === 0) ? src : 'person/' + src;
          return '<img src="' + escapeHtml(url) + '" alt="" class="episode-photo">';
        }).join('') + '</div>';
      photosEl.hidden = false;
    } else {
      photosEl.hidden = true;
    }
  }

  function showHome() {
    document.getElementById('episodeDetail').hidden = true;
    document.getElementById('homePage').hidden = false;
    document.getElementById('episodesSection').hidden = false;
    var ps = document.getElementById('productsSection');
    if (ps) ps.hidden = false;
    document.getElementById('mapSection').hidden = false;
  }

  function route() {
    var hash = (location.hash || '').slice(1);
    if (hash && episodes.some(function (e) { return e.id === hash; })) {
      showEpisode(hash);
    } else {
      showHome();
    }
  }

  document.getElementById('episodeBack').addEventListener('click', function (e) {
    e.preventDefault();
    location.hash = '';
  });

  window.addEventListener('hashchange', route);

  (function initProductsCarousel() {
    var track = document.getElementById('productsTrack');
    var prevBtn = document.querySelector('.products-nav-btn.prev');
    var nextBtn = document.querySelector('.products-nav-btn.next');
    if (!track || !prevBtn || !nextBtn) return;
    var cardWidth = 180 + 20;
    var scrollAmount = cardWidth * 2;
    prevBtn.addEventListener('click', function () { track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }); });
    nextBtn.addEventListener('click', function () { track.scrollBy({ left: scrollAmount, behavior: 'smooth' }); });
  })();

  var init = function () {
    Promise.all([loadEpisodes(), loadProducts()]).then(function () {
      renderCarousel();
      renderProducts();
      initMap();
      route();
    });
  };

  if (window.i18nReady) {
    window.i18nReady.then(init);
  } else {
    init();
  }
})();
