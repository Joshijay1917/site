let currentsong = new Audio();
let currentfolder = "cs";
let songs;
let lis = document.querySelector(".songlist").getElementsByTagName("li")

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

}

function playsong(song, pause = false) {
    console.log("call");
    
    // let audio = new Audio("/Songs/" + song);
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