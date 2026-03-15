"use strict";

(function () {
    function createViewer() {
        console.log("Viewing");

        let core = document.createElement("div");
        core.classList.add("img-viewer")
        core.classList.add("core")
        core.onclick = destroyViewers;

        let img = document.createElement("img");
        img.src = this.img;
        img.draggable = false;

        createCSS(core, img);

        core.appendChild(img);
        document.body.appendChild(core);
    }

    /**
     * @param {HTMLDivElement} core 
     * @param {HTMLImageElement} img 
     */
    function createCSS(core, img) {
        core.style.position = "fixed";
        core.style.top = 0;
        core.style.left = 0;
        core.style.width = "100vw";
        core.style.height = "100vh";
        core.style.background = "#00000090";
        core.style.zIndex = 20;
        core.style.display = "flex";
        core.style.alignItems = "center";
        core.style.justifyContent = "center";

        img.style.position = "relative";
        img.style.objectFit = "contain";

        if (window.visualViewport.height > window.visualViewport.width) {
            img.style.width = "90vw";
            img.style.height = "90vh";
        } else {
            img.style.width = "100vw";
            img.style.height = "100vh";
        }
    }

    function destroyViewers() {
        let cores = document.querySelectorAll("div.img-viewer.core")
        cores.forEach((core) => core.remove());
    }

    function IMGViewer(button, img) {
        this.button = button;
        this.img = img;

        // bind to bind IMGViewer in createViewer or whatever.
        this.button.onclick = createViewer.bind(this);
    }

    IMGViewer.initAll = function () {
        let btns = document.querySelectorAll("button.img-view");
        console.log(`[IMGViewer] ${btns.length} img viewers button`);
        

        btns.forEach((btn) => {
            let imgSrc = btn.getAttribute("img-src");
            if (imgSrc != null) {
                new IMGViewer(btn, imgSrc);
                console.log("[IMGViewer] Viewified");
            } else {
                console.error(`[IMGViewer] Missing img-src for ${btn}`)
            }
        })
    }

    window.IMGViewer = IMGViewer;

    document.addEventListener("DOMContentLoaded", function () {
        IMGViewer.initAll();
    })
})();
