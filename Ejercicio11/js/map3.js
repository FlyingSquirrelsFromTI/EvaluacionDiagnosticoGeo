const map3 = leafletMaps[2];

// Crea polígono
L.polygon(polygonCoords, { color: 'red' }).addTo(map3);

// Operación along de TurfJS
const polygon2 = turf.polygon([polygonCoords]);
const pointOnFeature = turf.pointOnFeature(polygon2);

// Coloca el marcador en la coordenada calculada por pointOnFeature
L.marker([
    pointOnFeature.geometry.coordinates[0],
    pointOnFeature.geometry.coordinates[1],
])
    .addTo(map3)
    .bindPopup(`Un marcador colocado dentro del polígono`)
    .openPopup();
