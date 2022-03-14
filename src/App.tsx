import { LatLngExpression } from 'leaflet'
import React, { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Geoman from './components/Geoman'
import { YOLA } from './constants/positions'
import { DistrictType } from './types/districtType'

const App = () => {

  const [districts, setDistrict] = useState<DistrictType[]>([])

  const addDistrict = (newDistrict: DistrictType): void => {
    setDistrict(currentState => {
      return [...currentState, newDistrict]
    })
  }

  const changeDistrict = (id: number, newCoords: LatLngExpression): void => {
    setDistrict(currentState => {
      return currentState.map(item => {
        return { ...item, coords: (item.id === id) ? newCoords : item.coords }
      })
    })
  }

  const removeDistrict = (id: number): void => {
    setDistrict(currentState => {
      return currentState.filter(item => {
        return item.id !== id
      })
    })
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
        <Geoman
          addDistrict={addDistrict}
          changeDistrict={changeDistrict}
          removeDistrict={removeDistrict}
        />
      </MapContainer>
      {JSON.stringify(districts)}
    </div>
  );
}

export default App;

