import { LatLngExpression } from "leaflet";
import React, { ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeometryOnMapEditorProvider from "./GeometryOnMapEditorProvider";

export interface IGeometryOnMapEditorProps {
    children?: ReactNode;
    area: LatLngExpression;
    zoomValue: number;
}

const GeometryOnMapEditor = (props: IGeometryOnMapEditorProps) => {
    return (
        <MapContainer
            center={props.area}
            zoom={props.zoomValue}
            zoomControl={true}
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