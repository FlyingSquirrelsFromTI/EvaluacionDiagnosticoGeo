// LEAFLET LOGIC
// Define a new Leaflet map instance
const leafletMap = L.map('leaflet-map').setView([CENTER_LAT, CENTER_LNG], ZOOM_LEVEL);

// Add a tile layer to the map
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(leafletMap);

// Add a marker to the map
const marker = L
    .marker([MARKER_LAT, MARKER_LNG])
    .addTo(leafletMap)
    .bindPopup('<b>Hello world!</b><br>I am a <i>Leaflet</i> popup.');