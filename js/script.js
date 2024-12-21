
function secondsToMinitesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    else {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }
}
async function getsongs(folder) {
    currentfolder = folder;
    let a = await fetch(`/Video84(spotify)/songs/${folder}/`)
    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    // console.log(as);
    let songs = [];

    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/Video84(spotify)/songs/${folder}/`)[1]);
        }
    }

    let list = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    list.innerHTML = " "
    for (const song of songs) {
        list.innerHTML = list.innerHTML + `<li> <img src="img/music.svg" alt="">
        <div class="info">
            <div> ${song.replaceAll("%20", " ")}</div>
            <div>Jay</div>
        </div>
        <div class="playnow">
            <span>Play now</span>
            <img class="invert" src="img/play.svg" alt="">
        </div> </li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(element => {
        element.addEventListener("click", () => {
            // console.log(element.getElementsByTagName("div")[1].innerHTML);
            playsong(element.getElementsByTagName("div")[1].innerHTML.trim());
        })
    });

    return songs
}

async function displayalbums() {
    let a = await fetch(`/Video84(spotify)/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response;
    let allas = div.getElementsByTagName("a")
    let cardcontainer = document.querySelector(".cardcontainer")
    let array = Array.from(allas)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs/") && !e.href.includes(".htaccess")) { 
            let folder = e.href.split("/songs/")[1].replace("/", "")
            console.log(folder);
            let a = await fetch(`/Video84(spotify)/songs/${folder}/info.json`)
            let response = await a.json();
            // console.log(response);
            cardcontainer.innerHTML = cardcontainer.innerHTML + `<div data-folder="${folder}" class="card">
            <div class="play">
                <img class="invert" src="img/play.svg" alt="">
            </div>
            <img src="/Video84(spotify)/Songs/${folder}/cover.jpg" alt="">
            <h2>${response.title}</h2>
            <p>${response.discription}</p>
        </div>`
        }
    }
}

let currentsong = new Audio();
let songs;
let currentfolder

async function main() {

    songs = await getsongs("cs");
    // console.log(songs);
    playsong(songs[0])

    //display albums
    await displayalbums()

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "img/pause.svg"
        }
        else {
            currentsong.pause()
            play.src = "img/play.svg"
        }
    })

    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration);
        // console.log(currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinitesSeconds(currentsong.currentTime)}:${secondsToMinitesSeconds(currentsong.duration)}`;
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";

    })

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let persent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = persent + "%";
        currentsong.currentTime = ((currentsong.duration) * persent) / 100;
    })

    document.querySelector(".side-bar").addEventListener("click", () => {
        console.log("click");
        document.querySelector(".left").style.left = 0
    })

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%"
    })

    previous.addEventListener("click", () => {
        // console.log(currentsong.src.split("/Songs/")[1]);
        let index = songs.indexOf(currentsong.src.split(`${currentfolder}/`)[1])
        if (index > 0) {
            playsong(songs[index - 1])
        }
    })

    next.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split(`${currentfolder}/`)[1])
        if (index < (songs.length - 1)) {
            playsong(songs[index + 1])
        }
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        // console.log(e.target.value);
        currentsong.volume = parseInt(e.target.value) / 100
    })

    Array.from(document.getElementsByClassName("card")).forEach(e => {
        // console.log(e);
        e.addEventListener("click", async (item) => {
            // console.log(item.currentTarget.dataset.folder);
            songs = await getsongs(`${item.currentTarget.dataset.folder}`);
        })
    })

    document.querySelector(".volume > img").addEventListener("click", (e) => {
        if (e.currentTarget.src.includes("img/volume.svg")) {
            e.currentTarget.src = e.currentTarget.src.replace("img/volume.svg", "img/mute.svg")
            currentsong.volume = 0
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0
        }
        else {
            e.currentTarget.src = e.currentTarget.src.replace("img/mute.svg", "img/volume.svg")
            currentsong.volume = 0.1
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10
        }
    })
}

function playsong(song, pause = false) {
    // let audio = new Audio("/Songs/" + song);
    currentsong.src = `/Video84(spotify)/Songs/${currentfolder}/` + song;
    if (pause) {
        currentsong.play();
        play.src = "img/pause.svg"
    }
    play.src = "img/play.svg"
    document.querySelector(".songinfo").innerHTML = decodeURI(song)
    document.querySelector(".songtime").innerHTML = "00:00:00:00"
}
main();