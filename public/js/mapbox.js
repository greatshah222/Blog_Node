export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYmlzaGx1IiwiYSI6ImNrYTZudXY4eDAxcWYyeG16dHBrcmFqNXgifQ.sP57BolySBydnCi36njfQg';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/bishlu/cka6oeop70r521iphjc2uam6l',
    scrollZoom: false,
    // setting centre to oulu and then zoom
    // center: [25.4651, 65.0121],
    // zoom: 6,
  });
  const bounds = new mapboxgl.LngLatBounds();
  locations.forEach((loc) => {
    var marker = new mapboxgl.Marker({
      anchor: 'bottom',
      color: 'blue',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    var popup = new mapboxgl.Popup({
      anchor: 'top',
      offset: -5,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p> Day${loc.day}:${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 100,
      left: 100,
      right: 100,
    },
  });
};
