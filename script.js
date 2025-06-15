const ul = document.querySelector("#audio-list ul");
const playPausebtn = document.querySelectorAll(".play-pause");
const image = document.querySelector("#img");
const sortBtn = document.getElementById("sort");
const mixBtn = document.getElementById("mix");
const nextBtn = document.querySelectorAll(".next");
const prevBtn = document.querySelectorAll(".previous");
const delBtn = document.getElementById("del");
const Audios = [{
        id: "audio-0",
        reciter: "Abdullah Ali Jabir",
        "reciter short name": "Ali Jabir",
        surah: "Al-Alaq",
        duration: "01:18",
        "audio src": "https://download.quranicaudio.com/quran/ali_jaber/096.mp3",
        "img src": "https://s-media-cache-ak0.pinimg.com/564x/03/2c/3e/032c3ec022102cc5d5114b0960d0b60b.jpg",
    },
    {
        id: "audio-1",
        reciter: "Abu Bakr al-Shatri",
        "reciter short name": "al-Shatri",
        surah: "Al-Qiyamah",
        duration: "03:53",
        "audio src": "https://download.quranicaudio.com/quran/abu_bakr_ash-shatri_tarawee7/075.mp3",
        "img src": "https://static.qurancdn.com/images/reciters/3/abu-bakr-al-shatri-pofile.jpeg?v=1",
    },
    {
        id: "audio-2",
        reciter: "Abdullah Ali Jabir",
        "reciter short name": "Ali Jabir",
        surah: "At-Tariq",
        duration: "01:12",
        "audio src": "https://download.quranicaudio.com/quran/ali_jaber/086.mp3",
        "img src": "https://s-media-cache-ak0.pinimg.com/564x/03/2c/3e/032c3ec022102cc5d5114b0960d0b60b.jpg",
    },
    {
        id: "audio-3",
        reciter: "Abdullah Matrood",
        "reciter short name": "Matrood",
        surah: "At-Tariq",
        duration: "01:12",
        "audio src": "https://download.quranicaudio.com/quran/abdullah_matroud/086.mp3",
        "img src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIN3Qys5iyInzMzUuyYckzH-Fxw_NqqCNfdQ&amp;s",
    },
    {
        id: "audio-4",
        reciter: "Abdurrahmaan As-Sudays",
        "reciter short name": "As-Sudays",
        surah: "Al-Nuh",
        duration: "04:13",
        "audio src": "https://download.quranicaudio.com/quran/abdurrahmaan_as-sudays/071.mp3",
        "img src": "https://lastfm.freetls.fastly.net/i/u/avatar170s/8652ed2383364e0c808df18ca73dd5e3",
    },
    {
        id: "audio-5",
        reciter: "Abdullah Ali Jabir",
        "reciter short name": "Ali Jabir",
        surah: "Al-Layl",
        duration: "01:29",
        "audio src": "https://download.quranicaudio.com/quran/ali_jaber/092.mp3",
        "img src": "https://s-media-cache-ak0.pinimg.com/564x/03/2c/3e/032c3ec022102cc5d5114b0960d0b60b.jpg",
    },
    {
        id: "audio-6",
        reciter: "Abdullah Matrood",
        "reciter short name": "Matrood",
        surah: "Al-Buruj",
        duration: "02:14",
        "audio src": "https://download.quranicaudio.com/quran/abdullah_matroud/085.mp3",
        "img src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIN3Qys5iyInzMzUuyYckzH-Fxw_NqqCNfdQ&amp;s",
    },
    {
        id: "audio-7",
        reciter: "Abu Bakr al-Shatri",
        "reciter short name": "al-Shatri",
        surah: "Al-Mutaffifin",
        duration: "03:39",
        "audio src": "https://download.quranicaudio.com/quran/abu_bakr_ash-shatri_tarawee7/083.mp3",
        "img src": "https://static.qurancdn.com/images/reciters/3/abu-bakr-al-shatri-pofile.jpeg?v=1",
    },
];
const newAudio = new Audio();

let allAudios = [...Audios];
let audioCurrentTime;
let audioBehvaiour;
let audioObjectOrder;
let currentAudioPlaying;

function renderAudios(mode) {
    if (allAudios.length < 1) return;
    if (mode === "sort") {
        allAudios.sort(
            (a, b) => a["reciter short name"].localeCompare(b["reciter short name"])
        );
    }
    if (mode === "mix") {
        allAudios.sort(() => Math.random() - 0.5);
        // if (a['reciter short name'] > b['reciter short name']) {
        //     return Math.random() - .5
        // }
        // if (a['reciter short name'] < b['reciter short name']) {
        //     return Math.random() - .5
        // }
    }
    let AudiosHTML = [];
    allAudios.map((audio) => {
        AudiosHTML.push(
            `<li class="audios" id="${audio.id}" onclick="currentAudio('${audio.id}')"><p>${audio.surah}</p><p>${audio.duration}</p><p>${audio["reciter short name"]}</p></li>`
        );
    });
    AudiosHTML = AudiosHTML.join("\n");
    ul.innerHTML = AudiosHTML;
    if (currentAudioPlaying) currentAudio(currentAudioPlaying.id, mode);
}

function delAudio() {
    if (!currentAudioPlaying) {
        return;
    }
    allAudios = allAudios.filter(item => item !== currentAudioPlaying)
    newAudio.pause();
    playPausebtn.forEach(item => {
        item.classList.remove('pause');
        item.classList.add('play');
    })
    currentAudioPlaying = undefined;
    document.querySelectorAll(".surah em").forEach((item) => {
        item.innerHTML = '--';
    });
    document.querySelectorAll(".duration em").forEach((item) => {
        item.innerHTML = '00:00';
    });
    document.querySelectorAll(".reciter em").forEach((item) => {
        item.innerHTML = '--';
    });
    image.src = 'https://cdn.pixabay.com/photo/2021/12/11/09/19/quran-6862296_1280.jpg';
    renderAudios();
    // if (allAudios.length < 1) {
    //     ul.style.setProperty('position', 'relative');
    //     ul.innerHTML = '<button id="reset-list-btn">Reset list?</button>'
    //     const resetListBtn = document.getElementById('reset-list-btn')
    //     resetListBtn.onclick = restoreList;
    // }
    if (allAudios.length < 1) {
        ul.innerHTML = '';
        const resetBtn = document.createElement('button');
        const resetBtnText = document.createTextNode('Reset list')
        resetBtn.id = 'reset-list-btn';
        resetBtn.appendChild(resetBtnText);
        ul.style.position = 'relative';
        ul.appendChild(resetBtn);
        resetBtn.onclick = () => {
            allAudios = [...Audios];
            resetBtn.remove();
            ul.style.position = 'static';
            renderAudios();
        }
    }
}

function currentAudio(currentAudioId, mode) {
    document.querySelectorAll(".audios").forEach((item) => {
        item.classList.remove("current-audio");
    });
    document.querySelector(`#${currentAudioId}`).classList.add("current-audio");
    if (mode === "mix" || mode === "sort") {
        return;
    }
    // audioObjectOrder = Number(currentAudioId.match(/[\d]/g).join(""));
    // image.src = allAudios[audioObjectOrder]["img src"];
    currentAudioPlaying = allAudios.find((item) => item.id === currentAudioId);
    image.src = currentAudioPlaying["img src"];
    document.querySelectorAll(".surah em").forEach((item) => {
        item.innerHTML = currentAudioPlaying.surah;
    });
    document.querySelectorAll(".duration em").forEach((item) => {
        item.innerHTML = currentAudioPlaying.duration;
    });
    document.querySelectorAll(".reciter em").forEach((item) => {
        item.innerHTML = currentAudioPlaying["reciter"];
    });
    audioCurrentTime = 0;
    audioBehvaiour = "newAudio";
    playAudio();
}

function playAudio() {
    if (!currentAudioPlaying) {
        currentAudioPlaying = allAudios[0];
        image.src = allAudios[0]["img src"];
        currentAudio(currentAudioPlaying.id);
        newAudio.src = currentAudioPlaying["audio src"];
        playPausebtn.forEach((item) => {
            item.classList.remove("play");
            item.classList.add("pause");
        });
        newAudio.play();
        audioBehvaiour = "play";
        return;
    }
    if (audioBehvaiour === "pause") {
        newAudio.currentTime = audioCurrentTime;
        newAudio.play();
        audioBehvaiour = "play";
        playPausebtn.forEach((item) => {
            item.classList.remove("play");
            item.classList.add("pause");
        });
        return;
    }
    if (audioBehvaiour === "play") {
        audioCurrentTime = newAudio.currentTime;
        newAudio.pause();
        audioBehvaiour = "pause";
        playPausebtn.forEach((item) => {
            item.classList.remove("pause");
            item.classList.add("play");
        });
        return;
    }
    newAudio.src = currentAudioPlaying["audio src"];
    playPausebtn.forEach((item) => {
        item.classList.remove("play");
        item.classList.add("pause");
    });
    newAudio.play();
    audioBehvaiour = "play";
}

function playNextAudio() {
    if (!currentAudioPlaying) {
        currentAudioPlaying = allAudios[0];
        image.src = allAudios[0]["img src"];
        currentAudio(currentAudioPlaying.id);
        newAudio.src = currentAudioPlaying["audio src"];
        playPausebtn.forEach((item) => {
            item.classList.remove("play");
            item.classList.add("pause");
        });
        newAudio.play();
        audioBehvaiour = "play";
        return;
    };
    if (allAudios[allAudios.length - 1] == allAudios[allAudios.indexOf(currentAudioPlaying)]) {
        console.log('its the last element');
        return;
    }
    const nextAudio = allAudios[allAudios.indexOf(currentAudioPlaying) + 1];
    currentAudioPlaying = nextAudio;
    image.src = nextAudio['img src'];
    newAudio.src = nextAudio["audio src"];
    playPausebtn.forEach((item) => {
        item.classList.remove("play");
        item.classList.add("pause");
    });
    currentAudio(nextAudio.id)
    newAudio.play();
    audioBehvaiour = "play";
}

function playPrevAudio() {
    if (!currentAudioPlaying) {
        currentAudioPlaying = allAudios[0];
        image.src = allAudios[0]["img src"];
        currentAudio(currentAudioPlaying.id);
        newAudio.src = currentAudioPlaying["audio src"];
        playPausebtn.forEach((item) => {
            item.classList.remove("play");
            item.classList.add("pause");
        });
        newAudio.play();
        audioBehvaiour = "play";
        return;
    };
    if (allAudios[0] == currentAudioPlaying) {
        console.log('its the first element');
        return;
    }
    const prevAudio = allAudios[allAudios.indexOf(currentAudioPlaying) - 1];
    currentAudioPlaying = prevAudio;
    image.src = prevAudio['img src'];
    newAudio.src = prevAudio["audio src"];
    playPausebtn.forEach((item) => {
        item.classList.remove("play");
        item.classList.add("pause");
    });
    currentAudio(prevAudio.id)
    newAudio.play();
    audioBehvaiour = "play";
}

nextBtn.forEach(item =>
    item.onclick = () => playNextAudio()

)
prevBtn.forEach(item => item.onclick = () => playPrevAudio())
renderAudios();
sortBtn.onclick = () => renderAudios("sort");
mixBtn.onclick = () => renderAudios("mix");
delBtn.onclick = delAudio;
newAudio.addEventListener("ended", () => {
    audioBehvaiour = "play";
    playAudio();
});
playPausebtn.forEach((item) => (item.onclick = () => playAudio()));