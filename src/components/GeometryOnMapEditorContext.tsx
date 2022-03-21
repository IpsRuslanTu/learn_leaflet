import * as L from 'leaflet';
import { LatLngExpression } from "leaflet";
import { Geocode } from "../types/types";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface";

export class GeometryOnMapEditorContext implements GeometryOnMapEditorInterface {
    private readonly mapContainer: any;
    private readonly polygonCreateActions: ((id: number, coords: Geocode[]) => void)[];
    private readonly polygonEditActions: ((id: number, coords: Geocode[]) => void)[];
    private readonly polygonDeleteActions: ((id: number) => void)[];
    private readonly polygonIdMap: { [id: number]: number };

    public constructor(mapContainer: any) {
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
        this.subscribeOnEvents();
    }

    private latLngToGeocode(arrLatLng: any): Geocode[] {
        const geocode: Geocode[] = arrLatLng.map((item: any) => {
            const point: Geocode = { lat: 0, lng: 0 };
            point.lat = item.lat;
            point.lng = item.lng;
            return point;
        })
        return geocode;
    }

    private searchInPolygonIdMap(id: number): number {
        if (id in this.polygonIdMap) return this.polygonIdMap[id];
        else return id;
    }

    private controlPolygonOnEditRemove(polygon: any) {
        polygon.on('pm:edit', (e: any) => {
            const idPolygonEdit = this.searchInPolygonIdMap(e.layer._leaflet_id);
            const coordsEditLatLng: LatLngExpression = e.layer.getLatLngs()[0];
            const geocodeCoordsEdit: Geocode[] = this.latLngToGeocode(coordsEditLatLng);

            this.polygonEditActions.forEach((a) => a(idPolygonEdit, geocodeCoordsEdit));
        })
        polygon.on('pm:remove', (e: any) => {
            const idForRemove = this.searchInPolygonIdMap(e.layer._leaflet_id);
            this.polygonDeleteActions.forEach((a) => a(idForRemove));
        })
    }

    private subscribeOnEvents() {
        this.mapContainer.on('pm:create', (e: any) => {
            const geomanLayer = e.layer;

            const coordsLatLng: LatLngExpression = geomanLayer.getLatLngs()[0];
            const geocodeCoords: Geocode[] = this.latLngToGeocode(coordsLatLng);
            this.polygonIdMap[geomanLayer._leaflet_id] = -geomanLayer._leaflet_id;

            this.polygonCreateActions.forEach((a) => a(-geomanLayer._leaflet_id, geocodeCoords));

            this.controlPolygonOnEditRemove(e.layer);
        })
    }

    public setSelfIntersection(selfIntersection: boolean) {
        this.mapContainer.pm.setGlobalOptions({ pmIgnore: false, allowSelfIntersection: selfIntersection })
    }

    public enablePolygonDraw() {
        this.mapContainer.pm.addControls({
            drawPolygon: true
        })
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

    public onPolygonCreate(action: (id: number, coords: Geocode[]) => void): void {
        this.polygonCreateActions.push(action);
    }

    public onPolygonEdit(action: (id: number, coords: Geocode[]) => void): void {
        this.polygonEditActions.push(action);
    }

    public onPolygonDelete(action: (id: number) => void): void {
        this.polygonDeleteActions.push(action);
    }

    public addPolygon(id: number, coords: Geocode[]): void {
        const latlngs: L.LatLngExpression[] = coords.map((coord) => ({ lat: coord.lat, lng: coord.lng }));

        const polygon: any = L.polygon(latlngs)
        polygon.addTo(this.mapContainer)

        this.polygonIdMap[polygon._leaflet_id] = id;

        this.controlPolygonOnEditRemove(polygon);
    }
}