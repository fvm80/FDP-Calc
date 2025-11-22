// ================= DATA TABLES =================
const BASIC_TABLE = [
    {start: "06:00-13:29", "1": "13:00", "2": "13:00", "3": "12:30", "4": "12:00", "5": "11:30", "6": "11:00"},
    {start: "13:30-13:59", "1": "12:45", "2": "12:45", "3": "12:15", "4": "11:45", "5": "11:15", "6": "10:45"},
    {start: "14:00-14:29", "1": "12:30", "2": "12:30", "3": "12:00", "4": "11:30", "5": "11:00", "6": "10:30"},
    {start: "14:30-14:59", "1": "12:15", "2": "12:15", "3": "11:45", "4": "11:15", "5": "10:45", "6": "10:15"},
    {start: "15:00-15:29", "1": "12:00", "2": "12:00", "3": "11:30", "4": "11:00", "5": "10:30", "6": "10:00"},
    {start: "15:30-15:59", "1": "11:45", "2": "11:45", "3": "11:15", "4": "10:45", "5": "10:15", "6": "09:45"},
    {start: "16:00-16:29", "1": "11:30", "2": "11:30", "3": "11:00", "4": "10:30", "5": "10:00", "6": "09:30"},
    {start: "16:30-16:59", "1": "11:15", "2": "11:15", "3": "10:45", "4": "10:15", "5": "09:45", "6": "09:15"},
    {start: "17:00-04:59", "1": "11:00", "2": "11:00", "3": "10:30", "4": "10:00", "5": "09:30", "6": "09:00"},
    {start: "05:00-05:14", "1": "12:00", "2": "12:00", "3": "11:30", "4": "11:00", "5": "10:30", "6": "10:00"},
    {start: "05:15-05:29", "1": "12:15", "2": "12:15", "3": "11:45", "4": "11:15", "5": "10:45", "6": "10:15"},
    {start: "05:30-05:44", "1": "12:30", "2": "12:30", "3": "12:00", "4": "11:30", "5": "11:00", "6": "10:30"},
    {start: "05:45-05:59", "1": "12:45", "2": "12:45", "3": "12:15", "4": "11:45", "5": "11:15", "6": "10:45"}
];

const FDP_PLUS_TABLE = [
    {start: "06:00-06:14", val: "Not allowed"},
    {start: "06:15-06:29", "1": "13:15", "2": "13:15", "3": "12:45", "4": "12:15", "5": "11:45", "6": "Not allowed"},
    {start: "06:30-06:44", "1": "13:30", "2": "13:30", "3": "13:00", "4": "12:30", "5": "12:00", "6": "Not allowed"},
    {start: "06:45-06:59", "1": "13:45", "2": "13:45", "3": "13:15", "4": "12:45", "5": "12:15", "6": "Not allowed"},
    {start: "07:00-13:29", "1": "14:00", "2": "14:00", "3": "13:30", "4": "13:00", "5": "12:30", "6": "Not allowed"},
    {start: "13:30-13:59", "1": "13:45", "2": "13:45", "3": "13:15", "4": "12:45", "5": "Not allowed", "6": "Not allowed"},
    {start: "14:00-14:29", "1": "13:30", "2": "13:30", "3": "13:00", "4": "12:30", "5": "Not allowed", "6": "Not allowed"},
    {start: "14:30-14:59", "1": "13:15", "2": "13:15", "3": "12:45", "4": "12:15", "5": "Not allowed", "6": "Not allowed"},
    {start: "15:00-15:29", "1": "13:00", "2": "13:00", "3": "12:30", "4": "12:00", "5": "Not allowed", "6": "Not allowed"},
    {start: "15:30-15:59", "1": "12:45", "2": "12:45", "3": "Not allowed", "4": "Not allowed", "5": "Not allowed", "6": "Not allowed"},
    {start: "16:00-16:29", "1": "12:30", "2": "12:30", "3": "Not allowed", "4": "Not allowed", "5": "Not allowed", "6": "Not allowed"},
    {start: "16:30-16:59", "1": "12:15", "2": "12:15", "3": "Not allowed", "4": "Not allowed", "5": "Not allowed", "6": "Not allowed"},
    {start: "17:00-17:29", "1": "12:00", "2": "12:00", "3": "Not allowed", "4": "Not allowed", "5": "Not allowed", "6": "Not allowed"},
    {start: "17:30-17:59", "1": "11:45", "2": "11:45", "3": "Not allowed", "4": "Not allowed", "5": "Not allowed", "6": "Not allowed"},
    {start: "18:00-18:29", "1": "11:30", "2": "11:30", "3": "Not allowed", "4": "Not allowed", "5": "Not allowed", "6": "Not allowed"},
    {start: "18:30-18:59", "1": "11:15", "2": "11:15", "3": "Not allowed", "4": "Not allowed", "5": "Not allowed", "6": "Not allowed"},
    {start: "19:00-05:59", val: "Not allowed"}
];

// ================= UTILS =================

// Convert "HH:MM" to minutes from 00:00
function toMin(tStr) {
    if (!tStr) return null;
    const [h, m] = tStr.split(':').map(Number);
    return h * 60 + m;
}

// Convert minutes to "HH:MM"
function toStr(mins) {
    if (mins === null || isNaN(mins)) return "---";
    // Handle negative or > 24h
    mins = Math.floor(mins);
    while (mins < 0) mins += 1440;
    mins = mins % 1440; 
    const h = Math.floor(mins / 60).toString().padStart(2, '0');
    const m = (mins % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
}

// Check if time is in range "06:00-13:29"
function isInRange(checkMin, rangeStr) {
    const [sStr, eStr] = rangeStr.split('-');
    const sMin = toMin(sStr);
    const eMin = toMin(eStr);

    if (eMin < sMin) { // Crosses midnight
        return checkMin >= sMin || checkMin <= eMin;
    } else {
        return checkMin >= sMin && checkMin <= eMin;
    }
}

function getTableValue(table, timeStr, sectors) {
    const tMin = toMin(timeStr);
    const secKey = String(sectors);
    
    for (let row of table) {
        if (isInRange(tMin, row.start)) {
            if (row.val === "Not allowed") return "Not allowed";
            return row[secKey] || "Not allowed";
        }
    }
    return "Not allowed";
}

function calculateSplit(basicFDP, startDuty, splitStart, splitEnd) {
    if (!basicFDP || basicFDP === "Not allowed" || !splitStart || !splitEnd) return "---";
    
    let sDuty = toMin(startDuty);
    let bFDP = toMin(basicFDP);
    let sStart = toMin(splitStart);
    let sEnd = toMin(splitEnd);

    // Handle overnight crossings logic for validation
    // Adjusting for calculations assuming they follow each other
    if (sStart < sDuty) sStart += 1440;
    if (sEnd < sStart) sEnd += 1440;

    // Check 1: Split Start must be within Basic FDP
    if (sStart > sDuty + bFDP) return "Not allowed";

    // Check 2: Duration (End - Start - 1h) between 3h and 6h
    let duration = sEnd - sStart - 60; 
    if (duration < 180 || duration > 360) return "Not allowed";

    let result = bFDP + (duration / 2);
    return toStr(result);
}

function calcEndTime(startStr, durationStr) {
    if (!startStr || durationStr === "---" || durationStr === "Not allowed" || durationStr === "Not Allowed") return "---";
    return toStr(toMin(startStr) + toMin(durationStr));
}

// ================= APP LOGIC =================

let simpleSectors = 2;
let scheduleLegs = [];

// UI Switcher
function switchTab(tab) {
    // 1. Скрываем все страницы
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // 2. Убираем подсветку у всех кнопок
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    
    // 3. Показываем нужную страницу
    const page = document.getElementById(`page-${tab}`);
    if (page) page.classList.add('active');

    // 4. Подсвечиваем нужную кнопку
    // Карта соответствия: название вкладки -> номер кнопки (0, 1, 2)
    const tabMap = { 
        'simple': 0, 
        'schedule': 1, 
        'about': 2 
    };
    
    const index = tabMap[tab];
    const buttons = document.querySelectorAll('.nav-item');
    if (buttons[index]) {
        buttons[index].classList.add('active');
    }
}

// --- SIMPLE PAGE ---
function changeSectors(delta) {
    simpleSectors += delta;
    if (simpleSectors < 1) simpleSectors = 1;
    if (simpleSectors > 6) simpleSectors = 6;
    document.getElementById('sector-display').innerText = simpleSectors;
}

function calculateSimple() {
    const start = document.getElementById('simple-start').value;
    const splitStart = document.getElementById('simple-split-start').value;
    const splitEnd = document.getElementById('simple-split-end').value;

    if (!start) return alert("Please enter Start Duty");

    const basic = getTableValue(BASIC_TABLE, start, simpleSectors);
    const ext = getTableValue(FDP_PLUS_TABLE, start, simpleSectors);
    const split = calculateSplit(basic, start, splitStart, splitEnd);
    
    let crew3 = (simpleSectors <= 3) ? "16:00" : "Not allowed";
    let crew4 = (simpleSectors <= 3) ? "17:00" : "Not allowed";

    const rows = [
        {type: "Basic", fdp: basic},
        {type: "With ext.", fdp: ext},
        {type: "Split", fdp: split},
        {type: "Crew+(3)", fdp: crew3},
        {type: "Crew+(4)", fdp: crew4},
    ];

    const tbody = document.getElementById('simple-table-body');
    tbody.innerHTML = "";

    rows.forEach(r => {
        const onBlock = calcEndTime(start, r.fdp);
        tbody.innerHTML += `
            <tr>
                <td>${r.type}</td>
                <td>${r.fdp}</td>
                <td>${onBlock}</td>
            </tr>
        `;
    });

    document.getElementById('simple-results').classList.remove('hidden');
}

// --- SCHEDULE PAGE ---
function addLeg() {
    const legId = scheduleLegs.length;
    scheduleLegs.push({std: "", sta: ""});
    renderLegs();
}

function removeLeg(index) {
    scheduleLegs.splice(index, 1);
    renderLegs();
}

function updateLeg(index, field, value) {
    scheduleLegs[index][field] = value;
    updateScheduleText();
}

function renderLegs() {
    const container = document.getElementById('legs-container');
    container.innerHTML = "";
    scheduleLegs.forEach((leg, idx) => {
        container.innerHTML += `
            <div class="leg-row">
                <strong>Leg ${idx + 1}</strong>
                <div class="leg-inputs">
                    <span>STD</span>
                    <input type="time" value="${leg.std}" onchange="updateLeg(${idx}, 'std', this.value)">
                    <span>STA</span>
                    <input type="time" value="${leg.sta}" onchange="updateLeg(${idx}, 'sta', this.value)">
                </div>
                <button class="btn-remove" onclick="removeLeg(${idx})">✕</button>
            </div>
        `;
    });
    updateScheduleText();
}

function updateScheduleText() {
    const offsetStr = document.getElementById('home-offset').value;
    const offsetMin = toMin(offsetStr); // UTC+
    const output = document.getElementById('schedule-lt-output');

    if (scheduleLegs.length === 0) {
        output.innerText = "Schedule (LT): ---";
        return;
    }

    let parts = [];
    let prevStaMin = null;

    scheduleLegs.forEach((leg, i) => {
        if(!leg.std || !leg.sta) return;
        
        let std = toMin(leg.std) + offsetMin;
        let sta = toMin(leg.sta) + offsetMin;

        // Normalize overnight for display isn't strictly needed for "HH:MM" string but logic helps
        if (sta < std) sta += 1440; // simple flight time assumption

        // Break logic
        if (prevStaMin !== null) {
            // handle crossing midnight between legs
            let diff = std - prevStaMin;
            while (diff < 0) diff += 1440;
            
            if (diff >= 240 && diff <= 420) { // 4h to 7h
                 // Format duration H:MM
                 const h = Math.floor(diff/60);
                 const m = diff%60;
                 parts.push(`Break ${h}:${m.toString().padStart(2,'0')}`);
            }
        }
        
        parts.push(`${toStr(std)} - ${toStr(sta)}`);
        prevStaMin = sta;
    });

    output.innerText = "Schedule (LT): " + parts.join(" / ");
}

function calculateSchedule() {
    if (scheduleLegs.length === 0) return alert("Add legs first");
    const offset = toMin(document.getElementById('home-offset').value);

    // 1. Determine Times in UTC (Minutes)
    let periods = [];
    scheduleLegs.forEach(l => {
        if(!l.std || !l.sta) return;
        let std = toMin(l.std);
        let sta = toMin(l.sta);
        if (sta < std) sta += 1440;
        
        // Check if this leg crosses midnight relative to previous
        if (periods.length > 0) {
             let prevEnd = periods[periods.length-1].sta;
             if (std < prevEnd) {
                 std += 1440;
                 sta += 1440;
             }
        }
        periods.push({std, sta});
    });

    if(periods.length === 0) return;

    const start1 = periods[0].std - 60; // UTC
    const stop2 = periods[periods.length - 1].sta; // UTC
    
    let hasBreak = false;
    let stop1 = null, start2 = null, breakDur = 0;

    if (periods.length >= 2) {
        let prevSta = periods[periods.length-2].sta;
        let nextStd = periods[periods.length-1].std;
        let diff = nextStd - prevSta;
        if (diff >= 240) { // > 4 hours
            hasBreak = true;
            stop1 = prevSta;
            start2 = nextStd;
            breakDur = diff;
        }
    }

    let fdpDur = stop2 - start1;

    // Fill Records Table
    const recBody = document.getElementById('records-table-body');
    recBody.innerHTML = "";

    const rows = [
        {name: "UTC", s1: start1, e1: stop1, brk: hasBreak ? breakDur : null, s2: start2, e2: stop2, fdp: fdpDur},
        {name: "LT", s1: start1+offset, e1: stop1?stop1+offset:null, brk: hasBreak ? breakDur : null, s2: start2?start2+offset:null, e2: stop2+offset, fdp: fdpDur}
    ];

    rows.forEach(r => {
        recBody.innerHTML += `
            <tr>
                <td>${r.name}</td>
                <td>${toStr(r.s1)}</td>
                <td>${r.e1 ? toStr(r.e1) : "---"}</td>
                <td>${r.brk ? toStr(r.brk) : "---"}</td>
                <td>${r.s2 ? toStr(r.s2) : "---"}</td>
                <td>${toStr(r.e2)}</td>
                <td>${toStr(r.fdp)}</td>
            </tr>
        `;
    });

    // Fill MAX Limits Table
    const ltStartStr = toStr(start1 + offset);
    const sectors = periods.length;

    const basic = getTableValue(BASIC_TABLE, ltStartStr, sectors);
    const ext = getTableValue(FDP_PLUS_TABLE, ltStartStr, sectors);
    
    let split = "---";
    if (hasBreak) {
        // Split calc logic
        let splitStartLT = toStr(stop1 + offset);
        let splitEndLT = toStr(start2 + offset);
        split = calculateSplit(basic, ltStartStr, splitStartLT, splitEndLT);
    }

    let crew3 = (sectors <= 3) ? "16:00" : "Not allowed";
    let crew4 = (sectors <= 3) ? "17:00" : "Not allowed";

    const maxRows = [
        {type: "Basic", fdp: basic},
        {type: "With ext.", fdp: ext},
        {type: "Split", fdp: split},
        {type: "Crew+(3)", fdp: crew3},
        {type: "Crew+(4)", fdp: crew4},
    ];

    const maxBody = document.getElementById('schedule-max-body');
    maxBody.innerHTML = "";
    
    // Important: On Block calculation for schedule is usually based on Actual Start (UTC) + Max FDP
    // The python code calculated Max On Block based on Start Duty + Max FDP.
    // Here Start Duty UTC = start1. 
    
    maxRows.forEach(r => {
        const onBlock = calcEndTime(toStr(start1), r.fdp); // UTC
        maxBody.innerHTML += `
            <tr>
                <td>${r.type}</td>
                <td>${r.fdp}</td>
                <td>${onBlock}</td>
            </tr>
        `;
    });

    document.getElementById('schedule-results').classList.remove('hidden');
}

// Init

addLeg();
