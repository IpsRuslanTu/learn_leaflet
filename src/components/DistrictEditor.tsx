import React from 'react';
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from './GeometryOnMapEditorProvider';
import { LatLngExpression } from 'leaflet';

interface IDistrictEditorProps {
    addDistrict: (newDistrict: any) => void;
}

const DistrictEditor = (props: IDistrictEditorProps) => {

    const geometryContext = React.useContext(GeometryContext);
    if (!geometryContext) {
        throw new Error("Geometry context is undefined")
    }

    geometryContext.onPolygonCreate((coords: LatLngExpression) => {
        props.addDistrict(coords);
    });
    
    return null
}

export default DistrictEditor;