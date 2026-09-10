/* Laptop Guide web app — hash-routed static SPA. No build step.
   Routes: #/  #/ch/<file>[#anchor]  #/compare[?…]  #/finder[?…]  #/search/<q>  #/about
   Content: web/content/*.md + manifest.json ; data: web/data/laptops.json */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app'), toc = $('#toc');
  const state = { manifest: [], laptops: null, chapters: {} };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- theme / menu ----------
  const root = document.documentElement;
  root.dataset.theme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const setThemeColor = () => { const m = $('meta[name=theme-color]'); if (m) m.content = root.dataset.theme === 'dark' ? '#0f1115' : '#fbfbfd'; };
  setThemeColor();
  $('#themeBtn').onclick = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', root.dataset.theme); setThemeColor(); };
  const side = $('#side'), menuBtn = $('#menuBtn');
  const setMenu = open => { side.classList.toggle('open', open); menuBtn.setAttribute('aria-expanded', String(open)); };
  menuBtn.onclick = () => setMenu(!side.classList.contains('open'));
  document.addEventListener('click', e => { if (e.target.closest('nav.side a')) setMenu(false); else if (side.classList.contains('open') && !e.target.closest('nav.side') && !e.target.closest('#menuBtn')) setMenu(false); });

  // ---------- search box + keyboard shortcuts ----------
  const sbox = $('#searchBox');
  $('#searchForm').onsubmit = e => { e.preventDefault(); const q = sbox.value.trim(); if (q) location.hash = '#/search/' + encodeURIComponent(q); };
  document.addEventListener('keydown', e => {
    if (e.target.matches('input,textarea,select')) { if (e.key === 'Escape') e.target.blur(); return; }
    if (e.key === '/') { e.preventDefault(); (getComputedStyle(sbox).display === 'none' ? (location.hash = '#/search') : sbox.focus()); }
    if (e.key === 't' && !e.metaKey && !e.ctrlKey) { $('#themeBtn').click(); }
    if (e.key === '[' || e.key === ']') { const a = app.querySelector(e.key === '[' ? '.pager a:not(.next)' : '.pager a.next'); if (a) location.hash = a.getAttribute('href'); }
  });

  // ---------- back to top + reading progress ----------
  const topBtn = $('#topBtn'); const prog = document.createElement('div'); prog.className = 'progress'; document.body.appendChild(prog);
  topBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  addEventListener('scroll', () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    topBtn.classList.toggle('show', y > 600);
    prog.style.width = (h > 0 ? Math.min(100, y / h * 100) : 0) + '%';
    updateTocActive();
  }, { passive: true });

  // ---------- markdown ----------
  marked.setOptions({ gfm: true, breaks: false, headerIds: false, mangle: false });
  const slug = s => s.toLowerCase().replace(/[^a-z0-9 -]/g, '').trim().replace(/ +/g, '-');
  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    const id = slug(text.replace(/<[^>]+>/g, ''));
    return `<h${level} id="${id}">${text}${level === 2 || level === 3 ? ` <a class="anchor" href="#${location.hash.split('#')[1] || '/'}#${id}" aria-label="Link to section">#</a>` : ''}</h${level}>`;
  };
  renderer.link = (href, title, text) => {
    const ext = /^https?:/.test(href);
    // "Chapter N" style cross-links are plain text in the source; support relative chapter links like 05-memory-and-storage.md
    if (/^\d\d[a-e]?-[a-z0-9-]+\.md(#.*)?$/.test(href)) href = '#/ch/' + href;
    return `<a href="${href}"${title ? ` title="${esc(title)}"` : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
  };
  const md = s => marked.parse(s, { renderer });

  // ---------- data loading ----------
  const loadManifest = async () => { if (!state.manifest.length) state.manifest = await (await fetch('content/manifest.json')).json(); return state.manifest; };
  const loadLaptops = async () => { if (!state.laptops) state.laptops = await (await fetch('data/laptops.json')).json(); return state.laptops; };
  const loadChapter = async f => { if (!state.chapters[f]) state.chapters[f] = await (await fetch('content/' + f)).text(); return state.chapters[f]; };

  // ---------- nav ----------
  const isPicks = f => /^1[34]/.test(f);
  const isFund = f => /^(0\d|1[0-2])/.test(f);
  const chNum = f => { const m = f.match(/^(\d\d)([a-e])?/); return m ? (+m[1] ? m[1].replace(/^0/, '') + (m[2] || '') : '') : ''; };
  function buildNav(man) {
    const mk = c => `<a href="#/ch/${c.file}" data-route="/ch/${c.file}"><span class="n">${chNum(c.file)}</span>${esc(c.short)}<span class="words">${(c.words / 1000).toFixed(1)}k</span></a>`;
    $('#navFund').innerHTML = man.filter(c => isFund(c.file)).map(mk).join('');
    $('#navPicks').innerHTML = man.filter(c => isPicks(c.file)).map(mk).join('');
    $('#navRest').innerHTML = man.filter(c => !isFund(c.file) && !isPicks(c.file)).map(mk).join('');
  }
  function setActive(route) {
    document.querySelectorAll('nav.side a').forEach(a => a.classList.toggle('active', a.dataset.route === route));
    const active = side.querySelector('a.active'); if (active) active.scrollIntoView({ block: 'nearest' });
  }

  // ---------- table of contents ----------
  let tocLinks = [];
  function buildToc() {
    const hs = [...app.querySelectorAll('h2, h3')].filter(h => h.id);
    tocLinks = [];
    if (hs.length < 3) { toc.innerHTML = ''; return; }
    const route = location.hash.split('#')[1] || '/';
    toc.innerHTML = `<div class="t">On this page</div>` + hs.map(h => `<a href="#${route}#${h.id}" class="${h.tagName === 'H3' ? 'l3' : ''}" data-id="${h.id}">${esc(h.textContent.replace(/#$/, '').trim())}</a>`).join('');
    tocLinks = [...toc.querySelectorAll('a')];
  }
  function updateTocActive() {
    if (!tocLinks.length) return;
    let cur = null;
    for (const a of tocLinks) { const el = document.getElementById(a.dataset.id); if (el && el.getBoundingClientRect().top < 120) cur = a; }
    tocLinks.forEach(a => a.classList.toggle('active', a === cur));
  }
  function wrapTables() {
    app.querySelectorAll('table').forEach(t => { if (!t.parentElement.classList.contains('tbl')) { const w = document.createElement('div'); w.className = 'tbl'; t.replaceWith(w); w.appendChild(t); } });
  }
  function scrollToAnchor(anchor) {
    if (!anchor) { window.scrollTo(0, 0); return; }
    const el = document.getElementById(anchor);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' })); else window.scrollTo(0, 0);
  }

  // ---------- views ----------
  const QUICK_PICKS = [
    ['Best overall', 'MacBook Air 13"/15" M5, 24 GB', '$1,499 / $1,699', 'good', '#/ch/13c-picks-tier3.md'],
    ['Best value', 'Refurb MacBook Air M4, 16 GB', '~$850–950', 'good', '#/ch/13b-picks-tier2.md'],
    ['Best Windows', 'ThinkPad X1 Carbon Gen 13/14, 32 GB', '~$1,400–1,600 on sale', '', '#/ch/13c-picks-tier3.md'],
    ['Best Linux', 'Framework Laptop 13 Pro', '$1,499+', '', '#/ch/13c-picks-tier3.md'],
    ['Best with GPU', 'ROG Zephyrus G14 (2026) RTX 5070, 32 GB', '~$1,800', '', '#/ch/13d-picks-tier4.md'],
    ['Budget', 'Used ThinkPad T14 Gen 3/4 AMD, 32 GB', '~$500', 'good', '#/ch/13a-picks-tier1.md'],
    ['Avoid for CS', 'Any 8 GB laptop (Neo, XPS 13 base, FW12 base)', '—', 'warn', '#/ch/05-memory-and-storage.md'],
    ['Wait', 'Base MacBook Pro 14" M5 → M6 late 2026', '—', 'warn', '#/ch/13d-picks-tier4.md'],
  ];
  const WHATS_NEW = [
    ['Sep 10', 'Apple <b>M6 is announced</b> (Mac mini, ships Sep 22). The base 14" MacBook Pro is reported to get it late 2026; the Air not until early 2027. Sep 9 event had no Macs.', '#/ch/04-silicon.md#42-apple-m5-family-and-where-m4-fits'],
    ['Sep 10', 'New <b>$699 / 8 GB class</b>: Dell XPS 13 (2026) and Framework Laptop 12 join the MacBook Neo. Read the RAM line.', '#/ch/13a-picks-tier1.md'],
    ['Sep 10', 'Intel <b>"Core 5 320" ≠ "Core Ultra 5 325"</b> — the Wildcat Lake naming trap, decoded.', '#/ch/04-silicon.md#43-intel-core-ultra-series-3-panther-lake'],
    ['Sep 10', 'macOS 27 drops Intel Macs and is the <b>last macOS with Rosetta 2</b>. Never buy an Intel Mac now.', '#/ch/03-operating-systems.md#37-the-arm-asterisks-spelled-out'],
    ['Sep 10', 'Nvidia <b>RTX Spark (N1X)</b> laptops shown at IFA — eight models, zero prices. Still: don\'t wait.', '#/ch/04-silicon.md#46-nvidia-n1x--n1-rtx-spark-pcs'],
    ['Sep 10', 'HP: <b>more price hikes coming</b>; memory now ~35% of a PC\'s cost.', '#/ch/05-memory-and-storage.md'],
  ];

  async function viewHome() {
    const man = await loadManifest();
    const intro = await loadChapter(man[0].file);
    const total = man.reduce((s, c) => s + c.words, 0);
    const lap = await loadLaptops();
    app.innerHTML = `
      <div class="hero">
        <h1>The Definitive Laptop Guide for CS Students &amp; Software Engineers</h1>
        <p class="lead">September 2026 edition (v1.1, fact-checked Sep 10) · ${Math.round(total / 1000)},000+ words · ${man.length} chapters · independent, no affiliate links.</p>
        <div class="btns"><a class="primary" href="#/finder">🎯 Answer 5 questions → get a pick</a><a href="#/compare">🔎 Compare ${lap.laptops.length} laptops</a><a href="#/ch/${man[0].file}">📖 Start reading</a><a href="#/search">🔍 Search</a></div>
      </div>
      <h2 style="border:0;margin-top:0">Quick picks</h2>
      <div class="cards">${QUICK_PICKS.map(([k, v, p, b, href]) => `<a class="card" href="${href}"><span class="badge ${b}">${k}</span><h3>${esc(v)}</h3><p class="price">${esc(p)}</p></a>`).join('')}</div>
      <div class="callout"><b>2026 is a weird year.</b> A global DRAM/NAND shortage pushed laptop prices up 15–30% (Apple +$200/$300 in June; HP says more increases are coming). RAM is the scarce resource: buy 16 GB minimum, 24–32 if you can, never 8. Refurbished and prior-gen machines are the value plays. <a href="#/ch/05-memory-and-storage.md">Chapter 5 →</a></div>
      <details class="callout info" open><summary><b>What changed in v1.1 (Sep 10, 2026)</b></summary><ul class="whatsnew">${WHATS_NEW.map(([d, t, h]) => `<li><small class="meta">${d}</small> ${t} <a href="${h}">→</a></li>`).join('')}</ul></details>
      ${md(intro.replace(/^# .*\n/, ''))}
      <h2>All chapters</h2>
      <div class="chapters">${man.map(c => `<a href="#/ch/${c.file}"><span class="n">${chNum(c.file) ? chNum(c.file) + ' · ' : ''}</span>${esc(c.short)}<small>${c.words.toLocaleString()} words · ~${Math.ceil(c.words / 230)} min</small></a>`).join('')}</div>
      <div class="pager"><span></span><a class="next" href="#/ch/${man[1].file}"><small>Next</small>${esc(man[1].title)}</a></div>`;
    wrapTables(); buildToc();
  }

  async function viewChapter(file, anchor) {
    const man = await loadManifest();
    const i = man.findIndex(c => c.file === file);
    if (i < 0) return viewNotFound();
    const text = await loadChapter(file);
    const prev = man[i - 1], next = man[i + 1];
    document.title = `${man[i].short} — Laptop Guide for CS & SWE (2026)`;
    app.innerHTML = `<p class="meta">${man[i].words.toLocaleString()} words · ~${Math.ceil(man[i].words / 230)} min read · <a href="https://github.com/gorg667/laptop-research/blob/main/guide/${file}" target="_blank" rel="noopener">source .md</a> · <a href="https://github.com/gorg667/laptop-research/edit/main/guide/${file}" target="_blank" rel="noopener">suggest an edit</a></p>
      ${md(text)}
      <div class="pager">${prev ? `<a href="#/ch/${prev.file}"><small>← Previous</small>${esc(prev.title)}</a>` : `<a href="#/"><small>← Back</small>Home</a>`}${next ? `<a class="next" href="#/ch/${next.file}"><small>Next →</small>${esc(next.title)}</a>` : '<span></span>'}</div>`;
    wrapTables(); buildToc(); scrollToAnchor(anchor);
  }

  async function viewAbout() {
    const man = await loadManifest(); const lap = await loadLaptops();
    const total = man.reduce((s, c) => s + c.words, 0);
    app.innerHTML = `<h1>About this guide</h1>
      <p>An independent, long-form guide to buying a laptop for computer science study, software engineering work, and daily life — written from a September 2026 vantage point. ${Math.round(total / 1000)},000 words across ${man.length} chapters, plus structured data on ${lap.laptops.length} laptops that powers the <a href="#/compare">comparison tool</a> and the <a href="#/finder">pick finder</a>.</p>
      <h2>Principles</h2>
      <ul><li><b>No money changes hands.</b> No sponsors, no affiliate links, no review units. Recommendations are synthesized from published independent reviews (Notebookcheck, Ars Technica, RTINGS, PCMag, Tom's Hardware, Wirecutter, Phoronix, and others) and community experience.</li>
      <li><b>Principles over picks.</b> Chapters 1–12 teach you to evaluate any laptop; Chapters 13–14 apply those principles to the September 2026 market. The picks will age; the principles won't.</li>
      <li><b>Honest about uncertainty.</b> Rumors are labeled. Prices are dated. Ratings are editorial 1–5 assessments, not measurements.</li></ul>
      <h2>Data &amp; license</h2>
      <p>Text is licensed <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>; code is MIT. The laptop dataset is <a href="data/laptops.json">data/laptops.json</a> (last updated ${lap.meta.updated}). Everything lives in the <a href="https://github.com/gorg667/laptop-research" target="_blank" rel="noopener">GitHub repository</a>; the single-file version is <a href="GUIDE.md">GUIDE.md</a>.</p>
      <h2>Keyboard shortcuts</h2>
      <table><tr><td><code>/</code></td><td>Search</td></tr><tr><td><code>[</code> / <code>]</code></td><td>Previous / next chapter</td></tr><tr><td><code>t</code></td><td>Toggle theme</td></tr></table>
      <h2>Changelog &amp; sources</h2><p>See <a href="#/ch/21-sources-and-changelog.md">Chapter 21</a>.</p>`;
    wrapTables(); buildToc();
  }

  function viewNotFound() {
    app.innerHTML = `<h1>Page not found</h1><p>That route doesn't exist. Try the <a href="#/">home page</a>, the <a href="#/compare">comparison tool</a>, or <a href="#/search">search</a>.</p>`;
    toc.innerHTML = '';
  }

  // ---------- router ----------
  async function route() {
    const full = location.hash.replace(/^#/, '') || '/';
    const [pathq, anchor] = full.split('#');
    const [path, qs] = pathq.split('?');
    setActive(path.startsWith('/search') ? '/search' : path);
    document.title = 'The Definitive Laptop Guide for CS Students & Software Engineers (2026)';
    try {
      if (path === '/') { await viewHome(); window.scrollTo(0, 0); }
      else if (path.startsWith('/ch/')) await viewChapter(decodeURIComponent(path.slice(4)), anchor);
      else if (path === '/compare') { toc.innerHTML = ''; await window.LG.viewCompare(app, await loadLaptops(), qs); window.scrollTo(0, 0); }
      else if (path === '/finder') { toc.innerHTML = ''; await window.LG.viewFinder(app, await loadLaptops(), qs); if (!qs) window.scrollTo(0, 0); }
      else if (path.startsWith('/search')) { toc.innerHTML = ''; const q = decodeURIComponent(path.replace(/^\/search\/?/, '')); if (sbox) sbox.value = q; await window.LG.viewSearch(app, q, await loadManifest(), loadChapter); window.scrollTo(0, 0); }
      else if (path === '/about') { await viewAbout(); window.scrollTo(0, 0); }
      else viewNotFound();
    } catch (e) {
      console.error(e);
      app.innerHTML = `<h2>Couldn't load this page</h2><pre>${esc(e)}</pre><p>If you opened index.html directly from disk, serve it over HTTP (e.g. <code>python3 -m http.server</code> in <code>web/</code>) — browsers block <code>fetch()</code> from <code>file://</code>.</p>`;
    }
  }
  window.addEventListener('hashchange', route);
  // Legacy/static deep links: ?ch=05-memory-and-storage.md → #/ch/...
  const params = new URLSearchParams(location.search);
  if (params.get('ch')) { history.replaceState(null, '', location.pathname + '#/ch/' + params.get('ch')); }
  loadManifest().then(m => { buildNav(m); route(); });
  window.LG = window.LG || {};
  window.LG.md = md;
})();
