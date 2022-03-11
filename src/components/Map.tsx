import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { YOLA } from '../constants/positions';
import { DistrictType } from '../types/types';
import Geoman from './Geoman'
import LocationMarker from './LocationMarker'


interface IMap {
  addDistrict(newDistrict: DistrictType): void;
}

const Map = (props: IMap) => {

  return (
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
      {/* <LocationMarker /> */}
      <Geoman addDistrict={props.addDistrict} />
    </MapContainer>
  )
}
export default Map