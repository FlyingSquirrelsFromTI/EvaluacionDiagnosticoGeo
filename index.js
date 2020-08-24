function initMap() {

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    var coordenadas = {
        lat: 21.152821,
        lng: -101.711612
    };
    var map = new google.maps.Map(document.getElementById("map"), {
        center: coordenadas,
        zoom: 15
    });
    var mark = new google.maps.Marker({ position: coordenadas, map, icon : iconBase + 'parking_lot_maps.png' });
}
