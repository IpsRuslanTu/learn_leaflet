import { observer } from "mobx-react";
import React from "react";
import { DistrictStore } from "../../store/DistrictStore";
import { District } from "./District";
import './DistrictEditor.css';

interface DistrictListEditorProps {
  districtStore: DistrictStore;
}

const DistrictListEditor = observer((props: DistrictListEditorProps) => {

  const districts = props.districtStore.districts;

  return (
    <div className='district-list-editor'>
      <h1>Районы:</h1>
      {districts.map((district: District, index: number) => {
        return (
          <div className='district-list-editor_item' key={district.id}>
            <input
              value={district.districtName}
              placeholder='Введите название'
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