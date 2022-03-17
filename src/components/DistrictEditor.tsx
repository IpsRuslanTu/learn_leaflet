import React from 'react'
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from './GeometryOnMapEditorProvider'
import { useEffect } from 'react'
import { DistrictType, Geocode } from '../types/types'
import { LatLngBoundsExpression } from 'leaflet'

interface IDistrictEditor {
    addDistrict: (newDistrict: any) => void;
    removeDistrict: (id: number) => void;
}

const DistrictEditor = (props: IDistrictEditor) => {

    const geometryContext = React.useContext(GeometryContext);
    if (!geometryContext) {
        throw new Error("Geometry context is undefined")
    }

    useEffect(() => {
        geometryContext.subscribeOnPolygonCreate((id: number, coords: any) => {
            // создать объект DistrictType, передать его дальше в App.tsx
            const geocodeCoords = coords.map((item: any) => {
                const point: Geocode = {lat: 0, lng: 0};
                point.lat = item.lat;
                point.lng = item.lng;
                return point
            });

            const newDistrict: DistrictType = { id: id, coords: geocodeCoords };
            props.addDistrict(newDistrict);
        });

        geometryContext.onDeletePoligon((id: number) => {
            props.removeDistrict(id);
        });
    }, [])



    return null
}

export default DistrictEditor;