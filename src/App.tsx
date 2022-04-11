import { observer } from 'mobx-react';
import DistrictListEditor from './components/DistrictEditor/DistrictListEditor';
import DistrictEditor from './components/DistrictEditor/DistrictEditor'
import GeometryOnMapEditor from './components/GeometryOnMapEditor/GeometryOnMapEditor'
import { YOLA } from './constants/positions'
import { DistrictStore } from './store/DistrictStore';

const App = () => {
  const districtStore = new DistrictStore();

  const Debug = observer((districtStore: DistrictStore) => <pre>{JSON.stringify(districtStore.districts, null, 1)}</pre>);

  return (
    <>
      <div className='App'>
        <DistrictListEditor districtStore={districtStore} />
        <GeometryOnMapEditor area={YOLA} zoomValue={11} >
          <DistrictEditor districtStore={districtStore} />
        </GeometryOnMapEditor>
      </div>
      {/* <Debug {...districtStore} /> */}
    </>
  )
}

export default App;

