console.log('Welcome to Spotify');

let songIndex = 0;
let songs = [
    { songName: 'Ed Sheeran - Castle On The Hill', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg' },
    { songName: 'Ed Sheeran - Nancy Mulligan', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg' },
    { songName: 'Ed Sheeran - How Would You Feel', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg' },
    { songName: 'Ed Sheeran - Dive', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg' },
    { songName: 'Ed Sheeran - Galway Girl', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg' },
    { songName: 'Ed Sheeran - Barcelona', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg' },
    { songName: 'Ed Sheeran - New Man', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg' },
    { songName: 'Ed Sheeran - Shape Of You', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg' },
    { songName: 'Ed Sheeran - What Do I Know?', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg' },
    { songName: 'Ed Sheeran - Perfect', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg' },
    
];

let audioElement = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songInfo = document.querySelector('.songInfo');
let isBottomExpanded = false;
let bottom = document.querySelector('.bottom');

let SongItemPlay = Array.from(document.getElementsByClassName('SongItemPlay'))



function toggleBottomHeight() {
    if (isBottomExpanded) {
        bottom.classList.remove('expanded');
    } else {
        bottom.classList.add('expanded');
    }
    isBottomExpanded = !isBottomExpanded; // Toggle the flag
}


function playSong(){
    audioElement.src= songs[songIndex].filePath
    audioElement.play()
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
    songInfo.style.opacity = 1;
    toggleBottomHeight();
}

function pauseSong(){
    audioElement.pause()
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity=0;
    songInfo.style.opacity = 0;
    toggleBottomHeight();
    
}

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        songInfo.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        songInfo.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate', () => {
    
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress)
    myProgressBar.value = progress;
    
});


myProgressBar.addEventListener('change',()=>{

    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;

})

const makeAllPlay= ()=>{
    SongItemPlay.forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}


SongItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        songIndex = parseInt(e.target.id)
        console.log(songIndex)
        const targetElement = e.currentTarget;
        targetElement.classList.remove('fa-circle-play');
        targetElement.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`
        MasterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        songInfo.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click',()=>{

    if(songIndex>=9){
        songIndex = 0

    }else{
        songIndex=songIndex+1
    }

    audioElement.src = `songs/${songIndex+1}.mp3`
    MasterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    songInfo.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('prev').addEventListener('click',()=>{

    if(songIndex<=0){
        songIndex = 0

    }else{
        songIndex=songIndex-1
    }

    audioElement.src = `songs/${songIndex+1}.mp3`
    MasterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity = 1;
    songInfo.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})