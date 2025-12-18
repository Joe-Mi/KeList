import L  from 'leaflet';
import {useRef, useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import '../CSS/map.css';

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const center = { lng: 36.817223, lat: -1.286389 };
    const [zoom] = useState(9);
    const popupInstance = L.popup();

    function onMapClick(e) {
        popupInstance
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map.current);
    }

    useEffect(() => {
        if (map.current) return;

        map.current = new L.Map(mapContainer.current, {
            center: L.latLng(center.lat, center.lng),
            zoom: zoom
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map.current);

        map.current.on('click', onMapClick);
    }, [center.lng, center.lat, zoom]);
    
    return (
        <div className="map-wrap">
            <div ref={mapContainer} className='map'/>
        </div>
    )
}

export default Map;
