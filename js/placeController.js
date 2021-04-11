'use strict'

let map
let infoWindow;
let gLocations = []


function initMap() {
    const myLatlng = { lat: 29.580902552664703, lng: 34.96307066079831 };

    map = new google.maps.Map(document.querySelector("#map"), {
        center: myLatlng,
        zoom: 10,

    });

    let infoWindow = new google.maps.InfoWindow({
        position: myLatlng,
    });
    infoWindow.open(map);
    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        infoWindow.close();
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng
        });
        console.log((JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)));
        saveLocation((JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)))

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


// let infoWindow1 = new google.maps.InfoWindow({
//     content: "Click the map to get Lat/Lng!",
//     position: myLatlng,
// });
// infoWindow1.open(map);