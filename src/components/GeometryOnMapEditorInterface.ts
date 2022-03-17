import { LatLngExpression } from "leaflet";

export interface GeometryOnMapEditorInterface {
    subscribeOnPolygonCreate: (action: (id: number, coords: LatLngExpression) => void) => void;

    onDeletePoligon: (action: (id: number) => void) => void;
}