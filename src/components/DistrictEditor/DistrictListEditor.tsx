import { observer } from "mobx-react"
import React from "react"
import { DistrictStore } from "../../store/DistrictStore"
import { District } from "./District"

interface DistrictListEditorProps {
  districtStore: DistrictStore;
}

const DistrictListEditor = observer((props: DistrictListEditorProps) => {

  const districts = props.districtStore.districts;

  return (
    <div className="data-editor">
      <h1>Районы:</h1>
      {districts.map((district: District, index: number) => {
        return (
          <div className="data-item" key={districts[index].id}>
            <input
              value={districts[index].districtName}
              placeholder="Введите название"
              onChange={(e) => props.districtStore.changeDistrictName(district.id, e.target.value)}
            />
            <button onClick={() => props.districtStore.removeDistrict(district.id)}>
              X
            </button>
          </div>
        )
      })}
    </div>
  )
})

export default DistrictListEditor