import { useLeafletContext, LeafletContextInterface } from "@react-leaflet/core"
import React, { ReactNode } from "react"
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface"
import { GeometryOnMapEditorContext } from "./GeometryOnMapEditorContext"

interface IGeometryOnMapEditorProviderProps {
    children?: ReactNode;
}

export const GeometryContext = React.createContext<GeometryOnMapEditorInterface | undefined>(undefined);

const GeometryOnMapEditorProvider = (props: IGeometryOnMapEditorProviderProps) => {

    const context: LeafletContextInterface = useLeafletContext()
    const mapContainer: any = context.layerContainer || context.map
    const geometryContext = React.useMemo(() => new GeometryOnMapEditorContext(mapContainer), [mapContainer]);

    React.useEffect(() => {
        mapContainer.pm.addControls({
            position: 'topright',
            drawCircleMarker: false,
            drawMarker: false,
            drawPolyline: false,
            drawRectangle: false,
            drawCircle: false,
            rotateMode: false,
            dragMode: false,
            cutPolygon: false,
            editMode: false
        })

        mapContainer.pm.setGlobalOptions({ pmIgnore: false, allowSelfIntersection: false })

        console.log("geoman inited")
    }, [mapContainer]);

    return (
        <GeometryContext.Provider value={geometryContext}>
            {props.children}
        </GeometryContext.Provider>
    )
}

export default GeometryOnMapEditorProvider