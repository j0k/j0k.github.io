(function () {
  var track = document.getElementById('episodesTrack');
  var prevBtn = document.querySelector('.episodes-nav-btn.prev');
  var nextBtn = document.querySelector('.episodes-nav-btn.next');
  if (!track || !prevBtn || !nextBtn) return;

  var cardWidth = 180 + 20; // card + gap
  var scrollAmount = cardWidth * 2;

  prevBtn.addEventListener('click', function () {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', function () {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });
})();
