import * as L from "leaflet";

export class Polygon {
  private polygon: L.Polygon;
  private id: number;
  
  constructor(polygon: L.Polygon, id: number) {
    this.polygon = polygon;
    this.id = id;
  }

  public onClick(action: (e: any, id: number) => void) {
    this.polygon.on('click', (e: any) => {
      action(e, this.id);
    })
  }
  
  public getId() {
    return this.id;
  }
}