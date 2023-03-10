// ==UserScript==
// @name         No "For You" Tab on Twitter
// @author       Stephen Chapman - Twitter: @Chapman | GitHub: dsasmblr
// @version      0.1
// @description  Always force the "Following" tab to be selected on the home page
// @match        *://*.twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const HOME_PAGE = 'twitter.com/home';
    const FOR_YOU_DIV = '[role=tab] > div > div';

    const setNahDog = () => {
        const isHomePage = location.href.includes(HOME_PAGE);
        const forYouTabText = document.querySelector(`${FOR_YOU_DIV} > span`);

        if (!forYouTabText) {
            return;
        }

        const isForYouText = forYouTabText.innerText === 'For you';

        if (isHomePage && isForYouText) {
            forYouTabText.innerText = 'Nah, dog';
        }
    }

    const setFollowing = () => {
        const isHomePage = location.href.includes(HOME_PAGE);
        const forYouTab = document.querySelector(`${FOR_YOU_DIV} > div`);

        if (!forYouTab) {
            return;
        }

        const forYouTabIsActive = forYouTab.className.length > 30;

        if (isHomePage && forYouTabIsActive) {
            const followingTab = [...document.querySelectorAll('[role=tab]')][1];
            followingTab.click();
            followingTab.focus();
        }
    }

    const t = document.body;
    const c = { childList: true, subtree: true };

    const cb = (mutList, obs) => {
        mutList.forEach((mut) => {
            setNahDog();
            mut.type === 'childList' ? setFollowing() : null;
        });
    };

    const obs = new MutationObserver(cb);

    obs.observe(t, c);
})();
