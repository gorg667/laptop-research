/* Laptop Guide web app — hash-routed static SPA. No build step.
   Routes: #/  (home)  #/ch/<file>  #/compare  #/finder
   Content: web/content/*.md + manifest.json ; data: web/data/laptops.json */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app');
  const state = { manifest: [], laptops: null, chapters: {} };

  // ---------- theme ----------
  const root = document.documentElement;
  root.dataset.theme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  $('#themeBtn').onclick = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', root.dataset.theme); };
  $('#menuBtn').onclick = () => $('#side').classList.toggle('open');
  document.addEventListener('click', e => { if (e.target.closest('nav.side a')) $('#side').classList.remove('open'); });

  // ---------- markdown ----------
  marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });
  const slug = s => s.toLowerCase().replace(/[^a-z0-9 -]/g, '').trim().replace(/ +/g, '-');
  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => `<h${level} id="${slug(text.replace(/<[^>]+>/g, ''))}">${text}</h${level}>`;
  // rewrite intra-guide links like "Chapter 5" mentions are plain text; keep external links opening in new tab
  renderer.link = (href, title, text) => {
    const ext = /^https?:/.test(href);
    return `<a href="${href}"${title ? ` title="${title}"` : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
  };
  const md = s => marked.parse(s, { renderer });

  // ---------- data loading ----------
  const loadManifest = async () => { if (!state.manifest.length) state.manifest = await (await fetch('content/manifest.json')).json(); return state.manifest; };
  const loadLaptops = async () => { if (!state.laptops) state.laptops = (await (await fetch('data/laptops.json')).json()); return state.laptops; };
  const loadChapter = async f => { if (!state.chapters[f]) state.chapters[f] = await (await fetch('content/' + f)).text(); return state.chapters[f]; };

  // ---------- nav ----------
  const isPicks = f => /^1[34]/.test(f);
  const isFund = f => /^(0\d|1[0-2])/.test(f);
  function buildNav(man) {
    const mk = c => `<a href="#/ch/${c.file}" data-route="/ch/${c.file}">${c.short}<span class="words">${(c.words/1000).toFixed(1)}k</span></a>`;
    $('#navFund').innerHTML = man.filter(c => isFund(c.file)).map(mk).join('');
    $('#navPicks').innerHTML = man.filter(c => isPicks(c.file)).map(mk).join('');
    $('#navRest').innerHTML = man.filter(c => !isFund(c.file) && !isPicks(c.file)).map(mk).join('');
  }
  function setActive(route) {
    document.querySelectorAll('nav.side a').forEach(a => a.classList.toggle('active', a.dataset.route === route));
  }

  // ---------- views ----------
  async function viewHome() {
    const man = await loadManifest();
    const intro = await loadChapter(man[0].file);
    const total = man.reduce((s, c) => s + c.words, 0);
    const picks = [
      ['Best overall', 'MacBook Air 13"/15" M5, 24 GB', '$1,499 / $1,699', 'good'],
      ['Best value', 'Refurb MacBook Air M4, 16 GB', '~$850–950', 'good'],
      ['Best Windows', 'ThinkPad X1 Carbon Gen 13/14, 32 GB', '~$1,400–1,600 on sale', ''],
      ['Best Linux', 'Framework Laptop 13 Pro', '$1,499+', ''],
      ['Best with GPU', 'ROG Zephyrus G14 (2026) RTX 5070, 32 GB', '~$1,800', ''],
      ['Budget', 'Used ThinkPad T14 Gen 3/4 AMD, 32 GB', '~$500', 'good'],
      ['Avoid for CS', 'Any 8 GB laptop (incl. MacBook Neo)', '—', 'warn'],
      ['Wait', 'Base MacBook Pro 14" M5 → M6 expected fall 2026', '—', 'warn'],
    ];
    app.innerHTML = `
      <div class="hero">
        <h1>The Definitive Laptop Guide for CS Students &amp; Software Engineers</h1>
        <p class="lead">September 2026 edition · ${(total/1000).toFixed(0)},000+ words · ${man.length} chapters · independent, no affiliate links.</p>
        <p><a class="btn" href="#/finder">🎯 Answer 5 questions → get a pick</a> &nbsp; <a class="btn" href="#/compare">🔎 Compare 31 laptops</a> &nbsp; <a class="btn" href="#/ch/${man[0].file}">📖 Start reading</a></p>
      </div>
      <h2 style="border:0;margin-top:0">Quick picks</h2>
      <div class="cards">${picks.map(([k, v, p, b]) => `<div class="card"><span class="badge ${b}">${k}</span><h3>${v}</h3><p class="price">${p}</p></div>`).join('')}</div>
      <div class="callout"><b>2026 is a weird year.</b> A global DRAM/NAND shortage pushed laptop prices up 15–30% (Apple +$200/$300 in June). RAM is the scarce resource: buy 16 GB minimum, 24–32 if you can, never 8. Refurbished and prior-gen machines are the value plays. <a href="#/ch/05-memory-and-storage.md">Chapter 5 →</a></div>
      ${md(intro.replace(/^# .*\n/, ''))}
      <div class="pager"><span></span><a class="next" href="#/ch/${man[1].file}"><small>Next</small>${man[1].title}</a></div>`;
  }

  async function viewChapter(file) {
    const man = await loadManifest();
    const i = man.findIndex(c => c.file === file);
    if (i < 0) return viewHome();
    const text = await loadChapter(file);
    const prev = man[i - 1], next = man[i + 1];
    app.innerHTML = `<p class="meta">${man[i].words.toLocaleString()} words · ~${Math.ceil(man[i].words / 230)} min read · <a href="https://github.com/gorg667/laptop-research/blob/main/guide/${file}" target="_blank" rel="noopener">source .md</a></p>
      ${md(text)}
      <div class="pager">${prev ? `<a href="#/ch/${prev.file}"><small>Previous</small>${prev.title}</a>` : '<span></span>'}${next ? `<a class="next" href="#/ch/${next.file}"><small>Next</small>${next.title}</a>` : '<span></span>'}</div>`;
    // wrap tables for scroll on mobile
    app.querySelectorAll('table').forEach(t => { if (!t.parentElement.classList.contains('tbl')) { const w = document.createElement('div'); w.className = 'tbl'; t.replaceWith(w); w.appendChild(t); t.style.minWidth = '0'; } });
  }

  // ---------- router ----------
  async function route() {
    const hash = location.hash.replace(/^#/, '') || '/';
    setActive(hash);
    window.scrollTo(0, 0);
    try {
      if (hash === '/') await viewHome();
      else if (hash.startsWith('/ch/')) await viewChapter(decodeURIComponent(hash.slice(4)));
      else if (hash === '/compare') await window.LG.viewCompare(app, await loadLaptops());
      else if (hash === '/finder') await window.LG.viewFinder(app, await loadLaptops());
      else await viewHome();
    } catch (e) { app.innerHTML = `<h2>Couldn't load this page</h2><pre>${e}</pre><p>If you opened index.html directly from disk, serve it over HTTP (e.g. <code>python3 -m http.server</code> in <code>web/</code>) — browsers block <code>fetch()</code> from <code>file://</code>.</p>`; }
    if (hash.includes('#')) { /* no-op */ }
  }
  window.addEventListener('hashchange', route);
  loadManifest().then(m => { buildNav(m); route(); });
  window.LG = window.LG || {};
  window.LG.md = md;
})();
