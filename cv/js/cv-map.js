(function() {
  var cvMapEl = document.getElementById('cvMap');
  if (!cvMapEl) return;
  var cvMap = L.map('cvMap').setView([50, 25], 3);
  cvMap.attributionControl.setPrefix('');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(cvMap);
  window.cvMap = cvMap;
  window.addCvMarkers = function() {
    if (!Array.isArray(window.cvTimelineMarkerData)) return;
    window.cvTimelineMarkerData.forEach(function(p) {
      if (p.lat == null || p.lng == null) return;
      var markerId = p.id;
      var html = '<div style="font-size:18px; line-height:1;">' + (p.icon || '•') + '</div>';
      var icon = L.divIcon({ html: html, className: 'cv-emoji-marker', iconSize: [24, 24] });
      var marker = L.marker([p.lat, p.lng], { icon: icon }).addTo(cvMap);
      if (p.label) marker.bindTooltip(p.label, { direction: 'top', offset: [0, -12] });
      marker.on('click', function() {
        if (window.showDetail) window.showDetail(markerId);
      });
    });
  };
  if (Array.isArray(window.cvTimelineMarkerData) && window.cvTimelineMarkerData.length > 0) window.addCvMarkers();
})();
