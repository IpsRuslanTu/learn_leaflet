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