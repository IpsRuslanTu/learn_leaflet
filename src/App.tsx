import React, { useState } from 'react'
import Map from './components/Map'
import { DistrictType } from './types/types';

const App = () => {

  const [districts, setDistrict] = useState<DistrictType[]>([]);

  const addDistrict = (newDistrict: DistrictType): void => {
    setDistrict([...districts, newDistrict])
  }

  return (
    <div className='App'>
      <Map addDistrict={addDistrict} />
      <div className='districts'>
        {districts.map((item, index) => {
          return <div key={index}>{index}</div>
        })}
      </div>
    </div>
  );
}

export default App;

