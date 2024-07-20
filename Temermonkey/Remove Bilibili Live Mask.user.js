// ==UserScript==
// @name         Remove Bilibili Live Mask
// @namespace    http://tampermonkey.net/
// @version      2024-07-20
// @description  删去bilibili某些直播间的模糊部分
// @author       lu0qlng
// @match       *://live.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function removeElement() {
        var element = document.getElementById('web-player-module-area-mask-panel');
        if (element) {
            element.parentNode.removeChild(element);
            console.log('Element with id "web-player-module-area-mask-panel" has been removed.');
        }
    };

 var timeout = setTimeout(() => {
        observer.disconnect();
        console.log('Stopped observing after 20 seconds.');
    }, 20000);

    // 使用 MutationObserver 观察 DOM 变化
    const observer = new MutationObserver((mutations, obs) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.id === 'web-player-module-area-mask-panel') {
                    removeElement();
                    clearTimeout(timeout); // 删除元素后清除超时
                    obs.disconnect(); // 完成任务后断开观察器
                }
            });
        });
    });

    // 开始观察文档根节点的变化
    observer.observe(document, {
        childList: true,
        subtree: true
    });
})();