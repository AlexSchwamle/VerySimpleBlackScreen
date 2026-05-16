let timeout = null; 
let inFullscreen = false;
let clockVisible = false;
let clockElement = null;
let clockInterval = null;

function toggleFullscreen(e) {
    if (!inFullscreen) {
        document.documentElement.requestFullscreen(); 
        inFullscreen = true;
    } else {
        document.exitFullscreen();
        inFullscreen = false;
    }
}

function hideCursor(e) {
    document.documentElement.style.cursor = null; 
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        document.documentElement.style.cursor = "none";
    }, 2000);
}

function getTimeParts() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    if (hours === 0) hours = 12;
    return { time: `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`, ampm };
}

function createClock() {
    clockElement = document.createElement("div");
    clockElement.style.position = "fixed";
    clockElement.style.top = "50%";
    clockElement.style.left = "50%";
    clockElement.style.transform = "translate(-50%, -50%)";
    clockElement.style.color = "#2a2a2a";
    clockElement.style.fontFamily = "monospace";
    clockElement.style.userSelect = "none";
    clockElement.style.pointerEvents = "none";
    clockElement.style.whiteSpace = "nowrap";

    const timeSpan = document.createElement("span");
    timeSpan.style.fontSize = "8rem";
    timeSpan.style.lineHeight = "1";
    timeSpan.style.display = "inline-block";
    timeSpan.style.position = "relative";

    const ampmSpan = document.createElement("span");
    ampmSpan.style.fontSize = "2rem";
    ampmSpan.style.lineHeight = "1";
    ampmSpan.style.position = "absolute";
    ampmSpan.style.left = "calc(100% + 0.4rem)";
    ampmSpan.style.bottom = "0";

    timeSpan.appendChild(ampmSpan);
    clockElement.appendChild(timeSpan);

    const update = () => {
        const { time, ampm } = getTimeParts();
        // set time text without clobbering the nested ampm span
        timeSpan.childNodes[0]?.nodeType === 3
            ? (timeSpan.childNodes[0].nodeValue = time)
            : timeSpan.insertBefore(document.createTextNode(time), ampmSpan);
        ampmSpan.textContent = ampm;
    };
    update();
    document.body.appendChild(clockElement);
    clockInterval = setInterval(update, 1000);
}

function destroyClock() {
    clearInterval(clockInterval);
    clockInterval = null;
    if (clockElement) {
        clockElement.remove();
        clockElement = null;
    }
}

function toggleClock(e) {
    e.preventDefault();
    if (!clockVisible) {
        createClock();
        clockVisible = true;
    } else {
        destroyClock();
        clockVisible = false;
    }
}

addEventListener("click", toggleFullscreen);
addEventListener("contextmenu", toggleClock);
addEventListener("mousemove", hideCursor);
addEventListener("keypress", hideCursor);