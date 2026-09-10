/* Laptop Guide web app — hash-routed static SPA. No build step.
   Routes: #/  (home)  #/ch/<file>[#section]  #/compare[?ids=a,b]  #/finder[?budget=..&os=..]  #/search?q=...
   Content: web/content/*.md + manifest.json ; data: web/data/laptops.json */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const app = $('#app'), toc = $('#toc'), side = $('#side'), backdrop = $('#backdrop');
  const state = { manifest: [], laptops: null, chapters: {}, index: null };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  // ---------- theme ----------
  const root = document.documentElement;
  if (!root.dataset.theme) root.dataset.theme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  $('#themeBtn').onclick = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; localStorage.setItem('theme', root.dataset.theme); };

  // ---------- side menu (mobile) ----------
  const menuBtn = $('#menuBtn');
  const setMenu = open => { side.classList.toggle('open', open); backdrop.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); };
  menuBtn.onclick = () => setMenu(!side.classList.contains('open'));
  backdrop.onclick = () => setMenu(false);
  document.addEventListener('click', e => { if (e.target.closest('nav.side a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
    if (e.key === '/' && !/input|textarea|select/i.test(e.target.tagName)) { e.preventDefault(); $('#searchBox').focus(); }
  });

  // ---------- search box ----------
  $('#searchForm').onsubmit = e => { e.preventDefault(); const q = $('#searchBox').value.trim(); if (q) location.hash = '#/search?q=' + encodeURIComponent(q); };

  // ---------- markdown ----------
  marked.setOptions({ gfm: true, breaks: false, headerIds: false, mangle: false });
  const slug = s => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9 -]/g, '').trim().replace(/ +/g, '-');
  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    const id = slug(text);
    const a = level >= 2 && level <= 3 ? `<a class="anchor" href="#${location.hash.split('#')[1] ? '/' + location.hash.split('#')[1].split('#')[0] : ''}#${id}" aria-label="Link to section">#</a>` : '';
    return `<h${level} id="${id}">${text}${a}</h${level}>`;
  };
  renderer.link = (href, title, text) => {
    const ext = /^https?:/.test(href);
    // allow chapter cross-links written as e.g. (05-memory-and-storage.md) or (05-memory-and-storage.md#5-2)
    if (/^\d\d[a-z]?-[\w-]+\.md/.test(href)) href = '#/ch/' + href;
    return `<a href="${href}"${title ? ` title="${title}"` : ''}${ext ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
  };
  const md = s => marked.parse(s, { renderer });

  // ---------- data loading ----------
  const getJSON = async u => { const r = await fetch(u); if (!r.ok) throw new Error(`${u}: HTTP ${r.status}`); return r.json(); };
  const getText = async u => { const r = await fetch(u); if (!r.ok) throw new Error(`${u}: HTTP ${r.status}`); return r.text(); };
  const loadManifest = async () => { if (!state.manifest.length) state.manifest = await getJSON('content/manifest.json'); return state.manifest; };
  const loadLaptops = async () => { if (!state.laptops) state.laptops = await getJSON('data/laptops.json'); return state.laptops; };
  const loadChapter = async f => { if (!state.chapters[f]) state.chapters[f] = await getText('content/' + f); return state.chapters[f]; };
  const loadAll = async () => { const man = await loadManifest(); await Promise.all(man.map(c => loadChapter(c.file))); return man; };

  // ---------- nav ----------
  const isPicks = f => /^1[34]/.test(f);
  const isFund = f => /^(0\d|1[0-2])/.test(f);
  function buildNav(man) {
    const mk = c => `<a href="#/ch/${c.file}" data-route="/ch/${c.file}">${esc(c.short)}<span class="words">${(c.words / 1000).toFixed(1)}k</span></a>`;
    $('#navFund').innerHTML = man.filter(c => isFund(c.file)).map(mk).join('');
    $('#navPicks').innerHTML = man.filter(c => isPicks(c.file)).map(mk).join('');
    $('#navRest').innerHTML = man.filter(c => !isFund(c.file) && !isPicks(c.file)).map(mk).join('');
  }
  function setActive(route) {
    document.querySelectorAll('nav.side a').forEach(a => a.classList.toggle('active', a.dataset.route === route));
    const act = $('nav.side a.active'); if (act && act.scrollIntoView) act.scrollIntoView({ block: 'nearest' });
  }

  // ---------- post-render helpers ----------
  function wrapTables(rootEl) {
    rootEl.querySelectorAll('table').forEach(t => { if (!t.parentElement.classList.contains('tbl')) { const w = document.createElement('div'); w.className = 'tbl'; t.replaceWith(w); w.appendChild(t); } });
  }
  function buildToc(rootEl) {
    const hs = [...rootEl.querySelectorAll('h2, h3')].filter(h => h.id);
    if (hs.length < 3) { toc.innerHTML = ''; return; }
    toc.innerHTML = `<div class="toc-title">On this page</div>` + hs.map(h => `<a class="${h.tagName === 'H3' ? 'l3' : ''}" href="#${h.id}" data-id="${h.id}">${esc(h.textContent.replace(/#$/, ''))}</a>`).join('');
    toc.querySelectorAll('a').forEach(a => a.onclick = e => { e.preventDefault(); const t = document.getElementById(a.dataset.id); if (t) { t.scrollIntoView({ block: 'start' }); history.replaceState(null, '', location.hash.split('#').slice(0, 2).join('#') + '#' + a.dataset.id); } });
    if (window._tocObs) window._tocObs.disconnect();
    const links = new Map([...toc.querySelectorAll('a')].map(a => [a.dataset.id, a]));
    window._tocObs = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { links.forEach(l => l.classList.remove('active')); const l = links.get(en.target.id); if (l) l.classList.add('active'); } });
    }, { rootMargin: '-10% 0px -80% 0px' });
    hs.forEach(h => window._tocObs.observe(h));
  }
  function scrollToSection(id) {
    if (!id) { window.scrollTo(0, 0); return; }
    requestAnimationFrame(() => { const t = document.getElementById(id); if (t) t.scrollIntoView({ block: 'start' }); else window.scrollTo(0, 0); });
  }
  // reading progress + back-to-top
  const prog = $('#readProgress'), toTop = $('#toTop');
  addEventListener('scroll', () => {
    const h = document.documentElement; const max = h.scrollHeight - h.clientHeight;
    prog.style.width = max > 0 ? (h.scrollTop / max * 100) + '%' : '0';
    toTop.hidden = h.scrollTop < 600;
  }, { passive: true });
  toTop.onclick = () => window.scrollTo({ top: 0 });

  // ---------- views ----------
  async function viewHome() {
    const [man, data] = await Promise.all([loadManifest(), loadLaptops()]);
    const intro = await loadChapter(man[0].file);
    const total = man.reduce((s, c) => s + c.words, 0);
    const L = data.laptops, by = id => L.find(l => l.id === id) || {};
    const picks = [
      ['Best overall', 'MacBook Air 13"/15" M5, 24 GB', `$${by('mba-m5-13').recPrice.toLocaleString()} / $${by('mba-m5-15').recPrice.toLocaleString()}`, 'good', 'mba-m5-13'],
      ['Best value', 'Refurb MacBook Air M4, 16 GB', '~$850–950', 'good', 'mba-m4-refurb'],
      ['Best Windows', 'ThinkPad X1 Carbon Gen 13/14, 32 GB', '~$1,400–1,600 on sale', '', 'x1c-g14'],
      ['Best Linux', 'Framework Laptop 13 Pro', '$1,499+', '', 'fw13pro'],
      ['Best with GPU', 'ROG Zephyrus G14 (2026) RTX 5070, 32 GB', '~$1,800', '', 'zephyrus-g14-2026'],
      ['Budget', 'Used ThinkPad T14 Gen 3/4 AMD, 32 GB', '~$500', 'good', 't14-used'],
      ['Avoid for CS', 'Any 8 GB laptop — Neo, XPS 13, Framework 12 base', '$699 class', 'warn', 'mb-neo'],
      ['Wait', 'Base MacBook Pro 14" M5 → M6 (announced) late 2026', '—', 'warn', 'mbp14-m5'],
    ];
    app.innerHTML = `
      <div class="hero">
        <span class="updated">Updated ${esc(data.meta.updated)} · v${esc(data.meta.version || '1.1')}</span>
        <h1>The Definitive Laptop Guide for CS Students &amp; Software Engineers</h1>
        <p class="lead">September 2026 edition · ${(total / 1000).toFixed(0)},000+ words · ${man.length} chapters · independent, no affiliate links.</p>
        <p><a class="btn2 primary" href="#/finder">🎯 Answer 5 questions → get a pick</a> &nbsp; <a class="btn2" href="#/compare">🔎 Compare ${L.length} laptops</a> &nbsp; <a class="btn2" href="#/ch/${man[0].file}">📖 Start reading</a> &nbsp; <a class="btn2" href="#/search">🔍 Search</a></p>
      </div>
      <h2 style="border:0;margin-top:0">Quick picks</h2>
      <div class="cards">${picks.map(([k, v, p, b, id]) => `<a class="card" href="#/compare?ids=${id}"><span class="badge ${b}">${k}</span><h3>${esc(v)}</h3><p class="price">${esc(p)}</p></a>`).join('')}</div>
      <div class="callout"><b>2026 is a weird year.</b> A global DRAM/NAND shortage pushed laptop prices up 15–30% (Apple +$200/$300 in June; HP said on Aug 26 more rises are coming). RAM is the scarce resource: buy 16 GB minimum, 24–32 if you can, never 8. Refurbished and prior-gen machines are the value plays. <a href="#/ch/05-memory-and-storage.md">Chapter 5 →</a></div>
      <div class="callout info"><b>What changed Sep 10:</b> Apple's <b>M6 chip is official</b> (Mac mini, Aug 25) — the base 14" MacBook Pro is expected to get it late 2026, the Air in early 2027. <b>macOS 27</b> drops Intel Macs and is the last release with Rosetta 2. New <b>$699 laptops with 8 GB</b> (Dell XPS 13, Framework 12) join the MacBook Neo. Nvidia's <b>RTX Spark</b> laptops were shown at IFA with no prices. <a href="#/ch/21-sources-and-changelog.md#213-changelog">Changelog →</a></div>
      ${md(intro.replace(/^# .*\n/, ''))}
      <h2>All chapters</h2>
      <div class="chapter-grid">${man.map(c => `<a href="#/ch/${c.file}">${esc(c.short)}<small>${c.words.toLocaleString()} words · ~${Math.ceil(c.words / 230)} min</small></a>`).join('')}</div>
      <div class="pager"><span></span><a class="next" href="#/ch/${man[1].file}"><small>Next</small>${esc(man[1].title)}</a></div>`;
    wrapTables(app); buildToc(app);
  }

  async function viewChapter(file, section) {
    const man = await loadManifest();
    const i = man.findIndex(c => c.file === file);
    if (i < 0) return viewNotFound();
    const text = await loadChapter(file);
    const prev = man[i - 1], next = man[i + 1];
    document.title = `${man[i].short} — Laptop Guide for CS & SWE (2026)`;
    app.innerHTML = `<p class="meta">${man[i].words.toLocaleString()} words · ~${Math.ceil(man[i].words / 230)} min read · <a href="https://github.com/gorg667/laptop-research/blob/main/guide/${file}" target="_blank" rel="noopener">source .md</a> · <a href="https://github.com/gorg667/laptop-research/edit/main/guide/${file}" target="_blank" rel="noopener">suggest an edit</a></p>
      ${md(text)}
      <div class="pager">${prev ? `<a href="#/ch/${prev.file}"><small>Previous</small>${esc(prev.title)}</a>` : `<a href="#/"><small>Back to</small>Home</a>`}${next ? `<a class="next" href="#/ch/${next.file}"><small>Next</small>${esc(next.title)}</a>` : '<span></span>'}</div>`;
    wrapTables(app); buildToc(app); scrollToSection(section);
  }

  // ---------- search ----------
  function buildIndex(man) {
    if (state.index) return state.index;
    const docs = [];
    man.forEach(c => {
      const text = state.chapters[c.file];
      let h2 = '', h3 = '', buf = [];
      const flush = () => { if (buf.length) { docs.push({ file: c.file, chapter: c.short, h2, h3, text: buf.join(' ') }); buf = []; } };
      text.split('\n').forEach(line => {
        const m = /^(#{1,3}) (.+)/.exec(line);
        if (m) { flush(); if (m[1].length <= 2) { h2 = m[2]; h3 = ''; } else h3 = m[2]; }
        else if (line.trim()) buf.push(line.replace(/[*_`>|#]/g, ' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'));
      });
      flush();
    });
    state.index = docs; return docs;
  }
  async function viewSearch(q) {
    const man = await loadAll();
    const L = (await loadLaptops()).laptops;
    const docs = buildIndex(man);
    $('#searchBox').value = q || '';
    document.title = `Search — Laptop Guide (2026)`;
    if (!q) { app.innerHTML = `<h1>Search the guide</h1><p class="meta">Type in the box above (or press <kbd>/</kbd>). Searches all ${man.length} chapters and the ${L.length}-laptop database.</p>`; toc.innerHTML = ''; return; }
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    const score = t => { const lc = t.toLowerCase(); let s = 0; for (const w of terms) { if (!lc.includes(w)) return 0; s += (lc.match(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length; } return s; };
    const hl = s => { let out = esc(s); terms.forEach(w => { out = out.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>'); }); return out; };
    const snippet = t => { const lc = t.toLowerCase(); const i = Math.max(0, lc.indexOf(terms[0])); const s = Math.max(0, i - 120); return (s ? '…' : '') + t.slice(s, s + 320) + (t.length > s + 320 ? '…' : ''); };
    const res = docs.map(d => ({ d, s: score(d.h2 + ' ' + d.h3 + ' ' + d.text) + 3 * score(d.h2 + ' ' + d.h3) })).filter(r => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 40);
    const lres = L.map(l => ({ l, s: score([l.name, l.brand, l.chip, l.verdict, l.pros, l.cons, l.tags.join(' ')].join(' ')) })).filter(r => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 8);
    app.innerHTML = `<h1>Search: “${esc(q)}”</h1><p class="meta">${res.length} section${res.length === 1 ? '' : 's'} · ${lres.length} laptop${lres.length === 1 ? '' : 's'}</p>
      ${lres.length ? `<h2 style="border:0;margin-top:0">Laptops</h2><div class="grid">${lres.map(({ l }) => `<a class="sr" href="#/compare?ids=${l.id}"><div class="where">${esc(l.brand)} · tier ${l.tier}</div><h3>${hl(l.name)}</h3><p>${hl(l.verdict)}</p></a>`).join('')}</div>` : ''}
      ${res.length ? `<h2 style="border:0">Guide sections</h2>` + res.map(({ d }) => `<a class="sr" href="#/ch/${d.file}#${slug(d.h3 || d.h2)}"><div class="where">${esc(d.chapter)}</div><h3>${hl(d.h2)}${d.h3 ? ' › ' + hl(d.h3) : ''}</h3><p>${hl(snippet(d.text))}</p></a>`).join('') : `<p>No sections matched. Try fewer or different words (e.g. <a href="#/search?q=RAM">RAM</a>, <a href="#/search?q=Linux">Linux</a>, <a href="#/search?q=refurbished">refurbished</a>).</p>`}`;
    toc.innerHTML = '';
  }

  function viewNotFound() {
    app.innerHTML = `<h1>Page not found</h1><p>That route doesn't exist. <a href="#/">Go home</a> or pick a chapter from the menu.</p>`; toc.innerHTML = '';
  }

  // ---------- router ----------
  function parseHash() {
    const raw = location.hash.replace(/^#/, '') || '/';
    const [pathq, section] = raw.split('#');
    const [path, qs] = pathq.split('?');
    return { path, section, params: new URLSearchParams(qs || '') };
  }
  async function route() {
    const { path, section, params } = parseHash();
    setActive(path);
    if (path !== '/ch' && !path.startsWith('/ch/')) window.scrollTo(0, 0);
    document.title = 'The Definitive Laptop Guide for CS Students & Software Engineers (2026)';
    try {
      if (path === '/') await viewHome();
      else if (path.startsWith('/ch/')) await viewChapter(decodeURIComponent(path.slice(4)), section);
      else if (path === '/compare') { toc.innerHTML = ''; await window.LG.viewCompare(app, await loadLaptops(), params); }
      else if (path === '/finder') { toc.innerHTML = ''; await window.LG.viewFinder(app, await loadLaptops(), params); }
      else if (path === '/search') await viewSearch(params.get('q') || '');
      else viewNotFound();
    } catch (e) {
      console.error(e);
      app.innerHTML = `<h2>Couldn't load this page</h2><pre>${esc(e)}</pre><p>If you opened index.html directly from disk, serve it over HTTP (e.g. <code>python3 -m http.server</code> in <code>web/</code>) — browsers block <code>fetch()</code> from <code>file://</code>.</p>`;
    }
  }
  window.addEventListener('hashchange', route);
  loadManifest().then(m => { buildNav(m); route(); }).catch(e => { app.innerHTML = `<h2>Couldn't load the chapter manifest</h2><pre>${esc(e)}</pre>`; });
  window.LG = window.LG || {};
  window.LG.md = md; window.LG.esc = esc;
})();
