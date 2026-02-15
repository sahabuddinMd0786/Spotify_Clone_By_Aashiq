let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('Audio/1.mp3');

let currentSong = 1;

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
})

progressBar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic'));

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(e.target.id);
        currentSong = index;
        audio.src = `Audio/${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    })
});

let allMusic = Array.from(document.getElementsByClassName('music-card'));

songs = [
    { songName: 'Dil Lagana Mana Tha', songDes:'krish Mondal, Kishore Mondal, Devv sadaana, kunal Verma', songImage: 'Images/1.jpg', songPath: 'Audio/1.mp3' },
    { songName: 'Deewaniyat', songDes: 'Vishal Mishra, kaushik-Guddu, Kunal Verma', songImage: 'Images/2.jpg', songPath: 'Audio/2.mp3' },
    { songName: 'Andaaz e Karam', songDes: 'Madhur Sharma, Moin,Er', songImage: 'Images/3.jpg', songPath: 'Audio/3.mp3' },
    { songName: 'Sound Par Sutake Chhar Round Marle', songDes: 'Awdhesh Premi Yadav', songImage: 'Images/4.jpg', songPath: 'Audio/4.mp3' },
    { songName: 'Hamaro Umar Lag Jaye', songDes: 'Pawan singh', songImage: 'Images/5.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'Tum Hi Ho', songDes: 'Mithoon,Arijit Singh ', songImage: 'Images/6.jpg', songPath: 'Audio/6.mp3' },
    { songName: 'Saiyaara', songDes: 'Tanishk Bagchi, Faheem Abdullah, Arslan Nizami, Irshad Kamil', songImage: 'Images/7.jpg', songPath: 'Audio/7.mp3' },
    { songName: 'Sanam Re', songDes: 'Mithoon, Arijit Singh', songImage: 'Images/8.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'Baaton Ke Teri', songDes: 'Arijit Singh 9', songImage: 'Images/9.jpg', songPath: 'Audio/9.mp3' },
    { songName: 'Hamari Adhuri Kahani', songDes: 'Jeet Gannguli, Arijit Singh, Rashmi Virag', songImage: 'Images/10.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Chaha Hai Tujhko', songDes: 'Udit Narayan, Anuradha Paudwal, Darshan', songImage: 'Images/11.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'Main Yahaan Hoon', songDes: 'Madan Mohan,Udit Narayan, Javed Akhtar', songImage: 'Images/12.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'SheeSha', songDes: 'Mitta Ror,Swara Verma', songImage: 'Images/13.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Aakh Ye Taalibaani', songDes: 'Manish Sonipat Aala, Bali Sharma, Vampire', songImage: 'Images/14.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Sorry Sorry', songDes: 'Pawan Singh', songImage: 'Images/15.jpg', songPath: 'Audio/15.mp3' },
    { songName: 'Russian Bandana', songDes: 'Dhanda Nyoliwala', songImage: 'Images/16.jpg', songPath: 'Audio/16.mp3' },
    { songName: 'Raja Ji Ke', songDes: 'Pawan Singh, Shivani Singh', songImage: 'Images/17.jpg', songPath: 'Audio/17.mp3' },
    { songName: 'Palang Sagwan Ke', songDes: 'Khesari Lal Yadav, Chhote Baba, Indu Sonali', songImage: 'Images/18.jpg', songPath: 'Audio/18.mp3' }
]

order = [...songs];

allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

// Search: filter visible songs by title keyword (case-insensitive)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    const sections = Array.from(document.getElementsByClassName('music-section'));
    searchInput.addEventListener('input', function () {
        const q = this.value.trim().toLowerCase();
        allMusic.forEach((element) => {
            const titleEl = element.getElementsByClassName('img-title')[0];
            const title = titleEl ? titleEl.innerText.toLowerCase() : '';
            element.style.display = title.includes(q) ? '' : 'none';
        });

        // Hide any section (and its heading) that has no visible .music-card
        sections.forEach(section => {
            const cards = Array.from(section.getElementsByClassName('music-card'));
            const anyVisible = cards.some(card => card.style.display !== 'none');
            section.style.display = anyVisible ? '' : 'none';
        });
    });
}

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs (originalOrder) {
    order = [...originalOrder];
    for(i = order.length - 1; i > 0; i--){
        let j = Math.floor((Math.random) * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
    if(!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');

        order = songs;
    }
});

repeat.addEventListener('click', () => {
    if(!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
})

playNextSong = () => {
    if(!songOnRepeat){
        let nextSong = (currentSong + 1) % playMusic.length;
        currentSong = nextSong == 0 ? 18 : nextSong;
    
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    } else {
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    }
}

playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 18 : prevSong;
    audio.src = `Audio/${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
}

function updateNowBar () {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong-1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong-1].songDes;
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
})

audio.addEventListener('ended', () => {
    playNextSong();
})

backward.addEventListener('click', () => {
    playPrevSong();
});