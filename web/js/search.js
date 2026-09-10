/* Client-side full-text search over web/content/*.md.
   Builds an index of (chapter, section heading, paragraph) on first use; no dependencies. */
(() => {
  window.LG = window.LG || {};
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const slug = s => s.toLowerCase().replace(/[^a-z0-9 -]/g, '').trim().replace(/ +/g, '-');
  const strip = s => s.replace(/[*_`>#|]/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim();
  let index = null;

  async function build(manifest, loadChapter) {
    if (index) return index;
    index = [];
    for (const c of manifest) {
      const text = await loadChapter(c.file);
      let section = c.title, anchor = '';
      for (const block of text.split(/\n{2,}/)) {
        const h = block.match(/^(#{1,4})\s+(.+)$/m);
        if (h) { section = strip(h[2]); anchor = slug(section); }
        const body = strip(block.replace(/^#{1,6}\s.+$/gm, ''));
        if (body.length < 30) continue;
        index.push({ file: c.file, chapter: c.short, section, anchor, body, lower: body.toLowerCase() });
      }
    }
    return index;
  }

  function query(q, limit = 40) {
    const terms = q.toLowerCase().split(/\s+/).filter(t => t.length > 1);
    if (!terms.length) return [];
    const phrase = q.toLowerCase().trim();
    const out = [];
    for (const e of index) {
      let score = 0;
      for (const t of terms) {
        const n = e.lower.split(t).length - 1;
        if (!n) { score = 0; break; }
        score += Math.min(n, 5) + (e.section.toLowerCase().includes(t) ? 4 : 0);
      }
      if (!score) continue;
      if (terms.length > 1 && e.lower.includes(phrase)) score += 10;
      if (/^1[34]/.test(e.file)) score += 1; // picks chapters slightly favoured
      out.push({ e, score });
    }
    out.sort((a, b) => b.score - a.score);
    return out.slice(0, limit).map(x => x.e);
  }

  function snippet(e, q) {
    const terms = q.toLowerCase().split(/\s+/).filter(t => t.length > 1);
    const pos = Math.max(0, ...terms.map(t => e.lower.indexOf(t)).filter(i => i >= 0));
    const first = Math.min(...terms.map(t => e.lower.indexOf(t)).filter(i => i >= 0).concat([pos]));
    const start = Math.max(0, first - 90), end = Math.min(e.body.length, first + 220);
    let s = (start ? '…' : '') + esc(e.body.slice(start, end)) + (end < e.body.length ? '…' : '');
    for (const t of terms) s = s.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>');
    return s;
  }

  window.LG.viewSearch = async (app, q, manifest, loadChapter) => {
    app.innerHTML = `<h1>Search</h1>
      <form id="sf" class="search" style="margin:0 0 1em"><input id="sq" type="search" value="${esc(q || '')}" placeholder="e.g. 32 GB ThinkPad, PWM, WSL2, Zephyrus…" aria-label="Search" style="width:100%;max-width:520px;font-size:1rem"></form>
      <div id="sr"><p class="meta">Indexing ${manifest.length} chapters…</p></div>`;
    const form = app.querySelector('#sf'), input = app.querySelector('#sq'), res = app.querySelector('#sr');
    form.onsubmit = e => { e.preventDefault(); location.hash = '#/search/' + encodeURIComponent(input.value.trim()); };
    input.focus();
    await build(manifest, loadChapter);
    if (!q) { res.innerHTML = `<p class="meta">Type a term and press Enter. Searches all ${index.length.toLocaleString()} paragraphs of the guide.</p>`; return; }
    const hits = query(q);
    if (!hits.length) { res.innerHTML = `<p>No results for <b>${esc(q)}</b>. Try a shorter term, a model name (e.g. "X1 Carbon"), or a topic ("battery").</p>`; return; }
    res.innerHTML = `<p class="meta">${hits.length} result${hits.length > 1 ? 's' : ''} for <b>${esc(q)}</b></p>` +
      hits.map(e => `<div class="hit"><h3><a href="#/ch/${e.file}#${e.anchor}">${esc(e.section)}</a> <small>· ${esc(e.chapter)}</small></h3><p>${snippet(e, q)}</p></div>`).join('');
  };
})();
