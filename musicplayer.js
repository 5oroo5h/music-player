let $ = document

const music = $.querySelector('audio')
const title = $.querySelector('.title')
const artist = $.querySelector('.artist')
const musicCover = $.getElementById('image')
const playBtn = $.querySelector('.play')
const pauseBtn = $.querySelector('.pause')
const currentTimeElem = $.querySelector('.current-time')
const totalTimeElem = $.querySelector('.total-time')
const durationBtn = $.querySelector('.duration')
const progressContainer = $.querySelector('.progress-container')
const progress = $.querySelector('.progress')
const currentTimeText = $.querySelector('.currentTime-p')
const backwardBtn = $.querySelector('.backward')
const forwardBtn = $.querySelector('.forward')
const jumpForwardBtn = $.querySelector('.plus-forward')
const jumpBackwardBtn = $.querySelector('.minus-backward')
const playAndPauseBtn = $.querySelector('.play-and-pause')
const speedElem = $.querySelector('.speed-div')
const speedRateBtn = $.querySelector('.speed-rate')
const shuffleBtn = $.querySelector('.fa-shuffle')
const repeatBtn = $.querySelector('.fa-repeat')
const background = $.querySelector('.background-image')
//play flag
let isPlaying = false;
let isShuffle = false;
///////
let musics = [{
        path: 'media/06. Slash - The Godfather Theme (Live In Tokyo 1992).mp3',
        cover: 'bg-images/Slash.jpg',
        songName: 'The Godfather',
        artist: 'Slash',
    },
    {
        path: 'media/201. Pink Floyd - The Wall - Disc 2 - Hey You.mp3',
        cover: 'bg-images/pink-floyd.jpg',
        songName: 'The Wall',
        artist: 'Pink Floyd',
    },
    {
        path: 'media/Tool-Forty-Six-2.mp3',
        cover: 'bg-images/Tool.jpg',
        songName: 'Forty Six 2',
        artist: 'Tool',
    },
]
let audioIndex = 0
//functions of play and pause
//function play
function playAudio() {
    isPlaying = true;
    playBtn.className = 'pause'
    playBtn.innerHTML = '<i  class="fa-solid fa-pause play-and-pause"></i>'
    music.play()
}
//function pause
function pauseAudio() {
    isPlaying = false;
    playBtn.className = 'play'
    playBtn.innerHTML = '<i  class="fa-solid fa-play play-and-pause"></i>'
    music.pause()
}
//function of generating index for next music 
function forwardAudioIndexGenerator() {
    audioIndex++
    if (audioIndex > musics.length - 1) {
        audioIndex = 0
    }
    music.setAttribute('src', musics[audioIndex].path)
}
//function of generating index for previous music
function backwardAudioIndexGenerator() {
    audioIndex--
    if (audioIndex < 0) {
        audioIndex = 2
    }
    music.setAttribute('src', musics[audioIndex].path)
}
//function of loading music
function loadMusic(music) {
    title.textContent = music.songName,
        artist.textContent = music.artist,
        music.src = music.path
    changeCover(music.cover)
}
//function of changing cover
function changeCover(Cover) {
    musicCover.classList.remove("active")
    setTimeout(() => {
        musicCover.classList.add('active')
        musicCover.src = Cover;
    }, 100);
    background.src = Cover;
}
////////////////////////////////
/*function speedHandler() {
    let rate = speedRateBtn.innerHTML
    if (rate === '1x') {
        speedRateBtn.innerHTML = '2x'
        speedRateBtn.style.fontSize = '1.5rem'
        music.playbackRate = 2
    } else if (rate === '2x') {
        speedRateBtn.innerHTML = '3x'
        speedRateBtn.style.fontSize = '2rem'
        music.playbackRate = 3
    } else if (rate === '3x') {
        speedRateBtn.innerHTML = '1x'
        speedRateBtn.style.fontSize = '1rem'
        music.playbackRate = 1
    }
}*/
//function for previous music
function backwardMusicHandler() {
    progressTime()
    if (isPlaying == false) {
        backwardAudioIndexGenerator()
        loadMusic(musics[audioIndex])
        playAudio()
    } else {
        backwardAudioIndexGenerator()
        loadMusic(musics[audioIndex])
        playAudio()
    }
}
//function for handle play action
function playHandler() {
    if (isPlaying == false) {
        playAudio()
        loadMusic(musics[audioIndex])
        progressTime()
    } else {
        pauseAudio()
    }
}

function forwardMusicHandler() {
    progressTime()
    if (isPlaying == false) {
        forwardAudioIndexGenerator()
        loadMusic(musics[audioIndex])
        playAudio()
    } else {
        forwardAudioIndexGenerator()
        loadMusic(musics[audioIndex])
        playAudio()
    }
}
//proress time of music
function progressTime() {
    if (isPlaying) {
        setInterval(function () {
            //current time
            const minute = Math.floor(music.currentTime / 60)
            const seconds = Math.floor(music.currentTime % 60)

            if (music.currentTime < 10) {
                currentTimeElem.innerHTML = '00:' + '0' + Math.floor(music.currentTime)
            } else if (music.currentTime > 10) {
                if (music.currentTime % 60 < 10) {
                    currentTimeElem.innerHTML = '0' + Math.floor(music.currentTime / 60) + ":0" + (Math.floor(music.currentTime % 60))
                } else {
                    currentTimeElem.innerHTML = '0' + Math.floor(music.currentTime / 60) + ":" + (Math.floor(music.currentTime % 60))
                }
            }
            // duration of music
            const durationMinute = Math.floor(music.duration / 60)
            const durationSecond = Math.floor(music.duration % 60)
            if (durationMinute < 10) {
                if (durationSecond < 10) {
                    totalTimeElem.innerHTML = '0' + durationMinute + ':0' + durationSecond
                } else {
                    totalTimeElem.innerHTML = '0' + durationMinute + ':' + durationSecond
                }
            } else {
                if (durationMinute < 10) {
                    if (durationSecond < 10) {
                        totalTimeElem.innerHTML = durationMinute + ':0' + durationSecond
                    } else {
                        totalTimeElem.innerHTML = durationMinute + ':' + durationSecond
                    }
                }
            }
            //time line progress
            const progressPercent = Math.floor((music.currentTime / music.duration) * 100)
            progress.style.width = progressPercent + '%'
        }, 1000)
    }
}
//clicking on time line to control the time
//set progress bar
function clickProgressHandler(e) {
    const width = e.target.clientWidth
    const clickX = e.offsetX
    const duration = music.duration
    music.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', playHandler)
backwardBtn.addEventListener('click', backwardMusicHandler)
forwardBtn.addEventListener('click', forwardMusicHandler)
progressContainer.addEventListener("click", clickProgressHandler)
