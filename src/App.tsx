import { useState } from 'react'
import DistrictEditor from './components/DistrictEditor'
import GeometryOnMapEditor from './components/GeometryOnMapEditor'
import { testDistrict, testDistrict2 } from './constants/testDistrict'
import { DistrictType, Geocode } from './types/types'

const App = () => {

  const [districts, setDistrict] = useState<DistrictType[]>([testDistrict, testDistrict2])

  const addDistrict = (newDistrict: DistrictType): void => {
    setDistrict(currentState => {
      return [...currentState, newDistrict]
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

  return (
    <div className='App'>
      <GeometryOnMapEditor>
        <DistrictEditor
          districts={districts}
          addDistrict={addDistrict}
          editDistrict={editDistrict}
          removeDistrict={removeDistrict}
        />
      </GeometryOnMapEditor>
      <pre>{JSON.stringify(districts, null, 1)}</pre>
    </div>
  )
}

export default App;

