import { observer } from 'mobx-react';
import DistrictEditor from './components/DistrictEditor/DistrictEditor'
import GeometryOnMapEditor from './components/GeometryOnMapEditor/GeometryOnMapEditor'
import { YOLA } from './constants/positions'
import { DistrictStore } from './store/DistrictStore';
import {districtStore} from './store/DistrictStore';

const Debug = observer((districtStore: DistrictStore) => <pre>{JSON.stringify(districtStore.districts, null, 1)}</pre>);

const App = () => {
  return (
    <div className='App'>
      <GeometryOnMapEditor area={YOLA} zoomValue={11} >
        <DistrictEditor {...districtStore} />
      </GeometryOnMapEditor>
      <Debug {...districtStore} />
    </div>
  )
}

export default App;

