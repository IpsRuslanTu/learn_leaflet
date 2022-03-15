import { useLeafletContext, LeafletContextInterface } from "@react-leaflet/core"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { useEffect } from "react"
import { DistrictType, Geocode } from "../types/types"
import L from "leaflet"

interface IGeoman {
  addDistrict: (newDistrict: DistrictType) => void;
  editDistrict: (id: number, newCoords: Geocode[]) => void;
  removeDistrict: (id: number) => void;
}

const Geoman = (props: IGeoman) => {

  const context: LeafletContextInterface = useLeafletContext()

  useEffect(() => {
    const leafletContainer: any = context.layerContainer || context.map;
    leafletContainer.pm.addControls({
      position: 'topright',
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawCircle: false,
      rotateMode: false,
      dragMode: false,
      cutPolygon: false
    })
  
    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

    leafletContainer.on('pm:create', (e: any) => {
      console.log(e)

      let geomanLayer = e.layer

      let newFeature: DistrictType = {id: geomanLayer._leaflet_id, coords: geomanLayer._latlngs[0]};
      props.addDistrict(newFeature)

      e.layer.on("pm:edit", (e: any) => {
        const idForChange = e.layer._leaflet_id
        const changedCoords = e.layer._latlngs[0]
        props.editDistrict(idForChange, changedCoords)
      })

      e.layer.on("pm:remove", (e: any) => {
        const idForRemove = e.layer._leaflet_id
        props.removeDistrict(idForRemove)
        console.log(`poligon № ${idForRemove} deleted`)
      })
    })
  }, [])

  return null
}

export default Geoman