let geojson;
let info = L.control();
let legend = L.control({ position: 'bottomright' });

function getColor(d) {
    return d > 1000
        ? '#800026'
        : d > 500
        ? '#BD0026'
        : d > 200
        ? '#E31A1C'
        : d > 100
        ? '#FC4E2A'
        : d > 50
        ? '#FD8D3C'
        : d > 20
        ? '#FEB24C'
        : d > 10
        ? '#FED976'
        : '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
    };
}

function highlightFeature(e) {
    let layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    });
}

const leafletMap = L.map('leaflet-map').setView(
    [CENTER_LAT, CENTER_LNG],
    ZOOM_LEVEL
);
L.tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`,
    {
        maxZoom: 18,
        attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
    }
).addTo(leafletMap);

geojson = L.geoJson(statesData, {
    style: style,
    onEachFeature: onEachFeature,
}).addTo(leafletMap);

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML =
        '<h4>US Population Density</h4>' +
        (props
            ? '<b>' +
              props.name +
              '</b><br />' +
              props.density +
              ' people / mi<sup>2</sup>'
            : 'Hover over a state');
};

info.addTo(leafletMap);

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' +
            getColor(grades[i] + 1) +
            '"></i> ' +
            grades[i] +
            (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(leafletMap);
