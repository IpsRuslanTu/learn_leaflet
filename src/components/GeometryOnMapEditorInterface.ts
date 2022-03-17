import { Geocode } from "../types/types";

export interface GeometryOnMapEditorInterface {
    subscribeOnPolygonCreate: (action: (id: number, coords: Geocode[]) => void) => void;

    onPoligonEdit: (action: (id: number, coords: Geocode[]) => void) => void;

    onPoligonDelete: (action: (id: number) => void) => void;
}