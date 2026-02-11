(function () {
  var STORAGE_KEY = 'persona_resources';
  var SPAWN_INTERVAL_MS = 2000;
  var TYPES = ['balance', 'love', 'red_heart', 'money', 'energy', 'magic', 'tree', 'joy', 'goals', 'dance', 'body', 'boxing', 'mind', 'awareness', 'horses', 'golf', 'surf', 'parachute', 'tigers'];
  var ICONS = { balance: '☯', love: '♥', red_heart: '❤', money: '💰', energy: '⚡', magic: '✨', tree: '🌳', joy: '🌟', goals: '🎯', dance: '💃', body: '💪', boxing: '🥊', mind: '🧠', awareness: '🧘', horses: '🐴', golf: '⛳', surf: '🏄', parachute: '🪂', tigers: '🐯' };
  var SPEEDS = { balance: 0.52, love: 0.68, red_heart: 0.78, money: 0.62, energy: 0.88, magic: 0.58, tree: 0.48, joy: 0.72, goals: 0.55, dance: 0.75, body: 0.6, boxing: 0.7, mind: 0.58, awareness: 0.5, horses: 0.65, golf: 0.5, surf: 0.8, parachute: 0.72, tigers: 0.78 };
  var FREQUENCIES = { balance: 0.04, love: 0.09, red_heart: 0.11, money: 0.06, energy: 0.125, magic: 0.075, tree: 0.03, joy: 0.1, goals: 0.05, dance: 0.14, body: 0.07, boxing: 0.095, mind: 0.08, awareness: 0.065, horses: 0.07, golf: 0.055, surf: 0.1, parachute: 0.09, tigers: 0.085 };
  var AMPLITUDES = { balance: 28, love: 35, red_heart: 32, money: 25, energy: 40, magic: 30, tree: 22, joy: 38, goals: 26, dance: 42, body: 33, boxing: 36, mind: 30, awareness: 28, horses: 32, golf: 24, surf: 38, parachute: 35, tigers: 34 };
  var VALUE_IDS = { balance: 'resBalance', love: 'resLove', red_heart: 'resRedHeart', money: 'resMoney', energy: 'resEnergy', magic: 'resMagic', tree: 'resTree', joy: 'resJoy', goals: 'resGoals', dance: 'resDance', body: 'resBody', boxing: 'resBoxing', mind: 'resMind', awareness: 'resAwareness', horses: 'resHorses', golf: 'resGolf', surf: 'resSurf', parachute: 'resParachute', tigers: 'resTigers' };

  var values = { balance: 0, love: 0, red_heart: 0, money: 0, energy: 0, magic: 0, tree: 0, joy: 0, goals: 0, dance: 0, body: 0, boxing: 0, mind: 0, awareness: 0, horses: 0, golf: 0, surf: 0, parachute: 0, tigers: 0 };
  var floaters = [];
  var zone = document.getElementById('floatingZone');
  var animationId = null;
  var isPaused = true;
  var spawnIntervalId = null;

  function isMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  function load() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s) {
        var o = JSON.parse(s);
        TYPES.forEach(function (t) { if (typeof o[t] === 'number') values[t] = o[t]; });
      }
    } catch (e) {}
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch (e) {}
  }

  function updateBar() {
    TYPES.forEach(function (t) {
      var nodes = document.querySelectorAll('.resource[data-type="' + t + '"] .resource-value');
      for (var i = 0; i < nodes.length; i++) nodes[i].textContent = values[t];
    });
  }

  function initTicker() {
    var bar = document.getElementById('resourcesBar');
    var ticker = document.getElementById('resourcesTicker');
    if (!bar || !ticker) return;
    bar.classList.add('resources-bar--ticker');
    if (!ticker._tickerDuplicated) {
      var count = ticker.children.length;
      for (var i = 0; i < count; i++) {
        var copy = ticker.children[i].cloneNode(true);
        var val = copy.querySelector('.resource-value');
        if (val) val.removeAttribute('id');
        ticker.appendChild(copy);
      }
      ticker._tickerDuplicated = true;
    }
  }

  function addFloater(type) {
    if (!zone) return;
    var icon = ICONS[type];
    var isRed = type === 'red_heart';
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'floater' + (isRed ? ' floater--red' : '');
    el.setAttribute('data-type', type);
    el.innerHTML = icon;
    el.setAttribute('aria-label', 'Собрать ' + type);
    zone.appendChild(el);
    if (document.body.getAttribute('data-resource-highlight') === type) {
      el.classList.add('floater--highlight');
    }

    var baseAmp = AMPLITUDES[type] || 30;
    var amplitude = baseAmp * (0.75 + Math.random() * 0.5);
    var baseFreq = FREQUENCIES[type] || 0.075;
    var frequency = baseFreq * (0.85 + Math.random() * 0.3);
    var speed = (SPEEDS[type] || 0.6) * (0.9 + Math.random() * 0.2);
    var zoneHeight = zone.offsetHeight || 280;
    var baseY = zoneHeight * 0.3 + Math.random() * zoneHeight * 0.4;
    var startX = -40;
    var x = startX;
    var startTime = Date.now();

    function doCollect() {
      if (el._trajectorySvg && el._trajectorySvg.parentNode) el._trajectorySvg.remove();
      values[type]++;
      updateBar();
      save();
      el.remove();
      var idx = floaters.indexOf(obj);
      if (idx !== -1) floaters.splice(idx, 1);
    }

    el.addEventListener('click', doCollect);

    var obj = {
      el: el,
      type: type,
      x: startX,
      baseY: baseY,
      startX: startX,
      amplitude: amplitude,
      frequency: frequency,
      speed: speed,
      startTime: startTime
    };
    el._floaterObj = obj;
    floaters.push(obj);
    if (document.body.getAttribute('data-resource-highlight') === type) showTrajectoryForFloater(el, true);
  }

  function showTrajectoryForFloater(el, fromBar) {
    var obj = el._floaterObj;
    if (!obj || !zone) return;
    if (el._trajectorySvg && el._trajectorySvg.parentNode) el._trajectorySvg.remove();

    var w = zone.offsetWidth + 100;
    var h = zone.offsetHeight;
    var step = 6;
    var points = [];
    for (var x = obj.x; x <= w; x += step) {
      var y = obj.baseY + obj.amplitude * Math.sin((x - obj.startX) * obj.frequency);
      points.push(x + ',' + y);
    }
    if (points.length < 2) return;
    var d = 'M' + points[0] + ' L' + points.slice(1).join(' L ');

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'floater-trajectory' + (fromBar ? ' floater-trajectory--from-bar' : ''));
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-dasharray', '8 6');
    svg.appendChild(path);
    zone.insertBefore(svg, zone.firstChild);
    el._trajectorySvg = svg;
  }

  function clearBarTrajectories() {
    if (!zone) return;
    floaters.forEach(function (f) {
      if (f.el._trajectorySvg && f.el._trajectorySvg.classList && f.el._trajectorySvg.classList.contains('floater-trajectory--from-bar')) {
        if (f.el._trajectorySvg.parentNode) f.el._trajectorySvg.remove();
        f.el._trajectorySvg = null;
      }
    });
  }

  function spawnRandom() {
    var type = TYPES[Math.floor(Math.random() * TYPES.length)];
    addFloater(type);
  }

  function animate() {
    if (!zone) return;
    if (isPaused) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    var zoneWidth = zone.offsetWidth;

    for (var i = floaters.length - 1; i >= 0; i--) {
      var f = floaters[i];
      f.x += f.speed;
      var y = f.baseY + f.amplitude * Math.sin((f.x - f.startX) * f.frequency);
      f.el.style.left = f.x + 'px';
      f.el.style.top = y + 'px';
      if (f.x > zoneWidth + 50) {
        if (f.el._trajectorySvg && f.el._trajectorySvg.parentNode) f.el._trajectorySvg.remove();
        f.el.remove();
        floaters.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  var pendingTrajectoryTimeout = null;

  function setBarHighlight(type) {
    document.body.setAttribute('data-resource-highlight', type || '');
    document.querySelectorAll('.floater--highlight').forEach(function (el) { el.classList.remove('floater--highlight'); });
    if (type) {
      document.querySelectorAll('.floater[data-type="' + type + '"]').forEach(function (el) { el.classList.add('floater--highlight'); });
    }
  }

  function showBarTrajectoriesAndFade(type) {
    if (pendingTrajectoryTimeout) {
      clearTimeout(pendingTrajectoryTimeout);
      pendingTrajectoryTimeout = null;
    }
    clearBarTrajectories();
    document.querySelectorAll('.floater[data-type="' + type + '"]').forEach(function (el) { showTrajectoryForFloater(el, true); });
    pendingTrajectoryTimeout = setTimeout(function () {
      var svgs = zone ? zone.querySelectorAll('.floater-trajectory--from-bar') : [];
      svgs.forEach(function (svg) { svg.classList.add('floater-trajectory--fadeout'); });
      pendingTrajectoryTimeout = setTimeout(function () {
        clearBarTrajectories();
        pendingTrajectoryTimeout = null;
      }, 500);
    }, 1000);
  }

  function initBarHighlight() {
    var bar = document.getElementById('resourcesBar');
    if (!bar) return;
    bar.querySelectorAll('.resource').forEach(function (res) {
      var type = res.getAttribute('data-type');
      if (!type) return;
      res.addEventListener('mouseenter', function () { setBarHighlight(type); });
      res.addEventListener('mouseleave', function () { setBarHighlight(''); });
      res.addEventListener('click', function (e) {
        e.preventDefault();
        showBarTrajectoriesAndFade(type);
      });
    });
  }

  function setPaused(paused) {
    isPaused = paused;
    if (paused) {
      document.body.classList.add('resources-paused');
      if (spawnIntervalId) {
        clearInterval(spawnIntervalId);
        spawnIntervalId = null;
      }
    } else {
      document.body.classList.remove('resources-paused');
      if (zone && !spawnIntervalId) {
        spawnIntervalId = setInterval(function () {
          if (!isPaused) spawnRandom();
        }, SPAWN_INTERVAL_MS);
      }
    }
  }

  load();
  updateBar();
  initTicker();
  initBarHighlight();
  window.addEventListener('resize', initTicker);
  if (zone) animate();
  document.body.classList.add('resources-paused');

  var playBtn = document.getElementById('resourcesPlay');
  var pauseBtn = document.getElementById('resourcesPause');
  if (playBtn) playBtn.addEventListener('click', function () { setPaused(false); });
  if (pauseBtn) pauseBtn.addEventListener('click', function () { setPaused(true); });
})();
