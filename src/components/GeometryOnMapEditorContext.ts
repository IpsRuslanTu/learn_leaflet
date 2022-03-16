import { LatLngExpression } from "leaflet";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface";

export class GeometryOnMapEditorContext implements GeometryOnMapEditorInterface {
    private readonly mapContainer: any;
    private readonly polygonCreateActions: ((coords: LatLngExpression) => void)[];

    public constructor(mapContainer: any) {
        console.log("context created");
        this.mapContainer = mapContainer;
        this.polygonCreateActions = [];
        this.subscribeOnEvents();
    }

    private subscribeOnEvents() {
        this.mapContainer.on('pm:create', (e: any) => {        
            let geomanLayer = e.layer        
            const coords = geomanLayer._latlngs[0];

            this.polygonCreateActions.forEach((a) => a(coords))
        })
    }

    public onPolygonCreate(action: (coords: LatLngExpression) => void): void {
        this.polygonCreateActions.push(action);
    }
}