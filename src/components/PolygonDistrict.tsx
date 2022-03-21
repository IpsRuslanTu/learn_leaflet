import { useLeafletContext } from '@react-leaflet/core'
import L from 'leaflet'
import { useEffect } from 'react';
import { DistrictType } from '../types/types';

interface IPolygonDistrict {
  item: DistrictType;
}

const PolygonDistrict = (props: IPolygonDistrict) => {

  const context = useLeafletContext();

  useEffect(() => {
    const positions: any = props.item.coords;
    const polygon = new L.Polygon(positions)
    const container = context.layerContainer || context.map
    container.addLayer(polygon)

    return () => {
      container.removeLayer(polygon)
    }
  })

  return null
}
export default PolygonDistrict