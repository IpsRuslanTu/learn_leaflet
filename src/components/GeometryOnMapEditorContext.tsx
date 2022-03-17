import { LatLngExpression } from "leaflet"
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface"

export class GeometryOnMapEditorContext implements GeometryOnMapEditorInterface {
    private readonly mapContainer: any;
    private readonly polygonCreateActions: ((id: number, coords: LatLngExpression) => void)[];
    private readonly polygonDeleteActions: ((id: number) => void)[];

    public constructor(mapContainer: any) {
        console.log("context created");
        this.mapContainer = mapContainer;
        this.polygonCreateActions = [];
        this.polygonDeleteActions = [];
        this.subscribeOnEvents();
    }

    private subscribeOnEvents() {
        this.mapContainer.on('pm:create', (e: any) => {
            let geomanLayer = e.layer;

            const idNewPoligon: number = geomanLayer._leaflet_id;
            const coords: LatLngExpression = geomanLayer.getLatLngs()[0];

            this.polygonCreateActions.forEach((a) => a(idNewPoligon, coords));

            e.layer.on('pm:remove', (e: any) => {
                const idForRemove = e.layer._leaflet_id;

                this.polygonDeleteActions.forEach((a) => a(idForRemove));
                console.log(`poligon № ${idForRemove} deleted`);
            })
        })
    }

    public subscribeOnPolygonCreate(action: (id: number, coords: LatLngExpression) => void): void {
        this.polygonCreateActions.push(action);
    }

    public onDeletePoligon(action: (id: number) => void): void {
        this.polygonDeleteActions.push(action);
    }
}