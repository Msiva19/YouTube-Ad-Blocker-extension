(function () {
    // Enable The Undetected Adblocker
    const adblocker = true;

    // Enable The Popup remover 
    const removePopup = false;

    // Enable custom modal
    // Uses SweetAlert2 library (https://cdn.jsdelivr.net/npm/sweetalert2@11) for the update version modal.
    // When set to false, the default window popup will be used. And the library will not be loaded.
    const updateModal = {
        enable: true, // if true, replaces default window popup with a custom modal
        timer: 5000, // timer: number | false
    };

    // Store the initial URL
    let currentUrl = window.location.href;

    // Used for if there is ad found
    let isAdFound = false;

    //used to see how meny times we have loopped with a ad active
    let adLoop = 0;

    if (adblocker) {
        removeAds();
    }

    if (removePopup) {
        popupRemover();
    }

    function popupRemover() {
        setInterval(() => {
            const modalOverlay = document.querySelector(".tp-yt-iron-overlay-backdrop");
            const popup = document.querySelector(".style-scope ytd-enforcement-message-view-model");
            const popupButton = document.getElementById("dismiss-button");
            const video = document.querySelector('video');
            document.body.style.setProperty('overflow-y', 'auto', 'important');

            if (modalOverlay) modalOverlay.remove();
            if (popup) {
                if (popupButton) popupButton.click();
                popup.remove();
                video.play();
                setTimeout(() => video.play(), 500);
            }
            if (!video.paused) return;
            video.play();
        }, 1000);
    }

    function removeAds() {
        setInterval(() => {
            const video = document.querySelector('video');
            const ad = [...document.querySelectorAll('.ad-showing')][0];
            if (window.location.href !== currentUrl) {
                currentUrl = window.location.href;
                removePageAds();
            }
            if (ad) {
                isAdFound = true;
                adLoop++;
                if (adLoop < 10) {
                    const openAdCenterButton = document.querySelector('.ytp-ad-button-icon');
                    const blockAdButton = document.querySelector('[label="Block ad"]');
                    const blockAdButtonConfirm = document.querySelector('.Eddif [label="CONTINUE"] button');
                    const closeAdCenterButton = document.querySelector('.zBmRhe-Bz112c');
                    openAdCenterButton?.click();
                    blockAdButton?.click();
                    blockAdButtonConfirm?.click();
                    closeAdCenterButton?.click();
                } else if (video) {
                    video.play();
                }
                const popupContainer = document.querySelector('body > ytd-app > ytd-popup-container > tp-yt-paper-dialog');
                if (popupContainer && popupContainer.style.display == "") {
                    popupContainer.style.display = 'none';
                }
                const skipButtons = ['ytp-ad-skip-button-container', 'ytp-ad-skip-button-modern', '.videoAdUiSkipButton', '.ytp-ad-skip-button', '.ytp-ad-skip-button-modern', '.ytp-ad-skip-button', '.ytp-ad-skip-button-slot'];
                if (video) {
                    video.playbackRate = 10;
                    video.volume = 0;
                    skipButtons.forEach(selector => {
                        const elements = document.querySelectorAll(selector);
                        if (elements && elements.length > 0) {
                            elements.forEach(element => element?.click());
                        }
                    });
                    video.play();
                    const randomNumber = Math.random() * (0.5 - 0.1) + 0.1;
                    video.currentTime = video.duration + randomNumber || 0;
                }
            } else {
                if (video && video?.playbackRate == 10) {
                    video.playbackRate = 1;
                }
                if (isAdFound) {
                    isAdFound = false;
                    if (video && isFinite(video.playbackRate)) {
                        video.playbackRate = video.playbackRate;
                    }
                    adLoop = 0;
                } else if (video) {
                    videoPlayback = video.playbackRate;
                }
            }
        }, 50)
        removePageAds();
    }

    function removePageAds() {
        const sponsor = document.querySelectorAll("div#player-ads.style-scope.ytd-watch-flexy, div#panels.style-scope.ytd-watch-flexy");
        const style = document.createElement('style');
        style.textContent = `
        ytd-action-companion-ad-renderer,
        ytd-display-ad-renderer,
        ytd-video-masthead-ad-advertiser-info-renderer,
        ytd-video-masthead-ad-primary-video-renderer,
        ytd-in-feed-ad-layout-renderer,
        ytd-ad-slot-renderer,
        yt-about-this-ad-renderer,
        yt-mealbar-promo-renderer,
        ytd-statement-banner-renderer,
        ytd-ad-slot-renderer,
        ytd-in-feed-ad-layout-renderer,
        ytd-banner-promo-renderer-background
        statement-banner-style-type-compact,
        .ytd-video-masthead-ad-v3-renderer,
        div#root.style-scope.ytd-display-ad-renderer.yt-simple-endpoint,
        div#sparkles-container.style-scope.ytd-promoted-sparkles-web-renderer,
        div#main-container.style-scope.ytd-promoted-video-renderer,
        div#player-ads.style-scope.ytd-watch-flexy,
        ad-slot-renderer,
        ytm-promoted-sparkles-web-renderer,
        masthead-ad,
        tp-yt-iron-overlay-backdrop,

        #masthead-ad {
            display: none !important;
        }`;
        document.head.appendChild(style);
        sponsor?.forEach((element) => {
            if (element.getAttribute("id") === "rendering-content") {
                element.childNodes?.forEach((childElement) => {
                    if (childElement?.data.targetId && childElement?.data.targetId !== "engagement-panel-macro-markers-description-chapters") {
                        element.style.display = 'none';
                    }
                });
            }
        });
    }
    console.log("Removed page ads (✔️)")
})();

