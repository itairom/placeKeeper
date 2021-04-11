'use strict'

function init() {
    setUserPref()
}


function onSetUserPref(ev) {
    ev.preventDefault()
    const bgc = document.querySelector('.input-bgc').value
    const txtColor = document.querySelector('.input-clr').value
    saveUserPref(bgc, txtColor)
    setUserPref()
}

function setUserPref() {
    const userPref = getUserPref()
    document.body.style.backgroundColor = userPref.bgc
    document.body.style.color = userPref.txtColor
}