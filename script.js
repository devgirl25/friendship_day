(function () {
  const pages = Array.from(document.querySelectorAll('.page'));
  const total = pages.length;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsWrap = document.getElementById('dots');

  let current = 0; // number of pages currently flipped (0..total)

  // stack pages so earlier pages sit on top until flipped away
  pages.forEach((page, i) => {
    page.style.zIndex = total - i;
    page.setAttribute('tabindex', '0');
    page.setAttribute('role', 'button');
    page.setAttribute('aria-label', i === 0 ? 'Open slam book' : `Turn page ${i}`);
  });

  // build nav dots
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  const dots = Array.from(dotsWrap.children);

  function render() {
    pages.forEach((page, i) => {
      page.classList.toggle('flipped', i < current);
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === Math.min(current, total - 1)));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total;
  }

  function next() {
    if (current < total) {
      current++;
      render();
    }
  }

  function prev() {
    if (current > 0) {
      current--;
      render();
    }
  }

  function goTo(index) {
    // flip forward/back to land with page `index` as the active top page
    current = index;
    render();
  }

  pages.forEach((page, i) => {
    page.addEventListener('click', () => {
      if (i === current) next();
    });
    page.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && i === current) {
        e.preventDefault();
        next();
      }
    });
  });

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  render();
})();
