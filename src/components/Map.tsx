import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import Geoman from './Geoman'
import LocationMarker from './LocationMarker'

const Map = () => {

  return (
    <MapContainer
      center={{lat: 56.6311124, lng: 47.794478}}
      zoom={11}
      zoomControl={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://osm-new.yoso.ru:8080/tile/{z}/{x}/{y}.png"
      />
      {/* <LocationMarker /> */}
      <Geoman />
    </MapContainer>
  )
}
export default Map