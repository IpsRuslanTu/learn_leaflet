import * as L from 'leaflet';
import { LatLngExpression } from "leaflet";
import { Geocode } from "../types/types";
import { GeometryOnMapEditorInterface } from "./GeometryOnMapEditorInterface";

function LatLngToGeocode(arrLatLng: any): Geocode[] {
    const geocode: Geocode[] = arrLatLng.map((item: any) => {
      const point: Geocode = { lat: 0, lng: 0 };
      point.lat = item.lat;
      point.lng = item.lng;
      return point;
    })
    return geocode;
  }
  
//   function GeocodeToLatLng(arrGeocode: Geocode[]): LatLngExpression[] {
//     const codeLatLng: LatLngExpression[] = arrGeocode.map((item: any) => {
//       const point: LatLngExpression = { lat: item.lat, lng: item.lng };
//       return point;
//     })
//     return codeLatLng;
//   }

export class GeometryOnMapEditorContext implements GeometryOnMapEditorInterface {
    private readonly mapContainer: any;
    private readonly polygonCreateActions: ((id: number, coords: Geocode[]) => void)[];
    private readonly polygonEditActions: ((id: number, coords: Geocode[]) => void)[];
    private readonly polygonDeleteActions: ((id: number) => void)[];
    private readonly polygonIdMap: { [id: number]: number }

    public constructor(mapContainer: any) {
        console.log("context created");
        this.mapContainer = mapContainer;
        this.polygonCreateActions = [];
        this.polygonEditActions = [];
        this.polygonDeleteActions = [];
        this.polygonIdMap = {};
        this.subscribeOnEvents();
    }

    private subscribeOnEvents() {
        this.mapContainer.on('pm:create', (e: any) => {
            const geomanLayer = e.layer;

            const coordsLatLng: LatLngExpression = geomanLayer.getLatLngs()[0];
            const geocodeCoords: Geocode[] = LatLngToGeocode(coordsLatLng);
            this.polygonIdMap[geomanLayer._leaflet_id] = -geomanLayer._leaflet_id;

            this.polygonCreateActions.forEach((a) => a(-geomanLayer._leaflet_id, geocodeCoords));

            e.layer.on('pm:edit', (e: any) => {
                const idPolygonEdit = e.layer._leaflet_id in this.polygonIdMap
                    ? -e.layer._leaflet_id
                    : e.layer._leaflet_id;
                const coordsEditLatLng: LatLngExpression = e.layer.getLatLngs()[0];
                const geocodeCoordsEdit: Geocode[] = LatLngToGeocode(coordsEditLatLng);

                this.polygonEditActions.forEach((a) => a(idPolygonEdit, geocodeCoordsEdit));
            })

            e.layer.on('pm:remove', (e: any) => {
                const idForRemove = e.layer._leaflet_id in this.polygonIdMap
                    ? -e.layer._leaflet_id
                    : e.layer._leaflet_id;

                this.polygonDeleteActions.forEach((a) => a(idForRemove));
                console.log(`polygon № ${idForRemove} deleted`);
            })
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

        polygon.on('pm:edit', (e: any) => {
            const idPolygonEdit = e.layer._leaflet_id in this.polygonIdMap
                ? this.polygonIdMap[e.layer._leaflet_id]
                : e.layer._leaflet_id;
            const coordsEditLatLng: LatLngExpression = e.layer.getLatLngs()[0];
            const geocodeCoordsEdit: Geocode[] = LatLngToGeocode(coordsEditLatLng);

            this.polygonEditActions.forEach((a) => a(idPolygonEdit, geocodeCoordsEdit));
        })

        polygon.on('pm:remove', (e: any) => {
            const idForRemove = e.layer._leaflet_id in this.polygonIdMap
                ? this.polygonIdMap[e.layer._leaflet_id]
                : e.layer._leaflet_id;

            this.polygonDeleteActions.forEach((a) => a(idForRemove));
        })
    }
}