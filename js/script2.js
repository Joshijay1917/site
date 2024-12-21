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
        console.log(e.href.includes("/songs/"));
        
        if (e.href.includes("/songs/") && !e.href.includes(".htaccess")) {
            let folder = e.href.split("/songs/")[1].replace("/", "")
            let a = await fetch(`/Video84(spotify)/songs/${folder}/info.json`)
            let response = await a.json();
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

let currentsong = new Audio();
let songs;

async function main() {
    songs = await getsongs("cs");
    playsong(songs[0])
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