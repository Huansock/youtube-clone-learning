const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline")
const fullScreenBtn = document.getElementById("fullScreen")
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer")
const videoControls = document.getElementById("videoControls");


const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5);
let countDown = null;
let volumValue = 0.5;
video.volume = volumValue;


const handlePlayClick = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}

const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;

    } else {
        video.muted = true;

    }
    muteBtnIcon.classList = video.muted ?
        "fas fa-volume-mute" :
        "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumValue;

};


const handleVolumeChange = (event) => {
    const {
        target: {
            value
        },
    } = event;
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";

    }
    volumValue = value;
    video.volume = value;
}


const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
};
const handleTimelineChange = (event) => {
    const {
        target: {
            value
        },
    } = event;
    video.currentTime = value;
}




const handleFullScreen = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
        document.exitFullscreen();
        fullScreenIcon.classList = "fas fa-expand";

    } else {
        videoContainer.requestFullscreen();
        fullScreenIcon.classList = "fas fa-compress";

    }
}
const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if (countDown) {
        clearTimeout(countDown);
        countDown = null;
    }
    videoControls.classList.add("showing");
    countDown = setTimeout(hideControls, 3000);
}

const handleMouseLeave = () => {
    hideControls();
}


const handleKeyDown = (event) => {
    if (event.key === " ") {
        handlePlayClick();

    }
    if (event.key == "m") {
        handleMute();
    }
    if (event.keyCode === 37) {
        //Left
        video.currentTime -= 10;
    } else if (event.keyCode === 39) {
        //Right
        video.currentTime += 10;
    }
}

// const handleLoadedMetadata = () => {
//     totalTime.innerText = formatTime(Math.floor(video.duration));
//     timeline.max = Math.floor(video.duration);

// };
const handleLoadedMetadata2 = (event) => {
    totalTime.innerText = formatTime(Math.floor(event.srcElement.duration));
    timeline.max = Math.floor(event.srcElement.duration);
};

if (video.readyState === 4) {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("timeupdate", handleTimeUpdate);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
document.addEventListener("keydown", handleKeyDown);
// video.addEventListener("loadeddata", handleLoadedMetadata);
video.addEventListener("loadedmetadata", handleLoadedMetadata2)
video.addEventListener("click", handlePlayClick)