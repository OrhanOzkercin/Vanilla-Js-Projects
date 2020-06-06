const video = document.getElementById('video');
const playVideo = document.getElementById('play');
const stopVideo = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

function toogleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  if (video.paused) {
    playVideo.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    playVideo.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }
  timestamp.innerText = `${mins}:${secs}`;
}

function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}
function stopVideoFunc() {
  video.currentTime = 0;
  video.pause();
}

video.addEventListener('click', toogleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

playVideo.addEventListener('click', toogleVideoStatus);

stopVideo.addEventListener('click', stopVideoFunc);

progress.addEventListener('change', setVideoProgress);
