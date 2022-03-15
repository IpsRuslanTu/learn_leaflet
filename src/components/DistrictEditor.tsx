import React from 'react';
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from './GeometryOnMapEditorProvider';
import { LatLngExpression } from 'leaflet';

const DistrictEditor = () => {

    const geometryContext = React.useContext(GeometryContext);
    if (!geometryContext) {
        throw new Error("Geometry context is undefined")
    }

    geometryContext.onPolygonCreate((coords: LatLngExpression) => {
        // создать объект DistrictType, передать его дальше в App.tsx
    });
    
    return null
}

export default DistrictEditor;