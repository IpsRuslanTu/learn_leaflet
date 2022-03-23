import { Geocode } from "../../models/Geocode";

export type District = {
  id: number;
  coords: Geocode[];
  color?: string;
}