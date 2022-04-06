import { observer } from "mobx-react"
import React, { ChangeEvent } from "react"
import { DistrictStore } from "../../store/DistrictStore"
import { District } from "../DistrictEditor/DistrictType"

const DataEditor = observer((districtStore: DistrictStore) => {
  const districts = districtStore.districts;

  return (
    <div className="data-editor">
      <h1>Районы:</h1>
      {districts.map((district: District, index: number) => {
        return (
          <div className="data-item" key={districts[index].id}>
            <input
              value={districts[index].districtName}
              onChange={(e) => districtStore.changeDistrictName(district.id, e.target.value)}
            />
            <button
              onClick={() => districtStore.removeDistrict(district.id)}
            >
              X
            </button>
          </div>
        )
      })}
    </div>
  )
})

export default DataEditor