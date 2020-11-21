'use strict';

const leafletMaps = [];
// Inicializa los mapas de ejemplo
for (const mapEl of document.getElementsByClassName('leaflet-map')) {
    leafletMaps.push(
        L.map(mapEl.id).setView([CENTER_LAT, CENTER_LNG], ZOOM_LEVEL)
    );
}

for (const map of leafletMaps) {
    L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
        }
    ).addTo(map);
}
