let currentCoordinates = [];
let latestPolygon = null;
let addNewPolygon = true;

const leafletMap = L.map('leaflet-map').setView([CENTER_LAT, CENTER_LNG], ZOOM_LEVEL);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(leafletMap);

function onMapClick(e) {
    if (addNewPolygon) {
        latestPolygon = null;
        currentCoordinates = [];
        addNewPolygon = false;
    }

    currentCoordinates.push([e.latlng.lat, e.latlng.lng]);
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(leafletMap);
    if (currentCoordinates.length >= 3) {
        if (latestPolygon) {
            leafletMap.removeLayer(latestPolygon);
        }

        latestPolygon = L.polygon(currentCoordinates).addTo(leafletMap);
    }
}

function onContextMenu(e) {
    addNewPolygon = true;
}

leafletMap.on('click', onMapClick);
leafletMap.on('contextmenu', onContextMenu);