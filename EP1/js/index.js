let currentCoordinates = [];
let latestPolygon = null;
let addNewPolygon = true;
let secondMapCoordinates = [];
let leafletMap2;
let tiles = [
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
];

const leafletMap = L.map("map1").setView([CENTER_LAT, CENTER_LNG], ZOOM_LEVEL);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
}).addTo(leafletMap);

function onMapClick(e) {
    if (addNewPolygon) {
        latestPolygon = null;
        currentCoordinates = [];
        addNewPolygon = false;
    }

    currentCoordinates.push([e.latlng.lat, e.latlng.lng]);
    L.marker([e.latlng.lat, e.latlng.lng]).addTo(leafletMap);
    if (currentCoordinates.length >= MIN_MARKERS) {
        if (latestPolygon) {
            leafletMap.removeLayer(latestPolygon);
        }

        latestPolygon = L.polygon(currentCoordinates).addTo(leafletMap);
        secondMapCoordinates.push.apply(secondMapCoordinates, currentCoordinates);

        //SE AGREGA TODO AL SEGUNDO MAPA

        if (leafletMap2 !== undefined) {
            leafletMap2.off();
            leafletMap2.remove();
        }
        leafletMap2 = L.map("map2").setView(
            [CENTER_LAT, CENTER_LNG],
            ZOOM_LEVEL
        );
        L.tileLayer(tiles[(Math.floor((Math.random() * 3) + 0))], {
            maxZoom: 18,
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
        }).addTo(leafletMap2);
        for (let i = 0; i < secondMapCoordinates.length; i++) {
            L.marker([secondMapCoordinates[i][0], secondMapCoordinates[i][1]]).addTo(leafletMap2);
        }

        // Llamar alerta
        swal.fire({
            title: 'Sus Coordenadas:',
            target: document.getElementById('alert'),
            html: currentCoordinatesToHTML(),
            icon: 'info',
            confirmButtonText: "Gracias!"
        });
    }
}

function onContextMenu(e) {
    addNewPolygon = true;
}

leafletMap.on("click", onMapClick);
leafletMap.on("contextmenu", onContextMenu);

function currentCoordinatesToHTML() {
    let html = '';
    currentCoordinates.forEach((coordenate, index) => {
        html += `<span><b>${index + 1}:</b></span>${coordenate}</br>`;
    })
    return html;
}
