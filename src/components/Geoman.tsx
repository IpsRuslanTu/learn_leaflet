import { useLeafletContext, LeafletContextInterface } from "@react-leaflet/core"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { LatLngExpression } from "leaflet";
import { useEffect, useRef } from "react";

interface IGeoman {
  addDistrict: (newDistrict: LatLngExpression) => void;
}

const Geoman = (props: IGeoman) => {

  const context: LeafletContextInterface = useLeafletContext()
  const refCoords = useRef()

  useEffect(() => {
    const leafletContainer: any = context.layerContainer || context.map;
    leafletContainer.pm.addControls({
      position: 'topright',
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawCircle: false,
      rotateMode: false
    })
  
    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

    leafletContainer.on('pm:create', (e: any) => {
      const arr = e.layer._latlngs[0]
      props.addDistrict(arr)
      console.log(arr)
    })
  }, [])

  return null
}

export default Geoman