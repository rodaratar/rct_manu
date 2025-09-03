import { MapContainer, TileLayer, Popup, LayersControl, LayerGroup, Circle, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import './MapView.css';

import L from 'leaflet';


// src/components/Mapa.jsx
import { useEffect, useState } from 'react';

const MapView = () => {

  // Crear ícono personalizado
  const customIcon = L.icon({
    iconUrl: process.env.PUBLIC_URL + '/icons/l3.png', // Ruta desde la carpeta public
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  // Función que agrega un popup a cada feature
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.magnitud) {
      layer.bindPopup(`<b>${feature.properties.magnitud}</b>`);
    }
  };


  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/geojson/IGP_1.geojson')
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error('Error al cargar GeoJSON:', error));
  }, []);

  return (
    <div className='leaflet-container'>
      <MapContainer zoom={13} center={[-10.61, -75.02]}>

        <LayersControl position="topright">
          <LayersControl.Overlay name="Calles">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Geojson">
            {geoData && (
              <GeoJSON
                data={geoData}
                pointToLayer={(feature, latlng) => {
                  return L.marker(latlng, { icon: customIcon });
                }}
                onEachFeature={onEachFeature}
              />
            )}
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Marker with popup">
            <Circle
              center={[-10.61, -75.02]}
              pathOptions={{ color: 'orange', fillColor: 'orange' }}
              radius={1000}
            >
              <Popup>
                <b>Este es un círculo</b><br />
                Coordenadas: [-10.61, -75.02]<br />
                Radio: 1km
              </Popup>
            </Circle>
          </LayersControl.Overlay>

          <LayersControl.Overlay name="UnPunto">
            <Circle
              center={[-10.74, -75.99]}
              pathOptions={{ color: 'black', fillColor: 'black' }}
              radius={10000}
            />
          </LayersControl.Overlay>


          <LayersControl.Overlay name="VariosPuntos">
            <LayerGroup>
              <Circle
                center={[-10.88, -75.93]}
                pathOptions={{ fillColor: 'blue' }}
                radius={1000}
              />
              <Circle
                center={[-10.73, -75.89]}
                pathOptions={{ fillColor: 'red' }}
                radius={10000}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[-10.77, -75.23]}
                  pathOptions={{ color: 'green', fillColor: 'green' }}
                  radius={1000}
                />
              </LayerGroup>
            </LayerGroup>


          </LayersControl.Overlay>

        </LayersControl>

      </MapContainer>
    </div>
  )
}

export default MapView;