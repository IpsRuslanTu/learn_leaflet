import React from 'react'
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from './GeometryOnMapEditorProvider'
import { useEffect } from 'react'
import { DistrictType, Geocode } from '../types/types'

interface IDistrictEditor {
    addDistrict: (newDistrict: any) => void;
    editDistrict: (id: number, newCoords: Geocode[]) => void;
    removeDistrict: (id: number) => void;
}

const DistrictEditor = (props: IDistrictEditor) => {

    const geometryContext = React.useContext(GeometryContext);
    if (!geometryContext) {
        throw new Error("Geometry context is undefined")
    }

    useEffect(() => {
        geometryContext.subscribeOnPolygonCreate((id: number, coords: Geocode[]) => {
            const newDistrict: DistrictType = { id: id, coords: coords };
            props.addDistrict(newDistrict);
        });

        geometryContext.onPoligonEdit((id: number, coords: Geocode[]) => {
            props.editDistrict(id, coords);
        })

        geometryContext.onPoligonDelete((id: number) => {
            props.removeDistrict(id);
        });
    }, [])

    return null
}

export default DistrictEditor;