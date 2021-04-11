'use strict'
const KEY = 'userLocation'

function saveLocation(coord) {
    let latLng = JSON.parse(coord)
    let name = prompt('enter name for location')

    const userLocation = {
        name,
        lat: latLng.lat,
        lng: latLng.lng,
        id: makeId()
    }
    saveToStorage(KEY, userLocation)
}

function getUserLocations() {
    let userLocations = getFromStorage(KEY)
    if (!userLocations) {
        userLocations = {
            name: 'itai',
            lat: '23',
            lng: '28',
            id: makeId()
        }
    }
    return userLocations
}