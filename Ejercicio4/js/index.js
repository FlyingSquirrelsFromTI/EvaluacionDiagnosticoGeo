let currentCoordinates = [];
let secondMapCoordinates = [];
let latestPolygon = null;
let addNewPolygon = true;
let leafletMap2;

// My firebase config
var firebaseConfig = {
  apiKey: "AIzaSyCa7xMnsowLccKlTfad-IxV75cey7yzUnQ",
  authDomain: "jorgerangel65952.firebaseapp.com",
  databaseURL: "https://jorgerangel65952.firebaseio.com",
  projectId: "jorgerangel65952",
  storageBucket: "jorgerangel65952.appspot.com",
  messagingSenderId: "184673916307",
  appId: "1:184673916307:web:d798c0f3774bcd86b74466",
  measurementId: "G-LL6BJPQKJ3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

//Init leafletMap
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
    try {
      for (let i = 0; i < currentCoordinates.length; i++) {
        db.collection("Coordenadas").add({
            coords: new firebase.firestore.GeoPoint(currentCoordinates[i][0], currentCoordinates[i][1]),
        });
      }

      swal.fire({
        title: "La siguientes coordenadas se guardaron exitosamente:",
        target: document.getElementById("alert"),
        html: currentCoordinatesToHTML(),
        icon: "info",
        confirmButtonText: "Gracias!",
      });
    } catch (error) {
      swal.fire({
        title: "Ocurrio un error al guardar coordenadas",
        text: error,
        icon: "error",
        confirmButtonText: "Gracias!",
      });
    }
  }
}

function onContextMenu(e) {
  addNewPolygon = true;
}

leafletMap.on("click", onMapClick);
leafletMap.on("contextmenu", onContextMenu);

function currentCoordinatesToHTML() {
  let html = "";
  currentCoordinates.forEach((coordenate, index) => {
    html += `<span><b>${index + 1}:</b></span>${coordenate}</br>`;
  });
  return html;
}
