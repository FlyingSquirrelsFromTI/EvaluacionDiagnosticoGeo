function initMap() {
    let iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
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
        zoom: 14
    });

    let markers = [
        new google.maps.Marker({ position: coordsCentro, map, icon, title: "Uluru (Ayers Rock)", }),
        new google.maps.Marker({ position: coordsPeluqueria, map, icon, title: "Uluru (Ayers Rock)", }),
        new google.maps.Marker({ position: coordsNuby, map, icon, title: "Uluru (Ayers Rock)", }),
    ];
    let infoWindows = [
        new google.maps.InfoWindow({
            content: 'El centro de la ciudad',
        }),
        new google.maps.InfoWindow({
            content: 'La peluquería donde voy a cortarme el pelo',
        }),
        new google.maps.InfoWindow({
            content: 'Donde hacen los helados más sabrosos de León',
        }),
    ];

    for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        marker.addListener("click", () => {
            infoWindows[i].open(map, marker);
        });
    }
}
