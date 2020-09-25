let currentCoordinates = [];
let pairEvent = false;
let countMarker = -1;
let tiles = [
    [
        'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        'Mapa topografico'
    ],
    [
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        'MapBox',
    ],
    [
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
        'Open Street'
    ],
    [
        'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', 
        'Dark Map'
    ],
    [
        'https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=792bd9abb4054a2a825cea734c389ecb', 
        'Fire'
    ],
];
var select = document.getElementById('tiles');

//AGREGAR LOS TILES AL SELECT
for (var i = 0; i < tiles.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = tiles[i][1];
    opt.value = tiles[i][0];
    select.appendChild(opt);
}


let leafletMap = L.map("map1").setView([CENTER_LAT, CENTER_LNG], ZOOM_LEVEL);
let myLayer = L.tileLayer(tiles[2][0], {
    maxZoom: 18,
    attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
});

myLayer.addTo(leafletMap);

//INICIALIZAR EL ICONO POR PRIMERA VEZ
let icon = L.icon({
    iconUrl: '../Ejercicio5/resources/images/leaf-green.png',
    shadowUrl: '../Ejercicio5/resources/images/leaf-shadow.png',
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62]
})

function onMapClick(e) {
    currentCoordinates.push( L.marker([e.latlng.lat, e.latlng.lng], { icon: icon }));
    L.marker([e.latlng.lat, e.latlng.lng], { icon: icon }).addTo(leafletMap);
    countMarker++;
    if (countMarker >= MIN_MARKERS) {
        icon = selectIcon();
        L.marker([e.latlng.lat, e.latlng.lng], { icon: icon }).addTo(leafletMap);
        countMarker = 0;
        console.log(currentCoordinates);
    }
}

leafletMap.on("click", onMapClick);

function selectIcon() {
    const url = pairEvent ? '../Ejercicio5/resources/images/leaf-green.png' : '../Ejercicio5/resources/images/leaf-red.png';
    icon = L.icon({
        iconUrl: url,
        shadowUrl: '../Ejercicio5/resources/images/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62]
    })
    pairEvent = !pairEvent;
    return icon;
}

function changeTile(){
    leafletMap.off();
    leafletMap.remove();
    leafletMap.removeLayer(myLayer);

    leafletMap = L.map("map1").setView([CENTER_LAT, CENTER_LNG], ZOOM_LEVEL);
    myLayer = L.tileLayer(((select.options[select.selectedIndex].value)), {
        maxZoom: 18,
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
    });

    myLayer.addTo(leafletMap);
    for (let index = 0; index < currentCoordinates.length; index++) {
        currentCoordinates[index].addTo(leafletMap);
    }
    if (countMarker != -1) {
        countMarker--;
    }
    leafletMap.on("click", onMapClick);
}

function resetMap(){
    leafletMap.off();
    leafletMap.remove();
    leafletMap.removeLayer(myLayer);

    leafletMap = L.map("map1").setView([CENTER_LAT, CENTER_LNG], ZOOM_LEVEL);
    myLayer = L.tileLayer((tiles[2][0]), {
        maxZoom: 18,
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
    });

    myLayer.addTo(leafletMap);
    currentCoordinates = [];
    countMarker = -1;
    leafletMap.on("click", onMapClick);
}

