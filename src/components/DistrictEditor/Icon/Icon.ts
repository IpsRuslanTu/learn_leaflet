import L from 'leaflet';

const icon = new L.Icon({
    iconUrl: require('./red_circle.png'),
    iconRetinaUrl: require('./red_circle.png'),
    iconSize: new L.Point(0, 0),
    className: 'leaflet-div-icon'
});

export { icon };