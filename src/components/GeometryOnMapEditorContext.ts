import { LatLngExpression } from "leaflet";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface";

export class GeometryOnMapEditorContext implements GeometryOnMapEditorInterface {
    public readonly mapContainer: any;

    public constructor(mapContainer: any) {
        this.mapContainer = mapContainer;
    }
    public onPolygonCreate(action: (coords: LatLngExpression) => void): void {
        console.log("subscribe action through mapContainer")
        console.log(this.mapContainer)
    }
}