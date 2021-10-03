const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline")
const fullscreenBtn = document.getElementById("fullScreen")
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
    playBtn.innerText = video.paused ? "Play" : "Pause"
}

const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;

    } else {
        video.muted = true;

    }
    muteBtn.innerText = video.muted ? "Unmute" : "Mute";
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

    } else {
        videoContainer.requestFullscreen();

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

    console.log(event.key)

}

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
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
fullscreenBtn.addEventListener("click", handleFullScreen);
document.addEventListener("keydown", handleKeyDown);
video.addEventListener("loadeddata", handleLoadedMetadata);