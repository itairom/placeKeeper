'use strict'

let map
let infoWindow;


function init() {
    setUserLocations()
    initMap()
    renderLocations()
}

function initMap() {
    const myLatlng = { lat: 29.580902552664703, lng: 34.96307066079831 };
    map = new google.maps.Map(document.querySelector("#map"), {
        center: myLatlng,
        zoom: 10
    });
    map.addListener("click", (mapsMouseEvent) => {
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng
        });
        onSaveLocation((JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)))
    });
}

function goToMyLocation() {
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    zoom: 10,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        handleLocationError(false, infoWindow, map.getCenter());
    }
    // });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation ?
        "Error: The Geolocation service failed." :
        "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}



function setUserLocations() {
    const userLocations = getUserLocations()
    renderLocations()
}


function renderLocations() {
    var locations = getUserLocations()
    var strHtmls = locations.map((location) => {
        return `<tr>
        <td>${location.id}</td>
        <td>${location.name}</td>
        <td>${(location.lng).toFixed(3)}</td>
        <td>${(location.lat).toFixed(3)}</td>
        <td >
        <button onclick="onDeleteLocations('${location.id}')" class="">Delete</button>
        </td>
        `
    })
    document.querySelector('.table-container').innerHTML = strHtmls.join('')
}

function onDeleteLocations(locationId) {
    deleteLocation(locationId)
    renderLocations()
}

function onSaveLocation(coord) {
    document.querySelector('.modal').style.visibility = 'visible'
    setCoordinate(coord)
        // renderLocations()
}

function onSetName(ev) {
    let coord = getCoordinate()
    ev.preventDefault()
    var elName = document.querySelector("input[name='name-form']")
    saveLocation(coord, elName.value)
    elName = ''
    document.querySelector('.modal').style.visibility = 'hidden'
    renderLocations()
}