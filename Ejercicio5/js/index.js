let currentCoordinates = [];
let latestPolygon = null;
let addNewPolygon = true;
let pairEvent = true;

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
    const icon = selectIcon();
    if (addNewPolygon) {
        latestPolygon = null;
        currentCoordinates = [];
        addNewPolygon = false;
    }

    currentCoordinates.push([e.latlng.lat, e.latlng.lng]);

    L.marker([e.latlng.lat, e.latlng.lng], { icon: icon }).addTo(leafletMap);

    if (currentCoordinates.length >= 3) {
        if (latestPolygon) {
            leafletMap.removeLayer(latestPolygon);
        }

        latestPolygon = L.polygon(currentCoordinates).addTo(leafletMap);
    }
}

function selectIcon() {
    const url = pairEvent ? './resources/images/leaf-green.png' : './resources/images/leaf-red.png';
    icon = L.icon({
        iconUrl: url,
        shadowUrl: './resources/images/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62]
    })
    pairEvent = !pairEvent;
    return icon;
}

function onContextMenu(e) {
    addNewPolygon = true;
}

leafletMap.on('click', onMapClick);
leafletMap.on('contextmenu', onContextMenu);