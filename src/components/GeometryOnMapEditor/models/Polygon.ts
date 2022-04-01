import * as L from "leaflet";
import { Geocode } from "../../../models/Geocode";

export class Polygon {
  private polygon: L.Polygon;
  private id: number;
  private geocodeCoords: Geocode[]
  
  constructor(polygon: L.Polygon, id: number, geocodeCoords: Geocode[]) {
    this.polygon = polygon;
    this.id = id;
    this.geocodeCoords = geocodeCoords;
  }

  public onClick(action: (e: any, id: number) => void) {
    this.polygon.on('click', (e: any) => {
      action(e, this.id);
    })
  }
  
  public getId() {
    return this.id;
  }

  public getCoordinates() {
    return this.geocodeCoords;
  }
}