(() => {
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });

  const charAtZero = (str) => {
    if (!str) return '';
    const code = str.charCodeAt(0);
    if (code >= 0xD800 && code <= 0xDFFF) {
      return '\\u' + code.toString(16).toUpperCase().padStart(4, '0');
    }
    return str[0];
  };

  const spreadFirst = (str) => {
    if (!str) return '';
    return [...str][0];
  };

  const graphemeFirst = (str) => {
    if (!str) return '';
    return [...segmenter.segment(str)].map(s => s.segment)[0] || '';
  };

  const emoji = ['🇨🇦', '👍🏽', '👨‍👩‍👧‍👦', '🤷'];

  const btn = (step) => document.querySelector('[data-step="' + step + '"].run-btn');
  const step = (n) => document.querySelector('div[data-step="' + n + '"]');
  const debrief = document.getElementById('debrief');

  // --- Step 1: lgtm ---

  btn(1).addEventListener('click', () => {
    btn(1).disabled = true;
    btn(1).textContent = '\u2713';

    const av = document.querySelector('.avatar[data-step="1"]');
    av.textContent = 'N';
    av.classList.add('visible');

    setTimeout(() => { step(2).style.display = ''; }, 400);
  });

  // --- Step 2: should work right? ---

  btn(2).addEventListener('click', () => {
    btn(2).disabled = true;
    btn(2).textContent = 'oh no';
    btn(2).classList.add('alert');

    step(2).querySelectorAll('.avatar').forEach((av, i) => {
      av.textContent = charAtZero(emoji[i]);
      av.classList.add('broken', 'visible');
    });

    setTimeout(() => { step(3).style.display = ''; }, 400);
  });

  // --- Step 3: that should fix it ---

  btn(3).addEventListener('click', () => {
    btn(3).disabled = true;
    btn(3).textContent = 'closer...';

    const results = document.querySelector('[data-step="3-results"]');
    results.style.display = '';

    results.querySelectorAll('.avatar').forEach((av, i) => {
      const result = spreadFirst(emoji[i]);
      av.textContent = result;
      av.classList.add('visible');
    });

    setTimeout(() => { step(4).style.display = ''; }, 400);
  });

  // --- Step 4: Segmenter ---

  btn(4).addEventListener('click', () => {
    btn(4).disabled = true;
    btn(4).textContent = '\u2713';

    step(4).querySelectorAll('.avatar').forEach((av, i) => {
      av.textContent = graphemeFirst(emoji[i]);
      av.classList.add('visible');
    });

    setTimeout(() => { debrief.style.display = ''; }, 400);
  });
})();
