function initMap() {

    let icon = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';

    let coordsCentro = {
        lat: 21.121786,
        lng: -101.682587
    };
    let coordsPeluqueria = {
        lat: 21.118267,
        lng: -101.683822
    };
    let coordsNuby = {
        lat: 21.135909,
        lng: -101.694582
    };

    let map = new google.maps.Map(document.getElementById('map'), {
        center: coordsCentro,
        zoom: 12
    });

    let markers = [
        new google.maps.Marker({ position: coordsCentro, map, icon }),
        new google.maps.Marker({ position: coordsPeluqueria, map, icon }),
        new google.maps.Marker({ position: coordsNuby, map, icon }),
    ];
}
