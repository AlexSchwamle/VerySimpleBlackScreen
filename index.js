let timeout = null; 
let inFullscreen = false;

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

addEventListener("click", toggleFullscreen);

addEventListener("mousemove", hideCursor);
addEventListener("keypress", hideCursor);
