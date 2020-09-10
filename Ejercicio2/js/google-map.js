// GOOGLE MAPS LOGIC
function initGoogleMap() {
    const centerCoords = {
        lat: CENTER_LAT,
        lng: CENTER_LNG
    };
    const markerCoords = {
        lat: MARKER_LAT,
        lng: MARKER_LNG
    };

    // Define a new Google Maps map instance
    const map = new google.maps.Map(document.getElementById('gmaps-map'), {
        center: centerCoords,
        zoom: ZOOM_LEVEL
    });

    // Define a marker and an infoWindow (popup)
    const marker = new google.maps.Marker({ position: markerCoords, map, title: 'Zunderdorp', });
    const infoWindow = new google.maps.InfoWindow({
        content: '<b>Hello world!</b><br>I am a <i>Google Maps</i> popup.',
    });

    // Add a marker to the map
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}
