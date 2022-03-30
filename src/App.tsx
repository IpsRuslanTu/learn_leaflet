import React from 'react'
import DistrictEditor from './components/DistrictEditor/DistrictEditor'
import { District } from './components/DistrictEditor/DistrictType'
import GeometryOnMapEditor from './components/GeometryOnMapEditor/GeometryOnMapEditor'
import { YOLA } from './constants/positions'
import { testDistrict, testDistrict2 } from './constants/testDistrict'
import { Geocode } from './models/Geocode'

const App = () => {

  const [districts, setDistrict] = React.useState<District[]>([testDistrict, testDistrict2])

  const addDistrict = (id: number, coords: Geocode[]): void => {
    setDistrict(currentState => {
      return [...currentState, {id: id, coords: coords}]
    })
  }

  const editDistrict = (id: number, newCoords: Geocode[]): void => {
    setDistrict(currentState => {
      return currentState.map(item => {
        return { ...item, coords: (item.id === id) ? newCoords : item.coords }
      })
    })
  }

  const removeDistrict = (id: number): void => {
    setDistrict(currentState => {
      return currentState.filter(item => {
        return item.id !== id
      })
    })
  }

  const changeDistrictName = (id: number, name: string): void => {
    setDistrict(currentState => {
      return currentState.map(item => {
        return { ...item, districtName: (item.id === id) ? name : item.districtName }
      })
    })
  }

  return (
    <div className='App'>
      <GeometryOnMapEditor area={YOLA} zoomValue={11} >
        <DistrictEditor
          districts={districts}
          addDistrict={addDistrict}
          editDistrict={editDistrict}
          removeDistrict={removeDistrict}
          changeDistrictName={changeDistrictName}
        />
      </GeometryOnMapEditor>
      <pre>{JSON.stringify(districts, null, 1)}</pre>
    </div>
  )
}

export default App;

