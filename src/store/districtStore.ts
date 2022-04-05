import { makeAutoObservable } from "mobx";
import { testDistrict, testDistrict2 } from "../constants/testDistrict";
import { Geocode } from "../models/Geocode";

class DistrictStore {
  districts = [testDistrict, testDistrict2];

  constructor() {
    makeAutoObservable(this);
  }

  addDistrict = (id: number, coords: Geocode[]): void => {
    this.districts.push({ id: id, coords: coords, districtName: "Новый район" })
  }

  // Можно упростить, если параметром передать полигон
  editDistrict = (id: number, newCoords: Geocode[]): void => {
    this.districts = this.districts.map(district => district.id === id
      ? { ...district, coords: newCoords }
      : district
    )
  }

  removeDistrict = (id: number): void => {
    this.districts = this.districts.filter(district => district.id !== id)
  }

  changeDistrictName = (id: number, name: string): void => {
    this.districts = this.districts.map(district => district.id === id
      ? { ...district, districtName: name }
      : district
    )
  }
}

export const districtStore = new DistrictStore();