(() => {
  const ticks = document.querySelectorAll('[data-now-tick]');
  const snapshots = document.querySelectorAll('[data-snapshot]');
  const prompt = document.querySelector('[data-now-prompt]');
  const hintScrub = document.querySelector('[data-now-hint="scrub"]');
  const hintJump = document.querySelector('[data-now-hint="jump"]');
  const leaf = document.querySelector('.masthead .path-leaf');
  const siteName = document.title.split(' - ').pop();
  if (!ticks.length || snapshots.length < 2) return;

  const last = snapshots.length - 1;
  let active = last;

  const show = (idx) => {
    active = idx;
    const isNow = idx === last;
    const snap = snapshots[idx];

    snapshots.forEach((s, i) => s.hidden = i !== idx);
    ticks.forEach((t, i) => t.classList.toggle('active', i === idx));

    if (prompt) {
      const date = snap.dataset.date;
      const prevDate = snap.dataset.prevDate;
      prompt.textContent = prevDate ? `${prevDate}..${date}` : date;
    }

    const label = isNow ? 'Now' : 'Then';
    if (leaf) leaf.textContent = label;
    document.title = `${label} - ${siteName}`;

    if (hintScrub) hintScrub.hidden = !isNow;
    if (hintJump) hintJump.hidden = isNow;
  };

  ticks.forEach((tick) => {
    tick.addEventListener('click', () => show(+tick.dataset.nowTick));
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-now-jump]')) show(last);
  });

  document.addEventListener('keydown', (e) => {
    if (/input|textarea/i.test(e.target.tagName)) return;
    if (e.key === 'ArrowLeft' && active > 0) { show(active - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight' && active < last) { show(active + 1); e.preventDefault(); }
  });
})();
