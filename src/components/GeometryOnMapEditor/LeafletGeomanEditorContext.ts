import * as L from "leaflet";
import { LatLngExpression } from "leaflet";
import { Geocode } from "../../models/Geocode";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface";
import { paletteClass } from '../../palette/paletteClass';

export class LeafletGeomanEditorContext implements GeometryOnMapEditorInterface {
    private readonly mapContainer: any;
    private readonly polygonCreateActions: ((id: number, coords: Geocode[]) => void)[];
    private readonly polygonEditActions: ((id: number, coords: Geocode[]) => void)[];
    private readonly polygonDeleteActions: ((id: number) => void)[];
    private readonly polygonIdMap: { [id: number]: number };
    palette = new paletteClass();

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
        this.subscribeOnPolygonCreate();
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

    public addPolygon(id: number, coords: Geocode[]): void {
        const latlngs: L.LatLngExpression[] = this.geocodeToLatLng(coords);

        const polygon: any = L.polygon(latlngs, {
            color: this.palette.setAvailableColor()
        })

        polygon.addTo(this.mapContainer)

        this.polygonIdMap[polygon._leaflet_id] = id;

        this.subcribeOnPolygonEdit(polygon);
        this.subscribeOnPolygonDelete(polygon);
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

    private latLngToGeocode(arrLatLng: any): Geocode[] {
        const geocode: Geocode[] = arrLatLng.map((item: any) => ({ lat: item.lat, lng: item.lng }))
        return geocode;
    }

    private geocodeToLatLng(arrGeocode: Geocode[]): LatLngExpression[] {
        const latlngs: L.LatLngExpression[] = arrGeocode.map((coord) => ({ 
            lat: coord.lat, lng: coord.lng }));
        return latlngs;
    }

    private getPolygonIdByLeafletId(leafletId: number): number {
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
            geomanLayer.setStyle({color: this.palette.setAvailableColor()});

            const coordsLatLng: LatLngExpression = geomanLayer.getLatLngs()[0];
            const geocodeCoords: Geocode[] = this.latLngToGeocode(coordsLatLng);
            this.polygonIdMap[geomanLayer._leaflet_id] = -geomanLayer._leaflet_id;

            this.polygonCreateActions.forEach((a) => a(-geomanLayer._leaflet_id, geocodeCoords));

            this.subcribeOnPolygonEdit(e.layer);
            this.subscribeOnPolygonDelete(e.layer);
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
            this.palette.deleteColorFromPalette(polygon.options.color);
        })
    }
}