(() => {
  const prefersReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    for (const root of document.querySelectorAll('.cycler')) {
      const wordEl = root.querySelector('.cycler-word');
      const textEl = root.querySelector('.cycler-text');
      const words = JSON.parse(root.dataset.cycle ?? '[]');
      if (!words.length || !wordEl || !textEl) continue;

      // Reserve the full slot width so the highlight field stays put.
      // +1.2ch accounts for the caret width (0.55ch) + padding (0.3em) + buffer.
      const longest = words.reduce((a, b) => b.length > a.length ? b : a, '');
      textEl.style.minWidth = `${longest.length + 1.2}ch`;

      if (prefersReduce) {
        let i = 0;
        wordEl.textContent = words[0];
        setInterval(() => { i = (i + 1) % words.length; wordEl.textContent = words[i]; }, 4000);
        continue;
      }

      let idx = 0;
      let current = words[0];
      wordEl.textContent = current;

      const TYPE_MS = 90;
      const DEL_MS = 45;
      const HOLD_MS = 3600;
      const BETWEEN_MS = 500;

      const delay = ms => new Promise(r => setTimeout(r, ms));

      (async () => {
        await delay(HOLD_MS);
        while (true) {
          while (current.length > 0) {
            current = current.slice(0, -1);
            wordEl.textContent = current;
            await delay(DEL_MS);
          }
          await delay(BETWEEN_MS);
          idx = (idx + 1) % words.length;
          const next = words[idx];
          for (let n = 0; n < next.length; n++) {
            current = next.slice(0, n + 1);
            wordEl.textContent = current;
            await delay(TYPE_MS);
          }
          await delay(HOLD_MS);
        }
      })();
    }
  });
})();
