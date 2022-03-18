import { LatLng, LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { Geocode } from "../types/types";

export function LatLngToGeocode(arrLatLng: any): Geocode[] {
  const geocode: Geocode[] = arrLatLng.map((item: any) => {
    const point: Geocode = { lat: 0, lng: 0 };
    point.lat = item.lat;
    point.lng = item.lng;
    return point;
  })
  return geocode;
}

export function GeocodeToLatLng(arrGeocode: Geocode[]): LatLngExpression[] {

  const codeLatLng: LatLngExpression[] = arrGeocode.map((item: any) => {
    const point: LatLngExpression = { lat: item.lat, lng: item.lng };
    return point;
  })
  return codeLatLng;
}