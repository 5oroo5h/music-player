const music = document.querySelector('audio')
const playBtn = document.querySelector('.play')
const pauseBtn = document.querySelector('.pause')
const currentTimeElem = document.querySelector('.current-time')
const totalTimeElem = document.querySelector('.total-time')
const durationBtn = document.querySelector('.duration')
const currentShow = document.querySelector('.currentTime-p')
const backwardBtn = document.querySelector('.backward')
const forwardBtn = document.querySelector('.forward')


let musicList = [
    '1.MP3',
    '2.mp3',
    '3.mp3',
]

let audioIndex = 0
//functions of music player keys

function backwardMusicHandler() {

}

function playHandler() {
    music.play()

    setInterval(function(){
    currentTimeElem.innerHTML = Math.floor(music.currentTime) 
   
    },1000)

    totalTimeElem.innerHTML = Math.floor(music.duration/60 )+ ' min' 
}

function pauseHandler() {
    music.pause()
}

function durationOfMusic() {
    console.log(Math.floor(music.duration))
}

function forwardMusicHandler() {
audioIndex++

if (audioIndex > musicList.length - 1) {
    audioIndex = 0
}
music.setAttribute('src', musicList[audioIndex])
playHandler()
console.log(musicList[audioIndex])
}


playBtn.addEventListener('click', playHandler)
pauseBtn.addEventListener('click', pauseHandler)
backwardBtn.addEventListener('click', backwardMusicHandler)
forwardBtn.addEventListener('click', forwardMusicHandler)