import * as L from "leaflet";
import { LatLngExpression } from "leaflet";
import { makeAutoObservable } from "mobx";
import { Geocode } from "../../models/Geocode";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface";
import { Palette } from './models/Palette';
import { Polygon } from "./models/Polygon";

export class LeafletGeomanEditorContext implements GeometryOnMapEditorInterface {
    private readonly mapContainer: any;
    private readonly polygonCreateActions: ((polygon: Polygon) => void)[];
    private readonly polygonEditActions: ((id: number, coords: Geocode[]) => void)[];
    private readonly polygonDeleteActions: ((id: number) => void)[];
    private readonly polygonIdMap: { [id: number]: number };
    private palette: Palette;

    public constructor(mapContainer: any) {
        makeAutoObservable(this)
        this.mapContainer = mapContainer;
        this.mapContainer.pm.addControls({
            position: 'topright',
            drawCircleMarker: false,
            drawMarker: false,
            drawPolyline: false,
            drawRectangle: false,
            drawCircle: false,
            rotateMode: false,
            dragMode: false,
            cutPolygon: false,
            editMode: false,
            drawPolygon: false,
            removalMode: false
        })
        this.polygonCreateActions = [];
        this.polygonEditActions = [];
        this.polygonDeleteActions = [];
        this.polygonIdMap = {};
        this.palette = new Palette();
    }

    public setSelfIntersection(selfIntersection: boolean) {
        this.mapContainer.pm.setGlobalOptions({
            pmIgnore: false,
            allowSelfIntersection: selfIntersection,
        })
    }

    public enablePolygonDraw() {
        this.mapContainer.pm.addControls({
            drawPolygon: true
        })
        this.subscribeOnPolygonCreate();
    }

    public enableEditing() {
        this.mapContainer.pm.addControls({
            editMode: true
        })
    }

    public enableDeleting() {
        this.mapContainer.pm.addControls({
            removalMode: true
        })
    }

    public addPolygon(id: number, coords: Geocode[]): Polygon {
        const latlngs: L.LatLngExpression[] = this.geocodeToLatLng(coords);

        const polygon: any = L.polygon(latlngs, {
            color: this.palette.getNextColor(),
        });

        polygon.addTo(this.mapContainer);
        this.polygonIdMap[polygon._leaflet_id] = id;

        this.subcribeOnPolygonEdit(polygon);
        this.subscribeOnPolygonDelete(polygon);

        return new Polygon(polygon, id, coords);
    }

    public onPolygonCreate(action: (polygon: Polygon) => void): void {
        this.polygonCreateActions.push(action);
    }

    public onPolygonEdit(action: (id: number, coords: Geocode[]) => void): void {
        this.polygonEditActions.push(action);
    }

    public onPolygonDelete(action: (id: number) => void): void {
        this.polygonDeleteActions.push(action);
    }

    private latLngToGeocode(arrLatLng: any): Geocode[] {
        const geocode: Geocode[] = arrLatLng.map((item: any) => ({ lat: item.lat, lng: item.lng }))
        return geocode;
    }

    private geocodeToLatLng(arrGeocode: Geocode[]): LatLngExpression[] {
        const latlngs: L.LatLngExpression[] = arrGeocode.map((coord) => ({
            lat: coord.lat, lng: coord.lng
        }));
        return latlngs;
    }

    public getPolygonIdByLeafletId(leafletId: number): number {
        if (!(leafletId in this.polygonIdMap)) {
            throw new Error("leafletId not in polygonIdMap")
        }
        return this.polygonIdMap[leafletId];
    }

    private subscribeOnPolygonCreate() {
        this.mapContainer.on('pm:create', (e: any) => {
            if (e.shape !== "Polygon") {
                return
            }
            const geomanLayer = e.layer;
            const geomanId = geomanLayer._leaflet_id;

            geomanLayer.setStyle({ color: this.palette.getNextColor() });

            const coordsLatLng: LatLngExpression = geomanLayer.getLatLngs()[0];
            const geocodeCoords: Geocode[] = this.latLngToGeocode(coordsLatLng);
            this.polygonIdMap[geomanId] = -geomanId;
            const polygon = new Polygon(geomanLayer, -geomanId, geocodeCoords);
            this.polygonCreateActions.forEach((a) => a(polygon));

            this.subcribeOnPolygonEdit(geomanLayer);
            this.subscribeOnPolygonDelete(geomanLayer);
        })
    }

    private subcribeOnPolygonEdit(polygon: any) {
        polygon.on('pm:edit', (e: any) => {
            const idPolygonEdit = this.getPolygonIdByLeafletId(e.layer._leaflet_id);
            const coordsEditLatLng: LatLngExpression = e.layer.getLatLngs()[0];
            const geocodeCoordsEdit: Geocode[] = this.latLngToGeocode(coordsEditLatLng);

            this.polygonEditActions.forEach((a) => a(idPolygonEdit, geocodeCoordsEdit));
        })
    }

    private subscribeOnPolygonDelete(polygon: any) {
        polygon.on('pm:remove', (e: any) => {
            const idForRemove = this.getPolygonIdByLeafletId(e.layer._leaflet_id);
            this.polygonDeleteActions.forEach((a) => a(idForRemove));
            this.palette.returnColor(polygon.options.color);
        })
    }
}