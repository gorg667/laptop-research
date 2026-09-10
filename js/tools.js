/* Compare tool + Pick Finder. Attached to window.LG so app.js can call them.
   Both persist their state in the URL hash query string so results are shareable. */
(() => {
  window.LG = window.LG || {};
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
  const money = n => '$' + n.toLocaleString();
  const PERSONAS = {
    freshman: 'Frugal freshman', sophomore: 'Do-everything student', 'ml-noncuda': 'ML (no CUDA)', 'ml-cuda': 'ML (CUDA)',
    gamedev: 'Game dev', linux: 'Linux purist', mobile: 'Mobile dev', swe: 'Working SWE', systems: 'Systems / infra / security',
    'ee-ce': 'EE / CE / embedded', nomad: 'Nomad / commuter', 'gamer-coder': 'Gamer who codes', desktop: 'Desktop replacement', parent: 'Parent buying'
  };
  const TIERS = { 1: '< $700', 2: '$700–1,000', 3: '$1,000–1,500', 4: '$1,500–2,200', 5: '$2,200+' };
  const TIER_CH = { 1: '13a-picks-tier1.md', 2: '13b-picks-tier2.md', 3: '13c-picks-tier3.md', 4: '13d-picks-tier4.md', 5: '13e-picks-tier5.md' };
  const RATINGS = [['keyboard', 'Keyboard'], ['displayScore', 'Display'], ['battery', 'Battery'], ['build', 'Build'], ['repair', 'Repair'], ['sustained', 'Sustained'], ['noise', 'Quiet'], ['linux', 'Linux']];
  const badgeCls = t => /warn|wait|8gb|no-headphone/.test(t) ? 'warn' : /best|value|refurb/.test(t) ? 'good' : '';
  const is8 = l => /^8 GB/.test(l.ram);
  const setQS = (path, obj) => {
    const qs = Object.entries(obj).filter(([, v]) => v !== '' && v !== false && v != null).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
    history.replaceState(null, '', location.pathname + '#' + path + (qs ? '?' + qs : ''));
  };
  const getQS = qs => Object.fromEntries(new URLSearchParams(qs || ''));

  // ---------------- Side-by-side ----------------
  function sideBySide(sel) {
    if (sel.length < 2) return '';
    const rows = [
      ['Price (rec. config)', l => money(l.recPrice), l => l.recPrice, 'min'],
      ['List price', l => money(l.price), l => l.price, 'min'],
      ['Tier', l => TIERS[l.tier]],
      ['OS', l => l.os.join(' / ')],
      ['Chip', l => l.chip],
      ['Architecture', l => l.arch],
      ['RAM (options)', l => l.ram],
      ['RAM to buy', l => l.recRam],
      ['Storage', l => l.storage],
      ['Display', l => l.display],
      ['Weight', l => l.weightKg + ' kg', l => l.weightKg, 'min'],
      ['Battery', l => l.batteryWh + ' Wh', l => l.batteryWh, 'max'],
      ['Real battery (h)', l => l.battRealH, l => parseFloat(l.battRealH), 'max'],
      ['GPU', l => l.gpu],
      ['Ports', l => l.ports],
      ...RATINGS.map(([k, n]) => [n, l => `<span class="st"><b>${stars(l[k])}</b></span>`, l => l[k], 'max']),
      ['Pros', l => l.pros],
      ['Cons', l => l.cons],
      ['Verdict', l => `<i>${esc(l.verdict)}</i>`],
      ['Best for', l => l.personas.map(p => PERSONAS[p] || p).join(', ')],
    ];
    const body = rows.map(([name, fmt, num, dir]) => {
      let best = new Set();
      if (num) { const vals = sel.map(num); const b = dir === 'min' ? Math.min(...vals) : Math.max(...vals); vals.forEach((v, i) => { if (v === b && vals.some(x => x !== b)) best.add(i); }); }
      return `<tr><td>${name}</td>${sel.map((l, i) => `<td class="${best.has(i) ? 'best' : ''}">${/^</.test(fmt(l)) ? fmt(l) : esc(fmt(l))}</td>`).join('')}</tr>`;
    }).join('');
    return `<div class="sbs"><table><thead><tr><th>Side by side</th>${sel.map(l => `<th>${esc(l.name)}<br><small>${esc(l.brand)}</small></th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>
      <p class="meta">Green = best in row among the selected machines (lower price/weight, higher battery/ratings). Ratings are the guide's editorial 1–5 assessments.</p>`;
  }

  // ---------------- Compare ----------------
  window.LG.viewCompare = async (app, data, qs) => {
    const L = data.laptops;
    const brands = [...new Set(L.map(l => l.brand))].sort();
    const q = getQS(qs);
    const sel = new Set((q.sel || '').split(',').filter(Boolean));
    app.innerHTML = `
      <h1>Compare laptops</h1>
      <p class="meta">${L.length} machines from Chapters 13–14 · prices US, updated ${esc(data.meta.updated)}, realistic sale/refurb for the recommended config · ratings are editorial (1–5). Tick <b>compare</b> on 2–4 cards for a side-by-side table. Filters are saved in the URL — copy it to share.</p>
      <div class="filters">
        <label>OS<select id="fOs"><option value="">Any</option><option>macOS</option><option>Windows</option><option>Linux</option></select></label>
        <label>Brand<select id="fBrand"><option value="">Any</option>${brands.map(b => `<option>${esc(b)}</option>`).join('')}</select></label>
        <label>Budget tier<select id="fTier"><option value="">Any</option>${Object.entries(TIERS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></label>
        <label>Persona<select id="fPersona"><option value="">Any</option>${Object.entries(PERSONAS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></label>
        <label>Max price ($)<input id="fPrice" type="number" placeholder="e.g. 1500" min="0" step="50"></label>
        <label>Min RAM to buy<select id="fRam"><option value="">Any</option><option value="16">16 GB+</option><option value="24">24 GB+</option><option value="32">32 GB+</option><option value="48">48 GB+</option></select></label>
        <label>Sort<select id="fSort"><option value="tier">Budget tier</option><option value="recPrice">Price ↑</option><option value="-recPrice">Price ↓</option><option value="weightKg">Weight ↑</option><option value="-batteryWh">Battery Wh ↓</option><option value="-battery">Battery rating</option><option value="-keyboard">Keyboard rating</option><option value="-displayScore">Display rating</option><option value="-linux">Linux support</option><option value="-repair">Repairability</option><option value="-sustained">Sustained perf</option><option value="-total">Overall rating</option></select></label>
        <label class="chk"><input id="fGpu" type="checkbox"> Discrete GPU</label>
        <label class="chk"><input id="fLinux" type="checkbox"> Linux ≥ 4/5</label>
        <label class="chk"><input id="fNo8" type="checkbox"> Hide 8 GB machines</label>
        <label class="chk"><input id="fLight" type="checkbox"> ≤ 1.4 kg</label>
        <label class="chk"><input id="fNew" type="checkbox"> New only (no used/refurb)</label>
        <button class="reset" id="fReset" type="button">Reset filters</button>
      </div>
      <div class="toolbar"><div class="count" id="count"></div>
        <div class="view-toggle"><button id="vCards" class="on">Cards</button> <button id="vTable">Table</button></div></div>
      <div id="results"></div>
      <div id="sbs"></div>
      <div class="cmpbar" id="cmpbar" hidden></div>`;

    const f = id => app.querySelector('#' + id);
    const ids = { fOs: 'os', fBrand: 'brand', fTier: 'tier', fPersona: 'persona', fPrice: 'max', fRam: 'ram', fSort: 'sort', fGpu: 'gpu', fLinux: 'linux', fNo8: 'no8', fLight: 'light', fNew: 'new' };
    // restore from URL (defaults: hide 8 GB on)
    if (!qs) q.no8 = '1';
    for (const [id, k] of Object.entries(ids)) { const el = f(id); if (el.type === 'checkbox') el.checked = q[k] === '1'; else if (q[k] != null) el.value = q[k]; }
    let view = q.view === 'table' ? 'table' : 'cards';
    const total = l => l.keyboard + l.displayScore + l.battery + l.build + l.repair + l.sustained + l.noise;
    const ramNum = l => parseInt(l.recRam) || 0;

    const persist = () => {
      const o = { view: view === 'table' ? 'table' : '', sel: [...sel].join(',') };
      for (const [id, k] of Object.entries(ids)) { const el = f(id); o[k] = el.type === 'checkbox' ? (el.checked ? '1' : '') : el.value; }
      if (o.sort === 'tier') o.sort = '';
      setQS('/compare', o);
    };

    const apply = () => {
      const os = f('fOs').value, brand = f('fBrand').value, tier = f('fTier').value, persona = f('fPersona').value;
      const maxP = +f('fPrice').value || Infinity, minRam = +f('fRam').value || 0;
      let R = L.filter(l =>
        (!os || l.os.includes(os)) && (!brand || l.brand === brand) && (!tier || l.tier == tier) &&
        (!persona || l.personas.includes(persona)) && l.recPrice <= maxP && ramNum(l) >= minRam &&
        (!f('fGpu').checked || !/^integrated/.test(l.gpu)) && (!f('fLinux').checked || l.linux >= 4) &&
        (!f('fNo8').checked || !is8(l)) && (!f('fLight').checked || l.weightKg <= 1.4) &&
        (!f('fNew').checked || !l.tags.some(t => /used|refurb/.test(t))));
      const sv = f('fSort').value; const key = sv.replace(/^-/, ''); const dir = sv.startsWith('-') ? -1 : 1;
      const val = l => key === 'total' ? total(l) : l[key];
      R.sort((a, b) => (val(a) > val(b) ? 1 : val(a) < val(b) ? -1 : a.recPrice - b.recPrice) * dir);
      f('count').textContent = `${R.length} of ${L.length} shown`;
      f('results').innerHTML = view === 'cards' ? cards(R) : table(R);
      if (view === 'table') f('results').querySelectorAll('th[data-k]').forEach(th => {
        if (th.dataset.k === key) th.classList.add('sorted', dir === 1 ? 'asc' : '');
        th.onclick = () => { f('fSort').value = (key === th.dataset.k && dir === 1 ? '-' : '') + th.dataset.k; if (!f('fSort').value) f('fSort').value = th.dataset.k; apply(); };
      });
      f('results').querySelectorAll('input.selbox').forEach(cb => cb.onchange = () => {
        if (cb.checked) { if (sel.size >= 4) { cb.checked = false; return; } sel.add(cb.value); } else sel.delete(cb.value);
        renderSel();
      });
      renderSel(); persist();
    };
    const renderSel = () => {
      const S = [...sel].map(id => L.find(l => l.id === id)).filter(Boolean);
      app.querySelectorAll('.lp').forEach(c => c.classList.toggle('sel', sel.has(c.dataset.id)));
      app.querySelectorAll('input.selbox').forEach(cb => cb.checked = sel.has(cb.value));
      const bar = f('cmpbar');
      bar.hidden = !S.length;
      bar.innerHTML = S.length ? `<b>Compare (${S.length}/4):</b> ${S.map(l => `<span class="badge">${esc(l.name)} <button class="x" data-id="${l.id}" aria-label="Remove">×</button></span>`).join('')}
        <span style="flex:1"></span><button class="btn" id="sbsBtn" ${S.length < 2 ? 'disabled' : ''}>Side by side ↓</button><button class="x" id="clearSel">Clear</button>` : '';
      bar.querySelectorAll('.x[data-id]').forEach(b => b.onclick = () => { sel.delete(b.dataset.id); renderSel(); persist(); });
      const c = f('clearSel'); if (c) c.onclick = () => { sel.clear(); renderSel(); persist(); f('sbs').innerHTML = ''; };
      const sb = f('sbsBtn'); if (sb) sb.onclick = () => { f('sbs').innerHTML = `<h2 id="sbs-h">Side by side</h2>` + sideBySide(S); f('sbs-h').scrollIntoView({ block: 'start' }); };
      if (S.length >= 2 && f('sbs').innerHTML) f('sbs').innerHTML = `<h2 id="sbs-h">Side by side</h2>` + sideBySide(S);
      else if (S.length < 2) f('sbs').innerHTML = '';
      persist();
    };
    const card = l => `
      <div class="lp" data-id="${l.id}">
        <label class="cmp"><input type="checkbox" class="selbox" value="${l.id}"> compare</label>
        <div class="brand">${esc(l.brand)} · ${TIERS[l.tier]} ${l.tags.map(t => `<span class="badge ${badgeCls(t)}">${esc(t)}</span>`).join('')}</div>
        <h3>${esc(l.name)}</h3>
        <div class="row"><span>${esc(l.chip)}</span></div>
        <div class="row"><span>RAM <b>${esc(l.ram)}</b></span><span>buy <b>${esc(l.recRam)}</b></span></div>
        <div class="row"><span>${esc(l.display)}</span></div>
        <div class="row"><span>${l.weightKg} kg · ${l.batteryWh} Wh · ~${esc(l.battRealH)} h real</span></div>
        <div class="row"><span>GPU: ${esc(l.gpu)}</span></div>
        <div class="row"><span>${esc(l.ports)}</span></div>
        <div class="row"><span class="price">${money(l.recPrice)} <small>(rec. config; list ${money(l.price)})</small></span><span>${l.os.join(' / ')}</span></div>
        <div class="stars">${RATINGS.map(([k, n]) => `<span>${n} <b>${stars(l[k])}</b></span>`).join('')}</div>
        <div class="pc"><b>+</b> ${esc(l.pros)}<br><b class="c">−</b> ${esc(l.cons)}</div>
        <div class="verdict"><b>Verdict:</b> ${esc(l.verdict)}</div>
        <div>${l.personas.map(p => `<span class="badge">${PERSONAS[p] || p}</span>`).join('')}</div>
        <div class="ch"><a href="#/ch/${TIER_CH[l.tier]}">Read the Tier ${l.tier} write-up →</a></div>
      </div>`;
    const cards = R => R.length ? `<div class="grid">${R.map(card).join('')}</div>` : `<div class="callout">No machine matches every filter. Loosen one — or read <a href="#/ch/13a-picks-tier1.md">Chapter 13</a> for the reasoning behind each tier.</div>`;
    const table = R => `<div class="tbl wide"><table><thead><tr>
      <th></th><th data-k="name">Laptop</th><th data-k="recPrice">Price (rec.)</th><th data-k="tier">Tier</th><th>OS</th><th>Chip</th><th>RAM</th><th>Display</th><th data-k="weightKg">kg</th><th data-k="batteryWh">Wh</th><th>Real h</th><th>GPU</th>
      ${RATINGS.map(([k, n]) => `<th data-k="${k}">${n}</th>`).join('')}<th data-k="total">Σ</th><th>Verdict</th></tr></thead>
      <tbody>${R.map(l => `<tr><td><input type="checkbox" class="selbox" value="${l.id}" aria-label="Select for side-by-side"></td><td><b>${esc(l.name)}</b><br><small>${esc(l.brand)}</small></td><td>${money(l.recPrice)}<br><small>list ${money(l.price)}</small></td><td>${TIERS[l.tier]}</td><td>${l.os.join('/')}</td><td>${esc(l.chip)}</td><td>${esc(l.ram)}<br><small>buy ${esc(l.recRam)}</small></td><td>${esc(l.display)}</td><td>${l.weightKg}</td><td>${l.batteryWh}</td><td>${esc(l.battRealH)}</td><td>${esc(l.gpu)}</td>
        ${RATINGS.map(([k]) => `<td>${l[k]}</td>`).join('')}<td>${total(l)}</td><td>${esc(l.verdict)}</td></tr>`).join('')}</tbody></table></div>`;
    app.querySelectorAll('.filters select,.filters input').forEach(el => el.addEventListener('input', apply));
    f('fReset').onclick = () => { for (const id of Object.keys(ids)) { const el = f(id); if (el.type === 'checkbox') el.checked = id === 'fNo8'; else el.value = id === 'fSort' ? 'tier' : ''; } apply(); };
    f('vCards').onclick = () => { view = 'cards'; f('vCards').classList.add('on'); f('vTable').classList.remove('on'); apply(); };
    f('vTable').onclick = () => { view = 'table'; f('vTable').classList.add('on'); f('vCards').classList.remove('on'); apply(); };
    if (view === 'table') { f('vTable').classList.add('on'); f('vCards').classList.remove('on'); }
    apply();
    if (sel.size >= 2) { const S = [...sel].map(id => L.find(l => l.id === id)).filter(Boolean); f('sbs').innerHTML = `<h2 id="sbs-h">Side by side</h2>` + sideBySide(S); }
  };

  // ---------------- Finder ----------------
  const Q = [
    { id: 'budget', q: 'What is your realistic total budget?', opts: [['1', 'Under $700'], ['2', '$700–1,000'], ['3', '$1,000–1,500'], ['4', '$1,500–2,200'], ['5', '$2,200+']] },
    { id: 'os', q: 'Operating system?', opts: [['any', 'No preference — recommend'], ['macOS', 'macOS'], ['Windows', 'Windows'], ['Linux', 'Linux (native, daily)']] },
    { id: 'gpu', q: 'Do you need a discrete GPU?', opts: [['no', 'No / not sure'], ['cuda', 'Yes — CUDA / ML training'], ['game', 'Yes — Unreal / gaming'], ['llm', 'I want to run large local LLMs']] },
    { id: 'mobility', q: 'How much will you carry it?', opts: [['daily', 'Every day, across campus'], ['some', 'Sometimes'], ['desk', 'Rarely — desk machine']] },
    { id: 'persona', q: 'Which describes you best?', opts: Object.entries(PERSONAS) },
  ];
  function recommend(L, ans) {
    const notes = [];
    let R = L.filter(l => !is8(l));
    if (ans.os !== 'any') R = R.filter(l => l.os.includes(ans.os));
    if (ans.os === 'Linux') { R = R.filter(l => l.linux >= 4); notes.push('Linux daily-driver: filtered to machines rated ≥4/5 for Linux; Snapdragon excluded (Ch. 3 §3.7).'); }
    if (ans.gpu === 'cuda') { R = R.filter(l => /RTX/.test(l.gpu)); notes.push('CUDA required → Nvidia dGPU only. Prefer ≥12 GB VRAM (5070 Ti+) for real training; 8 GB cards are marginal (Ch. 12). Also consider a light laptop + GPU desktop — and watch Nvidia RTX Spark reviews in 2027.'); }
    else if (ans.gpu === 'game') { R = R.filter(l => !/^integrated/.test(l.gpu)); notes.push('Unreal / AAA gaming → discrete GPU (or M5 Pro-class GPU for Mac-native games). 32 GB RAM minimum.'); }
    else if (ans.gpu === 'llm') { R = R.filter(l => l.tags.includes('local-llm') || /M5 Pro|M5 Max|Strix/.test(l.chip) || /RTX 5080|5090|PRO/.test(l.gpu)); notes.push('Large local LLMs → unified memory (M5 Pro/Max, Strix Halo) or 16–24 GB VRAM. The model must fit first (Ch. 2 §2.2).'); }
    else { R = R.filter(l => /^integrated/.test(l.gpu)); notes.push('No dGPU needed — integrated graphics are sufficient for ~90% of CS/SWE work; you save weight, battery, noise, and money (Ch. 12).'); }
    if (ans.mobility === 'daily') { R = R.filter(l => l.weightKg <= 1.7); notes.push('Daily carry → ≤1.7 kg.'); }
    const t = +ans.budget;
    let B = R.filter(l => l.tier <= t);
    if (!B.length) { B = R.filter(l => l.tier <= t + 1); notes.push('Nothing in your tier matched every constraint — showing the next tier up.'); }
    R = B;
    const boost = l => (l.personas.includes(ans.persona) ? 10 : 0) + (l.personas[0] === ans.persona ? 3 : 0) + (l.tags.some(t => /^best|linux-first|refurb/.test(t)) ? 2 : 0) + l.tier;
    R.sort((a, b) => (boost(b) - boost(a)) || (b.keyboard + b.displayScore + b.battery + b.build) - (a.keyboard + a.displayScore + a.battery + a.build));
    return { top: R.slice(0, 3), notes };
  }
  window.LG.recommend = recommend;

  window.LG.viewFinder = async (app, data, qs) => {
    const L = data.laptops;
    const ans = {};
    const q = getQS(qs);
    for (const k of Q.map(x => x.id)) if (q[k]) ans[k] = q[k];
    app.innerHTML = `<h1>Pick finder</h1><p class="meta">Five questions → the guide's recommendation, drawn from Chapters 13–14. Not a substitute for reading Chapter 3 (OS) and Chapter 5 (RAM). Your answers are saved in the URL — copy it to share the result.</p>
      <div class="quiz">${Q.map(qq => `<div class="q"><label>${qq.q}</label><div class="opts" data-q="${qq.id}" role="group" aria-label="${esc(qq.q)}">${qq.opts.map(([v, t]) => `<button type="button" data-v="${v}" class="${ans[qq.id] === v ? 'on' : ''}" aria-pressed="${ans[qq.id] === v}">${t}</button>`).join('')}</div></div>`).join('')}
      <div class="result" id="res"><p class="meta">Answer the questions above.</p></div></div>`;
    app.querySelectorAll('.opts button').forEach(b => b.onclick = () => {
      const g = b.parentElement; g.querySelectorAll('button').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); }); b.classList.add('on'); b.setAttribute('aria-pressed', 'true'); ans[g.dataset.q] = b.dataset.v; run();
    });
    function run() {
      setQS('/finder', ans);
      if (Object.keys(ans).length < Q.length) return;
      const { top, notes } = recommend(L, ans);
      const res = app.querySelector('#res');
      if (!top.length) { res.innerHTML = `<h3>No match</h3><p>Your constraints conflict (e.g. Linux + Snapdragon, or a dGPU under $700). Loosen one and try again, or read <a href="#/ch/13a-picks-tier1.md">Chapter 13</a>.</p>`; return; }
      res.innerHTML = `<h3 id="res-h">Recommendation${top.length > 1 ? 's' : ''}</h3>
        ${notes.map(n => `<div class="callout">${n}</div>`).join('')}
        <div class="grid">${top.map((l, i) => `<div class="lp"><div class="brand">${i === 0 ? '🥇 Primary' : i === 1 ? '🥈 Alternative' : '🥉 Also consider'} · ${TIERS[l.tier]}</div><h3>${esc(l.name)}</h3>
          <div class="row"><span>${esc(l.chip)}</span></div><div class="row"><span>Buy with <b>${esc(l.recRam)}</b></span><span class="price">${money(l.recPrice)}</span></div>
          <div class="verdict">${esc(l.verdict)}</div><div class="pc"><b>+</b> ${esc(l.pros)}<br><b class="c">−</b> ${esc(l.cons)}</div>
          <div class="ch"><a href="#/ch/${TIER_CH[l.tier]}">Tier ${l.tier} write-up →</a></div></div>`).join('')}</div>
        <div class="actions"><a class="badge" href="#/compare?sel=${top.map(l => l.id).join(',')}&no8=1">Open these in the comparison tool →</a> <button type="button" id="copyLink">Copy link to this result</button> <button type="button" id="resetQ">Start over</button></div>
        <p class="meta">Next: read the persona section in <a href="#/ch/14a-personas-1.md">Chapter 14</a>, then <a href="#/ch/15-buying-strategy.md">Chapter 15</a> for how to pay less.</p>`;
      res.querySelector('#copyLink').onclick = e => { navigator.clipboard?.writeText(location.href).then(() => { e.target.textContent = 'Copied ✓'; setTimeout(() => e.target.textContent = 'Copy link to this result', 1500); }); };
      res.querySelector('#resetQ').onclick = () => { location.hash = '#/finder'; window.LG.viewFinder(app, data, ''); };
      if (qs) requestAnimationFrame(() => res.querySelector('#res-h').scrollIntoView({ block: 'start' }));
    }
    run();
  };
})();
