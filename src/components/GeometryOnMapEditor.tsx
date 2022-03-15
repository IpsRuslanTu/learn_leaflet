import React, { ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { YOLA } from '../constants/positions'
import GeometryOnMapEditorProvider from "./GeometryOnMapEditorProvider";

export interface IGeometryOnMapEditorProps {
    children?: ReactNode
}

const GeometryOnMapEditor = (props: IGeometryOnMapEditorProps) => {
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
            <GeometryOnMapEditorProvider>
                {props.children}
            </GeometryOnMapEditorProvider>
        </MapContainer>
    )
}

export default GeometryOnMapEditor