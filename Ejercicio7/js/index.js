
let currentCoordinates = [];

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

leafletMap.locate({ setView: true, maxZoom: 16 });

function currentCoordinatesToHTML() {
  let html = "";
  currentCoordinates.forEach((coordenate, index) => {
    html += `<span><b>${index + 1}:</b></span>${coordenate}</br>`;
  });
  return html;
}

//FUNCION PARA OBTENER LOCALIZACIÓN
function onLocationFound(e) {
  var radius = e.accuracy;
  console.log("This is from current pos:", e.latitude, e.longitude);
  L.marker(e.latlng)
    .addTo(leafletMap)
    .bindPopup("You are within " + radius + " meters from this point")
    .openPopup();

  //L.circle(e.latlng, radius).addTo(leafletMap);
    try {
      db.collection("CoordenadasTiempoReal").add({
        coords: new firebase.firestore.GeoPoint(e.latitude, e.longitude),
        metodo: "Localizacion usuario"
      });
      
      swal.fire({
        title: "La siguientes coordenadas se guardaron exitosamente:",
        target: document.getElementById("alert"),
        text: e.latlng,
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

leafletMap.on("locationfound", onLocationFound);

//FUNCION DE ALERTA EN CASO DE ERROR AL OBTENER GEOLOCALIZACION
function onLocationError(e) {
  swal.fire({
    title: "Ocurrio un error al obtner los servicios de geolocalizacion",
    text:
      e.message +
      ". Si desea guardar una coordenada utilice las cajas de texto mostradas en el sitio",
    icon: "error",
    confirmButtonText: "Gracias!",
  });
}

leafletMap.on("locationerror", onLocationError);

//FUNCION PARA OBTENER LOS DATOS DE FB
db.collection("CoordenadasTiempoReal")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      console.log(doc.data().coords.O, doc.data().coords.F);
      L.marker([doc.data().coords.O, doc.data().coords.F]).addTo(leafletMap);
      leafletMap.locate({
        setView: [doc.data().coords.O, doc.data().coords.F],
        maxZoom: ZOOM_LEVEL,
      });
    });
  });

//GUARDAR COORDENADAS MANUALMENTE
function saveCoordsManualy() {
  try {
    db.collection("CoordenadasTiempoReal").add({
      coords: new firebase.firestore.GeoPoint(
        parseInt(document.getElementById("txtLat").value),
        parseInt(document.getElementById("txtLong").value)
      ),
      metodo: "Manual"
    });
    L.marker([
      parseInt(document.getElementById("txtLat").value),
      parseInt(document.getElementById("txtLong").value),
    ]).addTo(leafletMap);
    swal.fire({
      title: "La siguientes coordenadas se guardaron exitosamente:",
      target: document.getElementById("alert"),
      text:
        document.getElementById("txtLat").value +
        " " +
        document.getElementById("txtLong").value,
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