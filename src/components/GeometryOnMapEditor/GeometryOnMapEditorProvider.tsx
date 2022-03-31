import { useLeafletContext, LeafletContextInterface } from "@react-leaflet/core";
import React, { ReactNode } from "react";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface";
import { LeafletGeomanEditorContext } from "./LeafletGeomanEditorContext";

interface IGeometryOnMapEditorProviderProps {
    children?: ReactNode;
}

export const GeometryContext = React.createContext<GeometryOnMapEditorInterface | undefined>(undefined);

const GeometryOnMapEditorProvider = (props: IGeometryOnMapEditorProviderProps) => {
    const context: LeafletContextInterface = useLeafletContext();
    const mapContainer: any = context.layerContainer || context.map;

    const geometryContext = React.useMemo(() => new LeafletGeomanEditorContext(mapContainer), [mapContainer]);

    return (
        <GeometryContext.Provider value={geometryContext}>
            {props.children}
        </GeometryContext.Provider>
    )
}

export default GeometryOnMapEditorProvider;