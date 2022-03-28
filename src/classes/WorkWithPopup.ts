export class WorkWithPopup {
  private markerRef: React.RefObject<L.Marker>;
  private setPopupContent: any;

  constructor(markerRef: React.RefObject<L.Marker>, setPopupContent: any) {
    this.markerRef = markerRef;
    this.setPopupContent = setPopupContent;
  }

  public setContent(content: JSX.Element) {
    this.setPopupContent(content);
  }

  public openPopup(position: {lat: number, lng: number}) {
    this.markerRef.current?.setLatLng(position);
  }
}