import { useLeafletContext, LeafletContextInterface } from "@react-leaflet/core"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { LatLngExpression } from "leaflet";

interface IGeoman {
  addDistrict: (newDistrict: LatLngExpression) => void;
}

const Geoman = (props: IGeoman) => {

  const context: LeafletContextInterface = useLeafletContext();
  const leafletContainer: any = context.layerContainer || context.map;
  leafletContainer.pm.addControls({
    position: 'topright',
    drawCircleMarker: false,
    drawPolyline: false,
    drawRectangle: false,
    drawCircle: false,
    rotateMode: false
  })

  leafletContainer.pm.setGlobalOptions({ pmIgnore: false, coordinates: true });

  leafletContainer.on('pm:create', (e:any) => {
    const arr = e.layer._latlngs[0]
    console.log(arr)
    props.addDistrict(arr)
  })

  return null
}

export default Geoman