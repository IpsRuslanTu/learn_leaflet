import { Geocode } from "../../models/Geocode";
import { makeAutoObservable } from "mobx";

export class District {
  id: number;
  coords: Geocode[];
  _districtName: string;

  constructor(id: number, coords: Geocode[], _districtName: string) {
    makeAutoObservable(this);
    this.id = id;
    this.coords = coords;
    this._districtName = _districtName;
  }

  get districtName(): string {
    return this._districtName;
  }

  set districtName(value: string) {
    this._districtName = value;
  }
}