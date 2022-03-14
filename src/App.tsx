import { LatLngExpression } from 'leaflet'
import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Geoman from './components/Geoman'
import { YOLA } from './constants/positions'

const App = () => {

  const [districts, setDistrict] = useState<LatLngExpression[]>([])

  const addDistrict = (newDistrict: LatLngExpression): void => {
    setDistrict([...districts, newDistrict])
  }

  return (
    <div className='App'>
      <MapContainer
        center={YOLA}
        zoom={11}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://osm-new.yoso.ru:8080/tile/{z}/{x}/{y}.png"
        />
        <Geoman addDistrict={addDistrict} />
      </MapContainer>
    </div>
  );
}

export default App;

