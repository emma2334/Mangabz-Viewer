// ==UserScript==
// @name         Mangabz Viewer
// @namespace    https://emma2334.github.io
// @version      1.0
// @description  A userscript to expand comic content on Mangabz.
// @author       Emma
// @match        https://www.mangabz.com/m*
// @icon         https://www.google.com/s2/favicons?domain=mangabz.com
// @grant        none
// @downloadURL  https://github.com/emma2334/Mangabz-Viewer/raw/master/MangabzViewer.user.js
// ==/UserScript==

;(function () {
  'use strict'

  document
    .querySelector('.top-title')
    .insertAdjacentHTML('beforeend', `（${MANGABZ_IMAGE_COUNT}）`)
  document.getElementById('showimage').innerHTML = ''
  ;(function getImg(count = 1) {
    fetch(
      `chapterimage.ashx?cid=${MANGABZ_CID}&page=${count}&key=&_cid=${MANGABZ_CID}&_mid=${MANGABZ_MID}&_dt=${MANGABZ_VIEWSIGN_DT}&_sign=${MANGABZ_VIEWSIGN}`
    )
      .then(res => res.text())
      .then(res => {
        eval(res).forEach(e => {
          document
            .getElementById('showimage')
            .insertAdjacentHTML(
              'beforeend',
              `<img src="${e}" data-page="${count++}"><br>`
            )
        })
        if (count <= MANGABZ_IMAGE_COUNT) getImg(count)
      })
  })()
})()
