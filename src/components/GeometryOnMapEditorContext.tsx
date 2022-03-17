import { LatLngExpression } from "leaflet"
import { LatLngToGeocode } from "../functions/functions";
import { Geocode } from "../types/types";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface"

export class GeometryOnMapEditorContext implements GeometryOnMapEditorInterface {
    private readonly mapContainer: any;
    private readonly polygonCreateActions: ((id: number, coords: Geocode[]) => void)[];
    private readonly polygonEditActions: ((id: number, coords: Geocode[]) => void)[];
    private readonly polygonDeleteActions: ((id: number) => void)[];

    public constructor(mapContainer: any) {
        console.log("context created");
        this.mapContainer = mapContainer;
        this.polygonCreateActions = [];
        this.polygonEditActions = [];
        this.polygonDeleteActions = [];
        this.subscribeOnEvents();
    }

    private subscribeOnEvents() {
        this.mapContainer.on('pm:create', (e: any) => {
            const geomanLayer = e.layer;
            const idNewPoligon: number = geomanLayer._leaflet_id;
            const coordsLatLng: LatLngExpression = geomanLayer.getLatLngs()[0];
            const geocodeCoords: Geocode[] = LatLngToGeocode(coordsLatLng);

            this.polygonCreateActions.forEach((a) => a(idNewPoligon, geocodeCoords));

            e.layer.on('pm:edit', (e: any) => {
                const idPoligonEdit = e.layer._leaflet_id;
                const coordsEditLatLng: LatLngExpression = e.layer.getLatLngs()[0];
                const geocodeCoordsEdit: Geocode[] = LatLngToGeocode(coordsEditLatLng);

                this.polygonEditActions.forEach((a) => a(idPoligonEdit, geocodeCoordsEdit));
              })

            e.layer.on('pm:remove', (e: any) => {
                const idForRemove = e.layer._leaflet_id;

                this.polygonDeleteActions.forEach((a) => a(idForRemove));
                console.log(`poligon № ${idForRemove} deleted`);
            })
        })
    }

    public subscribeOnPolygonCreate(action: (id: number, coords: Geocode[]) => void): void {
        this.polygonCreateActions.push(action);
    }

    public onPoligonEdit(action: (id: number, coords: Geocode[]) => void): void {
        this.polygonEditActions.push(action);
    }

    public onPoligonDelete(action: (id: number) => void): void {
        this.polygonDeleteActions.push(action);
    }
}