/* Compare tool + Pick Finder. Attached to window.LG so app.js can call them. */
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

  // ---------------- Compare ----------------
  window.LG.viewCompare = async (app, data) => {
    const L = data.laptops;
    const brands = [...new Set(L.map(l => l.brand))].sort();
    app.innerHTML = `
      <h1>Compare laptops</h1>
      <p class="meta">${L.length} machines from Chapters 13–14 · prices US, ${data.meta.updated}, realistic sale/refurb for the recommended config · ratings are editorial (1–5). ${esc(data.meta.note.split('.')[1] || '')}</p>
      <div class="filters">
        <label>OS<select id="fOs"><option value="">Any</option><option>macOS</option><option>Windows</option><option>Linux</option></select></label>
        <label>Brand<select id="fBrand"><option value="">Any</option>${brands.map(b => `<option>${b}</option>`).join('')}</select></label>
        <label>Budget tier<select id="fTier"><option value="">Any</option>${Object.entries(TIERS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></label>
        <label>Persona<select id="fPersona"><option value="">Any</option>${Object.entries(PERSONAS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></label>
        <label>Max price ($)<input id="fPrice" type="number" placeholder="e.g. 1500" min="0" step="50"></label>
        <label>Sort<select id="fSort"><option value="tier">Budget tier</option><option value="recPrice">Price ↑</option><option value="-recPrice">Price ↓</option><option value="weightKg">Weight ↑</option><option value="-battery">Battery rating</option><option value="-keyboard">Keyboard rating</option><option value="-displayScore">Display rating</option><option value="-linux">Linux support</option><option value="-repair">Repairability</option></select></label>
        <label class="chk"><input id="fGpu" type="checkbox"> Discrete GPU</label>
        <label class="chk"><input id="fLinux" type="checkbox"> Linux ≥ 4/5</label>
        <label class="chk"><input id="fNo8" type="checkbox" checked> Hide 8 GB machines</label>
        <label class="chk"><input id="fLight" type="checkbox"> ≤ 1.4 kg</label>
      </div>
      <div class="row" style="display:flex;justify-content:space-between;align-items:center"><div class="count" id="count"></div>
        <div class="view-toggle"><button id="vCards" class="on">Cards</button> <button id="vTable">Table</button></div></div>
      <div id="results"></div>`;

    let view = 'cards', sortKey = 'tier', sortAsc = true;
    const f = id => app.querySelector('#' + id);
    const apply = () => {
      const os = f('fOs').value, brand = f('fBrand').value, tier = f('fTier').value, persona = f('fPersona').value;
      const maxP = +f('fPrice').value || Infinity;
      let R = L.filter(l =>
        (!os || l.os.includes(os)) && (!brand || l.brand === brand) && (!tier || l.tier == tier) &&
        (!persona || l.personas.includes(persona)) && l.recPrice <= maxP &&
        (!f('fGpu').checked || !/^integrated/.test(l.gpu)) && (!f('fLinux').checked || l.linux >= 4) &&
        (!f('fNo8').checked || !/^8 GB/.test(l.ram)) && (!f('fLight').checked || l.weightKg <= 1.4));
      const sv = f('fSort').value; const key = sv.replace(/^-/, ''); const dir = sv.startsWith('-') ? -1 : 1;
      R.sort((a, b) => (a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : a.recPrice - b.recPrice) * dir);
      f('count').textContent = `${R.length} of ${L.length} shown`;
      f('results').innerHTML = view === 'cards' ? cards(R) : table(R);
      if (view === 'table') f('results').querySelectorAll('th[data-k]').forEach(th => th.onclick = () => { f('fSort').value = (sortKey === th.dataset.k && dir === 1 ? '-' : '') + th.dataset.k; sortKey = th.dataset.k; apply(); });
    };
    const cards = R => `<div class="grid">${R.map(l => `
      <div class="lp">
        <div class="brand">${esc(l.brand)} · ${TIERS[l.tier]} ${l.tags.map(t => `<span class="badge ${/warn|wait|8gb/.test(t) ? 'warn' : /best|value|refurb/.test(t) ? 'good' : ''}">${esc(t)}</span>`).join('')}</div>
        <h3>${esc(l.name)}</h3>
        <div class="row"><span>${esc(l.chip)}</span></div>
        <div class="row"><span>RAM <b>${esc(l.ram)}</b></span><span>rec. <b>${esc(l.recRam)}</b></span></div>
        <div class="row"><span>${esc(l.display)}</span></div>
        <div class="row"><span>${l.weightKg} kg · ${l.batteryWh} Wh · ~${esc(l.battRealH)} h real</span></div>
        <div class="row"><span>GPU: ${esc(l.gpu)}</span></div>
        <div class="row"><span>${esc(l.ports)}</span></div>
        <div class="row"><span class="price">${money(l.recPrice)} <small>(rec. config; list ${money(l.price)})</small></span><span>${l.os.join(' / ')}</span></div>
        <div class="stars"><span>Keyboard <b>${stars(l.keyboard)}</b></span><span>Display <b>${stars(l.displayScore)}</b></span><span>Battery <b>${stars(l.battery)}</b></span><span>Build <b>${stars(l.build)}</b></span><span>Repair <b>${stars(l.repair)}</b></span><span>Sustained <b>${stars(l.sustained)}</b></span><span>Quiet <b>${stars(l.noise)}</b></span><span>Linux <b>${stars(l.linux)}</b></span></div>
        <div class="pc"><b>+</b> ${esc(l.pros)}<br><b class="c">−</b> ${esc(l.cons)}</div>
        <div class="verdict"><b>Verdict:</b> ${esc(l.verdict)}</div>
        <div>${l.personas.map(p => `<span class="badge">${PERSONAS[p] || p}</span>`).join('')}</div>
      </div>`).join('')}</div>`;
    const table = R => `<div class="tbl"><table><thead><tr>
      <th data-k="name">Laptop</th><th data-k="recPrice">Price (rec.)</th><th data-k="tier">Tier</th><th>OS</th><th>Chip</th><th>RAM</th><th>Display</th><th data-k="weightKg">kg</th><th data-k="batteryWh">Wh</th><th>Real h</th><th>GPU</th>
      <th data-k="keyboard">Kbd</th><th data-k="displayScore">Disp</th><th data-k="battery">Batt</th><th data-k="build">Build</th><th data-k="repair">Repair</th><th data-k="sustained">Sust.</th><th data-k="noise">Quiet</th><th data-k="linux">Linux</th><th>Verdict</th></tr></thead>
      <tbody>${R.map(l => `<tr><td><b>${esc(l.name)}</b><br><small>${esc(l.brand)}</small></td><td>${money(l.recPrice)}<br><small>list ${money(l.price)}</small></td><td>${TIERS[l.tier]}</td><td>${l.os.join('/')}</td><td>${esc(l.chip)}</td><td>${esc(l.ram)}<br><small>rec ${esc(l.recRam)}</small></td><td>${esc(l.display)}</td><td>${l.weightKg}</td><td>${l.batteryWh}</td><td>${esc(l.battRealH)}</td><td>${esc(l.gpu)}</td>
        <td>${l.keyboard}</td><td>${l.displayScore}</td><td>${l.battery}</td><td>${l.build}</td><td>${l.repair}</td><td>${l.sustained}</td><td>${l.noise}</td><td>${l.linux}</td><td>${esc(l.verdict)}</td></tr>`).join('')}</tbody></table></div>`;
    app.querySelectorAll('.filters select,.filters input').forEach(el => el.addEventListener('input', apply));
    f('vCards').onclick = () => { view = 'cards'; f('vCards').classList.add('on'); f('vTable').classList.remove('on'); apply(); };
    f('vTable').onclick = () => { view = 'table'; f('vTable').classList.add('on'); f('vCards').classList.remove('on'); apply(); };
    apply();
  };

  // ---------------- Finder ----------------
  window.LG.viewFinder = async (app, data) => {
    const L = data.laptops;
    const Q = [
      { id: 'budget', q: 'What is your realistic total budget?', opts: [['1', 'Under $700'], ['2', '$700–1,000'], ['3', '$1,000–1,500'], ['4', '$1,500–2,200'], ['5', '$2,200+']] },
      { id: 'os', q: 'Operating system?', opts: [['any', 'No preference — recommend'], ['macOS', 'macOS'], ['Windows', 'Windows'], ['Linux', 'Linux (native, daily)']] },
      { id: 'gpu', q: 'Do you need a discrete GPU?', opts: [['no', 'No / not sure'], ['cuda', 'Yes — CUDA / ML training'], ['game', 'Yes — Unreal / gaming'], ['llm', 'I want to run large local LLMs']] },
      { id: 'mobility', q: 'How much will you carry it?', opts: [['daily', 'Every day, across campus'], ['some', 'Sometimes'], ['desk', 'Rarely — desk machine']] },
      { id: 'persona', q: 'Which describes you best?', opts: Object.entries(PERSONAS) },
    ];
    const ans = {};
    app.innerHTML = `<h1>Pick finder</h1><p class="meta">Five questions → the guide's recommendation, drawn from Chapters 13–14. Not a substitute for reading Chapter 3 (OS) and Chapter 5 (RAM).</p>
      <div class="quiz">${Q.map(q => `<div class="q"><label>${q.q}</label><div class="opts" data-q="${q.id}">${q.opts.map(([v, t]) => `<button data-v="${v}">${t}</button>`).join('')}</div></div>`).join('')}
      <div class="result" id="res"><p class="meta">Answer the questions above.</p></div></div>`;
    app.querySelectorAll('.opts button').forEach(b => b.onclick = () => {
      const g = b.parentElement; g.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); ans[g.dataset.q] = b.dataset.v; run();
    });
    function run() {
      if (Object.keys(ans).length < Q.length) return;
      const notes = [];
      let R = L.filter(l => !/^8 GB/.test(l.ram));
      // OS
      if (ans.os !== 'any') R = R.filter(l => l.os.includes(ans.os));
      if (ans.os === 'Linux') { R = R.filter(l => l.linux >= 4); notes.push('Linux daily-driver: filtered to machines rated ≥4/5 for Linux; Snapdragon excluded (Ch. 3 §3.7).'); }
      // GPU
      if (ans.gpu === 'cuda') { R = R.filter(l => /RTX/.test(l.gpu)); notes.push('CUDA required → Nvidia dGPU only. Prefer ≥12 GB VRAM (5070 Ti+) for real training; 8 GB cards are marginal (Ch. 12). Also consider a light laptop + GPU desktop.'); }
      else if (ans.gpu === 'game') { R = R.filter(l => !/^integrated/.test(l.gpu)); notes.push('Unreal / AAA gaming → discrete GPU (or M5 Pro-class GPU for Mac-native games). 32 GB RAM minimum.'); }
      else if (ans.gpu === 'llm') { R = R.filter(l => l.tags.includes('local-llm') || /M5 Pro|M5 Max|Strix/.test(l.chip) || /RTX 5080|5090|PRO/.test(l.gpu)); notes.push('Large local LLMs → unified memory (M5 Pro/Max, Strix Halo) or 16–24 GB VRAM. The model must fit first (Ch. 2 §2.2).'); }
      else { R = R.filter(l => /^integrated/.test(l.gpu)); notes.push('No dGPU needed — integrated graphics are sufficient for ~90% of CS/SWE work; you save weight, battery, noise, and money (Ch. 12).'); }
      // Mobility
      if (ans.mobility === 'daily') { R = R.filter(l => l.weightKg <= 1.7); notes.push('Daily carry → ≤1.7 kg.'); }
      // Budget: allow current tier and one below; stretch one above with note
      const t = +ans.budget;
      let B = R.filter(l => l.tier <= t);
      if (!B.length) { B = R.filter(l => l.tier <= t + 1); notes.push('Nothing in your tier matched every constraint — showing the next tier up.'); }
      R = B;
      // Persona boost
      const boost = l => (l.personas.includes(ans.persona) ? 10 : 0) + (l.personas[0] === ans.persona ? 3 : 0) + (l.tags.some(t => /^best|linux-first|refurb/.test(t)) ? 2 : 0) + l.tier;
      R.sort((a, b) => (boost(b) - boost(a)) || (b.keyboard + b.displayScore + b.battery + b.build) - (a.keyboard + a.displayScore + a.battery + a.build));
      const top = R.slice(0, 3);
      const res = app.querySelector('#res');
      if (!top.length) { res.innerHTML = `<h3>No match</h3><p>Your constraints conflict (e.g. Linux + Snapdragon, or a dGPU under $700). Loosen one and try again, or read <a href="#/ch/13a-picks-tier1.md">Chapter 13</a>.</p>`; return; }
      res.innerHTML = `<h3>Recommendation${top.length > 1 ? 's' : ''}</h3>
        ${notes.map(n => `<div class="callout">${n}</div>`).join('')}
        <div class="grid">${top.map((l, i) => `<div class="lp"><div class="brand">${i === 0 ? '🥇 Primary' : i === 1 ? '🥈 Alternative' : '🥉 Also consider'} · ${TIERS[l.tier]}</div><h3>${esc(l.name)}</h3>
          <div class="row"><span>${esc(l.chip)}</span></div><div class="row"><span>Buy with <b>${esc(l.recRam)}</b></span><span class="price">${money(l.recPrice)}</span></div>
          <div class="verdict">${esc(l.verdict)}</div><div class="pc"><b>+</b> ${esc(l.pros)}<br><b class="c">−</b> ${esc(l.cons)}</div></div>`).join('')}</div>
        <p class="meta">Next: read the persona section in <a href="#/ch/14a-personas-1.md">Chapter 14</a>, then <a href="#/ch/15-buying-strategy.md">Chapter 15</a> for how to pay less.</p>`;
    }
  };
})();
