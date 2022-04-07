import { Geocode } from "../../models/Geocode";
import { Polygon } from "./models/Polygon";

export interface GeometryOnMapEditorInterface {
    onPolygonCreate: (action: (polygon: Polygon) => void) => void;

    onPolygonEdit: (action: (id: number, coords: Geocode[]) => void) => void;

    onPolygonDelete: (action: (id: number) => void) => void;

    addPolygon: (id: number, coords: Geocode[]) => Polygon;

    setSelfIntersection: (selfIntersection: boolean) => void;

    enablePolygonDraw: () => void;

    enableEditing: () => void;

    enableDeleting: () => void;

    getPolygonIdByLeafletId(leafletId: number): number;

    deleteLayer: (id: number) => void;
}