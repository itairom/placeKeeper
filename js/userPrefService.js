'use strict'
const KEY = 'userData'

function saveUserPref(bgc, txtColor, date) {
    const userPref = {
        bgc,
        txtColor,
        date
    }
    saveToStorage(KEY, userPref)
}

function getUserPref() {
    let userPref = getFromStorage(KEY)
    if (!userPref) {
        userPref = { bgc: 'white', txtColor: 'black', date: '2.2.18' }
    }
    return userPref
}