import { useLeafletContext, LeafletContextInterface } from "@react-leaflet/core"
import React, { ReactNode } from "react"
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface"
import { GeometryOnMapEditorContext } from "./GeometryOnMapEditorContext"

interface IGeometryOnMapEditorProviderProps {
    children?: ReactNode
}

export const GeometryContext = React.createContext(undefined as GeometryOnMapEditorInterface | undefined);

const GeometryOnMapEditorProvider = (props: IGeometryOnMapEditorProviderProps) => {

    const context: LeafletContextInterface = useLeafletContext()
    const mapContainer: any = context.layerContainer || context.map;
    const geometryContext = new GeometryOnMapEditorContext(mapContainer);

    React.useEffect(() => {
        mapContainer.pm.addControls({
          position: 'topright',
          drawCircleMarker: false,
          drawPolyline: false,
          drawRectangle: false,
          drawCircle: false,
          rotateMode: false,
          dragMode: false,
          cutPolygon: false
        })
      
        mapContainer.pm.setGlobalOptions({ pmIgnore: false });

        console.log("geoman inited");
    });    

    return (
        <GeometryContext.Provider value={geometryContext}>
            {props.children}
        </GeometryContext.Provider>
    )
}

export default GeometryOnMapEditorProvider