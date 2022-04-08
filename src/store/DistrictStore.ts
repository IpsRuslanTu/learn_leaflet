import { makeAutoObservable } from "mobx";
import { testDistrict, testDistrict2, testDistrict3 } from "../constants/testDistrict";
import { Geocode } from "../models/Geocode";

export class DistrictStore {
  districts = [testDistrict, testDistrict2, testDistrict3];
  districtDeleteActions: ((id: number) => void)[];

  constructor() {
    makeAutoObservable(this);
    this.districtDeleteActions = [];
  }

  addDistrict = (id: number, coords: Geocode[]): void => {
    this.districts.push({ id: id, coords: coords, districtName: "" })
  }

  editDistrict = (id: number, newCoords: Geocode[]): void => {
    const index = this.districts.findIndex(district => district.id === id);
    this.districts[index].coords = newCoords;
  }

  removeDistrict = (id: number): void => {
    this.districts.splice(this.districts.findIndex(district => district.id === id), 1);

    this.districtDeleteActions.forEach((a) => a(id));
  }

  changeDistrictName = (id: number, name: string): void => {
    const index = this.districts.findIndex(district => district.id === id);
    this.districts[index].districtName = name;
  }

  onDistrictRemove = (action: (id: number) => void): void => {
    this.districtDeleteActions.push(action);
  }
}