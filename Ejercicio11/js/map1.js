const map1 = leafletMaps[0];
const alongDistance = 175;

// Crea polilínea
L.polyline(lineCoords, { color: 'red' }).addTo(map1);

// Operación along de TurfJS
const lineString = turf.lineString(lineCoords);
const along = turf.along(lineString, alongDistance);

// Coloca el marcador en la coordenada calculada por along
L.marker([along.geometry.coordinates[0], along.geometry.coordinates[1]])
    .addTo(map1)
    .bindPopup(`Un marcador colocado a ${alongDistance}km del inicio`)
    .openPopup();
