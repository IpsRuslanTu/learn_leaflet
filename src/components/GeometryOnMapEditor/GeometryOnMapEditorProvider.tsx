import { useLeafletContext, LeafletContextInterface } from "@react-leaflet/core";
import React, { ReactNode } from "react";
import L, { LatLngExpression } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface";
import { LeafletGeomanEditorContext } from "./LeafletGeomanEditorContext";
import { WorkWithPopup } from "../../classes/WorkWithPopup";

interface IGeometryOnMapEditorProviderProps {
    children?: ReactNode;
}

export const GeometryContext = React.createContext<GeometryOnMapEditorInterface | undefined>(undefined);

const GeometryOnMapEditorProvider = (props: IGeometryOnMapEditorProviderProps) => {
    const context: LeafletContextInterface = useLeafletContext();
    const mapContainer: any = context.layerContainer || context.map;

    const [markerPos, setMarkerPos] = React.useState<LatLngExpression>([56.631124, 47.894478]);

    const markerRef = React.useRef<L.Marker>(null);
    const [popupContent, setPopupContent] = React.useState(undefined as JSX.Element | undefined)

    const popupMain = React.useMemo(() => new WorkWithPopup(markerRef, setPopupContent, 
        setMarkerPos), [markerRef, setPopupContent, setMarkerPos]);

    const geometryContext = React.useMemo(() => new LeafletGeomanEditorContext(mapContainer, 
        popupMain), [mapContainer, popupMain]);

    return (
        <GeometryContext.Provider value={geometryContext}>
            <Marker position={markerPos} ref={markerRef}>
                <Popup minWidth={200} >
                    {popupContent}
                </Popup>
            </Marker>
            {props.children}
        </GeometryContext.Provider>
    )
}

export default GeometryOnMapEditorProvider;