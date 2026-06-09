/* ============================================================
   Demo · Sistema Operativo Centauro en Notion — render engine
   ============================================================ */
(function () {
  const { pages, databases, dbMeta } = window.DEMO;
  const LS = 'centauro-demo-state';
  const state = Object.assign({ page: 'diagnostico', views: {} }, readLS());

  function readLS() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } }
  function saveLS() { try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) {} }

  const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const initials = name => name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const hexA = (hex, a) => { const h = hex.replace('#', ''); const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
  const fmtDate = iso => {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    const mes = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${parseInt(d, 10)} ${mes[parseInt(m, 10) - 1]} ${y.slice(2)}`;
  };

  /* ---------- pill / cell renderers ---------- */
  function pill(value, colorMap) {
    const c = (colorMap && colorMap[value]) || 'gray';
    return `<span class="pill ${c}">${esc(value)}</span>`;
  }
  function cell(field, row, db) {
    const v = row[field.key];
    switch (field.type) {
      case 'title':
        return `<span class="cell-title"><span class="ti">${field.icon || ''}</span>${esc(v)}</span>`;
      case 'select':
      case 'status':
        return v ? pill(v, db.colors[field.key]) : '';
      case 'multi':
        return `<span class="pills-wrap">${(v || []).map(x => pill(x, db.colors[field.key])).join('')}</span>`;
      case 'person':
        return `<span class="ava"><span class="av">${initials(v)}</span>${esc(v)}</span>`;
      case 'date':
        return `<span class="cell-date">${fmtDate(v)}</span>`;
      case 'progress':
        return `<span class="prog"><span class="track"><span class="fill" style="width:${v}%"></span></span><span class="pct">${v}%</span></span>`;
      case 'text':
        return `<span style="font-variant-numeric:tabular-nums;color:var(--ink-2)">${esc(v)}</span>`;
      default:
        return esc(v == null ? '' : v);
    }
  }
  const thIcon = { title: 'Aa', select: '◉', status: '◉', multi: '☰', person: '◍', date: '◷', progress: '▦', text: '≡' };

  /* ---------- TABLE ---------- */
  function renderTable(db) {
    const wrap = el('div', 'tbl-wrap');
    const t = el('table', 'tbl');
    const thead = el('thead');
    const htr = el('tr');
    db.schema.forEach(f => {
      htr.appendChild(el('th', null, `<span class="th"><span style="color:var(--ink-3);font-size:11px">${thIcon[f.type] || '·'}</span>${esc(f.label)}</span>`));
    });
    thead.appendChild(htr);
    t.appendChild(thead);
    const tb = el('tbody');
    db.rows.forEach(row => {
      const tr = el('tr');
      db.schema.forEach(f => tr.appendChild(el('td', null, cell(f, row, db))));
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    wrap.appendChild(t);
    return wrap;
  }

  /* ---------- BOARD ---------- */
  function renderBoard(db, view) {
    const groups = {};
    view.groupOrder.forEach(g => groups[g] = []);
    db.rows.forEach(r => { (groups[r[view.groupBy]] = groups[r[view.groupBy]] || []).push(r); });
    const board = el('div', 'board');
    const titleField = db.schema.find(f => f.type === 'title').key;
    view.groupOrder.forEach(g => {
      const col = el('div', 'bcol');
      col.appendChild(el('div', 'bcol-head', `${pill(g, db.colors[view.groupBy])}<span class="cnt">${groups[g].length}</span>`));
      groups[g].forEach(r => {
        const card = el('div', 'bcard');
        let h = `<div class="bt">${esc(r[titleField])}</div>`;
        const pills = (view.card.pills || []).map(k => {
          const f = db.schema.find(x => x.key === k);
          return f.type === 'multi' ? (r[k] || []).map(x => pill(x, db.colors[k])).join('') : pill(r[k], db.colors[k]);
        }).join('');
        if (pills) h += `<div class="bm">${pills}</div>`;
        if (view.card.progress) {
          const pv = r[view.card.progress];
          h += `<div class="prog"><span class="track"><span class="fill" style="width:${pv}%"></span></span><span class="pct">${pv}%</span></div>`;
        }
        const fl = view.card.footL ? footVal(db, r, view.card.footL) : '';
        const fr = view.card.footR ? footVal(db, r, view.card.footR) : '';
        if (fl || fr) h += `<div class="bf"><span>${fl}</span><span>${fr}</span></div>`;
        card.innerHTML = h;
        col.appendChild(card);
      });
      board.appendChild(col);
    });
    return board;
  }
  function footVal(db, r, key) {
    const f = db.schema.find(x => x.key === key);
    if (!f) return esc(r[key]);
    if (f.type === 'date') return fmtDate(r[key]);
    if (f.type === 'person') return `<span class="ava"><span class="av">${initials(r[key])}</span></span>`;
    return esc(r[key]);
  }

  /* ---------- GALLERY ---------- */
  function renderGallery(db, view) {
    const g = el('div', 'gallery');
    const titleField = db.schema.find(f => f.type === 'title').key;
    db.rows.forEach(r => {
      const c = el('div', 'gcard');
      const pills = (view.card.pills || []).map(k => pill(r[k], db.colors[k])).join('');
      c.innerHTML = `<div class="gtop">${view.card.emoji || db.icon}</div>
        <div class="gbody"><div class="gt">${esc(r[titleField])}</div><div class="gm">${pills}</div></div>`;
      g.appendChild(c);
    });
    return g;
  }

  /* ---------- DB PAGE ---------- */
  function renderDbPage(pageDef) {
    const db = databases[pageDef.db];
    const meta = dbMeta[pageDef.db];
    const page = el('div', 'page');
    const accent = meta.accent || '#EF9F27';
    page.style.setProperty('--accent', accent);

    const cover = el('div', 'cover accent', '<div class="glow"></div>');
    cover.style.background = 'linear-gradient(110deg,#1C1C1C 0%,#241f1b 48%,' + accent + ' 165%)';
    cover.querySelector('.glow').style.background = 'radial-gradient(420px 200px at 88% -20%,' + hexA(accent, 0.55) + ',transparent 70%)';
    page.appendChild(cover);
    const ico = el('span', 'page-ico ico-chip', db.icon);
    ico.style.boxShadow = '0 0 0 5px ' + hexA(accent, 0.16);
    ico.style.background = hexA(accent, 0.12);
    page.appendChild(ico);
    page.appendChild(el('h1', 'page-title', esc(db.name)));
    page.appendChild(el('p', 'page-desc', meta.desc));
    if (meta.meta) {
      page.appendChild(el('div', 'page-meta', meta.meta.map(([k, v]) => `<span><b>${esc(v)}</b> · ${esc(k)}</span>`).join('')));
    }

    // db view bar
    const bar = el('div', 'db-bar');
    const curView = state.views[db.id] || db.views[0].id;
    db.views.forEach(view => {
      const tab = el('button', 'view-tab' + (view.id === curView ? ' active' : ''),
        `<span class="vi">${view.icon}</span>${esc(view.label)}`);
      tab.onclick = () => { state.views[db.id] = view.id; saveLS(); render(); };
      bar.appendChild(tab);
    });
    bar.appendChild(el('div', 'spacer'));
    bar.appendChild(el('div', 'db-count', `${db.rows.length} registros`));
    page.appendChild(bar);

    const view = db.views.find(v => v.id === curView) || db.views[0];
    let body;
    if (view.type === 'board') body = renderBoard(db, view);
    else if (view.type === 'gallery') body = renderGallery(db, view);
    else body = renderTable(db);
    page.appendChild(body);

    page.appendChild(el('p', 'note', '◷ Demo de muestra. En el workspace real cada registro abre su propia página con la documentación, plantillas y subtareas.'));
    return page;
  }

  /* ---------- HOME ---------- */
  function renderHome() {
    const page = el('div', 'page');
    page.innerHTML = `
      <div class="cover amber"><div class="glow"></div></div>
      <span class="page-ico">🏠</span>
      <h1 class="page-title">Centauro · Sistema Operativo</h1>
      <p class="page-desc">Workspace operativo en Notion diseñado <b>a partir de vuestras 16 vacantes activas</b> y de vuestras Condiciones Comerciales. Cada base de datos ataca un dolor que vosotros mismos estáis intentando cubrir contratando: selección a volumen, formación de temporada, documentación de procesos, aperturas y flota. Una sola fuente de verdad, sin Make ni Zapier.</p>
      <div class="callout">
        <span class="c-ico">💡</span>
        <span>Esto es una <b>autocandidatura</b> de Sebastián Olmedo — Consultor IT Notion. He leído vuestras vacantes y he construido el sistema que necesitan. ¿Por qué estos módulos? Lee primero el <b>📋 Diagnóstico</b>; cada página del menú es una base de datos funcionando.</span>
      </div>

      <div class="kpis">
        <div class="kpi"><div class="n">16</div><div class="l">vacantes activas analizadas</div></div>
        <div class="kpi"><div class="n">7</div><div class="l">son agentes de mostrador / check-in</div></div>
        <div class="kpi"><div class="n">14</div><div class="l">sedes en 4 países</div></div>
        <div class="kpi"><div class="n">40k<span class="u">+</span></div><div class="l">vehículos renovados al año</div></div>
      </div>

      <h2 class="h-sec"><span class="em">🧭</span>Páginas del workspace</h2>
      <div class="qlinks" id="qlinks"></div>
    `;

    const ql = page.querySelector('#qlinks');
    return page;
  }

  /* ---------- DIAGNÓSTICO ---------- */
  function renderDiagnostico() {
    const page = el('div', 'page');
    page.innerHTML = `
      <div class="cover"><div class="glow"></div></div>
      <span class="page-ico">📋</span>
      <h1 class="page-title">Diagnóstico operativo</h1>
      <p class="page-desc">Leí vuestras <b>16 vacantes activas</b>, vuestros datos de plantilla en LinkedIn y vuestras Condiciones Comerciales. No buscáis tapar cinco huecos sueltos: buscáis la <b>misma cosa cinco veces</b> — una fuente de verdad entre 14 sedes, 4 países e idiomas. Esto es lo que veo, y por qué encajo.</p>
      <div class="callout">
        <span class="c-ico">✍️</span>
        <span>Carta de <b>Sebastián Olmedo</b>, Consultor IT Notion (Alicante). En vez de un CV genérico, os traigo el sistema ya construido a partir de vuestras propias vacantes — Notion como <b>capa operativa sobre vuestro ERP corporativo y Microsoft 365</b>, sin reemplazarlo. Recorre las páginas del menú: cada dolor de abajo es una base de datos funcionando. <a href="https://mapa-consultoria-notion.vercel.app/" target="_blank" rel="noopener" style="color:var(--amber-dark);font-weight:700">mapa-consultoria-notion.vercel.app ↗</a></span>
      </div>

      <h2 class="h-sec"><span class="em">🩺</span>Cinco dolores, una causa</h2>
      <div class="diag" id="diagList"></div>

      <h2 class="h-sec"><span class="em">🧭</span>Mi encaje, dolor a dolor</h2>
      <table class="fit-tbl"><thead><tr><th>Vuestro dolor</th><th>Lo que aporto (demostrable)</th></tr></thead><tbody id="fitBody"></tbody></table>

      <div class="callout" style="margin-top:26px">
        <span class="c-ico">🎯</span>
        <span><b>El mensaje:</b> antes de seguir contratando para tapar huecos, montad la fuente de verdad. Equipos autónomos en menos de 4 semanas, stack IA-first — sin Make ni Zapier. Encajo de dos formas: <b>Técnico IT en plantilla</b> (presencial Alicante/Finestrat) o <b>proyecto de autónomo</b> (remoto). <b>Empezad por el Pipeline de Selección →</b></span>
      </div>
    `;

    const diag = [
      { n: '1', t: 'Selección a volumen y estacionalidad', p: '7 de 16 vacantes son agentes de mostrador/check-in en 6 ciudades y 3 países, y buscáis un Talent Acquisition «en entornos de volumen y estacionalidad». Contratáis a oleadas sin un pipeline único ni reporting.', ev: '7× Rental/Check-In · Talent Acquisition Specialist · Téc. Relaciones Laborales', db: 'seleccion' },
      { n: '2', t: 'Onboarding y formación de temporada', p: 'Soporte es el 34% de la plantilla con 3 años de antigüedad media. Cada oferta promete «ongoing training». Mucha gente nueva cada verano que volver operativa rápido y homogéneo entre sedes.', ev: 'Rental Agent · Agente Check-In · Téc. IT (config. nuevas incorporaciones)', db: 'onboarding' },
      { n: '3', t: 'Transformación con un IT lean + procesos sin documentar', p: 'Tras entrar en Mutua Madrileña estáis «impulsando la evolución de los sistemas», pero IT son ~10 personas. La vacante IT pide «documentación de procesos» y vuestra ISO 9001 exige Instrucciones de Trabajo. El «cómo se hace» vive en la cabeza.', ev: 'Téc. IT · Sistemas & Soporte · Política de Calidad ISO 9001', db: 'sops' },
      { n: '4', t: 'Aperturas gestionadas ad-hoc', p: '~4 aperturas al año y el pico de vacantes en Bienes Raíces (+300%). El Téc. de PRL gestiona «obras» y CAE en cada centro. Cada apertura se coordina a mano, sin playbook ni trazabilidad de fases.', ev: 'Téc. PRL (obras / CAE) · Bienes Raíces +300% (T1 2026)', db: 'aperturas' },
      { n: '5', t: 'Flota e incidencias dispersas', p: '+40.000 vehículos renovados/año. El Téc. de Mantenimiento de Flota controla taller, proveedores y «costes y tiempos»; las Condiciones detallan el peritaje de daños en cada check-in/out. Sin registro central con prioridad y estado.', ev: 'Téc. Mantenimiento de Flota · Treasury (proveedores · inventario)', db: 'incidencias' },
    ];
    const dl = page.querySelector('#diagList');
    diag.forEach(d => {
      const row = el('div', 'diag-row');
      const m = dbMeta[d.db] || {};
      if (m.accent) { row.style.setProperty('--accent', m.accent); row.style.setProperty('--accent-soft', hexA(m.accent, 0.42)); }
      row.innerHTML = `<div class="diag-n">${d.n}</div>
        <div class="diag-body"><h4>${esc(d.t)}</h4><p>${d.p}</p>
        <div class="ev">${esc(d.ev)}</div></div>
        <div class="diag-go">Abrir →</div>`;
      row.onclick = () => go(d.db);
      dl.appendChild(row);
    });

    const fit = [
      ['Selección a volumen', 'Reestructuré un workspace de +160 registros centralizando 5 departamentos — sé montar pipelines multi-entrada.'],
      ['Onboarding de temporada', 'SOPs + formación con equipos operativos en <b>&lt;4 semanas</b>; −35% errores y −20h/semana gestionando 270+ alumnos.'],
      ['IT lean en transformación', 'Stack <b>IA-first, sin Make ni Zapier</b> — autonomía sin sumar desarrollo ni licencias a un equipo reducido.'],
      ['Aperturas multi-país', '+200h en 5 proyectos con equipos de hasta 15; gestión operativa de 600+ usuarios en 10 centros.'],
      ['Flota / operación', 'Dashboards por rol con prioridad y estado; integración CRM/ERP (Zoho). 5 certificaciones oficiales Notion.'],
    ];
    const fb = page.querySelector('#fitBody');
    fit.forEach(([a, b]) => {
      const tr = el('tr');
      tr.innerHTML = `<td class="fit-k">${esc(a)}</td><td>${b}</td>`;
      fb.appendChild(tr);
    });
    return page;
  }

  /* ---------- SIDEBAR ---------- */
  function renderSidebar() {
    const nav = document.getElementById('nav');
    nav.innerHTML = '';
    pages.forEach(p => {
      const b = el('button', 'nav-item' + (p.id === state.page ? ' active' : ''),
        `<span class="nav-ico">${p.icon}</span><span>${esc(p.title)}</span>`);
      b.onclick = () => go(p.id);
      nav.appendChild(b);
    });
  }

  /* ---------- ROUTER ---------- */
  function go(id) { state.page = id; saveLS(); document.querySelector('.main').scrollTop = 0; render(); }

  function render() {
    renderSidebar();
    const pageDef = pages.find(p => p.id === state.page) || pages[0];
    const main = document.getElementById('content');
    main.innerHTML = '';
    main.appendChild(
      pageDef.type === 'home' ? renderHome() :
      pageDef.type === 'diag' ? renderDiagnostico() :
      renderDbPage(pageDef));
    // breadcrumb
    document.getElementById('crumb').innerHTML =
      `<span>Centauro · Sistema Operativo</span><span class="sep">/</span><span class="cur">${esc(pageDef.title)}</span>`;
  }

  render();
})();
