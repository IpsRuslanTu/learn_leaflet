import { Geocode } from "../../models/Geocode";

export interface GeometryOnMapEditorInterface {
    onPolygonCreate: (action: (id: number, coords: Geocode[]) => void) => void;

    onPolygonEdit: (action: (id: number, coords: Geocode[]) => void) => void;

    onPolygonDelete: (action: (id: number) => void) => void;

    addPolygon: (id: number, coords: Geocode[]) => void;

    setSelfIntersection: (selfIntersection: boolean) => void;

    enablePolygonDraw: () => void;

    enableEditing: () => void;

    enableDeleting: () => void;
}