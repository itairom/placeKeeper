'use strict'
const LOCATION_KEY = 'userLocation'
let gLocations


function saveLocation(coord) {
    let latLng = JSON.parse(coord)
    let name = prompt('enter name for location')

    gLocations.push({
        name,
        lat: latLng.lat,
        lng: latLng.lng,
        id: makeId()
    })

    saveToStorage(LOCATION_KEY, gLocations)
}

function getUserLocations() {
    gLocations = getFromStorage(LOCATION_KEY)

    if (!gLocations) {
        let locations = []

        locations.push({
            name: 'itai',
            lat: '23',
            lng: '28',
            id: makeId()
        })
        gLocations = locations
        return gLocations

    }


    return gLocations
}

function deleteLocation(locationId) {
    var locationIdx = gLocations.findIndex((location) => {
        return locationId === location.id
    })
    gLocations.splice(locationIdx, 1)
    saveToStorage(LOCATION_KEY, gLocations)
}