(function() {
      var items, tusionPhases;
      var MIN_YEAR = 2002;
      var MAX_YEAR = 2026;
      var viewStart = 2010;
      var viewEnd = 2025.5;
      var expandedPhases = {};
      var collapseOutOfView = false;
      var collapseOutOfViewTimer = null;
      var simulateMode = false;
      var simIntervalId = null;
      var simCurrentTime = 0;
      var simActiveIds = {};
      var SIM_SPEED_YEARS_PER_TICK = 0.1;
      var SIM_TICK_MS = 100;
      window.cvTimelineMarkerData = window.cvTimelineMarkerData || [];

      function toFraction(yearMonth) {
        return (yearMonth - viewStart) / (viewEnd - viewStart);
      }

      function updateAxis() {
        var axis = document.getElementById('timelineAxis');
        if (!axis) return;
        var range = viewEnd - viewStart;
        var step = range <= 3 ? 0.5 : range <= 8 ? 1 : 2;
        var labels = [];
        var y = Math.floor(viewStart * 2) / 2;
        while (y <= viewEnd + 0.01) {
          labels.push(y === Math.floor(y) ? String(Math.floor(y)) : y.toFixed(1));
          y += step;
        }
        axis.innerHTML = labels.map(function(l) { return '<span>' + l + '</span>'; }).join('');
      }

      function updateRuler() {
        var container = document.getElementById('timelineRows');
        if (!container) return;
        var range = viewEnd - viewStart;
        var step = range <= 3 ? 0.5 : range <= 8 ? 1 : 2;
        var ruler = document.getElementById('timelineRuler');
        if (!ruler) {
          ruler = document.createElement('div');
          ruler.className = 'timeline-ruler';
          ruler.id = 'timelineRuler';
          ruler.setAttribute('aria-hidden', 'true');
        }
        ruler.innerHTML = '';
        var y = Math.floor(viewStart * 2) / 2;
        while (y <= viewEnd + 0.01) {
          var pct = ((y - viewStart) / range) * 100;
          var tick = document.createElement('div');
          tick.className = 'timeline-ruler-tick';
          tick.style.left = pct + '%';
          ruler.appendChild(tick);
          y += step;
        }
        if (container.firstChild) {
          container.insertBefore(ruler, container.firstChild);
        } else {
          container.appendChild(ruler);
        }
      }

      function updateRangeLabel() {
        var el = document.getElementById('timelineRangeLabel');
        if (!el) return;
        function ym(v) { return v.toFixed(1); }
        el.textContent = ym(viewStart) + ' — ' + ym(viewEnd);
      }

      function updateScrollbar() {
        var ids = ['timelineScrollbarThumb', 'timelineScrollbarThumbTop'];
        var fullRange = MAX_YEAR - MIN_YEAR;
        var leftPct = ((viewStart - MIN_YEAR) / fullRange) * 100;
        var widthPct = ((viewEnd - viewStart) / fullRange) * 100;
        ids.forEach(function(id) {
          var thumb = document.getElementById(id);
          if (!thumb) return;
          thumb.style.left = leftPct + '%';
          thumb.style.width = Math.max(4, widthPct) + '%';
        });
      }

      function periodStr(start, end) {
        var s = Math.floor(start);
        var e = Math.floor(end);
        return s === e ? String(s) : s + 'â€“' + e;
      }

      function getItemYearRange(item) {
        if (item.phases && Array.isArray(item.phases) && item.phases.length > 0) {
          var start = item.phases[0].start;
          var end = item.phases[0].end;
          item.phases.forEach(function(p) {
            if (p.start != null && p.start < start) start = p.start;
            if (p.end != null && p.end > end) end = p.end;
          });
          return [start, end];
        }
        return [item.start, item.end];
      }

      function getSimulationPeriods() {
        var list = [];
        if (!items) return list;
        items.forEach(function(item) {
          if (item.phases && Array.isArray(item.phases)) {
            item.phases.forEach(function(p) {
              if (p.start == null || p.end == null) return;
              list.push({
                start: p.start,
                end: p.end,
                label: (item.label ? item.label + ' Â· ' : '') + (p.label || ''),
                id: p.id
              });
            });
          } else if (item.start != null && item.end != null) {
            list.push({
              start: item.start,
              end: item.end,
              label: item.label || item.id || '?',
              id: item.id
            });
          }
        });
        return list;
      }

      function simLog(msg) {
        var el = document.getElementById('timelineSimulateConsoleInner');
        if (!el) return;
        var line = document.createElement('div');
        line.className = 'timeline-simulate-line';
        line.textContent = msg;
        el.appendChild(line);
        el.parentElement.scrollTop = el.parentElement.scrollHeight;
      }

      function simStop() {
        if (simIntervalId) {
          clearInterval(simIntervalId);
          simIntervalId = null;
        }
      }

      function updateSimCursorPosition() {
        var cursor = window.cvSimCursorEl;
        var container = document.getElementById('timelineRows');
        if (!cursor || !container || !simulateMode) return;
        var track = container.querySelector('.row-track');
        var label = container.querySelector('.row-label');
        if (!track || !label) return;
        var range = viewEnd - viewStart;
        if (range <= 0) return;
        var fraction = (simCurrentTime - viewStart) / range;
        fraction = Math.max(0, Math.min(1, fraction));
        var labelWidth = label.offsetWidth || 140;
        var trackWidth = track.offsetWidth || 300;
        var leftPx = labelWidth + fraction * trackWidth;
        cursor.style.left = leftPx + 'px';
      }

      function simStart(startYear) {
        simStop();
        simCurrentTime = Math.max(MIN_YEAR, Math.min(MAX_YEAR, startYear));
        simActiveIds = {};
        if (window.cvSimCursorEl) {
          window.cvSimCursorEl.classList.add('is-visible');
          updateSimCursorPosition();
        }
        simLog('——— Старт с года ' + simCurrentTime.toFixed(1) + ' ———');
        var periods = getSimulationPeriods();
        function tick() {
          simCurrentTime += SIM_SPEED_YEARS_PER_TICK;
          if (simCurrentTime > MAX_YEAR) {
            simStop();
            simLog('——— Конец (' + MAX_YEAR + ') ———');
            updateSimCursorPosition();
            return;
          }
          var nowActive = {};
          periods.forEach(function(p) {
            if (simCurrentTime >= p.start && simCurrentTime <= p.end) {
              nowActive[p.id] = p;
              if (!simActiveIds[p.id]) {
                simLog('[' + simCurrentTime.toFixed(1) + '] → ' + p.label);
              }
            }
          });
          Object.keys(simActiveIds).forEach(function(id) {
            if (!nowActive[id]) {
              simLog('[' + simCurrentTime.toFixed(1) + '] ← ' + simActiveIds[id].label);
            }
          });
          simActiveIds = nowActive;
          updateSimCursorPosition();
        }
        simIntervalId = setInterval(tick, SIM_TICK_MS);
      }

      var LOC = {};
      function applyData(json) {
        if (!json) return;
        if (json.loc) LOC = json.loc;
        var phases = json.tusionPhases || [];
        tusionPhases = phases.map(function(p) {
          var lat, lng;
          if (p.locKey && json.loc && json.loc[p.locKey]) {
            lat = json.loc[p.locKey][0];
            lng = json.loc[p.locKey][1];
          }
          return Object.assign({}, p, { lat: lat, lng: lng });
        });
        var its = json.items || [];
        items = its.map(function(m) {
          var lat, lng;
          if (m.locKey && json.loc && json.loc[m.locKey]) {
            lat = json.loc[m.locKey][0];
            lng = json.loc[m.locKey][1];
          }
          var item = Object.assign({}, m, { lat: lat, lng: lng });
          if (item.id === 'tusion') item.phases = tusionPhases;
          return item;
        });
      }

      function buildMarkerData() {
        var out = [];
        items.forEach(function(item) {
          if (item.lat == null || item.lng == null) return;
          out.push({
            id: item.id,
            label: item.label,
            icon: item.icon || '',
            lat: item.lat,
            lng: item.lng
          });
        });
        tusionPhases.forEach(function(phase) {
          if (phase.lat == null || phase.lng == null) return;
          out.push({
            id: phase.id,
            label: 'TuSion Â· ' + phase.label,
            icon: phase.icon || 'ðŸ§ ',
            lat: phase.lat,
            lng: phase.lng
          });
        });
        window.cvTimelineMarkerData = out;
      }

      function renderBar(item) {
        var leftF = toFraction(item.start);
        var rightF = toFraction(item.end);
        if (rightF <= 0 || leftF >= 1) return null;
        var left = Math.max(0, leftF) * 100;
        var right = Math.min(1, rightF) * 100;
        var width = right - left;
        if (width < 2) width = 2;
        var wrap = document.createElement('div');
        wrap.className = 'timeline-bar-wrap';
        wrap.style.left = left + '%';
        wrap.style.width = width + '%';
        wrap.title = item.label + ' Â· ' + item.period;
        wrap.setAttribute('role', 'button');
        wrap.setAttribute('tabindex', '0');
        wrap.setAttribute('data-id', item.id);
        var bar = document.createElement('div');
        bar.className = 'timeline-bar bar--' + item.type;
        bar.style.width = '100%';
        var label = document.createElement('span');
        label.className = 'timeline-bar-label';
        label.textContent = (item.icon ? item.icon + ' ' : '') + item.label;
        wrap.appendChild(bar);
        wrap.appendChild(label);
        wrap.addEventListener('click', function(e) { showDetail(item.id, e); });
        wrap.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDetail(item.id, e); } });
        return wrap;
      }

      function renderPhaseBar(phase, type) {
        if (phase.start == null || phase.end == null) return null;
        var leftF = toFraction(phase.start);
        var rightF = toFraction(phase.end);
        if (rightF <= 0 || leftF >= 1) return null;
        var left = Math.max(0, leftF) * 100;
        var right = Math.min(1, rightF) * 100;
        var width = right - left;
        if (width < 2) width = 2;
        var wrap = document.createElement('div');
        wrap.className = 'timeline-bar-wrap';
        wrap.style.left = left + '%';
        wrap.style.width = width + '%';
        wrap.title = phase.label + ' Â· ' + periodStr(phase.start, phase.end);
        wrap.setAttribute('role', 'button');
        wrap.setAttribute('tabindex', '0');
        wrap.setAttribute('data-id', phase.id);
        var bar = document.createElement('div');
        bar.className = 'timeline-bar bar--' + type + ' timeline-bar--phase';
        bar.style.width = '100%';
        var label = document.createElement('span');
        label.className = 'timeline-bar-label';
        label.textContent = (phase.icon ? phase.icon + ' ' : '') + phase.label;
        wrap.appendChild(bar);
        wrap.appendChild(label);
        wrap.addEventListener('click', function(e) { showDetail(phase.id, e); });
        wrap.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDetail(phase.id, e); } });
        return wrap;
      }

      function renderCollapsedPhasesBar(item) {
        var phases = item.phases;
        if (!Array.isArray(phases) || phases.length === 0) return null;
        var rangeStart = phases[0].start;
        var rangeEnd = phases[0].end;
        phases.forEach(function(p) {
          if (p.start < rangeStart) rangeStart = p.start;
          if (p.end > rangeEnd) rangeEnd = p.end;
        });
        var leftF = toFraction(rangeStart);
        var rightF = toFraction(rangeEnd);
        if (rightF <= 0 || leftF >= 1) return null;
        var left = Math.max(0, leftF) * 100;
        var right = Math.min(1, rightF) * 100;
        var width = right - left;
        if (width < 2) width = 2;
        var wrap = document.createElement('div');
        wrap.className = 'timeline-bar-wrap timeline-bar--collapsed';
        wrap.style.left = left + '%';
        wrap.style.width = width + '%';
        wrap.title = item.label + ' · нажмите, чтобы развернуть эпизоды';
        wrap.setAttribute('role', 'button');
        wrap.setAttribute('tabindex', '0');
        wrap.setAttribute('data-expand-id', item.id);
        var bar = document.createElement('div');
        bar.className = 'timeline-bar bar--' + item.type;
        bar.style.width = '100%';
        var label = document.createElement('span');
        label.className = 'timeline-bar-label';
        label.textContent = item.label + ' ▶ ' + phases.length + ' эпизодов';
        wrap.appendChild(bar);
        wrap.appendChild(label);
        wrap.addEventListener('click', function() {
          window.cvScrollToPhaseGroupId = item.id;
          expandedPhases[item.id] = true;
          renderTimeline();
        });
        wrap.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.cvScrollToPhaseGroupId = item.id; expandedPhases[item.id] = true; renderTimeline(); } });
        return wrap;
      }

      function renderGroupSpanBar(item) {
        var phases = item.phases;
        if (!Array.isArray(phases) || phases.length === 0) return null;
        var rangeStart = phases[0].start;
        var rangeEnd = phases[0].end;
        phases.forEach(function(p) {
          if (p.start < rangeStart) rangeStart = p.start;
          if (p.end > rangeEnd) rangeEnd = p.end;
        });
        var leftF = toFraction(rangeStart);
        var rightF = toFraction(rangeEnd);
        if (rightF <= 0 || leftF >= 1) return null;
        var left = Math.max(0, leftF) * 100;
        var right = Math.min(1, rightF) * 100;
        var width = right - left;
        if (width < 2) width = 2;
        var wrap = document.createElement('div');
        wrap.className = 'timeline-bar-wrap timeline-bar--span';
        wrap.style.left = left + '%';
        wrap.style.width = width + '%';
        var bar = document.createElement('div');
        bar.className = 'timeline-bar bar--' + item.type;
        bar.style.width = '100%';
        wrap.appendChild(bar);
        return wrap;
      }

      function renderExpandedPhaseGroup(item) {
        var phases = item.phases;
        if (!Array.isArray(phases) || phases.length === 0) return null;
        var rows = [];
        var headerRow = document.createElement('div');
        headerRow.className = 'timeline-row timeline-row--phases timeline-row--group-header';
        headerRow.setAttribute('data-phase-group-id', item.id);
        var label = document.createElement('span');
        label.className = 'row-label row-label--collapse';
        label.textContent = item.label + ' ▼';
        label.title = 'Свернуть эпизоды';
        label.setAttribute('role', 'button');
        label.setAttribute('tabindex', '0');
        label.addEventListener('click', function() {
          expandedPhases[item.id] = false;
          renderTimeline();
        });
        label.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); expandedPhases[item.id] = false; renderTimeline(); } });
        var track = document.createElement('div');
        track.className = 'row-track';
        var spanBar = renderGroupSpanBar(item);
        if (spanBar) track.appendChild(spanBar);
        headerRow.appendChild(label);
        headerRow.appendChild(track);
        rows.push(headerRow);
        phases.forEach(function(phase) {
          var subRow = document.createElement('div');
          subRow.className = 'timeline-row timeline-row--sub';
          subRow.setAttribute('data-detail-id', phase.id);
          var subLabel = document.createElement('span');
          subLabel.className = 'row-label row-label--clickable';
          subLabel.textContent = phase.label || '';
          subLabel.title = (phase.label || '') + (phase.start != null && phase.end != null ? ' Â· ' + periodStr(phase.start, phase.end) : '');
          subLabel.setAttribute('role', 'button');
          subLabel.setAttribute('tabindex', '0');
          subLabel.addEventListener('click', function(e) { showDetail(phase.id, e); });
          subLabel.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDetail(phase.id, e); } });
          var subTrack = document.createElement('div');
          subTrack.className = 'row-track';
          var phaseBar = renderPhaseBar(phase, item.type);
          if (phaseBar) subTrack.appendChild(phaseBar);
          subRow.appendChild(subLabel);
          subRow.appendChild(subTrack);
          rows.push(subRow);
        });
        return rows;
      }

      function renderRow(item) {
        if (item.phases) {
          if (!Array.isArray(item.phases) || item.phases.length === 0) {
            // Если phases по какой-то причине пустой, рендерим как обычный элемент.
            item = Object.assign({}, item);
            delete item.phases;
          } else {
          var isExpanded = expandedPhases[item.id];
          if (isExpanded) {
              var expanded = renderExpandedPhaseGroup(item);
              if (expanded) return expanded;
          }
          var row = document.createElement('div');
          row.className = 'timeline-row timeline-row--phases';
          var label = document.createElement('span');
          label.className = 'row-label row-label--clickable';
          label.textContent = (item.icon ? item.icon + ' ' : '') + item.label + ' ▶';
          label.title = 'Развернуть эпизоды';
          label.setAttribute('role', 'button');
          label.setAttribute('tabindex', '0');
          label.addEventListener('click', function() {
            window.cvScrollToPhaseGroupId = item.id;
            expandedPhases[item.id] = true;
            renderTimeline();
          });
          label.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.cvScrollToPhaseGroupId = item.id; expandedPhases[item.id] = true; renderTimeline(); } });
          var track = document.createElement('div');
          track.className = 'row-track';
          var collapsedBar = renderCollapsedPhasesBar(item);
          if (collapsedBar) track.appendChild(collapsedBar);
          row.appendChild(label);
          row.appendChild(track);
          return row;
          }
        }
        var row = document.createElement('div');
        row.className = 'timeline-row';
        row.setAttribute('data-detail-id', item.id);
        var label = document.createElement('span');
        label.className = 'row-label row-label--clickable';
        label.textContent = (item.icon ? item.icon + ' ' : '') + item.label;
        label.title = item.label + ' Â· ' + item.period;
        label.setAttribute('role', 'button');
        label.setAttribute('tabindex', '0');
        label.addEventListener('click', function(e) { showDetail(item.id, e); });
        label.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDetail(item.id, e); } });
        var track = document.createElement('div');
        track.className = 'row-track';
        var bar = renderBar(item);
        if (bar) track.appendChild(bar);
        row.appendChild(label);
        row.appendChild(track);
        return row;
      }

      function scheduleCollapseOutOfView() {
        if (collapseOutOfViewTimer) clearTimeout(collapseOutOfViewTimer);
        var autohideEl = document.getElementById('timelineAutohide');
        if (!autohideEl || !autohideEl.checked) return;
        var delayEl = document.getElementById('timelineAutohideDelay');
        var sec = delayEl ? Math.max(0.5, Math.min(30, parseFloat(delayEl.value) || 2)) : 2;
        var delayMs = Math.round(sec * 1000);
        collapseOutOfViewTimer = setTimeout(function() {
      var items, tusionPhases;
          collapseOutOfViewTimer = null;
          collapseOutOfView = true;
          renderTimeline();
        }, delayMs);
      }

      function renderTimeline() {
        var container = document.getElementById('timelineRows');
        if (!container) return;
        var preservedDetail = container.querySelector('.cv-timeline-detail-row');
        if (preservedDetail) {
          preservedDetail.remove();
          window.cvPreservedDetailEl = preservedDetail;
        }
        container.innerHTML = '';
        var outOfViewEls = [];
        items.forEach(function(item) {
          try {
            var range = getItemYearRange(item);
            var outOfView = collapseOutOfView && (range[1] < viewStart || range[0] > viewEnd);
            var row = renderRow(item);
            if (Array.isArray(row)) {
              row.forEach(function(r) {
                container.appendChild(r);
                if (outOfView) outOfViewEls.push(r);
              });
            } else if (row) {
              container.appendChild(row);
              if (outOfView) outOfViewEls.push(row);
            }
          } catch (err) {
            console.error('CV timeline render error for item:', item.id || item.label, err);
            var fallback = document.createElement('div');
            fallback.className = 'timeline-row';
            fallback.innerHTML = '<span class="row-label">' + (item.label || item.id || '?') + '</span><div class="row-track"></div>';
            container.appendChild(fallback);
          }
        });
        if (outOfViewEls.length > 0) {
          requestAnimationFrame(function() {
      var items, tusionPhases;
            outOfViewEls.forEach(function(el) { el.classList.add('timeline-row--out-of-view'); });
          });
        }
        if (window.cvPreservedDetailEl) {
          var el = window.cvPreservedDetailEl;
          window.cvPreservedDetailEl = null;
          var id = el.getAttribute('data-detail-id');
          if (id) {
            var row = container.querySelector('.timeline-row[data-detail-id="' + id + '"]');
            if (row) row.parentNode.insertBefore(el, row.nextSibling);
          }
        }
        if (simulateMode && window.cvSimCursorEl) {
          container.appendChild(window.cvSimCursorEl);
          updateSimCursorPosition();
        }
        updateAxis();
        updateRangeLabel();
        updateScrollbar();
        updateRuler();
        if (window.cvScrollToPhaseGroupId && container) {
          var el = container.querySelector('[data-phase-group-id="' + window.cvScrollToPhaseGroupId + '"]');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          window.cvScrollToPhaseGroupId = null;
        }
      }

      function zoomIn() {
        collapseOutOfView = false;
        var center = (viewStart + viewEnd) / 2;
        var range = (viewEnd - viewStart) * 0.6;
        if (range < 2) return;
        viewStart = center - range / 2;
        viewEnd = center + range / 2;
        viewStart = Math.max(MIN_YEAR, viewStart);
        viewEnd = Math.min(MAX_YEAR, viewEnd);
        if (viewEnd - viewStart < 2) { viewStart = center - 1; viewEnd = center + 1; }
        renderTimeline();
        scheduleCollapseOutOfView();
      }

      function zoomOut() {
        collapseOutOfView = false;
        var center = (viewStart + viewEnd) / 2;
        var range = (viewEnd - viewStart) * 1.4;
        range = Math.min(range, MAX_YEAR - MIN_YEAR);
        viewStart = center - range / 2;
        viewEnd = center + range / 2;
        viewStart = Math.max(MIN_YEAR, viewStart);
        viewEnd = Math.min(MAX_YEAR, viewEnd);
        renderTimeline();
        scheduleCollapseOutOfView();
      }

      function pan(delta) {
        collapseOutOfView = false;
        var range = viewEnd - viewStart;
        viewStart += delta;
        viewEnd += delta;
        if (viewStart < MIN_YEAR) {
          viewStart = MIN_YEAR;
          viewEnd = MIN_YEAR + range;
        }
        if (viewEnd > MAX_YEAR) {
          viewEnd = MAX_YEAR;
          viewStart = MAX_YEAR - range;
        }
        renderTimeline();
        scheduleCollapseOutOfView();
      }

      function panLeft() {
        var range = viewEnd - viewStart;
        pan(-Math.max(range * 0.15, 0.25));
      }

      function panRight() {
        var range = viewEnd - viewStart;
        pan(Math.max(range * 0.15, 0.25));
      }

      document.getElementById('timelineZoomIn').addEventListener('click', zoomIn);
      document.getElementById('timelineZoomOut').addEventListener('click', zoomOut);
      document.getElementById('timelinePanLeft').addEventListener('click', panLeft);
      document.getElementById('timelinePanRight').addEventListener('click', panRight);

      (function() {
      var items, tusionPhases;
        var btn = document.getElementById('timelineSimulateBtn');
        var consoleEl = document.getElementById('timelineSimulateConsole');
        var rowsEl = document.getElementById('timelineRows');
        if (!btn || !consoleEl || !rowsEl) return;
        btn.addEventListener('click', function() {
          simulateMode = !simulateMode;
          simStop();
          if (simulateMode) {
            btn.classList.add('is-active');
            consoleEl.classList.add('is-open');
            rowsEl.classList.add('simulate-mode');
            document.getElementById('timelineSimulateConsoleInner').innerHTML = '';
            simLog('Клик по таймлайну (по полосе года) — старт симуляции с выбранного года.');;
            if (!window.cvSimCursorEl) {
              var cursor = document.createElement('div');
              cursor.className = 'timeline-sim-cursor';
              cursor.setAttribute('aria-hidden', 'true');
              window.cvSimCursorEl = cursor;
            }
            window.cvSimCursorEl.classList.remove('is-visible');
            if (!window.cvSimCursorEl.parentNode) rowsEl.appendChild(window.cvSimCursorEl);
          } else {
            btn.classList.remove('is-active');
            consoleEl.classList.remove('is-open');
            rowsEl.classList.remove('simulate-mode');
            if (window.cvSimCursorEl) window.cvSimCursorEl.classList.remove('is-visible');
          }
        });
      })();

      (function() {
      var items, tusionPhases;
        var target = document.getElementById('timelineRows');
        if (!target) return;
        target.addEventListener('wheel', function(e) {
          if (e.deltaY === 0) return;
          if (e.target.closest('.cv-timeline-detail-row')) return;
          e.preventDefault();
          if (e.deltaY < 0) zoomIn();
          else zoomOut();
        }, { passive: false });
      })();

      (function() {
      var items, tusionPhases;
        var target = document.getElementById('timelineRows');
        if (!target) return;
        var dragging = false;
        var startX, startViewStart, startViewEnd;
        function getTrackWidth() {
          var track = target.querySelector('.row-track');
          return track ? track.offsetWidth : 300;
        }
        function onMove(e) {
          if (!dragging) return;
          var range = startViewEnd - startViewStart;
          var trackWidth = getTrackWidth();
          var deltaYears = (e.clientX - startX) * (range / trackWidth);
          viewStart = startViewStart - deltaYears;
          viewEnd = startViewEnd - deltaYears;
          var rangeLen = viewEnd - viewStart;
          if (viewStart < MIN_YEAR) {
            viewStart = MIN_YEAR;
            viewEnd = MIN_YEAR + rangeLen;
          }
          if (viewEnd > MAX_YEAR) {
            viewEnd = MAX_YEAR;
            viewStart = MAX_YEAR - rangeLen;
          }
          startX = e.clientX;
          startViewStart = viewStart;
          startViewEnd = viewEnd;
          renderTimeline();
        }
        function onUp() {
          if (!dragging) return;
          dragging = false;
          target.classList.remove('dragging');
          document.body.style.userSelect = '';
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
          scheduleCollapseOutOfView();
        }
        target.addEventListener('mousedown', function(e) {
          if (simulateMode) {
            var track = e.target.closest('.row-track');
            if (track) {
              e.preventDefault();
              e.stopPropagation();
              var rect = track.getBoundingClientRect();
              var range = viewEnd - viewStart;
              var year = viewStart + (e.clientX - rect.left) / rect.width * range;
              simStart(year);
            }
            return;
          }
          if (e.target.closest('.timeline-bar-wrap')) return;
          if (e.target.closest('.cv-timeline-detail-row')) return;
          e.preventDefault();
          collapseOutOfView = false;
          dragging = true;
          startX = e.clientX;
          startViewStart = viewStart;
          startViewEnd = viewEnd;
          target.classList.add('dragging');
          document.body.style.userSelect = 'none';
          document.addEventListener('mousemove', onMove);
          document.addEventListener('mouseup', onUp);
        });
      })();

      (function() {
      var items, tusionPhases;
        function attachScrollbar(trackId, thumbId) {
          var trackEl = document.getElementById(trackId);
          var thumbEl = document.getElementById(thumbId);
          if (!trackEl || !thumbEl) return;
          var fullRange = MAX_YEAR - MIN_YEAR;

          function trackXToView(clientX) {
            collapseOutOfView = false;
            var rect = trackEl.getBoundingClientRect();
            var x = clientX - rect.left;
            var fraction = Math.max(0, Math.min(1, x / rect.width));
            var range = viewEnd - viewStart;
            var centerYear = MIN_YEAR + fraction * fullRange;
            viewStart = centerYear - range / 2;
            viewEnd = centerYear + range / 2;
            if (viewStart < MIN_YEAR) {
              viewStart = MIN_YEAR;
              viewEnd = MIN_YEAR + range;
            }
            if (viewEnd > MAX_YEAR) {
              viewEnd = MAX_YEAR;
              viewStart = MAX_YEAR - range;
            }
            renderTimeline();
            scheduleCollapseOutOfView();
          }

          trackEl.addEventListener('click', function(e) {
            if (e.target === thumbEl) return;
            e.preventDefault();
            trackXToView(e.clientX);
          });

          var thumbDragging = false;
          var gripOffset = 0;

          thumbEl.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            collapseOutOfView = false;
            var rect = trackEl.getBoundingClientRect();
            var thumbRect = thumbEl.getBoundingClientRect();
            gripOffset = e.clientX - thumbRect.left;
            thumbDragging = true;
            thumbEl.classList.add('dragging');
            document.body.style.userSelect = 'none';

            function onThumbMove(e) {
              if (!thumbDragging) return;
              collapseOutOfView = false;
              var rect = trackEl.getBoundingClientRect();
              var x = e.clientX - rect.left - gripOffset;
              var fraction = x / rect.width;
              var range = viewEnd - viewStart;
              var viewSpan = range / fullRange;
              fraction = Math.max(0, Math.min(1 - viewSpan, fraction));
              viewStart = MIN_YEAR + fraction * fullRange;
              viewEnd = viewStart + range;
              renderTimeline();
            }
            function onThumbUp() {
              thumbDragging = false;
              thumbEl.classList.remove('dragging');
              document.body.style.userSelect = '';
              document.removeEventListener('mousemove', onThumbMove);
              document.removeEventListener('mouseup', onThumbUp);
              scheduleCollapseOutOfView();
            }
            document.addEventListener('mousemove', onThumbMove);
            document.addEventListener('mouseup', onThumbUp);
          });
        }

        attachScrollbar('timelineScrollbarTrack', 'timelineScrollbarThumb');
        attachScrollbar('timelineScrollbarTrackTop', 'timelineScrollbarThumbTop');
      })();

      var panel = document.getElementById('detailPanel');
      var detailCache = {};
      var typeLabels = { company: 'Компания', startup: 'Стартап', research: 'Исследования', education: 'Обучение', hospitality: 'Общепит', sport: 'Спорт', other: 'Другое', now: 'Сейчас' };

      var popover = document.createElement('div');
      popover.className = 'cv-detail-popover';
      popover.id = 'cvDetailPopover';
      var popoverClose = document.createElement('button');
      popoverClose.type = 'button';
      popoverClose.className = 'cv-detail-popover-close';
      popoverClose.setAttribute('aria-label', 'Закрыть');
      popoverClose.innerHTML = '×';
      popoverClose.addEventListener('click', function() {
        popover.classList.remove('is-open');
      });
      var popoverBody = document.createElement('div');
      popoverBody.className = 'cv-detail-popover-body';
      popover.appendChild(popoverClose);
      popover.appendChild(popoverBody);
      document.body.appendChild(popover);
      var timelineDetailEl = null;

      function buildDetailCache() {
        detailCache = {};
        items.forEach(function(item) {
          if (item.phases) {
            item.phases.forEach(function(phase) {
              detailCache[phase.id] = {
                label: item.label + ' Â· ' + phase.label,
                period: periodStr(phase.start, phase.end),
                type: item.type,
                body: phase.body,
                lat: phase.lat,
                lng: phase.lng,
                placeName: phase.placeName
              };
            });
          } else {
            detailCache[item.id] = item;
          }
        });
      }

      function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
      function buildDetailHtml(item) {
        var typeStr = (item.type && typeLabels[item.type]) ? typeLabels[item.type] : '';
        var stackStr = Array.isArray(item.stack) ? item.stack.join(', ') : (item.stack || '');
        var rows = [
          { key: 'название', val: esc(item.label) },
          { key: 'период',   val: esc(item.period) },
          { key: 'тип',      val: esc(typeStr) },
          { key: 'стек',     val: esc(stackStr) },
          { key: 'место',    val: esc(item.placeName || '') }
        ].filter(function(r) { return r.val !== ''; });
        rows.push({ key: 'описание', val: item.body, body: true });
        var html = '<div class="detail-table">';
        rows.forEach(function(r) {
          html += '<div class="detail-row"><span class="detail-key">' + r.key + '</span><span class="detail-sep">:</span><span class="detail-val' + (r.body ? ' detail-val--body">' : '">') + r.val + '</span></div>';
        });
        html += '</div>';
        return html;
      }
      function showDetail(id, ev) {
        var item = detailCache[id];
        if (!item) return;
        var html = buildDetailHtml(item);
        var inTimeline = ev && ev.currentTarget && ev.currentTarget.closest && ev.currentTarget.closest('#timelineRows');
        if (inTimeline) {
          popover.classList.remove('is-open');
          if (timelineDetailEl && timelineDetailEl.parentNode) timelineDetailEl.parentNode.removeChild(timelineDetailEl);
          timelineDetailEl = null;
          var row = ev.currentTarget.closest('.timeline-row');
          if (!row || !row.parentNode) return;
          var wrap = document.createElement('div');
          wrap.className = 'cv-timeline-detail-row';
          wrap.setAttribute('data-detail-id', id);
          wrap.innerHTML = html;
          var closeBtn = document.createElement('button');
          closeBtn.type = 'button';
          closeBtn.className = 'cv-detail-popover-close';
          closeBtn.setAttribute('aria-label', 'Закрыть');
          closeBtn.innerHTML = '×';
          closeBtn.addEventListener('click', function() {
            if (timelineDetailEl && timelineDetailEl.parentNode) timelineDetailEl.parentNode.removeChild(timelineDetailEl);
            timelineDetailEl = null;
          });
          wrap.insertBefore(closeBtn, wrap.firstChild);
          row.parentNode.insertBefore(wrap, row.nextSibling);
          timelineDetailEl = wrap;
        } else if (ev && ev.currentTarget) {
          var anchor = ev.currentTarget;
          var rect = anchor.getBoundingClientRect();
          popoverBody.innerHTML = html;
          popover.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - 420)) + 'px';
          popover.style.top = (rect.bottom + 6) + 'px';
          popover.classList.add('is-open');
        } else {
          popover.classList.remove('is-open');
          if (timelineDetailEl && timelineDetailEl.parentNode) timelineDetailEl.parentNode.removeChild(timelineDetailEl);
          timelineDetailEl = null;
          var mapSection = document.querySelector('.map-section');
          if (mapSection) {
            var rect = mapSection.getBoundingClientRect();
            popoverBody.innerHTML = html;
            popover.style.left = Math.max(8, rect.left) + 'px';
            popover.style.top = (rect.bottom + 10) + 'px';
            popover.classList.add('is-open');
          } else {
            panel.classList.remove('empty');
            panel.innerHTML = html;
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
        if (typeof cvMap !== 'undefined' && item.lat != null && item.lng != null) {
          cvMap.flyTo([item.lat, item.lng], 11, { duration: 0.8 });
        }
      }
      window.showDetail = showDetail;

      // Load all timeline data from JSON; then build cache, markers, and render.
      fetch('data/timeline.ru.json')
        .then(function(resp) { return resp.ok ? resp.json() : null; })
        .then(function(json) {
          if (!json) return;
          applyData(json);
          buildDetailCache();
          buildMarkerData();
          if (window.addCvMarkers) window.addCvMarkers();
          renderTimeline();
        })
        .catch(function() {
      var items, tusionPhases;
          renderTimeline();
        });
    })();
  