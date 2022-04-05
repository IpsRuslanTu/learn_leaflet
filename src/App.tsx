import { observer } from 'mobx-react';
import DistrictEditor from './components/DistrictEditor/DistrictEditor'
import GeometryOnMapEditor from './components/GeometryOnMapEditor/GeometryOnMapEditor'
import { YOLA } from './constants/positions'

const App = observer((store: any) => {

  return (
    <div className='App'>
      <GeometryOnMapEditor area={YOLA} zoomValue={11} >
        <DistrictEditor />
      </GeometryOnMapEditor>
      <pre>{JSON.stringify(store.districts, null, 1)}</pre>
    </div>
  )
})

export default App;

