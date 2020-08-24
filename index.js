function initMap() {
    var coordenadas = {
        lat: 21.152821,
        lng: -101.711612
    };
    var map = new google.maps.Map(document.getElementById("map"), {
        center: coordenadas,
        zoom: 15
    });
    var mark = new google.maps.Marker({ position: coordenadas, map });
}
