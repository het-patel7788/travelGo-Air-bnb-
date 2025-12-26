let coordinates = listing.geometry.coordinates; 


if (!coordinates || coordinates.length === 0) {
    coordinates = [0, 0]; 
}

const map = tt.map({
    key: mapToken, 
    container: 'map', 
    center: coordinates,
    zoom: 9,
    style: 'https://api.tomtom.com/map/1/style/20.0.0-8/basic_main.json?key=' + mapToken
});

const marker = new tt.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .setPopup(new tt.Popup({ offset: 35 }).setHTML(
        `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`
    ))
    .addTo(map);

map.addControl(new tt.NavigationControl());