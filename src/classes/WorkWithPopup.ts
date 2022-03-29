export class WorkWithPopup {
  private setPopupContent: any;
  private setMarkerPos: any;
  private markerRef: any;

  constructor(markerRef: any, setPopupContent: any, setMarkerPos: any) {
    this.setPopupContent = setPopupContent;
    this.setMarkerPos = setMarkerPos;
    this.markerRef = markerRef;
  }

  public setContent(content: JSX.Element) {
    this.setPopupContent(content);
  }

  public movePopup(position: {lat: number, lng: number}) {
    this.setMarkerPos(position);
    this.markerRef.current.openPopup();
  }
}