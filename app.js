document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const seekBar = document.getElementById('seek-bar');
    const currentTimeLabel = document.getElementById('current-time');
    const durationLabel = document.getElementById('duration');
    const upload = document.getElementById('upload');
    const playlist = document.getElementById('playlist');

    let currentSong = null;
    let songList = [];

    // Play button functionality
    playBtn.addEventListener('click', () => {
        if (currentSong) {
            audioPlayer.play();
            playBtn.disabled = true;
            pauseBtn.disabled = false;
        }
    });

    // Pause button functionality
    pauseBtn.addEventListener('click', () => {
        audioPlayer.pause();
        playBtn.disabled = false;
        pauseBtn.disabled = true;
    });

    // Seek bar functionality
    audioPlayer.addEventListener('timeupdate', () => {
        let value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        seekBar.value = value;

        let currentMinutes = Math.floor(audioPlayer.currentTime / 60);
        let currentSeconds = Math.floor(audioPlayer.currentTime % 60);
        currentTimeLabel.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}`;

        let totalMinutes = Math.floor(audioPlayer.duration / 60);
        let totalSeconds = Math.floor(audioPlayer.duration % 60);
        durationLabel.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' + totalSeconds : totalSeconds}`;
    });

    seekBar.addEventListener('input', () => {
        audioPlayer.currentTime = (seekBar.value / 100) * audioPlayer.duration;
    });

    // File upload functionality
    upload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            currentSong = file;
            audioPlayer.src = fileUrl;

            let li = document.createElement('li');
            li.textContent = file.name;
            li.addEventListener('click', () => {
                audioPlayer.src = fileUrl;
                audioPlayer.play();
                playBtn.disabled = true;
                pauseBtn.disabled = false;
            });
            playlist.appendChild(li);
        }
    });
});
