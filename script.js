document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       OPENING SCREEN
       ============================== */

    const openButton = document.getElementById("openButton");
    const openingScreen = document.getElementById("opening-screen");

    /* ==============================
       WEDDING MUSIC
       ============================== */

    const weddingMusic = new Audio("music/wedding-song.mp3");

    weddingMusic.loop = true;
    weddingMusic.preload = "auto";

    let musicPlaying = false;

    function createMusicButton() {

        if (document.getElementById("musicButton")) return;

        const musicButton = document.createElement("button");

        musicButton.id = "musicButton";
        musicButton.innerHTML = "🔊";

        musicButton.style.position = "fixed";
        musicButton.style.top = "20px";
        musicButton.style.right = "20px";
        musicButton.style.width = "46px";
        musicButton.style.height = "46px";
        musicButton.style.borderRadius = "50%";
        musicButton.style.border = "none";
        musicButton.style.background = "rgba(0,0,0,0.55)";
        musicButton.style.color = "white";
        musicButton.style.fontSize = "21px";
        musicButton.style.cursor = "pointer";
        musicButton.style.zIndex = "99999";
        musicButton.style.backdropFilter = "blur(8px)";
        musicButton.style.boxShadow = "0 4px 15px rgba(0,0,0,0.25)";

        musicButton.addEventListener("click", function () {

            if (musicPlaying) {

                weddingMusic.pause();
                musicPlaying = false;
                musicButton.innerHTML = "🔇";

            } else {

                weddingMusic.play()
                    .then(function () {
                        musicPlaying = true;
                        musicButton.innerHTML = "🔊";
                    })
                    .catch(function (error) {
                        console.log("Music could not play:", error);
                    });

            }

        });

        document.body.appendChild(musicButton);
    }


    if (openButton && openingScreen) {

        openButton.addEventListener("click", function () {

            /* ==============================
               START MUSIC AFTER TAP
               ============================== */

            weddingMusic.play()
                .then(function () {
                    musicPlaying = true;
                })
                .catch(function (error) {
                    console.log("Music could not play:", error);
                });

            /* Create speaker button */
            createMusicButton();


            /* ==============================
               CURTAIN ANIMATION
               ============================== */

            openingScreen.classList.add("opening");

            document.body.style.overflowY = "auto";


            /* Remove opening screen */

            setTimeout(function () {

                openingScreen.remove();

                document.body.style.overflowY = "auto";

            }, 1800);

        });
    }


    /* ==============================
       COUNTDOWN
       ============================== */

    const weddingDate = new Date(
        "October 7, 2026 19:00:00"
    ).getTime();


    function updateCountdown() {

        const now = new Date().getTime();
        const distance = weddingDate - now;


        if (distance <= 0) {

            const elements = [
                "days",
                "hours",
                "minutes",
                "seconds"
            ];

            elements.forEach(function (id) {

                const el = document.getElementById(id);

                if (el) {
                    el.textContent = "00";
                }

            });

            return;
        }


        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );


        const d = document.getElementById("days");
        const h = document.getElementById("hours");
        const m = document.getElementById("minutes");
        const s = document.getElementById("seconds");


        if (d) {
            d.textContent = String(days).padStart(2, "0");
        }

        if (h) {
            h.textContent = String(hours).padStart(2, "0");
        }

        if (m) {
            m.textContent = String(minutes).padStart(2, "0");
        }

        if (s) {
            s.textContent = String(seconds).padStart(2, "0");
        }

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* ==============================
       SMOOTH SCROLL
       ============================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

});