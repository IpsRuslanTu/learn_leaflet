export type Geocode = {
  lat: number;
  lng: number;
}

export type DistrictType = {
  id: number;
  coords: Geocode[];
}