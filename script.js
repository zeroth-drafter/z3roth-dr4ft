document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("globalAudio");

  const tracks = Array.from(document.querySelectorAll(".track"));
  let currentIndex = -1;
  let isLooping = false;

  /* PLAYER BAR ELEMENTS */
  const playerBar = document.getElementById("playerBar");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const loopBtn = document.getElementById("loopBtn");
  const progressBar = document.getElementById("progressBar");
  const trackTitle = document.getElementById("playerTrackTitle");
  const trackNumber = document.getElementById("playerTrackNumber");

  /* LOAD TRACK */
  function loadTrack(index) {
    const track = tracks[index];
    if (!track) return;

    const album = track.querySelector(".album-art");
    const img = album.querySelector("img");
    document.getElementById("playerArt").src = img.src;

    audio.src = album.dataset.audio;
    audio.load();

    trackTitle.textContent =
      track.querySelector(".track-title").textContent;
    trackNumber.textContent =
      track.querySelector(".track-number").textContent;

    currentIndex = index;
    playerBar.classList.remove("hidden");
  }

  /* PLAY / PAUSE */
  function togglePlay() {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "❚❚";
    } else {
      audio.pause();
      playPauseBtn.textContent = "▶";
    }
  }

  /* NEXT / PREV */
  function nextTrack() {
    let next = currentIndex + 1;
    if (next >= tracks.length) next = 0;
    loadTrack(next);
    audio.play();
  }

  function prevTrack() {
    let prev = currentIndex - 1;
    if (prev < 0) prev = tracks.length - 1;
    loadTrack(prev);
    audio.play();
  }

  /* LOOP */
  loopBtn.addEventListener("click", () => {
    isLooping = !isLooping;
    audio.loop = isLooping;
    loopBtn.style.opacity = isLooping ? "1" : "0.5";
  });

  /* PROGRESS UPDATE */
  audio.addEventListener("timeupdate", () => {
    progressBar.value =
      (audio.currentTime / audio.duration) * 100 || 0;
  });

  progressBar.addEventListener("input", () => {
    audio.currentTime =
      (progressBar.value / 100) * audio.duration;
  });

  /* AUTO NEXT */
  audio.addEventListener("ended", () => {
    if (!isLooping) nextTrack();
  });

  /* PLAYER BUTTONS */
  playPauseBtn.addEventListener("click", togglePlay);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);

  /* CONNECT ALBUM ART PLAY BUTTONS */
  tracks.forEach((track, index) => {
    const playBtn = track.querySelector(".play-btn");
    playBtn.addEventListener("click", () => {
      if (currentIndex !== index) loadTrack(index);
      togglePlay();
    });
  });
});
