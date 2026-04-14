// EduMetrics — js/script.js
// Main application logic

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
   factors:[{label:"Low Attendance",pct:85,color:"#f85149"},{label:"Drop in Engagement",pct:62,color:"#d29922"},{label:"Cramming",pct:38,color:"#bc8cff"}],
   etCurr:55,etPrev:62,atCurr:48,atPrev:58,riskCurr:72,riskPrev:58,recovery:22,
   status:"intervene",intervention:"1:1 advisor meeting + parent email sent on Mon."},
  {id:"STU2024005",name:"Rahul Gupta",roll:"CS2208",avatar:"RG",risk:"high",
   avgRisk:88.0,avgEt:28.0,avgAt:35.0,overallAttend:32,riskDetention:82,riskFailing:91.0,
   midterm:"Predicted: 40%",
   factors:[{label:"Low Attendance",pct:95,color:"#f85149"},{label:"Drop in Engagement",pct:80,color:"#d29922"},{label:"Cramming",pct:15,color:"#bc8cff"}],
   etCurr:28,etPrev:40,atCurr:35,atPrev:50,riskCurr:88,riskPrev:74,recovery:8,
   status:"intervene",intervention:"HOD escalation + parent call. Student unreachable."},
  {id:"STU2024004",name:"Tanya Singh",roll:"CS2207",avatar:"TS",risk:"med",
   avgRisk:52.0,avgEt:65.0,avgAt:70.0,overallAttend:68,riskDetention:45,riskFailing:55.0,
   midterm:"Predicted: 64%",
   factors:[{label:"Low Attendance",pct:40,color:"#f85149"},{label:"Drop in Engagement",pct:70,color:"#d29922"},{label:"Cramming",pct:55,color:"#bc8cff"}],
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
  {id:1,text:"Review Aryan's progress",done:false,tag:"Urgent",tagColor:"#f85149",date:"Today"},
  {id:2,text:"Send parent emails for flagged students",done:true,tag:"Email",tagColor:"#d29922",date:"Today"},
  {id:3,text:"Prepare midterm review session",done:false,tag:"Academic",tagColor:"#58a6ff",date:"Tomorrow"},
  {id:4,text:"Meet with HOD about Rahul",done:false,tag:"Meeting",tagColor:"#bc8cff",date:"Tomorrow"},
];

// ── HELPERS ──
function rc(risk){
  const m={
    high:{cls:'risk-high',bg:'rgba(248,81,73,0.12)',txt:'#f85149',border:'rgba(248,81,73,0.30)',label:'High Risk'},
    med: {cls:'risk-med', bg:'rgba(210,153,34,0.12)',txt:'#d29922',border:'rgba(210,153,34,0.30)',label:'Medium Risk'},
    low: {cls:'risk-low', bg:'rgba(63,185,80,0.12)', txt:'#3fb950',border:'rgba(63,185,80,0.30)', label:'Low Risk'},
    safe:{cls:'risk-safe',bg:'rgba(63,185,80,0.12)', txt:'#3fb950',border:'rgba(63,185,80,0.30)', label:'Safe'}
  };
  return m[risk]||m.safe;
}
function statusCfg(s){
  const m={
    intervene:{bg:'rgba(248,81,73,0.12)',txt:'#f85149',border:'rgba(248,81,73,0.30)',label:'Needs Intervention'},
    monitor:  {bg:'rgba(210,153,34,0.12)',txt:'#d29922',border:'rgba(210,153,34,0.30)',label:'Monitoring'},
    resolved: {bg:'rgba(63,185,80,0.12)', txt:'#3fb950',border:'rgba(63,185,80,0.30)', label:'Resolved'}
  };
  return m[s]||m.monitor;
}

// ── THEME ──
function setTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  document.getElementById('darkBtn').classList.toggle('active',t==='dark');
  document.getElementById('lightBtn').classList.toggle('active',t==='light');
  buildRiskChart();
  // Rebuild any visible analytics charts
  const anlPage=document.getElementById('page-analytics');
  if(anlPage&&anlPage.classList.contains('active')){
    const midSec=document.getElementById('anl-main-midterm');
    if(midSec&&midSec.classList.contains('active')){buildMidtermCharts();}
    else{buildEndtermCharts();}
  }
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

// ── WEEK SELECTOR ──
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
  if(riskScore<=30)color='rgba(63,185,80,0.4)';
  else if(riskScore<=50)color='rgba(210,153,34,0.4)';
  else if(riskScore<=70)color='rgba(210,153,34,0.6)';
  else color='rgba(248,81,73,0.5)';
  fill.style.height=h+'%';
  fill.style.background=color;
}
setTimeout(initWaterFill,300);

// ── FLAGGED CARDS (This Week) ──
function buildFlaggedCards(){
  const grid=document.getElementById('flaggedGrid');
  grid.innerHTML='';
  FLAGGED.forEach((s,i)=>{
    const r=rc(s.riskLevel||s.risk||'med');
    const card=document.createElement('div');
    card.className=`flag-card ${r.cls}`;
    card.style.animationDelay=`${.05+i*.06}s`;
    const reason=s.flagHistory&&s.flagHistory.length?s.flagHistory[s.flagHistory.length-1].diagnosis:'Flagged for review';
    const totalFlags=s.flagHistory?s.flagHistory.length:0;
    const attended=s.attendance||0;
    const atColor=attended<65?'var(--red)':attended<75?'var(--amber)':'var(--green)';
    card.innerHTML=`
      <div class="flag-top-row">
        <div class="flag-identity">
          <div class="flag-av" style="background:${r.bg};color:${r.txt};width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0">${s.avatar}</div>
          <div>
            <div class="flag-name">${s.name}</div>
            <div class="flag-id">${s.id} · ${s.roll||''}</div>
          </div>
        </div>
        <span class="risk-pill" style="background:${r.bg};color:${r.txt};border:1px solid ${r.border}">
          <span class="rpd" style="background:${r.txt}"></span>${r.label}
        </span>
      </div>
      <div class="flag-reason">${reason}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:2px">
        <div style="background:var(--bg4);border-radius:8px;padding:8px 10px;text-align:center">
          <div style="font-size:10px;color:var(--txt3);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px">Attend.</div>
          <div style="font-size:15px;font-weight:800;color:${atColor}">${attended}%</div>
        </div>
        <div style="background:var(--bg4);border-radius:8px;padding:8px 10px;text-align:center">
          <div style="font-size:10px;color:var(--txt3);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px">Risk</div>
          <div style="font-size:15px;font-weight:800;color:${r.txt}">${s.riskScore||0}%</div>
        </div>
        <div style="background:var(--bg4);border-radius:8px;padding:8px 10px;text-align:center">
          <div style="font-size:10px;color:var(--txt3);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:3px">Flags</div>
          <div style="font-size:15px;font-weight:800;color:var(--txt)">${totalFlags}</div>
        </div>
      </div>
      <div class="flag-btn-row">
        <button class="view-btn" style="background:${r.bg};color:${r.txt};border:1px solid ${r.border}" onclick="openDetail(${i})">View Details →</button>
      </div>`;
    grid.appendChild(card);
  });
}
buildFlaggedCards();

// ── RISK CHART ── (calls into charts.js)
buildRiskChart();

// ── LAST WEEK CARDS ──
function buildLastWeekCards(){
  const lwg=document.getElementById('lastWeekGrid');
  lwg.innerHTML='';
  LAST_WEEK.forEach((s,i)=>{
    const r=rc(s.risk);
    const card=document.createElement('div');
    card.className=`lw-flag-card ${r.cls}`;
    card.style.animationDelay=`${.08+i*.07}s`;
    const topFactor=s.factors&&s.factors.length?s.factors[0].label:'Flagged for review';
    card.innerHTML=`
      <div class="flag-top-row">
        <div class="flag-identity">
          <div class="flag-av" style="background:${r.bg};color:${r.txt};width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;flex-shrink:0">${s.avatar}</div>
          <div>
            <div class="flag-name">${s.name}</div>
            <div class="flag-id">${s.id}</div>
          </div>
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
  let html=`<table class="int-table"><thead><tr><th>Student</th><th>ID</th><th>Type</th><th>Date</th><th>Change</th></tr></thead><tbody>`;
  INTERVENTIONS.forEach(iv=>{
    const cls=iv.change==='up'?'perf-up':iv.change==='down'?'perf-down':'perf-same';
    const arrow=iv.change==='up'?'▲':iv.change==='down'?'▼':'—';
    html+=`<tr><td style="font-weight:700;color:var(--txt)">${iv.student}</td><td>${iv.id}</td><td>${iv.type}</td><td>${iv.date}</td><td class="${cls}">${arrow}</td></tr>`;
  });
  html+=`</tbody></table>`;
  document.getElementById('interventionsBody').innerHTML=html;
  document.getElementById('interventionsOverlay').classList.add('open');document.body.style.overflow='hidden';
}
function closeInterventionsPopup(){document.getElementById('interventionsOverlay').classList.remove('open');document.body.style.overflow='';}
function handleIntOvClick(e){if(e.target===document.getElementById('interventionsOverlay'))closeInterventionsPopup();}

// ── STUDENTS PAGE ──
let currentStuView='academicPerf';
const STU_TOGGLE_KEYS=['academicPerf','riskScore','effort','predMidterm','predEndterm','attendance'];
const STU_META={
  academicPerf:{label:'Academic Performance',colHeader:'Acad. Perf',barColor:'var(--accent2)'},
  riskScore:   {label:'Risk Score',colHeader:'Risk Score',barColor:'var(--red)'},
  effort:      {label:'Effort',colHeader:'Effort',barColor:'var(--purple)'},
  predMidterm: {label:'Pred. Mid Term',colHeader:'Mid Term',barColor:'var(--purple)'},
  predEndterm: {label:'Pred. End Term',colHeader:'End Term',barColor:'var(--amber)'},
  attendance:  {label:'Attendance',colHeader:'Attendance',barColor:'var(--green)'},
};

function setStuView(view){
  currentStuView=view;
  document.querySelectorAll('#stuToggleGroup .tgl-btn').forEach((b,i)=>{b.classList.toggle('active',STU_TOGGLE_KEYS[i]===view)});
  renderStudentsView();
}
function initStudentsPage(){renderStudentsView();}

function renderStudentsView(){
  const view=currentStuView;const meta=STU_META[view];
  let sorted=[...ALL_STUDENTS].sort((a,b)=>b[view]-a[view]);
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

// ── STUDENT DETAIL POPUP ──
let currentStudent=null;
function generateStudentSummary(s){
  const name = s.name.split(' ')[0];
  const acad = s.avgAt || s.academicPerf;
  const attend = s.overallAttend || s.attendance;
  const effort = s.avgEt || s.effort;
  const risk = s.riskFail || s.riskScore;
  const flags = (s.flagHistory||[]).length;

  let sentences = [];

  // Academic performance sentence
  if(acad >= 80) sentences.push(`${name} is performing <strong>excellently academically</strong> with an average score of ${acad.toFixed?acad.toFixed(1):acad}%, consistently above class benchmarks.`);
  else if(acad >= 65) sentences.push(`${name}'s academic performance is <strong>satisfactory</strong> at ${acad.toFixed?acad.toFixed(1):acad}%, tracking close to the class average.`);
  else if(acad >= 50) sentences.push(`${name}'s academic performance is <strong>below expectations</strong> at ${acad.toFixed?acad.toFixed(1):acad}%, showing a need for focused academic support.`);
  else sentences.push(`${name} is <strong>critically underperforming academically</strong> with an average of only ${acad.toFixed?acad.toFixed(1):acad}%, placing them at high risk of failing.`);

  // Attendance sentence
  if(attend >= 85) sentences.push(`Attendance is <strong>strong at ${attend}%</strong>, reflecting consistent commitment and class presence.`);
  else if(attend >= 75) sentences.push(`Attendance stands at <strong>${attend}%</strong>, which is acceptable but could be improved to reduce risk.`);
  else if(attend >= 60) sentences.push(`Attendance is <strong>low at ${attend}%</strong> — below the 75% threshold — and is a growing concern that may affect exam eligibility.`);
  else sentences.push(`Attendance is <strong>critically low at ${attend}%</strong>, placing ${name} at serious risk of <strong>detention</strong>.`);

  // Effort sentence
  if(effort >= 80) sentences.push(`Effort levels are <strong>high at ${effort.toFixed?effort.toFixed(1):effort}%</strong>, indicating strong personal initiative and engagement.`);
  else if(effort >= 60) sentences.push(`Effort is <strong>moderate at ${effort.toFixed?effort.toFixed(1):effort}%</strong>; with a bit more consistency, outcomes could improve significantly.`);
  else sentences.push(`Effort is <strong>poor at ${effort.toFixed?effort.toFixed(1):effort}%</strong>, suggesting disengagement — early intervention is recommended.`);

  // Overall risk/flags sentence
  if(risk <= 20 && flags === 0) sentences.push(`Overall, ${name} is in a <strong>safe position</strong> with no flags this semester and minimal risk of failure.`);
  else if(flags > 0) sentences.push(`${name} has been flagged <strong>${flags} time${flags>1?'s':''}</strong> this semester — continued monitoring and targeted intervention are advised.`);

  return sentences.join(' ');
}

function openStuDetail(idx){
  const s=ALL_STUDENTS[idx];const r=rc(s.riskLevel);
  document.getElementById('stuDetAv').textContent=s.avatar;
  document.getElementById('stuDetAv').style.cssText=`background:${r.bg};color:${r.txt};width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0`;
  document.getElementById('stuDetTitle').textContent=s.name;
  document.getElementById('stuDetSub').textContent=`${s.id} · ${s.roll}`;
  document.getElementById('stuDetRiskPill').innerHTML=`<span class="rpd" style="background:${r.txt}"></span>${r.label}`;
  document.getElementById('stuDetRiskPill').style.cssText=`background:${r.bg};color:${r.txt};border:1px solid ${r.border};display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:20px`;

  // Summary
  document.getElementById('stuDetSummaryText').innerHTML=generateStudentSummary(s);
  // Colour the summary panel border by risk
  document.getElementById('stuDetSummaryPanel').style.borderLeftColor=r.txt;

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

  const fh=s.flagHistory||[];
  const tf=fh.length,ti=fh.filter(f=>f.intervened).length;
  document.getElementById('stuDetFhSummary').innerHTML=`<div class="fh-sum-box"><div class="fh-sum-val" style="color:var(--red)">${tf}</div><div class="fh-sum-label">Total Flags</div></div><div class="fh-sum-box"><div class="fh-sum-val" style="color:var(--green)">${ti}</div><div class="fh-sum-label">Interventions</div></div>`;
  document.getElementById('stuDetFhBody').innerHTML=fh.length?fh.map(f=>`<tr><td>${f.date}</td><td>${f.diagnosis}</td><td><span class="fh-intervened" style="background:${f.intervened?'var(--green-bg)':'var(--red-bg)'};color:${f.intervened?'var(--green)':'var(--red)'}">${f.intervened?'✓ Yes':'✗ No'}</span></td></tr>`).join(''):'<tr><td colspan="3" style="text-align:center;color:var(--txt3)">No flags recorded</td></tr>';

  buildStuDetLineChart(s);
  buildStuDetQuadChart(s);

  document.getElementById('stuDetailOverlay').classList.add('open');document.body.style.overflow='hidden';
}
function closeStuDetailOverlay(){document.getElementById('stuDetailOverlay').classList.remove('open');document.body.style.overflow='';}
function handleStuDetailOvClick(e){if(e.target===document.getElementById('stuDetailOverlay'))closeStuDetailOverlay();}

// ── FLAGGED DETAIL MODAL ──
function openDetail(idx){
  const s=FLAGGED[idx];currentStudent=s;
  const r=rc(s.riskLevel||s.risk||'med');
  document.getElementById('dmAv').textContent=s.avatar;
  document.getElementById('dmAv').style.cssText=`background:${r.bg};color:${r.txt};width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0`;
  document.getElementById('dmTitle').textContent=s.name;
  document.getElementById('dmSub').textContent=`${s.id} · ${s.roll}`;
  document.getElementById('dmRiskPill').innerHTML=`<span class="rpd" style="background:${r.txt}"></span>${r.label}`;
  document.getElementById('dmRiskPill').style.cssText=`background:${r.bg};color:${r.txt};border:1px solid ${r.border};display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:20px`;
  // Summary
  document.getElementById('dmSummaryText').innerHTML=generateStudentSummary(s);
  document.getElementById('dmSummaryPanel').style.borderLeftColor=r.txt;
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

  buildDmLineChart(s);
  buildDmQuadChart(s);

  document.getElementById('dmFactors').innerHTML=s.flagHistory.length?
    (s.factors||[{label:"Low Attendance",pct:65,color:"#f85149"},{label:"Engagement Drop",pct:50,color:"#d29922"}]).map(f=>`<div class="dm-factor-bar-row"><div class="dm-factor-bar-top"><span class="dm-factor-bar-label">${f.label}</span><span class="dm-factor-bar-pct">${f.pct}%</span></div><div class="dm-factor-bar-track"><div class="dm-factor-bar-fill" style="width:0%;background:${f.color}" data-target="${f.pct}"></div></div></div>`).join(''):'<div style="color:var(--txt3);font-size:12px">No factors recorded</div>';
  document.getElementById('dmMajorNote').innerHTML=s.majorFactor?`⚡ Major contributor: <strong style="color:var(--amber)">${s.majorFactor}</strong>`:'';

  const rp=s.riskFail||0;const rc2=rp>70?'var(--red)':rp>45?'var(--amber)':'var(--green)';
  document.getElementById('dmRiskBar').style.cssText=`width:0%;background:${rc2};height:100%;border-radius:10px;transition:width 1.2s ease .4s`;
  document.getElementById('dmRiskVal').style.color=rc2;document.getElementById('dmRiskVal').textContent=rp.toFixed?rp.toFixed(1)+'%':rp+'%';
  const recov=s.recovery||Math.max(5,100-rp);
  const recColor=recov<30?'var(--red)':recov<55?'var(--amber)':'var(--green)';
  document.getElementById('dmRecBar').style.cssText=`width:0%;background:${recColor};height:100%;border-radius:10px;transition:width 1.2s ease .6s`;
  document.getElementById('dmRecVal').style.color=recColor;document.getElementById('dmRecVal').textContent=recov+'%';

  document.getElementById('overlay').classList.add('open');document.body.style.overflow='hidden';
  // ── Set descriptive title on Log Intervention button ──
  const logBtn = document.getElementById('logInterventionBtn');
  if(logBtn){
    const flags = s.flagHistory||[];
    const intervened = flags.filter(f=>f.intervened).length;
    const riskVal = (s.riskFail||s.riskScore||0);
    const riskStr = riskVal.toFixed?riskVal.toFixed(1):riskVal;
    const lastFlag = flags.length ? flags[flags.length-1].diagnosis : 'No flags';
    logBtn.title = [
      `Student: ${s.name} (${s.id} · ${s.roll})`,
      `Risk of Failing: ${riskStr}%  |  Attendance: ${s.overallAttend}%  |  Effort: ${s.avgEt.toFixed?s.avgEt.toFixed(1):s.avgEt}%`,
      `Flags: ${flags.length} total, ${intervened} intervened`,
      `Latest concern: ${lastFlag}`,
      `Midterm: ${s.midterm}`,
      `──────────────────────────────────`,
      `Click to record a new intervention for this student.`
    ].join('\n');
  }
  setTimeout(()=>{
    document.querySelectorAll('.dm-factor-bar-fill[data-target]').forEach(el=>{el.style.width=el.dataset.target+'%'});
    document.getElementById('dmRiskBar').style.width=rp+'%';
    document.getElementById('dmRecBar').style.width=recov+'%';
  },80);
}
function closeOverlay(){document.getElementById('overlay').classList.remove('open');document.body.style.overflow='';}
function handleOvClick(e){if(e.target===document.getElementById('overlay'))closeOverlay();}
// ── SUGGESTED INTERVENTIONS (static data) ──
const SUGGESTED_INTERVENTIONS = {
  high: [
    {icon:'🧑‍🏫', label:'1:1 Advisor Meeting', desc:"Schedule a personal meeting to discuss academic progress and challenges."},
    {icon:'📞', label:'Parent/Guardian Call', desc:"Inform parents about the student's current risk level and discuss support strategies."},
    {icon:'🏥', label:'Counselor Referral', desc:"Refer the student to the counseling department for emotional/psychological support."},
    {icon:'📋', label:'HOD Escalation', desc:"Escalate the case to the Head of Department for institutional-level intervention."},
    {icon:'📚', label:'Remedial Classes', desc:"Enroll the student in targeted remedial sessions for weak subjects."},
  ],
  med: [
    {icon:'📊', label:'Weekly Progress Check-in', desc:"Schedule a brief weekly touchpoint to monitor improvement and flag concerns early."},
    {icon:'👥', label:'Study Group Assignment', desc:"Assign the student to a peer study group with stronger performers."},
    {icon:'⚠️', label:'Attendance Warning Letter', desc:"Issue an official attendance warning letter to student and parents."},
    {icon:'📝', label:'Assignment Recovery Plan', desc:"Create a structured plan to help the student recover missed assignments."},
  ],
  safe: [
    {icon:'🌟', label:'Recognition & Encouragement', desc:"Acknowledge good performance to maintain motivation and engagement."},
    {icon:'📈', label:'Set Stretch Goals', desc:"Work with the student to set higher academic targets for continued growth."},
  ]
};

function logIntervention(){
  if(!currentStudent)return;
  const level=currentStudent.riskLevel||currentStudent.risk||'med';
  const suggestions=SUGGESTED_INTERVENTIONS[level]||SUGGESTED_INTERVENTIONS.med;
  const r=rc(level);
  const suggestionsHTML=suggestions.map((s,i)=>`
    <label class="int-suggestion-item" for="intSug_${i}">
      <input type="checkbox" id="intSug_${i}" class="int-sug-checkbox" value="${s.label}"/>
      <div class="int-sug-icon">${s.icon}</div>
      <div class="int-sug-content">
        <div class="int-sug-label">${s.label}</div>
        <div class="int-sug-desc">${s.desc}</div>
      </div>
    </label>`).join('');
  document.getElementById('intPopupStudentName').textContent=currentStudent.name;
  document.getElementById('intPopupRiskPill').innerHTML=`<span class="rpd" style="background:${r.txt}"></span>${r.label}`;
  document.getElementById('intPopupRiskPill').style.cssText=`background:${r.bg};color:${r.txt};border:1px solid ${r.border};display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;padding:4px 10px;border-radius:20px`;
  document.getElementById('intSuggestionsList').innerHTML=suggestionsHTML;
  document.getElementById('intWriteBox').value='';
  document.getElementById('intWriteBox').style.borderColor='';
  document.getElementById('interventionPopup').classList.add('open');
}

function closeInterventionPopup(){
  document.getElementById('interventionPopup').classList.remove('open');
}

function lockIntervention(){
  const checked=[...document.querySelectorAll('.int-sug-checkbox:checked')].map(c=>c.value);
  const note=document.getElementById('intWriteBox').value.trim();
  if(!checked.length&&!note){
    document.getElementById('intWriteBox').style.borderColor='var(--red)';
    document.getElementById('intWriteBox').placeholder='Please select a suggestion or write a note…';
    return;
  }
  closeInterventionPopup();
  const toast=document.createElement('div');
  toast.className='int-toast';
  toast.innerHTML=`✓ Intervention logged for <strong>${currentStudent.name}</strong>`;
  document.body.appendChild(toast);
  setTimeout(()=>toast.classList.add('show'),10);
  setTimeout(()=>{toast.classList.remove('show');setTimeout(()=>toast.remove(),400);},3000);
}

function mailStudent(){if(!currentStudent)return;alert(`📧 Email sent to ${currentStudent.name}`);}
function mailParents(){if(!currentStudent)return;alert(`📧 Email sent to parents of ${currentStudent.name}`);}

// ── ANALYTICS PAGE NAVIGATION ──
function setAnalyticsMain(section){
  document.querySelectorAll('.analytics-main-section').forEach(s=>s.classList.remove('active'));
  document.getElementById('anl-main-'+section).classList.add('active');
  document.querySelectorAll('.atop-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('atop-'+section).classList.add('active');
  // Double rAF: ensures browser completes layout+paint before Chart.js measures canvas
  if(section==='midterm') requestAnimationFrame(()=>requestAnimationFrame(buildMidtermCharts));
  if(section==='endterm') requestAnimationFrame(()=>requestAnimationFrame(buildEndtermCharts));
}
function setMidtermView(v){
  ['pre','post'].forEach(x=>{
    document.getElementById('anl-'+x).classList.toggle('active',x===v);
    document.getElementById('atgl-'+x).classList.toggle('active',x===v);
  });
  if(v==='pre') requestAnimationFrame(()=>requestAnimationFrame(buildPreMidtermCharts));
  if(v==='post') requestAnimationFrame(()=>requestAnimationFrame(buildPostMidtermCharts));
}
function setEndtermView(v){
  ['pre','post'].forEach(x=>{
    document.getElementById('anl-'+x+'-end').classList.toggle('active',x===v);
    document.getElementById('atgl-'+x+'-end').classList.toggle('active',x===v);
  });
  if(v==='pre') requestAnimationFrame(()=>requestAnimationFrame(buildPreEndtermCharts));
  if(v==='post') setTimeout(buildPostEndtermCharts, 30);
}

// ── SCHEDULE TASKS ──
let scheduleTasks = [
  {id:1, name:"Prepare midterm review material", day:2, time:10, duration:1, category:"Academic"},
  {id:2, name:"Meet with HOD about Rahul", day:2, time:14, duration:1, category:"Meeting"},
  {id:3, name:"Review Aryan's progress report", day:1, time:11, duration:1, category:"Urgent"},
  {id:4, name:"Send parent emails for flagged students", day:3, time:9, duration:1, category:"Email"},
];
let nextSchedId = 5;

const SCHED_COLORS = {
  Academic: {bg:'rgba(59,130,246,0.12)',border:'rgba(59,130,246,0.3)',text:'#3b82f6',tagBg:'rgba(59,130,246,0.12)',tagTxt:'#3b82f6'},
  Meeting:  {bg:'rgba(245,158,11,0.12)',border:'rgba(245,158,11,0.3)',text:'#f59e0b',tagBg:'rgba(245,158,11,0.12)',tagTxt:'#d97706'},
  Urgent:   {bg:'rgba(239,68,68,0.12)',border:'rgba(239,68,68,0.3)',text:'#ef4444',tagBg:'rgba(239,68,68,0.12)',tagTxt:'#ef4444'},
  Email:    {bg:'rgba(16,185,129,0.12)',border:'rgba(16,185,129,0.3)',text:'#10b981',tagBg:'rgba(16,185,129,0.12)',tagTxt:'#059669'},
};
const SCHED_DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat'];
const SCHED_DATES = [7,8,9,10,11,12];

function addScheduleTask(){
  const name = document.getElementById('schedTaskName').value.trim();
  if(!name) return;
  const day = parseInt(document.getElementById('schedDay').value);
  const time = parseInt(document.getElementById('schedTime').value);
  const duration = parseInt(document.getElementById('schedDuration').value);
  const category = document.getElementById('schedCategory').value;
  scheduleTasks.push({id:nextSchedId++, name, day, time, duration, category});
  document.getElementById('schedTaskName').value = '';
  renderSchedule();
}

function removeScheduleTask(id){
  scheduleTasks = scheduleTasks.filter(t=>t.id!==id);
  renderSchedule();
}

function renderScheduleTaskList(){
  const container = document.getElementById('schedTaskItems');
  if(!container) return;
  if(scheduleTasks.length===0){
    container.innerHTML='<div style="font-size:12px;color:var(--txt3);text-align:center;padding:16px 0">No tasks yet — add one above!</div>';
    return;
  }
  container.innerHTML = scheduleTasks.map(t=>{
    const c = SCHED_COLORS[t.category]||SCHED_COLORS.Academic;
    const dayLabel = SCHED_DAYS[t.day]||'Mon';
    const truncName = t.name.length>26 ? t.name.substring(0,26)+'...' : t.name;
    return `<div class="sched-task-item" style="border-left:3px solid ${c.text}">
      <div class="sched-task-info">
        <div class="sched-task-name">${truncName}</div>
        <div class="sched-task-time">${dayLabel} · ${t.time}:00</div>
      </div>
      <span class="todo-tag" style="background:${c.tagBg};color:${c.tagTxt};font-size:10px;font-weight:700;padding:2px 8px;border-radius:6px;white-space:nowrap">${t.category}</span>
      <button class="sched-del-btn" onclick="removeScheduleTask(${t.id})">×</button>
    </div>`;
  }).join('');
}

function renderScheduleGrid(){
  const grid = document.getElementById('calGrid');
  if(!grid) return;
  const hours = [];
  for(let h=8;h<=17;h++) hours.push(h);

  let html = '<div class="cal-day-head" style="background:var(--bg3);border-bottom:1px solid var(--border)"></div>';
  for(let d=0;d<6;d++){
    const isToday = d===1;
    html += `<div class="cal-day-head"><div class="cal-day-name">${SCHED_DAYS[d]}</div><div class="cal-day-num${isToday?' today':''}">${SCHED_DATES[d]}</div></div>`;
  }

  for(let h of hours){
    html += `<div class="cal-time-cell">${h}:00</div>`;
    for(let d=0;d<6;d++){
      const task = scheduleTasks.find(t=>t.day===d && t.time===h);
      if(task){
        const c = SCHED_COLORS[task.category]||SCHED_COLORS.Academic;
        const heightPx = task.duration * 50;
        const truncName = task.name.length>20 ? task.name.substring(0,20)+'...' : task.name;
        const endTime = task.time + task.duration;
        html += `<div class="cal-cell" style="position:relative"><div class="sched-block" style="background:${c.bg};border-left:3px solid ${c.text};height:${heightPx}px;position:absolute;top:2px;left:2px;right:2px;padding:6px 8px;border-radius:6px;font-size:11px;font-weight:600;color:${c.text};overflow:hidden;z-index:2;cursor:pointer">${truncName}<div style="font-size:10px;font-weight:400;margin-top:2px;opacity:0.75">${task.time}:00–${endTime}:00</div></div></div>`;
      } else {
        html += `<div class="cal-cell"></div>`;
      }
    }
  }
  grid.innerHTML = html;
}

function renderSchedule(){
  renderScheduleTaskList();
  renderScheduleGrid();
}

// ── CALENDAR INIT ──
function initCalendar(){
  renderSchedule();
}

function calToday(){
  const grid = document.getElementById('calGrid');
  if(grid) grid.scrollTop = 56;
}
// ── VISUAL ENHANCEMENT: Intersection Observer fade-in for sections ──
(function(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  function observeSections(){
    document.querySelectorAll('section, .anl-watchlist-card, .anl-percentile-card, .anl-hero-chart-card, .anl-big-stat-card, .summary-left, .summary-right').forEach(el => {
      el.style.transition = 'opacity 0.55s cubic-bezier(0.34,1.1,0.64,1), transform 0.55s cubic-bezier(0.34,1.1,0.64,1)';
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      observer.observe(el);
    });
  }
  // Run after DOM is ready and when pages are switched
  setTimeout(observeSections, 100);
  const origShowPage = window.showPage;
  window.showPage = function(p){
    origShowPage(p);
    setTimeout(observeSections, 80);
  };
})();

// ── VISUAL ENHANCEMENT: Animated stat-card number counter ──
(function(){
  function countUp(el, target, duration){
    const isFloat = target % 1 !== 0;
    let start = 0, startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * target;
      el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Only animate top-level stat cards on the dashboard
  const statValues = [
    { selector: '.stat-card-blue .stat-value',  target: 40,   duration: 900 },
    { selector: '.stat-card-risk .stat-value',   target: 31,   duration: 1100 },
    { selector: '.stat-card-red .stat-value',    target: 6,    duration: 700 },
    { selector: '.stat-card-green .stat-value',  target: 11,   duration: 800 },
  ];
  setTimeout(() => {
    statValues.forEach(({ selector, target, duration }) => {
      const el = document.querySelector(selector);
      if(el){
        // preserve any suffix text node after the number
        const fullText = el.textContent;
        const numMatch = fullText.match(/^(\d+)/);
        if(numMatch) countUp(el, target, duration);
      }
    });
  }, 300);
})();
