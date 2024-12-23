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

let currentsong = new Audio();
let currentfolder = "cs";
let songs;
let lis = document.querySelector(".songlist").getElementsByTagName("li")
document.querySelector(".songinfo").innerHTML = "Namo Namo Shankara Lyrics (Kedarnath)"
playsong("Namo Namo Shankara Lyrics (Kedarnath)")

async function main() {

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

    document.querySelector(".cs").addEventListener("click", () => {
        let list = document.querySelector(".songlist").getElementsByTagName("ul")[0];
        list.innerHTML = `<li> <img src="img/music.svg" alt="">
                            <div class="info">
                                <div>Namo Namo Shankara Lyrics (Kedarnath)</div>
                                <div>Jay</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        </li>
                        <li> <img src="img/music.svg" alt="">
                            <div class="info">
                                <div>Namoh Namoh Lyrical Video Hindi Devotional Song 2018 Daler Mehndi</div>
                                <div>Jay</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        </li>`
        lis = document.querySelector(".songlist").getElementsByTagName("li")
        playsong(lis[0].querySelector(".info > div").innerHTML)
        Array.from(lis).forEach(e=>{
            e.addEventListener("click", (e)=>{
                playsong(e.currentTarget.querySelector(".info > div").innerHTML)
            })
        })
        currentfolder = "cs"
    })

    document.querySelector(".other").addEventListener("click", () => {
        let list = document.querySelector(".songlist").getElementsByTagName("ul")[0];
        list.innerHTML = `<li> <img src="img/music.svg" alt="">
                            <div class="info">
                                <div>Deva Deva (LYRICS) - Arijit Singh _ Brahmastra _ Ranbir K, Alia Bhatt _ Amitabh B _ Jonita Gandhi</div>
                                <div>Jay</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        </li>`
        lis = document.querySelector(".songlist").getElementsByTagName("li")
        playsong(lis[0].querySelector(".info > div").innerHTML)
        Array.from(lis).forEach(e=>{
            e.addEventListener("click", (e)=>{
                playsong(e.currentTarget.querySelector(".info > div").innerHTML)
            })
        })
        currentfolder = "Other%20Songs"
    })

    document.querySelector(".ncs").addEventListener("click", () => {
        let list = document.querySelector(".songlist").getElementsByTagName("ul")[0];
        list.innerHTML = `<li> <img src="img/music.svg" alt="">
                            <div class="info">
                                <div>1Warriyo - Mortals (feat. Laura Brehm) [NCS Release(MP3_128K)</div>
                                <div>Jay</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        </li>
                        <li> <img src="img/music.svg" alt="">
                            <div class="info">
                                <div>_Background Cinematic Music (NoCopyrightSongs)_160k</div>
                                <div>Jay</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        </li>
                        <li> <img src="img/music.svg" alt="">
                            <div class="info">
                                <div>Jim Yosef - Link [NCS Release](MP3_70K)</div>
                                <div>Jay</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        </li>
                        <li> <img src="img/music.svg" alt="">
                            <div class="info">
                                <div>Kaun Hain Voh - Full Video Baahubali - The Beginning Kailash K Prabhas MM Kreem , Manoj M_128k</div>
                                <div>Jay</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        </li>
                        <li> <img src="img/music.svg" alt="">
                            <div class="info">
                                <div>_Akmasti2 shorts_160k</div>
                                <div>Jay</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        </li>`
        lis = document.querySelector(".songlist").getElementsByTagName("li")
        playsong(lis[0].querySelector(".info > div").innerHTML)
        Array.from(lis).forEach(e=>{
            e.addEventListener("click", (e)=>{
                // console.log(e.currentTarget.querySelector(".info > div").innerHTML)
                playsong(e.currentTarget.querySelector(".info > div").innerHTML)
            })
        })
        currentfolder = "ncs"
    })

    Array.from(lis).forEach(e=>{
        e.addEventListener("click", (e)=>{
            // console.log(e.currentTarget.querySelector(".info > div").innerHTML)
            playsong(e.currentTarget.querySelector(".info > div").innerHTML)
        })
    })

    currentsong.addEventListener("timeupdate", () => {
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

    currentsong.addEventListener("loadstart", ()=>{
        console.log("loading");
        document.querySelector(".blur2").style.display = "block"
    })

    currentsong.addEventListener("load", ()=>{
        console.log("done");
        document.querySelector(".blur2").style.display = "none"
    })

}

async function playsong(song, pause = false) {
    console.log("call");
    currentsong.src = `/site/Songs/${currentfolder}/` + song + ".mp3";
    
    if (pause) {
        currentsong.play();
        play.src = "img/pause.svg"
    }
    play.src = "img/play.svg"
    document.querySelector(".songinfo").innerHTML = decodeURI(song)
    document.querySelector(".songtime").innerHTML = "00:00:00:00"
}

main();