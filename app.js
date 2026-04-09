// EduMetrics — app.js (Updated with all 7 changes)

const WEEKS = ['W1','W2','W3','W4','W5','W6','W7','W8','W9'];
let currentWeek = 9;

const ALL_STUDENTS = [
  {id:"STU2024001",name:"Aryan Mehta",roll:"CS2202",avatar:"AM",academicPerf:43,riskScore:78,effort:38,engagement:35,predMidterm:42,predEndterm:38,attendance:42,riskLevel:"high",
   weekEt:[72,68,62,58,55,50,46,42,38],weekAt:[80,75,65,60,55,50,48,45,43],classAvgEt:65,classAvgPerf:70,studentAvgEt:55,studentAvgPerf:55,etThisWeek:38,perfThisWeek:43,
   flagHistory:[{date:"Week 5",diagnosis:"Low Attendance",intervened:true},{date:"Week 7",diagnosis:"Low Attendance + Missed Assignments",intervened:true},{date:"Week 9",diagnosis:"Low Attendance + Engagement Drop",intervened:false}],
   avgRisk:72.5,avgEt:55.0,avgAt:45.0,overallAttend:44,riskDetention:68,riskFail:78.5,midterm:"Predicted: 62%"},
  {id:"STU2024002",name:"Karan Joshi",roll:"CS2204",avatar:"KJ",academicPerf:36,riskScore:85,effort:25,engagement:22,predMidterm:35,predEndterm:32,attendance:55,riskLevel:"high",
   weekEt:[60,55,48,40,36,32,30,28,25],weekAt:[60,55,50,45,42,40,39,38,36],classAvgEt:65,classAvgPerf:70,studentAvgEt:40,studentAvgPerf:45,etThisWeek:25,perfThisWeek:36,
   flagHistory:[{date:"Week 4",diagnosis:"Module Failure Risk",intervened:true},{date:"Week 6",diagnosis:"Persistent Disengagement",intervened:false},{date:"Week 9",diagnosis:"No Quiz Submissions",intervened:false}],
   avgRisk:82.0,avgEt:35.0,avgAt:50.0,overallAttend:52,riskDetention:55,riskFail:85.2,midterm:"Predicted: 54%"},
  {id:"STU2024003",name:"Riya Kapoor",roll:"CS2205",avatar:"RK",academicPerf:62,riskScore:42,effort:69,engagement:68,predMidterm:65,predEndterm:62,attendance:61,riskLevel:"med",
   weekEt:[70,72,68,72,70,68,70,70,69],weekAt:[68,70,72,68,65,64,63,63,62],classAvgEt:65,classAvgPerf:70,studentAvgEt:70,studentAvgPerf:66,etThisWeek:69,perfThisWeek:62,
   flagHistory:[{date:"Week 7",diagnosis:"Attendance Below Threshold",intervened:true},{date:"Week 9",diagnosis:"Attendance Irregular (3 weeks)",intervened:false}],
   avgRisk:40.0,avgEt:72.0,avgAt:65.0,overallAttend:61,riskDetention:38,riskFail:42.3,midterm:"Predicted: 68%"},
  {id:"STU2024004",name:"Tanya Singh",roll:"CS2207",avatar:"TS",academicPerf:56,riskScore:55,effort:55,engagement:52,predMidterm:58,predEndterm:55,attendance:68,riskLevel:"med",
   weekEt:[82,80,76,72,68,64,60,58,55],weekAt:[82,80,76,72,68,64,60,58,56],classAvgEt:65,classAvgPerf:70,studentAvgEt:68,studentAvgPerf:68,etThisWeek:55,perfThisWeek:56,
   flagHistory:[{date:"Week 6",diagnosis:"Score Decline Pattern",intervened:true},{date:"Week 9",diagnosis:"Burnout / Steady Decline",intervened:false}],
   avgRisk:52.0,avgEt:65.0,avgAt:68.0,overallAttend:68,riskDetention:45,riskFail:55.0,midterm:"Predicted: 64%"},
  {id:"STU2024005",name:"Rahul Gupta",roll:"CS2208",avatar:"RG",academicPerf:28,riskScore:91,effort:22,engagement:18,predMidterm:28,predEndterm:25,attendance:32,riskLevel:"high",
   weekEt:[55,50,45,40,38,35,32,28,22],weekAt:[55,50,45,40,38,35,32,30,28],classAvgEt:65,classAvgPerf:70,studentAvgEt:38,studentAvgPerf:39,etThisWeek:22,perfThisWeek:28,
   flagHistory:[{date:"Week 3",diagnosis:"Low Attendance",intervened:true},{date:"Week 6",diagnosis:"Disengagement",intervened:true},{date:"Week 8",diagnosis:"Critical Disengagement",intervened:true},{date:"Week 9",diagnosis:"No Activity – Unresponsive",intervened:false}],
   avgRisk:88.0,avgEt:28.0,avgAt:38.0,overallAttend:32,riskDetention:82,riskFail:91.0,midterm:"Predicted: 40%"},
  {id:"STU2024006",name:"Divya Rao",roll:"CS2210",avatar:"DR",academicPerf:60,riskScore:40,effort:63,engagement:65,predMidterm:63,predEndterm:60,attendance:70,riskLevel:"med",
   weekEt:[62,60,65,63,61,58,59,60,63],weekAt:[62,60,65,63,61,58,59,60,60],classAvgEt:65,classAvgPerf:70,studentAvgEt:62,studentAvgPerf:61,etThisWeek:63,perfThisWeek:60,
   flagHistory:[{date:"Week 9",diagnosis:"Exam Underperformance + Cramming",intervened:false}],
   avgRisk:40.0,avgEt:65.0,avgAt:62.0,overallAttend:70,riskDetention:35,riskFail:40.0,midterm:"Actual: 52%"},
  {id:"STU2024007",name:"Priya Sharma",roll:"CS2201",avatar:"PS",academicPerf:89,riskScore:8,effort:92,engagement:90,predMidterm:91,predEndterm:88,attendance:95,riskLevel:"safe",
   weekEt:[88,89,90,91,91,92,92,92,92],weekAt:[86,87,88,88,89,89,89,89,89],classAvgEt:65,classAvgPerf:70,studentAvgEt:90,studentAvgPerf:88,etThisWeek:92,perfThisWeek:89,
   flagHistory:[],avgRisk:8.0,avgEt:90.0,avgAt:88.0,overallAttend:95,riskDetention:5,riskFail:8.0,midterm:"Predicted: 91%"},
  {id:"STU2024008",name:"Sneha Iyer",roll:"CS2203",avatar:"SI",academicPerf:83,riskScore:14,effort:84,engagement:82,predMidterm:85,predEndterm:82,attendance:88,riskLevel:"safe",
   weekEt:[80,81,82,83,83,84,84,84,84],weekAt:[80,81,82,82,83,83,83,83,83],classAvgEt:65,classAvgPerf:70,studentAvgEt:83,studentAvgPerf:82,etThisWeek:84,perfThisWeek:83,
   flagHistory:[],avgRisk:14.0,avgEt:83.0,avgAt:82.0,overallAttend:88,riskDetention:8,riskFail:14.0,midterm:"Predicted: 85%"},
  {id:"STU2024009",name:"Dev Malhotra",roll:"CS2206",avatar:"DM",academicPerf:96,riskScore:4,effort:95,engagement:97,predMidterm:97,predEndterm:95,attendance:100,riskLevel:"safe",
   weekEt:[94,94,95,95,95,95,95,95,95],weekAt:[95,95,96,96,96,96,96,96,96],classAvgEt:65,classAvgPerf:70,studentAvgEt:95,studentAvgPerf:96,etThisWeek:95,perfThisWeek:96,
   flagHistory:[],avgRisk:4.0,avgEt:95.0,avgAt:96.0,overallAttend:100,riskDetention:2,riskFail:4.0,midterm:"Predicted: 97%"},
  {id:"STU2024010",name:"Neha Verma",roll:"CS2209",avatar:"NV",academicPerf:75,riskScore:24,effort:74,engagement:72,predMidterm:76,predEndterm:74,attendance:78,riskLevel:"safe",
   weekEt:[72,73,73,74,74,74,74,74,74],weekAt:[73,74,74,75,75,75,75,75,75],classAvgEt:65,classAvgPerf:70,studentAvgEt:74,studentAvgPerf:75,etThisWeek:74,perfThisWeek:75,
   flagHistory:[],avgRisk:24.0,avgEt:74.0,avgAt:75.0,overallAttend:78,riskDetention:15,riskFail:24.0,midterm:"Predicted: 76%"},
  {id:"STU2024011",name:"Rohit Das",roll:"CS2211",avatar:"RD",academicPerf:68,riskScore:32,effort:67,engagement:65,predMidterm:70,predEndterm:68,attendance:72,riskLevel:"safe",
   weekEt:[65,66,66,67,67,67,67,67,67],weekAt:[66,67,67,68,68,68,68,68,68],classAvgEt:65,classAvgPerf:70,studentAvgEt:67,studentAvgPerf:68,etThisWeek:67,perfThisWeek:68,
   flagHistory:[],avgRisk:32.0,avgEt:67.0,avgAt:68.0,overallAttend:72,riskDetention:22,riskFail:32.0,midterm:"Predicted: 70%"},
  {id:"STU2024012",name:"Anjali Nair",roll:"CS2212",avatar:"AN",academicPerf:56,riskScore:46,effort:54,engagement:52,predMidterm:56,predEndterm:54,attendance:65,riskLevel:"med",
   weekEt:[58,57,56,55,55,54,54,54,54],weekAt:[58,57,57,56,56,56,56,56,56],classAvgEt:65,classAvgPerf:70,studentAvgEt:55,studentAvgPerf:56,etThisWeek:54,perfThisWeek:56,
   flagHistory:[{date:"Week 8",diagnosis:"Below Average Performance",intervened:false}],
   avgRisk:46.0,avgEt:55.0,avgAt:56.0,overallAttend:65,riskDetention:30,riskFail:46.0,midterm:"Predicted: 56%"},
];

const FLAGGED = ALL_STUDENTS.filter(s=>s.riskLevel==='high'||s.riskLevel==='med').slice(0,6);

const LAST_WEEK = [
  {id:"STU2024001",name:"Aryan Mehta",roll:"CS2202",avatar:"AM",risk:"high",
   avgRisk:72.5,avgEt:55.0,avgAt:48.0,overallAttend:44,riskDetention:68,riskFailing:78.5,
   midterm:"Predicted: 58%",
   factors:[{label:"Low Attendance",pct:85,color:"#ef4444"},{label:"Drop in Engagement",pct:62,color:"#f59e0b"},{label:"Cramming",pct:38,color:"#a78bfa"}],
   etCurr:55,etPrev:62,atCurr:48,atPrev:58,riskCurr:72,riskPrev:58,recovery:22,
   status:"intervene",intervention:"1:1 advisor meeting + parent email sent on Mon."},
  {id:"STU2024005",name:"Rahul Gupta",roll:"CS2208",avatar:"RG",risk:"high",
   avgRisk:88.0,avgEt:28.0,avgAt:35.0,overallAttend:32,riskDetention:82,riskFailing:91.0,
   midterm:"Predicted: 40%",
   factors:[{label:"Low Attendance",pct:95,color:"#ef4444"},{label:"Drop in Engagement",pct:80,color:"#f59e0b"},{label:"Cramming",pct:15,color:"#a78bfa"}],
   etCurr:28,etPrev:40,atCurr:35,atPrev:50,riskCurr:88,riskPrev:74,recovery:8,
   status:"intervene",intervention:"HOD escalation + parent call. Student unreachable."},
  {id:"STU2024004",name:"Tanya Singh",roll:"CS2207",avatar:"TS",risk:"med",
   avgRisk:52.0,avgEt:65.0,avgAt:70.0,overallAttend:68,riskDetention:45,riskFailing:55.0,
   midterm:"Predicted: 64%",
   factors:[{label:"Low Attendance",pct:40,color:"#ef4444"},{label:"Drop in Engagement",pct:70,color:"#f59e0b"},{label:"Cramming",pct:55,color:"#a78bfa"}],
   etCurr:65,etPrev:72,atCurr:70,atPrev:76,riskCurr:52,riskPrev:40,recovery:40,
   status:"monitor",intervention:"Weekly check-in scheduled."},
];

const INTERVENTIONS = [
  {student:"Aryan Mehta",id:"STU2024001",type:"1:1 Meeting",date:"Mon, Week 9",perfBefore:48,perfAfter:45,change:"down"},
  {student:"Aryan Mehta",id:"STU2024001",type:"Parent Email",date:"Mon, Week 9",perfBefore:48,perfAfter:45,change:"down"},
  {student:"Karan Joshi",id:"STU2024002",type:"Counselor Referral",date:"Tue, Week 9",perfBefore:38,perfAfter:36,change:"down"},
  {student:"Rahul Gupta",id:"STU2024005",type:"HOD Escalation",date:"Tue, Week 9",perfBefore:30,perfAfter:28,change:"down"},
  {student:"Rahul Gupta",id:"STU2024005",type:"Parent Call",date:"Wed, Week 9",perfBefore:28,perfAfter:28,change:"same"},
  {student:"Riya Kapoor",id:"STU2024003",type:"Attendance Warning",date:"Wed, Week 9",perfBefore:65,perfAfter:62,change:"down"},
  {student:"Tanya Singh",id:"STU2024004",type:"Weekly Check-in",date:"Thu, Week 9",perfBefore:60,perfAfter:56,change:"down"},
  {student:"Tanya Singh",id:"STU2024004",type:"Study Group Assigned",date:"Thu, Week 9",perfBefore:56,perfAfter:58,change:"up"},
  {student:"Divya Rao",id:"STU2024006",type:"Exam Prep Session",date:"Thu, Week 9",perfBefore:58,perfAfter:60,change:"up"},
  {student:"Anjali Nair",id:"STU2024012",type:"1:1 Meeting",date:"Fri, Week 9",perfBefore:55,perfAfter:56,change:"up"},
  {student:"Rohit Das",id:"STU2024011",type:"Study Group Assigned",date:"Fri, Week 9",perfBefore:66,perfAfter:68,change:"up"},
];

const TODOS=[
  {id:1,text:"Review Aryan's progress",done:false,tag:"Urgent",tagColor:"#ef4444",date:"Today"},
  {id:2,text:"Send parent emails for flagged students",done:true,tag:"Email",tagColor:"#f59e0b",date:"Today"},
  {id:3,text:"Prepare midterm review session",done:false,tag:"Academic",tagColor:"#3b82f6",date:"Tomorrow"},
  {id:4,text:"Meet with HOD about Rahul",done:false,tag:"Meeting",tagColor:"#a78bfa",date:"Tomorrow"},
];

// ── HELPERS ──
function isDark(){return document.documentElement.getAttribute('data-theme')!=='light'}
function rc(risk){
  const m={high:{cls:'risk-high',bg:'rgba(239,68,68,0.12)',txt:'#ef4444',border:'rgba(239,68,68,0.3)',label:'High Risk'},
           med:{cls:'risk-med',bg:'rgba(245,158,11,0.12)',txt:'#f59e0b',border:'rgba(245,158,11,0.3)',label:'Medium Risk'},
           low:{cls:'risk-low',bg:'rgba(16,185,129,0.12)',txt:'#10b981',border:'rgba(16,185,129,0.3)',label:'Low Risk'},
           safe:{cls:'risk-safe',bg:'rgba(16,185,129,0.12)',txt:'#10b981',border:'rgba(16,185,129,0.3)',label:'Safe'}};
  return m[risk]||m.safe;
}
function statusCfg(s){
  const m={intervene:{bg:'rgba(239,68,68,0.12)',txt:'#ef4444',border:'rgba(239,68,68,0.3)',label:'Needs Intervention'},
           monitor:{bg:'rgba(245,158,11,0.12)',txt:'#f59e0b',border:'rgba(245,158,11,0.3)',label:'Monitoring'},
           resolved:{bg:'rgba(16,185,129,0.12)',txt:'#10b981',border:'rgba(16,185,129,0.3)',label:'Resolved'}};
  return m[s]||m.monitor;
}

// ── THEME ──
function setTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  document.getElementById('darkBtn').classList.toggle('active',t==='dark');
  document.getElementById('lightBtn').classList.toggle('active',t==='light');
  buildRiskChart();
  if(typeof preChartInst!=='undefined'&&preChartInst)buildPreChart();
}

// ── SIDEBAR ──
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('collapsed')}

// ── PAGE NAV ──
function showPage(p){
  document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el=>el.classList.remove('active'));
  document.getElementById('page-'+p).classList.add('active');
  document.getElementById('nav-'+p).classList.add('active');
  if(p==='students')initStudentsPage();
  if(p==='calendar')initCalendar();
  if(p==='analytics')initAnalyticsCharts();
}

// ── WEEK SELECTOR (Change #2) ──
function changeWeek(w){
  currentWeek=parseInt(w);
  document.getElementById('weekBadge').textContent='Week '+currentWeek;
  document.getElementById('flaggedWeekSub').textContent='Week '+currentWeek+' · Semester 2';
}

// ── WATER FILL RISK CARD ──
function initWaterFill(){
  const riskScore=31;
  const fill=document.getElementById('waterFill');
  const h=riskScore;
  let color;
  if(riskScore<=30)color='rgba(16,185,129,0.4)';
  else if(riskScore<=50)color='rgba(245,158,11,0.4)';
  else if(riskScore<=70)color='rgba(245,158,11,0.6)';
  else color='rgba(239,68,68,0.5)';
  fill.style.height=h+'%';
  fill.style.background=color;
  fill.style.setProperty('--wave-color',color);
}
setTimeout(initWaterFill,300);

// ── FLAGGED CARDS (Change #4: less spacing via CSS) ──
function buildFlaggedCards(){
  const grid=document.getElementById('flaggedGrid');
  grid.innerHTML='';
  FLAGGED.forEach((s,i)=>{
    const r=rc(s.riskLevel||s.risk||'med');
    const card=document.createElement('div');
    card.className=`flag-card ${r.cls}`;
    card.style.animationDelay=`${.05+i*.06}s`;
    const reason = s.flagHistory&&s.flagHistory.length?s.flagHistory[s.flagHistory.length-1].diagnosis:'Flagged for review';
    card.innerHTML=`
      <div class="flag-top-row">
        <div class="flag-identity">
          <div class="flag-av" style="background:${r.bg};color:${r.txt}">${s.avatar}</div>
          <div><div class="flag-name">${s.name}</div><div class="flag-id">${s.id}</div></div>
        </div>
        <span class="risk-pill" style="background:${r.bg};color:${r.txt};border:1px solid ${r.border}">
          <span class="rpd" style="background:${r.txt}"></span>${r.label}
        </span>
      </div>
      <div class="flag-reason">${reason}</div>
      <div class="flag-btn-row">
        <button class="view-btn" style="background:${r.bg};color:${r.txt};border:1px solid ${r.border}" onclick="openDetail(${i})">View Details →</button>
      </div>`;
    grid.appendChild(card);
  });
}
buildFlaggedCards();

// ── RISK CHART ──
let riskChartInst=null;
function buildRiskChart(){
  if(riskChartInst){riskChartInst.destroy();riskChartInst=null}
  const d=isDark();
  const grid=d?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.05)';
  const tick=d?'#3d5878':'#94a3b8';
  const colorMap={high:'rgba(239,68,68,0.85)',med:'rgba(245,158,11,0.85)',safe:'rgba(16,185,129,0.85)'};
  const riskData=ALL_STUDENTS.map(s=>({name:s.name,attend:s.attendance,riskScore:s.riskScore,r:s.riskLevel}));
  riskChartInst=new Chart(document.getElementById('riskChart'),{
    type:'scatter',
    data:{datasets:[{
      label:'Students',data:riskData.map(s=>({x:s.attend,y:s.riskScore,name:s.name,r:s.r})),
      backgroundColor:riskData.map(s=>colorMap[s.r]||colorMap.safe),
      borderColor:riskData.map(s=>(colorMap[s.r]||colorMap.safe).replace('0.85','1')),
      borderWidth:1.5,pointRadius:9,pointHoverRadius:13,
    },{
      label:'75% Threshold',data:[{x:75,y:0},{x:75,y:100}],
      type:'line',borderColor:'rgba(245,158,11,0.7)',borderWidth:2,borderDash:[6,4],pointRadius:0,fill:false,
    }]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{
        backgroundColor:d?'#0f1d2e':'#fff',borderColor:d?'rgba(96,165,250,0.2)':'rgba(0,0,0,.08)',borderWidth:1,
        titleColor:d?'#e2eaf8':'#0f172a',bodyColor:d?'#7a94b8':'#475569',padding:12,cornerRadius:10,
        filter:item=>item.datasetIndex===0,
        callbacks:{title:ctx=>`${ctx[0].raw.name}`,label:ctx=>`Attendance: ${ctx.raw.x}% · Risk: ${ctx.raw.y}%`}
      }},
      scales:{
        x:{grid:{color:grid},ticks:{color:tick,font:{size:11,family:'DM Sans'}},min:20,max:105,title:{display:true,text:'Attendance (%)',color:tick,font:{size:11}}},
        y:{grid:{color:grid},ticks:{color:tick,font:{size:11}},min:0,max:100,title:{display:true,text:'Risk Score (%)',color:tick,font:{size:11}}}
      }
    }
  });
}
buildRiskChart();

// ── LAST WEEK CARDS (Change #6: square via CSS aspect-ratio) ──
function buildLastWeekCards(){
  const lwg=document.getElementById('lastWeekGrid');
  lwg.innerHTML='';
  LAST_WEEK.forEach((s,i)=>{
    const r=rc(s.risk);
    const card=document.createElement('div');
    card.className=`lw-flag-card ${r.cls}`;
    card.style.animationDelay=`${.08+i*.07}s`;
    const topFactor = s.factors && s.factors.length ? s.factors[0].label : 'Flagged for review';
    card.innerHTML=`
      <div class="flag-top-row">
        <div class="flag-identity">
          <div class="flag-av" style="background:${r.bg};color:${r.txt}">${s.avatar}</div>
          <div><div class="flag-name">${s.name}</div><div class="flag-id">${s.id}</div></div>
        </div>
        <span class="risk-pill" style="background:${r.bg};color:${r.txt};border:1px solid ${r.border}">
          <span class="rpd" style="background:${r.txt}"></span>${r.label}
        </span>
      </div>
      <div class="flag-reason">${topFactor}</div>
      <div class="flag-btn-row">
        <button class="view-btn" style="background:${r.bg};color:${r.txt};border:1px solid ${r.border}" onclick="openLwDetail(${i})">View Details →</button>
      </div>`;
    lwg.appendChild(card);
  });
}
buildLastWeekCards();

// ── LAST WEEK DETAIL ──
function openLwDetail(idx){
  const s=LAST_WEEK[idx];const r=rc(s.risk);const sc=statusCfg(s.status);
  document.getElementById('lwDmAv').textContent=s.avatar;
  document.getElementById('lwDmAv').style.cssText=`background:${r.bg};color:${r.txt};width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0`;
  document.getElementById('lwDmTitle').textContent=s.name;
  document.getElementById('lwDmSub').textContent=`${s.id} · ${s.roll}`;
  document.getElementById('lwDmRisk').innerHTML=`<span class="rpd" style="background:${r.txt}"></span>${r.label}`;
  document.getElementById('lwDmRisk').style.cssText=`background:${r.bg};color:${r.txt};border:1px solid ${r.border};display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:20px`;
  const etDir=s.etCurr>=s.etPrev,atDir=s.atCurr>=s.atPrev,rkDir=s.riskCurr>=s.riskPrev;
  document.getElementById('lwDmBody').innerHTML=`
    <div class="lw-two-col">
      <div class="dm-panel">
        <div class="lw-section-label">About the Student</div>
        <div class="lw-stat-row"><span class="lw-stat-label">Avg Risk Score</span><span class="lw-stat-val">${s.avgRisk.toFixed(1)}%</span></div>
        <div class="lw-stat-row"><span class="lw-stat-label">Avg Effort</span><span class="lw-stat-val">${s.avgEt.toFixed(1)}%</span></div>
        <div class="lw-stat-row"><span class="lw-stat-label">Avg Academic Perf</span><span class="lw-stat-val">${s.avgAt.toFixed(1)}%</span></div>
        <div class="lw-stat-row"><span class="lw-stat-label">Overall Attendance</span><span class="lw-stat-val">${s.overallAttend}%</span></div>
        <div class="lw-stat-row"><span class="lw-stat-label">Risk of Detention</span><span class="lw-stat-val" style="color:${s.riskDetention>60?'var(--red)':s.riskDetention>40?'var(--amber)':'var(--green)'}">${s.riskDetention}%</span></div>
        <div class="lw-stat-row"><span class="lw-stat-label">Risk of Failing</span><span class="lw-stat-val" style="color:${s.riskFailing>60?'var(--red)':s.riskFailing>40?'var(--amber)':'var(--green)'}">${s.riskFailing}%</span></div>
        <div class="lw-stat-row"><span class="lw-stat-label">Midterm Score</span><span class="lw-stat-val">${s.midterm}</span></div>
      </div>
      <div class="dm-panel">
        <div class="lw-section-label">Reason for Flagging</div>
        ${s.factors.map(f=>`<div class="factor-bar-row"><div class="factor-bar-top"><span class="factor-bar-label">${f.label}</span><span class="factor-bar-pct" style="color:${f.color}">${f.pct}%</span></div><div class="factor-bar-track"><div class="factor-bar-fill" style="width:${f.pct}%;background:${f.color}"></div></div></div>`).join('')}
      </div>
    </div>
    <div class="dm-panel">
      <div class="lw-section-label">This Week vs Last Week</div>
      <div class="situation-grid">
        <div class="sit-item"><div class="sit-label">Effort</div><div class="sit-vals"><span class="sit-val">${s.etCurr}%</span><span class="sit-arrow" style="color:${etDir?'var(--green)':'var(--red)'}">${etDir?'▲':'▼'}</span><span class="sit-change" style="color:${etDir?'var(--green)':'var(--red)'}">${Math.abs(s.etCurr-s.etPrev)}</span></div><div style="font-size:10px;color:var(--txt3);margin-top:3px">prev: ${s.etPrev}%</div></div>
        <div class="sit-item"><div class="sit-label">Acad. Perf</div><div class="sit-vals"><span class="sit-val">${s.atCurr}%</span><span class="sit-arrow" style="color:${atDir?'var(--green)':'var(--red)'}">${atDir?'▲':'▼'}</span><span class="sit-change" style="color:${atDir?'var(--green)':'var(--red)'}">${Math.abs(s.atCurr-s.atPrev)}</span></div><div style="font-size:10px;color:var(--txt3);margin-top:3px">prev: ${s.atPrev}%</div></div>
        <div class="sit-item"><div class="sit-label">Risk Score</div><div class="sit-vals"><span class="sit-val" style="color:${rkDir?'var(--red)':'var(--green)'}">${s.riskCurr}%</span><span class="sit-arrow" style="color:${rkDir?'var(--red)':'var(--green)'}">${rkDir?'▲':'▼'}</span><span class="sit-change" style="color:${rkDir?'var(--red)':'var(--green)'}">${Math.abs(s.riskCurr-s.riskPrev)}</span></div><div style="font-size:10px;color:var(--txt3);margin-top:3px">prev: ${s.riskPrev}%</div></div>
      </div>
    </div>
    <div class="lw-bottom">
      <div class="lw-bottom-item"><div class="lw-bottom-label">Recovery %</div><div class="lw-bottom-val" style="color:${s.recovery<30?'var(--red)':s.recovery<55?'var(--amber)':'var(--green)'}">${s.recovery}%</div><div style="height:4px;background:var(--bg3);border-radius:10px;margin-top:8px;overflow:hidden"><div style="height:100%;width:${s.recovery}%;background:${s.recovery<30?'var(--red)':s.recovery<55?'var(--amber)':'var(--green)'};border-radius:10px"></div></div></div>
      <div class="lw-bottom-item"><div class="lw-bottom-label">Status</div><span class="status-pill" style="background:${sc.bg};color:${sc.txt};border:1px solid ${sc.border}">${sc.label}</span></div>
      <div class="lw-bottom-item"><div class="lw-bottom-label">Intervention</div><div style="font-size:11.5px;color:var(--txt2);line-height:1.55;margin-top:4px">${s.intervention}</div></div>
    </div>`;
  document.getElementById('lwOverlay').classList.add('open');document.body.style.overflow='hidden';
}
function closeLwOverlay(){document.getElementById('lwOverlay').classList.remove('open');document.body.style.overflow='';}
function handleLwOvClick(e){if(e.target===document.getElementById('lwOverlay'))closeLwOverlay();}

// ── INTERVENTIONS POPUP ──
function openInterventionsPopup(){
  let html=`<table class="int-table"><thead><tr><th>Student</th><th>ID</th><th>Type</th><th>Date</th><th>Perf Before</th><th>Perf After</th><th>Change</th></tr></thead><tbody>`;
  INTERVENTIONS.forEach(iv=>{
    const cls=iv.change==='up'?'perf-up':iv.change==='down'?'perf-down':'perf-same';
    const arrow=iv.change==='up'?'▲':iv.change==='down'?'▼':'—';
    const diff=Math.abs(iv.perfAfter-iv.perfBefore);
    html+=`<tr><td style="font-weight:700;color:var(--txt)">${iv.student}</td><td>${iv.id}</td><td>${iv.type}</td><td>${iv.date}</td><td>${iv.perfBefore}%</td><td class="${cls}">${iv.perfAfter}%</td><td class="${cls}">${arrow} ${diff>0?diff+'%':'No change'}</td></tr>`;
  });
  html+=`</tbody></table>`;
  document.getElementById('interventionsBody').innerHTML=html;
  document.getElementById('interventionsOverlay').classList.add('open');document.body.style.overflow='hidden';
}
function closeInterventionsPopup(){document.getElementById('interventionsOverlay').classList.remove('open');document.body.style.overflow='';}
function handleIntOvClick(e){if(e.target===document.getElementById('interventionsOverlay'))closeInterventionsPopup();}

// ── STUDENTS PAGE ──
let currentStuView='academicPerf';
const STU_TOGGLE_KEYS=['academicPerf','riskScore','effort','engagement','predMidterm','predEndterm','attendance'];
const STU_META={
  academicPerf:{label:'Academic Performance',colHeader:'Acad. Perf',barColor:'var(--accent2)'},
  riskScore:{label:'Risk Score',colHeader:'Risk Score',barColor:'var(--red)'},
  effort:{label:'Effort',colHeader:'Effort',barColor:'var(--purple)'},
  engagement:{label:'Engagement',colHeader:'Engagement',barColor:'#06b6d4'},
  predMidterm:{label:'Pred. Mid Term',colHeader:'Mid Term',barColor:'var(--purple)'},
  predEndterm:{label:'Pred. End Term',colHeader:'End Term',barColor:'var(--amber)'},
  attendance:{label:'Attendance',colHeader:'Attendance',barColor:'var(--green)'},
};

function setStuView(view){
  currentStuView=view;
  document.querySelectorAll('#stuToggleGroup .tgl-btn').forEach((b,i)=>{b.classList.toggle('active',STU_TOGGLE_KEYS[i]===view)});
  renderStudentsView();
}
function initStudentsPage(){renderStudentsView();}

function renderStudentsView(){
  const view=currentStuView;const meta=STU_META[view];
  let sorted=[...ALL_STUDENTS];
  if(view==='riskScore')sorted.sort((a,b)=>b[view]-a[view]);
  else sorted.sort((a,b)=>b[view]-a[view]);

  const container=document.getElementById('stuViewContainer');
  let html=`<div class="stu-list-wrap">
    <div class="stu-list-header" style="grid-template-columns:40px 1fr 140px 80px 100px">
      <span>#</span><span>Student</span><span>${meta.colHeader}</span><span>Risk</span><span></span>
    </div>`;
  sorted.forEach((s,i)=>{
    const val=s[view];const r=rc(s.riskLevel);
    html+=`<div class="stu-list-row" style="grid-template-columns:40px 1fr 140px 80px 100px;animation-delay:${i*.03}s">
      <span class="stu-rank">${i+1}</span>
      <div class="stu-name-cell">
        <div class="stu-av" style="background:${r.bg};color:${r.txt}">${s.avatar}</div>
        <div><div class="stu-name-txt">${s.name}</div><div class="stu-roll-txt">${s.roll}</div></div>
      </div>
      <div class="stu-val-cell">
        <div class="stu-bar-wrap"><div class="stu-bar-fill" style="width:${val}%;background:${meta.barColor}"></div></div>
        <span class="stu-val-num" style="color:${val<40?'var(--red)':val<60?'var(--amber)':'var(--txt)'}">${val}%</span>
      </div>
      <span class="stu-risk-pill" style="background:${r.bg};color:${r.txt}">${r.label.split(' ')[0]}</span>
      <button class="stu-view-btn" onclick="openStuDetail(${ALL_STUDENTS.indexOf(s)})">View Details</button>
    </div>`;
  });
  html+=`</div>`;
  container.innerHTML=html;
}

// ── STUDENT DETAIL POPUP (Change #7) ──
let stuDetLineInst=null,stuDetQuadInst=null;
function openStuDetail(idx){
  const s=ALL_STUDENTS[idx];const r=rc(s.riskLevel);const d=isDark();
  document.getElementById('stuDetAv').textContent=s.avatar;
  document.getElementById('stuDetAv').style.cssText=`background:${r.bg};color:${r.txt};width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0`;
  document.getElementById('stuDetTitle').textContent=s.name;
  document.getElementById('stuDetSub').textContent=`${s.id} · ${s.roll}`;
  document.getElementById('stuDetRiskPill').innerHTML=`<span class="rpd" style="background:${r.txt}"></span>${r.label}`;
  document.getElementById('stuDetRiskPill').style.cssText=`background:${r.bg};color:${r.txt};border:1px solid ${r.border};display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:20px`;

  // Student Overview
  const stats=[
    ['Avg Risk Score',`${s.avgRisk.toFixed(1)}%`,s.avgRisk>60?'var(--red)':s.avgRisk>40?'var(--amber)':'var(--green)'],
    ['Avg Effort',`${s.avgEt.toFixed(1)}%`,null],
    ['Avg Academic Performance',`${(s.avgAt||s.academicPerf).toFixed?.(1)||s.academicPerf}%`,s.academicPerf<50?'var(--red)':null],
    ['Overall Attendance',`${s.overallAttend}%`,s.overallAttend<75?'var(--red)':null],
    ['Risk of Detention',`${s.riskDetention}%`,s.riskDetention>60?'var(--red)':s.riskDetention>40?'var(--amber)':'var(--green)'],
    ['Risk of Failing',`${s.riskFail.toFixed?.(1)||s.riskFail}%`,s.riskFail>60?'var(--red)':s.riskFail>40?'var(--amber)':'var(--green)'],
    ['Midterm Score',s.midterm,null]
  ];
  document.getElementById('stuDetStats').innerHTML=stats.map(([l,v,c])=>`<div class="dm-stat-row"><span class="dm-stat-label">${l}</span><span class="dm-stat-val" style="${c?`color:${c}`:''}">${v}</span></div>`).join('');

  // Flagging History
  const fh=s.flagHistory||[];
  const tf=fh.length,ti=fh.filter(f=>f.intervened).length;
  document.getElementById('stuDetFhSummary').innerHTML=`<div class="fh-sum-box"><div class="fh-sum-val" style="color:var(--red)">${tf}</div><div class="fh-sum-label">Total Flags</div></div><div class="fh-sum-box"><div class="fh-sum-val" style="color:var(--green)">${ti}</div><div class="fh-sum-label">Interventions</div></div>`;
  document.getElementById('stuDetFhBody').innerHTML=fh.length?fh.map(f=>`<tr><td>${f.date}</td><td>${f.diagnosis}</td><td><span class="fh-intervened" style="background:${f.intervened?'var(--green-bg)':'var(--red-bg)'};color:${f.intervened?'var(--green)':'var(--red)'}">${f.intervened?'✓ Yes':'✗ No'}</span></td></tr>`).join(''):'<tr><td colspan="3" style="text-align:center;color:var(--txt3)">No flags recorded</td></tr>';

  // Charts
  const {tc,gc,tip}=chartDefaults();
  if(stuDetLineInst){stuDetLineInst.destroy();stuDetLineInst=null}
  stuDetLineInst=new Chart(document.getElementById('stuDetLineChart'),{type:'line',data:{labels:WEEKS,datasets:[
    {label:'Effort',data:s.weekEt,borderColor:'#60a5fa',backgroundColor:'rgba(96,165,250,0.08)',borderWidth:2.5,tension:0.38,fill:true,pointBackgroundColor:'#60a5fa',pointRadius:4,pointHoverRadius:7},
    {label:'Academic Performance',data:s.weekAt,borderColor:'#f59e0b',backgroundColor:'rgba(245,158,11,0.06)',borderWidth:2.5,tension:0.38,fill:true,pointBackgroundColor:'#f59e0b',pointRadius:4,pointHoverRadius:7}
  ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:tip},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:10,family:'DM Sans'}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:100}}}});

  if(stuDetQuadInst){stuDetQuadInst.destroy();stuDetQuadInst=null}
  stuDetQuadInst=new Chart(document.getElementById('stuDetQuadChart'),{type:'scatter',data:{datasets:[
    {data:[{x:s.classAvgEt,y:0},{x:s.classAvgEt,y:100}],type:'line',borderColor:'rgba(100,116,139,0.5)',borderWidth:1.5,borderDash:[4,3],pointRadius:0,fill:false},
    {data:[{x:0,y:s.classAvgPerf},{x:100,y:s.classAvgPerf}],type:'line',borderColor:'rgba(100,116,139,0.5)',borderWidth:1.5,borderDash:[4,3],pointRadius:0,fill:false},
    {label:'This Week',data:[{x:s.etThisWeek,y:s.perfThisWeek,label:'This Week'}],backgroundColor:'rgba(245,158,11,0.9)',borderColor:'#f59e0b',borderWidth:2,pointRadius:11,pointHoverRadius:15},
    {label:'Avg',data:[{x:s.studentAvgEt,y:s.studentAvgPerf,label:'Avg'}],backgroundColor:'rgba(96,165,250,0.9)',borderColor:'#60a5fa',borderWidth:2,pointRadius:11,pointHoverRadius:15}
  ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...tip,filter:item=>item.datasetIndex>=2,callbacks:{title:ctx=>`${ctx[0].raw.label||''}`,label:ctx=>`Effort: ${ctx.raw.x}% · Acad: ${ctx.raw.y}%`}}},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:100,title:{display:true,text:'Effort (%)',color:tc,font:{size:10}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:100,title:{display:true,text:'Academic Performance (%)',color:tc,font:{size:10}}}}}});

  document.getElementById('stuDetailOverlay').classList.add('open');document.body.style.overflow='hidden';
}
function closeStuDetailOverlay(){document.getElementById('stuDetailOverlay').classList.remove('open');document.body.style.overflow='';}
function handleStuDetailOvClick(e){if(e.target===document.getElementById('stuDetailOverlay'))closeStuDetailOverlay();}

// ── FLAGGED DETAIL MODAL ──
let dmLineChartInst=null,dmQuadChartInst=null,currentStudent=null;

function chartDefaults(){
  const d=isDark();
  return{
    tc:d?'#3d5878':'#94a3b8',
    gc:d?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.05)',
    tip:{backgroundColor:d?'#0f1d2e':'#fff',borderColor:d?'rgba(96,165,250,0.2)':'rgba(0,0,0,.08)',borderWidth:1,titleColor:d?'#e2eaf8':'#0f172a',bodyColor:d?'#7a94b8':'#475569',padding:10,cornerRadius:8}
  };
}

function openDetail(idx){
  const s=FLAGGED[idx];currentStudent=s;
  const r=rc(s.riskLevel||s.risk||'med');const d=isDark();
  document.getElementById('dmAv').textContent=s.avatar;
  document.getElementById('dmAv').style.cssText=`background:${r.bg};color:${r.txt};width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0`;
  document.getElementById('dmTitle').textContent=s.name;
  document.getElementById('dmSub').textContent=`${s.id} · ${s.roll}`;
  document.getElementById('dmRiskPill').innerHTML=`<span class="rpd" style="background:${r.txt}"></span>${r.label}`;
  document.getElementById('dmRiskPill').style.cssText=`background:${r.bg};color:${r.txt};border:1px solid ${r.border};display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:20px`;
  const stats=[
    ['Avg Risk Score',`${s.avgRisk.toFixed(1)}%`,s.avgRisk>60?'var(--red)':s.avgRisk>40?'var(--amber)':'var(--green)'],
    ['Avg Effort',`${s.avgEt.toFixed(1)}%`,null],
    ['Avg Academic Performance',`${s.avgAt.toFixed(1)}%`,s.avgAt<50?'var(--red)':null],
    ['Overall Attendance',`${s.overallAttend}%`,s.overallAttend<75?'var(--red)':null],
    ['Risk of Detention',`${s.riskDetention}%`,s.riskDetention>60?'var(--red)':s.riskDetention>40?'var(--amber)':'var(--green)'],
    ['Risk of Failing',`${s.riskFail.toFixed(1)}%`,s.riskFail>60?'var(--red)':s.riskFail>40?'var(--amber)':'var(--green)'],
    ['Midterm Score',s.midterm,null]
  ];
  document.getElementById('dmStats').innerHTML=stats.map(([l,v,c])=>`<div class="dm-stat-row"><span class="dm-stat-label">${l}</span><span class="dm-stat-val" style="${c?`color:${c}`:''}">${v}</span></div>`).join('');
  const tf=s.flagHistory.length,ti=s.flagHistory.filter(f=>f.intervened).length;
  document.getElementById('dmFhSummary').innerHTML=`<div class="fh-sum-box"><div class="fh-sum-val" style="color:var(--red)">${tf}</div><div class="fh-sum-label">Total Flags</div></div><div class="fh-sum-box"><div class="fh-sum-val" style="color:var(--green)">${ti}</div><div class="fh-sum-label">Interventions</div></div>`;
  document.getElementById('dmFhBody').innerHTML=s.flagHistory.map(f=>`<tr><td>${f.date}</td><td>${f.diagnosis}</td><td><span class="fh-intervened" style="background:${f.intervened?'var(--green-bg)':'var(--red-bg)'};color:${f.intervened?'var(--green)':'var(--red)'}">${f.intervened?'✓ Yes':'✗ No'}</span></td></tr>`).join('');

  const {tc,gc,tip}=chartDefaults();
  if(dmLineChartInst){dmLineChartInst.destroy();dmLineChartInst=null}
  dmLineChartInst=new Chart(document.getElementById('dmLineChart'),{type:'line',data:{labels:WEEKS,datasets:[
    {label:'Effort',data:s.weekEt,borderColor:'#60a5fa',backgroundColor:'rgba(96,165,250,0.08)',borderWidth:2.5,tension:0.38,fill:true,pointBackgroundColor:'#60a5fa',pointRadius:4,pointHoverRadius:7},
    {label:'Academic Performance',data:s.weekAt,borderColor:'#f59e0b',backgroundColor:'rgba(245,158,11,0.06)',borderWidth:2.5,tension:0.38,fill:true,pointBackgroundColor:'#f59e0b',pointRadius:4,pointHoverRadius:7}
  ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:tip},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:10,family:'DM Sans'}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:100}}}});

  if(dmQuadChartInst){dmQuadChartInst.destroy();dmQuadChartInst=null}
  dmQuadChartInst=new Chart(document.getElementById('dmQuadChart'),{type:'scatter',data:{datasets:[
    {data:[{x:s.classAvgEt,y:0},{x:s.classAvgEt,y:100}],type:'line',borderColor:'rgba(100,116,139,0.5)',borderWidth:1.5,borderDash:[4,3],pointRadius:0,fill:false},
    {data:[{x:0,y:s.classAvgPerf},{x:100,y:s.classAvgPerf}],type:'line',borderColor:'rgba(100,116,139,0.5)',borderWidth:1.5,borderDash:[4,3],pointRadius:0,fill:false},
    {label:'This Week',data:[{x:s.etThisWeek,y:s.perfThisWeek,label:'This Week'}],backgroundColor:'rgba(245,158,11,0.9)',borderColor:'#f59e0b',borderWidth:2,pointRadius:11,pointHoverRadius:15},
    {label:'Avg',data:[{x:s.studentAvgEt,y:s.studentAvgPerf,label:'Avg'}],backgroundColor:'rgba(96,165,250,0.9)',borderColor:'#60a5fa',borderWidth:2,pointRadius:11,pointHoverRadius:15}
  ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...tip,filter:item=>item.datasetIndex>=2,callbacks:{title:ctx=>`${ctx[0].raw.label||''}`,label:ctx=>`Effort: ${ctx.raw.x}% · Acad: ${ctx.raw.y}%`}}},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:100,title:{display:true,text:'Effort (%)',color:tc,font:{size:10}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:100,title:{display:true,text:'Academic Performance (%)',color:tc,font:{size:10}}}}}});

  document.getElementById('dmFactors').innerHTML=s.flagHistory.length?
    (s.factors||[{label:"Low Attendance",pct:65,color:"#ef4444"},{label:"Engagement Drop",pct:50,color:"#f59e0b"}]).map(f=>`<div class="dm-factor-bar-row"><div class="dm-factor-bar-top"><span class="dm-factor-bar-label">${f.label}</span><span class="dm-factor-bar-pct">${f.pct}%</span></div><div class="dm-factor-bar-track"><div class="dm-factor-bar-fill" style="width:0%;background:${f.color}" data-target="${f.pct}"></div></div></div>`).join(''):'<div style="color:var(--txt3);font-size:12px">No factors recorded</div>';
  document.getElementById('dmMajorNote').innerHTML=s.majorFactor?`⚡ Major contributor: <strong style="color:var(--amber)">${s.majorFactor}</strong>`:'';

  const rp=s.riskFail||0;const rc2=rp>70?'var(--red)':rp>45?'var(--amber)':'var(--green)';
  document.getElementById('dmRiskBar').style.cssText=`width:0%;background:${rc2};height:100%;border-radius:10px;transition:width 1.2s ease .4s`;
  document.getElementById('dmRiskVal').style.color=rc2;document.getElementById('dmRiskVal').textContent=rp.toFixed?rp.toFixed(1)+'%':rp+'%';
  const recov=s.recovery||Math.max(5,100-rp);
  const recColor=recov<30?'var(--red)':recov<55?'var(--amber)':'var(--green)';
  document.getElementById('dmRecBar').style.cssText=`width:0%;background:${recColor};height:100%;border-radius:10px;transition:width 1.2s ease .6s`;
  document.getElementById('dmRecVal').style.color=recColor;document.getElementById('dmRecVal').textContent=recov+'%';

  document.getElementById('overlay').classList.add('open');document.body.style.overflow='hidden';
  setTimeout(()=>{
    document.querySelectorAll('.dm-factor-bar-fill[data-target]').forEach(el=>{el.style.width=el.dataset.target+'%'});
    document.getElementById('dmRiskBar').style.width=rp+'%';
    document.getElementById('dmRecBar').style.width=recov+'%';
  },80);
}
function closeOverlay(){document.getElementById('overlay').classList.remove('open');document.body.style.overflow='';}
function handleOvClick(e){if(e.target===document.getElementById('overlay'))closeOverlay();}
function logIntervention(){if(!currentStudent)return;alert(`✓ Intervention logged for ${currentStudent.name}`);}
function mailStudent(){if(!currentStudent)return;alert(`📧 Email sent to ${currentStudent.name}`);}
function mailParents(){if(!currentStudent)return;alert(`📧 Email sent to parents of ${currentStudent.name}`);}

// ── CALENDAR ──
let nextTodoId=10;
const CAL_EVENTS=[
  {day:0,start:9,end:10.5,title:"Data Structures Lecture",color:"rgba(59,130,246,0.85)",textColor:"#fff"},
  {day:0,start:14,end:15,title:"Office Hours",color:"rgba(16,185,129,0.75)",textColor:"#fff"},
  {day:1,start:11,end:12,title:"Algorithm Lab",color:"rgba(139,92,246,0.85)",textColor:"#fff"},
  {day:2,start:9,end:10.5,title:"Data Structures Lecture",color:"rgba(59,130,246,0.85)",textColor:"#fff"},
  {day:2,start:16,end:17,title:"Risk Review Meeting",color:"rgba(239,68,68,0.85)",textColor:"#fff"},
  {day:3,start:10,end:11.5,title:"Algorithm Lab",color:"rgba(139,92,246,0.85)",textColor:"#fff"},
  {day:4,start:9,end:10,title:"Faculty Meeting",color:"rgba(245,158,11,0.85)",textColor:"#fff"},
  {day:4,start:11,end:12,title:"Data Structures Lecture",color:"rgba(59,130,246,0.85)",textColor:"#fff"},
];
function initCalendar(){renderTodos();buildCalGrid();}
function renderTodos(){
  const list=document.getElementById('todoList');
  const groups={};TODOS.forEach(t=>{if(!groups[t.date])groups[t.date]=[];groups[t.date].push(t);});
  list.innerHTML=Object.entries(groups).map(([date,tasks])=>`
    <div class="todo-group-label">${date}</div>
    ${tasks.map(t=>`<div class="todo-item ${t.done?'done':''}" onclick="toggleTodo(${t.id})">
      <div class="todo-check">${t.done?`<svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" stroke-width="2.5"><polyline points="2,6 5,9 10,3"/></svg>`:''}</div>
      <div class="todo-text">${t.text}</div>
      <span class="todo-tag" style="background:${t.tagColor}22;color:${t.tagColor}">${t.tag}</span>
    </div>`).join('')}`).join('');
}
function toggleTodo(id){const t=TODOS.find(t=>t.id===id);if(t)t.done=!t.done;renderTodos();}
function addTodo(){const inp=document.getElementById('todoInput');const txt=inp.value.trim();if(!txt)return;TODOS.push({id:nextTodoId++,text:txt,done:false,tag:"Custom",tagColor:"var(--accent2)",date:"Today"});inp.value='';renderTodos();}
function calToday(){}
function buildCalGrid(){
  const grid=document.getElementById('calGrid');
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const dates=[7,8,9,10,11,12,13];const todayIdx=1;
  const times=[];for(let h=8;h<=20;h++)times.push(h);
  let html='<div class="cal-time-col"></div>';
  days.forEach((d,i)=>{html+=`<div class="cal-day-head ${i===todayIdx?'today-col':''}"><div class="cal-day-name">${d}</div><div class="cal-day-num ${i===todayIdx?'today':''}">${dates[i]}</div></div>`;});
  times.forEach(h=>{
    html+=`<div class="cal-time-col"><div class="cal-time-slot">${h}:00</div></div>`;
    days.forEach((_,di)=>{
      html+=`<div class="cal-day-col ${di===todayIdx?'today-col':''}"><div class="cal-slot"></div>`;
      CAL_EVENTS.filter(ev=>ev.day===di&&Math.floor(ev.start)===h).forEach(ev=>{
        const top=(ev.start-h)*56;const height=(ev.end-ev.start)*56-4;
        html+=`<div class="cal-event" style="top:${top}px;height:${height}px;background:${ev.color};color:${ev.textColor}">${ev.title}<div class="ev-time">${ev.start}:00–${ev.end}:00</div></div>`;
      });
      html+='</div>';
    });
  });
  grid.innerHTML=html;
}

// ── ANALYTICS ──
let preChartInst=null,postChartInst=null,preEndChartInst=null,postEndChartInst=null;
function setAnalyticsMain(section){
  document.querySelectorAll('.analytics-main-section').forEach(s=>s.classList.remove('active'));
  document.getElementById('anl-main-'+section).classList.add('active');
  document.querySelectorAll('.atop-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('atop-'+section).classList.add('active');
  if(section==='midterm')buildMidtermCharts();if(section==='endterm')buildEndtermCharts();
}
function setMidtermView(v){['pre','post'].forEach(x=>{document.getElementById('anl-'+x).classList.toggle('active',x===v);document.getElementById('atgl-'+x).classList.toggle('active',x===v)});if(v==='pre'&&!preChartInst)buildPreChart();if(v==='post'&&!postChartInst)buildPostChart();}
function setEndtermView(v){['pre','post'].forEach(x=>{document.getElementById('anl-'+x+'-end').classList.toggle('active',x===v);document.getElementById('atgl-'+x+'-end').classList.toggle('active',x===v)});if(v==='pre'&&!preEndChartInst)buildPreEndChart();if(v==='post'&&!postEndChartInst)buildPostEndChart();}
function initAnalyticsCharts(){buildPreChart();}
function buildMidtermCharts(){if(!preChartInst)buildPreChart();}
function buildEndtermCharts(){if(!preEndChartInst)buildPreEndChart();}

function buildPreChart(){
  if(preChartInst){preChartInst.destroy();preChartInst=null}
  const {tc,gc,tip}=chartDefaults();const canvas=document.getElementById('preDistChart');if(!canvas)return;
  preChartInst=new Chart(canvas,{type:'bar',data:{labels:['<40%','41–50%','51–60%','61–70%','71–80%','81–90%','91–100%'],datasets:[{label:'Students',data:[3,5,6,8,12,4,2],backgroundColor:['rgba(239,68,68,0.75)','rgba(239,68,68,0.6)','rgba(245,158,11,0.65)','rgba(245,158,11,0.5)','rgba(16,185,129,0.65)','rgba(16,185,129,0.8)','rgba(59,130,246,0.8)'],borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...tip,callbacks:{label:ctx=>`${ctx.raw} students`}}},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:10,family:'DM Sans'}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:16}}}});
}
function buildPostChart(){
  if(postChartInst){postChartInst.destroy();postChartInst=null}
  const {tc,gc,tip}=chartDefaults();const canvas=document.getElementById('postDistChart');if(!canvas)return;
  postChartInst=new Chart(canvas,{type:'bar',data:{labels:['<40%','41–50%','51–60%','61–70%','71–80%','81–90%','91–100%'],datasets:[{label:'Actual',data:[3,4,6,10,10,5,2],backgroundColor:'rgba(59,130,246,0.75)',borderRadius:4,borderSkipped:false},{label:'Predicted',data:[2,3,5,8,12,7,3],backgroundColor:'rgba(167,139,250,0.4)',borderRadius:4,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,labels:{color:tc,font:{size:10,family:'DM Sans'},boxWidth:10}},tooltip:tip},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:10,family:'DM Sans'}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:16}}}});
}
function buildPreEndChart(){
  if(preEndChartInst){preEndChartInst.destroy();preEndChartInst=null}
  const {tc,gc,tip}=chartDefaults();const canvas=document.getElementById('preEndChart');if(!canvas)return;
  preEndChartInst=new Chart(canvas,{type:'bar',data:{labels:['<40%','41–50%','51–60%','61–70%','71–80%','81–90%','91–100%'],datasets:[{label:'Students',data:[5,6,8,9,8,3,1],backgroundColor:['rgba(239,68,68,0.75)','rgba(239,68,68,0.6)','rgba(245,158,11,0.65)','rgba(245,158,11,0.5)','rgba(16,185,129,0.65)','rgba(16,185,129,0.8)','rgba(59,130,246,0.8)'],borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...tip,callbacks:{label:ctx=>`${ctx.raw} students`}}},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:10,family:'DM Sans'}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:16}}}});
}
function buildPostEndChart(){
  if(postEndChartInst){postEndChartInst.destroy();postEndChartInst=null}
  const {tc,gc,tip}=chartDefaults();const canvas=document.getElementById('postEndChart');if(!canvas)return;
  postEndChartInst=new Chart(canvas,{type:'bar',data:{labels:['<40%','41–50%','51–60%','61–70%','71–80%','81–90%','91–100%'],datasets:[{label:'Actual',data:[4,5,9,9,7,4,2],backgroundColor:'rgba(59,130,246,0.75)',borderRadius:4,borderSkipped:false},{label:'Predicted',data:[5,6,8,9,8,3,1],backgroundColor:'rgba(167,139,250,0.4)',borderRadius:4,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,labels:{color:tc,font:{size:10,family:'DM Sans'},boxWidth:10}},tooltip:tip},scales:{x:{grid:{color:gc},ticks:{color:tc,font:{size:10,family:'DM Sans'}}},y:{grid:{color:gc},ticks:{color:tc,font:{size:10}},min:0,max:16}}}});
}
