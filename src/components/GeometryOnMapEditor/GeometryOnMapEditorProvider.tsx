import { useLeafletContext, LeafletContextInterface } from "@react-leaflet/core";
import React, { ReactNode } from "react";
import { LatLngExpression } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface";
import { LeafletGeomanEditorContext } from "./LeafletGeomanEditorContext";

interface IGeometryOnMapEditorProviderProps {
    children?: ReactNode;
}

export const GeometryContext = React.createContext<GeometryOnMapEditorInterface | undefined>(undefined);

const GeometryOnMapEditorProvider = (props: IGeometryOnMapEditorProviderProps) => {
    const context: LeafletContextInterface = useLeafletContext();
    const markerRef = React.useRef<L.Marker>(null);
    const mapContainer: any = context.layerContainer || context.map;
    const [popupContent, setPopupContent] = React.useState(undefined as JSX.Element | undefined)
    const geometryContext = React.useMemo(() => new LeafletGeomanEditorContext(mapContainer, markerRef, setPopupContent), [mapContainer]);
    const position: LatLngExpression = [56.631124, 47.894478]

    return (
        <GeometryContext.Provider value={geometryContext}>
            <Marker position={position} ref={markerRef}>
                <Popup>
                    {popupContent}
                </Popup>
            </Marker>
            {props.children}
        </GeometryContext.Provider>
    )
}

export default GeometryOnMapEditorProvider;