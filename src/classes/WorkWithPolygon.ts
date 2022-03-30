export class WorkWithPolygon {
  private polygon: any;
  private id: number;
  
  constructor(polygon: L.Polygon, id: number) {
    this.polygon = polygon;
    this.id = id;
  }

  public onClick(action: (e: any) => void) {
    this.polygon.on('click', (e: any) => { 
      action(e);
    })
  }
  
  public getId() {
    return this.id;
  }
}