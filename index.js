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

    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    for (const marker of markers) {
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    }
}
