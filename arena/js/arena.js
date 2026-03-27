(function() {
  'use strict';

  var WIDTH = 1280;
  var HEIGHT = 720;

  var video = document.getElementById('arenaVideo');
  var overlay = document.getElementById('overlay');
  var ctx = overlay.getContext('2d');
  var nameTag = document.getElementById('nameTag');
  var activeNameEl = document.getElementById('activeName');
  var stageMediaEl = document.getElementById('stageMedia');

  var muteBtn = document.getElementById('muteBtn');
  var pauseBtn = document.getElementById('pauseBtn');
  var originalBtn = document.getElementById('originalBtn');
  var arenaTerm = document.getElementById('arenaTerm');
  var arenaTermBody = document.getElementById('arenaTermBody');
  var termToggleBtn = document.getElementById('termToggleBtn');

  // Back -> front z-order:
  // Ivan behind all, then Slavok, Hep behind Yurtso, Yurtso in front.
  var characters = [
    { id: 'ivan', name: 'Custo', mask: './mask/ivan.png', clip: './clips/ivan.mp4', clipDuration: 6.0, start: 35, end: 41, color: 'rgba(255, 190, 80, 0.62)' },
    { id: 'slavok', name: '$WK', mask: './mask/swk.png', clip: './clips/slavok.mp4', clipDuration: 5.0, start: 53, end: 58, color: 'rgba(122, 234, 108, 0.60)' },
    { id: 'hep', name: 'Hep', mask: './mask/alex.png', clip: './clips/hep.mp4', clipDuration: 6.0, start: 4, end: 10, color: 'rgba(255, 130, 176, 0.64)' },
    { id: 'yurtso', name: 'N.J.', mask: './mask/yuri.png', clip: './clips/yurtso.mp4', clipDuration: 6.0, start: 16, end: 22, color: 'rgba(124, 160, 255, 0.64)' }
  ];

  var active = null;
  var playingClip = null;
  var loaded = 0;

  // FX
  var particles = [];
  var rafId = 0;
  var fxEnabled = true;
  var hideHighlightTimer = 0;
  var suppressHoverUntil = 0;

  // Modes
  var originalMode = false;
  var ORIGINAL_SRC = './arena_full_faststart.mp4';
  var termCollapsed = false;
  var TERM_COLLAPSE_KEY = 'arena.term.collapsed.v1';
  var hasDebugGreeting = false;

  // Convenience for console usage: `debugArena = True`.
  if (typeof window.True === 'undefined') window.True = true;
  if (typeof window.False === 'undefined') window.False = false;

  if (typeof window.debugArena === 'undefined') {
    window.debugArena = false;
  }

  function isDebugEnabled() {
    var v = window.debugArena;
    if (typeof v === 'string') {
      v = v.toLowerCase();
      return v === '1' || v === 'true' || v === 'yes' || v === 'on';
    }
    return !!v;
  }

  function dlog() {
    if (!isDebugEnabled()) return;
    var args = Array.prototype.slice.call(arguments);
    args.unshift('[arena]');
    console.log.apply(console, args);
  }

  function printDebugGreeting() {
    if (hasDebugGreeting) return;
    hasDebugGreeting = true;
    console.log('[arena] DSD Arena loaded.');
    console.log('[arena] Debug: set `debugArena = true` (or `debugArena = True`) in console.');
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function nowStamp() {
    var d = new Date();
    return pad2(d.getHours()) + ':' + pad2(d.getMinutes()) + ':' + pad2(d.getSeconds());
  }
  function termLog(html) {
    if (!arenaTermBody) return;
    var div = document.createElement('div');
    div.className = 'line';
    div.innerHTML = '<span class="ts">[' + nowStamp() + ']</span> ' + html;
    arenaTermBody.appendChild(div);
    while (arenaTermBody.children.length > 14) arenaTermBody.removeChild(arenaTermBody.firstChild);
    arenaTermBody.scrollTop = arenaTermBody.scrollHeight;
  }

  function setTermCollapsed(next) {
    termCollapsed = !!next;
    if (!arenaTerm || !termToggleBtn) return;
    if (termCollapsed) {
      arenaTerm.classList.add('is-collapsed');
      termToggleBtn.textContent = '▢';
      termToggleBtn.title = 'Expand terminal';
    } else {
      arenaTerm.classList.remove('is-collapsed');
      termToggleBtn.textContent = '—';
      termToggleBtn.title = 'Minimize terminal';
    }
    try {
      localStorage.setItem(TERM_COLLAPSE_KEY, termCollapsed ? '1' : '0');
    } catch (err) {}
    dlog('terminal collapsed =', termCollapsed);
  }

  function setupTerminalToggle() {
    if (!termToggleBtn) return;
    try {
      termCollapsed = localStorage.getItem(TERM_COLLAPSE_KEY) === '1';
    } catch (err) {
      termCollapsed = false;
    }
    setTermCollapsed(termCollapsed);
    termToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      setTermCollapsed(!termCollapsed);
    });
  }

  function buildMaskData(ch) {
    var off = document.createElement('canvas');
    off.width = WIDTH;
    off.height = HEIGHT;
    var offCtx = off.getContext('2d');
    offCtx.drawImage(ch.img, 0, 0, WIDTH, HEIGHT);
    var image = offCtx.getImageData(0, 0, WIDTH, HEIGHT);
    ch.pixels = image.data;
    ch.off = off;
    ch.box = calcBoundingBox(image.data);
    ch.points = buildMaskPoints(ch);
    ch.hl = buildHighlightCanvas(ch);
  }

  function calcBoundingBox(data) {
    var minX = WIDTH, minY = HEIGHT, maxX = -1, maxY = -1;
    var x, y, i, r, g, b, a, dark;
    for (y = 0; y < HEIGHT; y++) {
      for (x = 0; x < WIDTH; x++) {
        i = (y * WIDTH + x) * 4;
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3];
        dark = a > 5 && r < 70 && g < 70 && b < 70;
        if (!dark) continue;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
    if (maxX < 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0, cx: WIDTH / 2, cy: HEIGHT / 2 };
    }
    return { minX: minX, minY: minY, maxX: maxX, maxY: maxY, cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
  }

  function buildMaskPoints(ch) {
    if (!ch || !ch.pixels || !ch.box) return [];
    var pts = [];
    var step = 6;
    for (var y = ch.box.minY; y <= ch.box.maxY; y += step) {
      for (var x = ch.box.minX; x <= ch.box.maxX; x += step) {
        var idx = (y * WIDTH + x) * 4;
        var r = ch.pixels[idx], g = ch.pixels[idx + 1], b = ch.pixels[idx + 2], a = ch.pixels[idx + 3];
        if (a > 5 && r < 70 && g < 70 && b < 70) pts.push({ x: x, y: y });
      }
    }
    return pts;
  }

  function buildHighlightCanvas(ch) {
    var c = document.createElement('canvas');
    c.width = WIDTH;
    c.height = HEIGHT;
    var cctx = c.getContext('2d');

    cctx.save();
    cctx.drawImage(ch.off, 0, 0, WIDTH, HEIGHT);
    cctx.globalCompositeOperation = 'source-in';
    cctx.fillStyle = ch.color;
    cctx.fillRect(0, 0, WIDTH, HEIGHT);
    cctx.restore();

    cctx.save();
    cctx.drawImage(ch.off, 0, 0, WIDTH, HEIGHT);
    cctx.globalCompositeOperation = 'source-in';
    cctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
    cctx.shadowBlur = 28;
    cctx.fillStyle = 'rgba(255,255,255,0.38)';
    cctx.fillRect(0, 0, WIDTH, HEIGHT);
    cctx.restore();

    cctx.save();
    cctx.globalCompositeOperation = 'lighter';
    cctx.shadowColor = 'rgba(124, 160, 255, 0.65)';
    cctx.shadowBlur = 14;
    cctx.globalAlpha = 0.55;
    cctx.drawImage(ch.off, 1, 0, WIDTH, HEIGHT);
    cctx.drawImage(ch.off, -1, 0, WIDTH, HEIGHT);
    cctx.drawImage(ch.off, 0, 1, WIDTH, HEIGHT);
    cctx.drawImage(ch.off, 0, -1, WIDTH, HEIGHT);
    cctx.restore();

    return c;
  }

  function hitTest(x, y) {
    var xi = clamp(Math.floor(x), 0, WIDTH - 1);
    var yi = clamp(Math.floor(y), 0, HEIGHT - 1);
    var idx = (yi * WIDTH + xi) * 4;
    for (var i = characters.length - 1; i >= 0; i--) {
      var ch = characters[i];
      if (!ch.pixels) continue;
      var r = ch.pixels[idx], g = ch.pixels[idx + 1], b = ch.pixels[idx + 2], a = ch.pixels[idx + 3];
      if (a > 5 && r < 70 && g < 70 && b < 70) return ch;
    }
    return null;
  }

  function drawOverlay() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    if (!active || !active.hl) return;
    ctx.save();
    ctx.globalAlpha = 0.82;
    ctx.drawImage(active.hl, 0, 0, WIDTH, HEIGHT);
    ctx.restore();
  }

  function samplePointOnMask(ch) {
    if (!ch || !ch.points || !ch.points.length) return null;
    return ch.points[(Math.random() * ch.points.length) | 0];
  }

  function spawnParticles(ch, count) {
    if (!ch) return;
    for (var i = 0; i < count; i++) {
      var p0 = samplePointOnMask(ch);
      if (!p0) continue;
      var life = 520 + Math.random() * 580;
      particles.push({
        x: p0.x,
        y: p0.y,
        vx: (Math.random() - 0.5) * 0.55,
        vy: -0.55 - Math.random() * 1.05,
        r: 1.2 + Math.random() * 2.4,
        t: 0,
        life: life
      });
    }
    if (particles.length > 140) particles.splice(0, particles.length - 140);
  }

  function drawParticles() {
    if (!particles.length) return;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      var k = p.t / p.life;
      if (k >= 1) { particles.splice(i, 1); continue; }
      var alpha = (1 - k) * 0.9;
      var rr = p.r * (0.85 + (1 - k) * 0.55);
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,' + (alpha * 0.55).toFixed(3) + ')';
      ctx.shadowColor = 'rgba(124,160,255,' + (alpha * 0.9).toFixed(3) + ')';
      ctx.shadowBlur = 14;
      ctx.arc(p.x, p.y, rr + 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,' + alpha.toFixed(3) + ')';
      ctx.shadowBlur = 0;
      ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function tick(now) {
    rafId = 0;
    if (!active) {
      particles.length = 0;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      return;
    }
    if (!fxEnabled) {
      drawOverlay();
      return;
    }
    if (!tick._last) tick._last = now;
    var dt = Math.min(40, Math.max(8, now - tick._last));
    tick._last = now;

    spawnParticles(active, 1);
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.t += dt;
      p.vx *= 0.994;
      p.vy *= 0.996;
      p.vy -= 0.0006 * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (active.box) {
        if (p.x < active.box.minX - 40 || p.x > active.box.maxX + 40 || p.y < active.box.minY - 80 || p.y > active.box.maxY + 80) {
          p.t += dt * 1.8;
        }
      }
    }

    drawOverlay();
    drawParticles();
    rafId = requestAnimationFrame(tick);
  }

  function ensureFxLoop() {
    if (rafId) return;
    tick._last = 0;
    rafId = requestAnimationFrame(tick);
  }

  function clearSelectionVisual() {
    active = null;
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    particles.length = 0;
    drawOverlay();
    placeNameTag(null);
    overlay.style.cursor = 'default';
  }

  function placeNameTag(ch) {
    if (!ch || !ch.box) {
      nameTag.classList.remove('is-on');
      return;
    }
    var rect = stageMediaEl.getBoundingClientRect();
    var x = (ch.box.cx / WIDTH) * rect.width;
    var yTarget = Math.max(18, ch.box.minY - 18);
    var y = (yTarget / HEIGHT) * rect.height;
    nameTag.textContent = ch.name;
    nameTag.style.left = x + 'px';
    nameTag.style.top = y + 'px';
    nameTag.classList.add('is-on');
  }

  function playClip(ch) {
    if (!ch) return;
    termLog('Вы выбрали: <span class="ok">' + ch.name + '</span>');
    dlog('click character:', ch.id, ch.name, 'range=' + ch.start + '-' + ch.end + 's');
    if (originalMode) {
      dlog('original mode active, clip playback skipped');
      return;
    }
    playingClip = ch;

    video.pause();
    var chosenSrc = ch.clip + '?v=1';
    dlog('set clip src:', chosenSrc);
    video.setAttribute('src', chosenSrc);
    video.load();
    video.addEventListener('loadeddata', function() {
      dlog('clip loaded:', chosenSrc, 'currentTime=', video.currentTime.toFixed(2), 'duration=', isFinite(video.duration) ? video.duration.toFixed(2) : video.duration);
      var p = video.play();
      if (p && p.catch) p.catch(function() {});
    }, { once: true });
    video.addEventListener('error', function() {
      dlog('clip load error:', chosenSrc);
    }, { once: true });
  }

  function clipEndThreshold(ch) {
    if (!ch) return Infinity;
    var d = (isFinite(video.duration) && video.duration > 0) ? video.duration : ch.clipDuration;
    return Math.max(0.1, d - 0.05);
  }

  function setupVideoGuard() {
    video.addEventListener('timeupdate', function() {
      if (!playingClip) return;
      var endAt = clipEndThreshold(playingClip);
      if (video.currentTime >= endAt) {
        dlog('clip finished:', playingClip.id, 'at', video.currentTime.toFixed(2), 'endAt', endAt.toFixed(2));
        video.pause();
        playingClip = null;
      }
    });
    video.addEventListener('ended', function() {
      dlog('video ended event');
      playingClip = null;
    });
  }

  function onMove(e) {
    if (Date.now() < suppressHoverUntil) return;
    var rect = overlay.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    var y = ((e.clientY - rect.top) / rect.height) * HEIGHT;
    var hit = hitTest(x, y);

    if (hit && (!active || active.id !== hit.id)) {
      active = hit;
      drawOverlay();
      placeNameTag(hit);
      ensureFxLoop();
      overlay.style.cursor = 'pointer';
      return;
    }
    if (!hit) {
      active = null;
      drawOverlay();
      placeNameTag(null);
      overlay.style.cursor = 'default';
    }
  }

  function onClick(e) {
    e.preventDefault();
    e.stopPropagation();
    var rect = overlay.getBoundingClientRect();
    var x = ((e.clientX - rect.left) / rect.width) * WIDTH;
    var y = ((e.clientY - rect.top) / rect.height) * HEIGHT;
    var hit = hitTest(x, y) || active;
    if (!hit) return;
    active = hit;
    activeNameEl.textContent = hit.name;
    drawOverlay();
    placeNameTag(hit);
    playClip(hit);

    // Keep the selection briefly, then hide overlay to better see the trick.
    suppressHoverUntil = Date.now() + 3000;
    if (hideHighlightTimer) clearTimeout(hideHighlightTimer);
    hideHighlightTimer = setTimeout(function() {
      dlog('auto-hide highlight after click');
      clearSelectionVisual();
      hideHighlightTimer = 0;
    }, 3000);
  }

  function onLeave() {
    clearSelectionVisual();
  }

  function syncControlLabels() {
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
    muteBtn.title = video.muted ? 'Unmute' : 'Mute';
    pauseBtn.title = video.paused ? 'Play' : 'Pause';
    originalBtn.textContent = originalMode ? 'Clips' : 'Original';
    originalBtn.title = originalMode ? 'Switch back to character clips' : 'Play original full video';
  }

  function setVideoSrc(nextSrc) {
    video.pause();
    playingClip = null;
    dlog('set video src:', nextSrc);
    video.setAttribute('src', nextSrc);
    video.load();
  }

  function enterOriginalMode() {
    originalMode = true;
    setVideoSrc(ORIGINAL_SRC + '?v=1');
    dlog('switched to original mode');
    syncControlLabels();
    var p = video.play();
    if (p && p.catch) p.catch(function() {});
  }

  function enterClipsMode() {
    originalMode = false;
    dlog('switched to clips mode');
    syncControlLabels();
  }

  function setupControls() {
    originalBtn.addEventListener('click', function() {
      if (originalMode) enterClipsMode();
      else enterOriginalMode();
    });
    muteBtn.addEventListener('click', function() {
      video.muted = !video.muted;
      syncControlLabels();
    });
    pauseBtn.addEventListener('click', function() {
      if (video.paused) {
        var p = video.play();
        if (p && p.catch) p.catch(function() {});
      } else {
        video.pause();
      }
      syncControlLabels();
    });
    video.addEventListener('play', syncControlLabels);
    video.addEventListener('pause', syncControlLabels);
    video.addEventListener('volumechange', syncControlLabels);
    syncControlLabels();
  }

  function bindPointer() {
    overlay.addEventListener('mousemove', onMove);
    overlay.addEventListener('click', onClick);
    overlay.addEventListener('mouseleave', onLeave);
  }

  function onMaskLoaded() {
    loaded += 1;
    if (loaded !== characters.length) return;
    dlog('all masks loaded, init done');
    bindPointer();
    setupVideoGuard();
    setupControls();
    setupTerminalToggle();
  }

  characters.forEach(function(ch) {
    ch.img = new Image();
    ch.img.onload = function() {
      buildMaskData(ch);
      onMaskLoaded();
    };
    ch.img.src = ch.mask;
  });

  printDebugGreeting();
})();
