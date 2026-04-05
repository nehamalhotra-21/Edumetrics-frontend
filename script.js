/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */

const STUDENTS = {
  alex: {
    name: 'Alex Johnson',
    scores: { Attendance: 75, 'Quiz 1': 75, 'Project A': 68, Participation: 10 },
    trends: ['up', 'up', 'up', 'down'],
    flag: '75% Drop in Attendance over 3 weeks',
    pred: 62,
    delta: '-25%',
    weekly: [80, 78, 74, 70, 66, 62, 58, 62],
  },
  ben: {
    name: 'Ben Kumar',
    scores: { Attendance: 88, 'Quiz 1': 60, 'Project A': 55, Participation: 72 },
    trends: ['up', 'down', 'down', 'up'],
    flag: 'Late Projects (3 consecutive weeks)',
    pred: 70,
    delta: '+5%',
    weekly: [72, 70, 68, 66, 64, 68, 70, 70],
  },
  charlie: {
    name: 'Charlie Lee',
    scores: { Attendance: 70, 'Quiz 1': 82, 'Project A': 78, Participation: 65 },
    trends: ['down', 'up', 'up', 'up'],
    flag: 'Drop in Attendance (2 weeks)',
    pred: 75,
    delta: '+2%',
    weekly: [80, 78, 77, 76, 74, 73, 74, 75],
  },
  david: {
    name: 'David Mehta',
    scores: { Attendance: 90, 'Quiz 1': 55, 'Project A': 50, Participation: 80 },
    trends: ['up', 'down', 'down', 'up'],
    flag: 'Late Projects (2 consecutive weeks)',
    pred: 68,
    delta: '-8%',
    weekly: [78, 74, 70, 66, 65, 64, 66, 68],
  },
};

const PERF_DATA = [
  { name: 'Alex J.',   status: 'At Risk',     statusClass: 'trend-down', pred: [62, 55], actual: [58, 52] },
  { name: 'Ben K.',    status: 'Improved',    statusClass: 'trend-up',   pred: [70, 60], actual: [75, 68] },
  { name: 'Charlie L.',status: 'At Risk',     statusClass: 'trend-down', pred: [80, 70], actual: [73, 65] },
  { name: 'David M.',  status: 'At Risk',     statusClass: 'trend-down', pred: [72, 68], actual: [66, 60] },
  { name: 'Eva P.',    status: 'Improved',    statusClass: 'trend-up',   pred: [55, 60], actual: [62, 68] },
  { name: 'Finn R.',   status: '828 At Risk', statusClass: 'trend-down', pred: [50, 45], actual: [56, 40] },
];

const DIV_DATA = [
  { name: 'Student Name 1', pred: 76, actual: 22, diff: -54, status: 'highlight-red'   },
  { name: 'Student Name 2', pred: 65, actual: 63, diff:  -2, status: 'highlight-amber' },
  { name: 'Student Name 3', pred: 74, actual: 74, diff:   0, status: 'highlight-green' },
  { name: 'Student Name 4', pred: 80, actual: 75, diff:  -5, status: 'highlight-amber' },
  { name: 'Student Name 5', pred: 58, actual: 70, diff: +12, status: 'highlight-green' },
];

const INDIV = [
  { name: 'Student Name 1', weeks: [40, 55, 60, 45, 70, 80, 55, 65] },
  { name: 'Student Name 2', weeks: [70, 72, 68, 75, 80, 78, 82, 85] },
  { name: 'Student Name 3', weeks: [55, 50, 45, 48, 52, 60, 55, 58] },
  { name: 'Student Name 4', weeks: [80, 82, 78, 85, 90, 88, 92, 94] },
];

/* ══════════════════════════════════════════════════════
   HEATMAP
══════════════════════════════════════════════════════ */

function buildHeatmap() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'];
  const rows   = ['Emma','Liam','Olivia','Noah','Ava','James'];
  const root   = document.getElementById('heatmap-root');

  // Month label row
  const mRow = document.createElement('div');
  mRow.className = 'heatmap-months';
  months.forEach(m => {
    const s = document.createElement('span');
    s.textContent = m;
    mRow.appendChild(s);
  });
  root.appendChild(mRow);

  const body = document.createElement('div');
  body.className = 'heatmap-body';

  // Row labels
  const labels = document.createElement('div');
  labels.className = 'heatmap-labels';
  rows.forEach(r => {
    const s = document.createElement('span');
    s.textContent = r;
    labels.appendChild(s);
  });
  body.appendChild(labels);

  // Grid cells
  const grid = document.createElement('div');
  grid.className = 'heatmap-grid';

  months.forEach((m, mi) => {
    const col = document.createElement('div');
    col.className = 'heatmap-col';

    rows.forEach((r, ri) => {
      const seed = (mi * 7 + ri * 13 + 3) % 17;
      let cls, score;

      // Risk zones for specific students
      if ((ri === 0 && mi >= 6) || (ri === 4 && mi >= 8)) {
        const risk = [4, 3, 2, 1, 0][Math.min(mi - 6, 4)] || 1;
        cls   = ['hm-r4','hm-r3','hm-r2','hm-r1','hm-r1'][risk] || 'hm-r1';
        score = 30 + risk * 8;
      } else {
        const lvl = seed % 4;
        cls   = ['hm-0','hm-1','hm-2','hm-3'][lvl];
        score = 50 + lvl * 12;
      }

      const cell = document.createElement('div');
      cell.className = `hm-cell ${cls}`;
      cell.innerHTML = `<div class="hm-tooltip">${r} · ${m}<br>Score: ${score}</div>`;
      col.appendChild(cell);
    });

    grid.appendChild(col);
  });

  body.appendChild(grid);
  root.appendChild(body);
}

/* ══════════════════════════════════════════════════════
   SCATTER CHART
══════════════════════════════════════════════════════ */

function drawScatter() {
  const c   = document.getElementById('scatterCanvas');
  const ctx = c.getContext('2d');
  const W   = c.offsetWidth;
  const H   = 180;
  c.width  = W;
  c.height = H;
  ctx.clearRect(0, 0, W, H);

  // Axes
  ctx.strokeStyle = '#e2e4ef';
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(36, 10);
  ctx.lineTo(36, H - 20);
  ctx.lineTo(W - 10, H - 20);
  ctx.stroke();

  // Threshold line
  const ty = H - 20 - (H - 30) * 0.25;
  ctx.strokeStyle = '#f04e6e';
  ctx.lineWidth   = 1.5;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(36, ty);
  ctx.lineTo(W - 10, ty);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#f04e6e';
  ctx.font      = '500 9px Sora,sans-serif';
  ctx.fillText('25% Attendance Detainment Threshold', 40, ty - 4);

  // Data points
  const pts = [
    { x: .15, y: .60, c: '#f04e6e', label: 'Alex J.'  },
    { x: .30, y: .40, c: '#f79c2d', label: 'Ben K.'   },
    { x: .45, y: .75, c: '#f79c2d', label: 'Charlie'  },
    { x: .55, y: .30, c: '#f04e6e', label: 'David'    },
    { x: .65, y: .85, c: '#2dc98e', label: 'Eva'      },
    { x: .75, y: .90, c: '#2dc98e', label: 'Finn'     },
    { x: .85, y: .70, c: '#4f6ef7', label: 'Grace'    },
    { x: .20, y: .55, c: '#f04e6e', label: 'Hank'     },
    { x: .50, y: .60, c: '#2dc98e', label: 'Iris'     },
    { x: .90, y: .82, c: '#2dc98e', label: 'Jake'     },
  ];

  pts.forEach(p => {
    const px = 36 + p.x * (W - 46);
    const py = H - 20 - p.y * (H - 30);
    ctx.beginPath();
    ctx.arc(px, py, 6, 0, Math.PI * 2);
    ctx.fillStyle   = p.c + '33';
    ctx.fill();
    ctx.strokeStyle = p.c;
    ctx.lineWidth   = 2;
    ctx.stroke();
  });

  // Axis labels
  ctx.fillStyle = '#7880a0';
  ctx.font      = '9px Sora,sans-serif';
  ctx.save();
  ctx.translate(12, H / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Performance Score', 0, 0);
  ctx.restore();
  ctx.fillText('Attendance %', W / 2 - 20, H - 4);
}

/* ══════════════════════════════════════════════════════
   TAB SWITCH
══════════════════════════════════════════════════════ */

function switchTab(btn, mode) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  drawScatter();
}

/* ══════════════════════════════════════════════════════
   PERFORMANCE GRID
══════════════════════════════════════════════════════ */

function buildPerfGrid() {
  const grid = document.getElementById('perfGrid');

  PERF_DATA.forEach(s => {
    const div   = document.createElement('div');
    div.className = 'perf-student';
    const isUp  = s.statusClass === 'trend-up';

    const barRows = s.pred.map((p, i) => {
      const a   = s.actual[i];
      const cls = a < p ? 'bar-danger' : a > p ? 'bar-good' : 'bar-warn';
      return `
        <div class="perf-bar-row">
          <div class="perf-bar-label" style="font-size:.65rem">W${i + 1}</div>
          <div style="flex:1;display:flex;flex-direction:column;gap:2px">
            <div class="perf-bar-track">
              <div class="perf-bar-fill bar-predicted" style="width:${p}%"></div>
            </div>
            <div class="perf-bar-track">
              <div class="perf-bar-fill ${cls}" style="width:${a}%"></div>
            </div>
          </div>
          <div class="perf-values">${p}→${a}</div>
        </div>`;
    }).join('');

    div.innerHTML = `
      <div class="perf-name">${s.name}</div>
      <div class="perf-status">
        <span class="trend-chip ${s.statusClass}">${isUp ? '▲' : '▼'} ${s.status}</span>
      </div>
      <div class="perf-bars">
        <div style="font-size:.68rem;color:var(--muted);margin-bottom:4px;display:flex;gap:12px">
          <span>Predicted</span><span>Actual</span>
        </div>
        ${barRows}
      </div>`;

    grid.appendChild(div);
  });
}

/* ══════════════════════════════════════════════════════
   BAR CHART (Post Mid-Sem)
══════════════════════════════════════════════════════ */

function drawBarChart() {
  const c   = document.getElementById('barChart');
  const ctx = c.getContext('2d');
  const W   = c.offsetWidth || 300;
  const H   = 140;
  c.width  = W;
  c.height = H;

  const labels    = ['Week 1','Week 2','Week 3','Week 4','Week 5'];
  const predicted = [72, 68, 74, 70, 65];
  const actual    = [68, 75, 65, 72, 70];
  const n   = labels.length;
  const pad = 30;
  const bw  = (W - pad * 2) / (n * 2.5);
  const gap = bw * 0.6;

  // Grid lines
  ctx.strokeStyle = '#e2e4ef';
  ctx.lineWidth   = 0.8;
  [0, 25, 50, 75, 100].forEach(v => {
    const y = H - 20 - (v / 100) * (H - 30);
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(W - 10, y);
    ctx.stroke();
    ctx.fillStyle = '#7880a0';
    ctx.font      = '8px Sora,sans-serif';
    ctx.fillText(v, 4, y + 3);
  });

  labels.forEach((l, i) => {
    const x = pad + i * (bw * 2 + gap);

    // Predicted bar
    const ph = (predicted[i] / 100) * (H - 30);
    ctx.fillStyle = '#4f6ef766';
    ctx.beginPath();
    ctx.roundRect(x, H - 20 - ph, bw, ph, 3);
    ctx.fill();

    // Actual bar
    const ah = (actual[i] / 100) * (H - 30);
    ctx.fillStyle = '#7c5cf4cc';
    ctx.beginPath();
    ctx.roundRect(x + bw + 2, H - 20 - ah, bw, ah, 3);
    ctx.fill();

    // Label
    ctx.fillStyle = '#7880a0';
    ctx.font      = '8px Sora,sans-serif';
    ctx.fillText(l, x - 2, H - 4);
  });
}

/* ══════════════════════════════════════════════════════
   DIVERGENCE TABLE
══════════════════════════════════════════════════════ */

function renderTable(filter) {
  const tbody = document.getElementById('divTableBody');
  tbody.innerHTML = '';

  DIV_DATA
    .filter(r => !filter || r.status !== 'highlight-green')
    .forEach(r => {
      const tr = document.createElement('tr');
      const statusLabel = r.status === 'highlight-red' ? 'Highlight' : 'Tag similar';
      tr.innerHTML = `
        <td>${r.name}</td>
        <td style="font-family:var(--mono)">${r.pred}</td>
        <td style="font-family:var(--mono)">${r.actual}</td>
        <td style="font-family:var(--mono)">${r.diff > 0 ? '+' : ''}${r.diff}</td>
        <td><span class="${r.status}">${statusLabel}</span></td>`;
      tbody.appendChild(tr);
    });
}

function filterTable() {
  const checked = document.getElementById('filterHighlight').checked;
  renderTable(checked);
}

/* ══════════════════════════════════════════════════════
   INDIVIDUAL SPARKLINE PLOTS
══════════════════════════════════════════════════════ */

function buildIndivPlots() {
  const root = document.getElementById('indivPlots');

  INDIV.forEach(s => {
    const max = Math.max(...s.weeks);
    const div = document.createElement('div');
    div.className = 'indiv-plot';

    const bars = s.weeks.map(v => {
      const h   = Math.max(4, Math.round((v / max) * 36));
      const pct = v / 100;
      const col = pct < .55 ? 'var(--heat3)' : pct < .7 ? 'var(--warn)' : 'var(--success)';
      return `<div class="spark-bar" style="height:${h}px;background:${col}"></div>`;
    }).join('');

    const weekLabels = ['W1','W2','W3','W4','W5','W6','W7','W8']
      .map(w => `<span class="spark-week-label">${w}</span>`)
      .join('');

    div.innerHTML = `
      <div class="indiv-name">${s.name}</div>
      <div class="spark-track">${bars}</div>
      <div class="spark-weeks">${weekLabels}</div>`;

    root.appendChild(div);
  });
}

/* ══════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════ */

function openModal(key) {
  const s = STUDENTS[key];

  document.getElementById('modalTitle').textContent = `${s.name} – Full Report`;
  document.getElementById('flagReason').textContent = `⚠ ${s.flag}`;
  document.getElementById('predScore').textContent  = s.pred;

  const deltaEl = document.getElementById('predDelta');
  const isNeg   = s.delta.startsWith('-');
  deltaEl.textContent   = isNeg ? `▼ ${s.delta}` : `▲ ${s.delta}`;
  deltaEl.style.color   = isNeg ? 'var(--danger)' : 'var(--success)';

  // Scores table
  const tableEl = document.getElementById('modalTable');
  const rows = Object.entries(s.scores).map(([k, v], i) => {
    const trend = s.trends[i];
    const icon  = trend === 'up'
      ? '<span class="trend-up-icon">▲</span>'
      : '<span class="trend-down-icon">▼</span>';
    return `<tr>
      <td>${k}</td>
      <td style="font-family:var(--mono)">${v}%</td>
      <td style="font-family:var(--mono)">${s.pred}</td>
      <td>${icon}</td>
    </tr>`;
  });
  tableEl.innerHTML = `
    <thead>
      <tr><th>Indice</th><th>Metrics</th><th>Trend</th><th>Trend</th></tr>
    </thead>
    <tbody>${rows.join('')}</tbody>`;

  drawLineChart(s.weekly);
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

/* ══════════════════════════════════════════════════════
   MINI LINE CHART (Modal)
══════════════════════════════════════════════════════ */

function drawLineChart(data) {
  const c   = document.getElementById('modalLineChart');
  const ctx = c.getContext('2d');
  const W   = c.offsetWidth || 420;
  const H   = 80;
  c.width  = W;
  c.height = H;
  ctx.clearRect(0, 0, W, H);

  const min = Math.min(...data) - 5;
  const max = Math.max(...data) + 5;

  const pts = data.map((v, i) => ({
    x: 10 + i * (W - 20) / (data.length - 1),
    y: H - 10 - (v - min) / (max - min) * (H - 20),
  }));

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(79,110,247,.25)');
  grad.addColorStop(1, 'rgba(79,110,247,0)');
  ctx.beginPath();
  ctx.moveTo(pts[0].x, H - 10);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length - 1].x, H - 10);
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = 'var(--accent)';
  ctx.lineWidth   = 2;
  ctx.lineJoin    = 'round';
  ctx.stroke();

  // Dots
  pts.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle   = i === pts.length - 1 ? 'var(--danger)' : 'var(--accent)';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  });

  // Week labels
  ['W1','W2','W3','W4','W5','W6','W7','Next Week'].forEach((l, i) => {
    ctx.fillStyle  = '#7880a0';
    ctx.font       = '8px Sora,sans-serif';
    ctx.textAlign  = 'center';
    ctx.fillText(l, pts[i]?.x ?? 0, H);
  });
}

/* ══════════════════════════════════════════════════════
   EVENT LISTENERS
══════════════════════════════════════════════════════ */

// Close modal on backdrop click
document.getElementById('modal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ══════════════════════════════════════════════════════
   INIT — run everything on DOM ready
══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  buildHeatmap();
  buildPerfGrid();
  buildIndivPlots();
  renderTable(false);
  drawBarChart();
  setTimeout(drawScatter, 100); // slight delay so canvas has layout width
});
