import { LatLngExpression } from "leaflet";

export interface GeometryOnMapEditorInterface {
    onPolygonCreate: (action: (coords: LatLngExpression) => void) => void;
}