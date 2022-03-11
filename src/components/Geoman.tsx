import { useEffect } from "react"
import { useLeafletContext } from "@react-leaflet/core"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"

interface IGeoman {
  addDistrict(e: any): void;
}

const Geoman = (props: IGeoman) => {

  const context = useLeafletContext();
  const arrCoords: any = [];

  useEffect(() => {
    let isMounted = true;
    const leafletContainer: any = context.layerContainer || context.map;
    leafletContainer.pm.addControls({
      position: 'topright',
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawCircle: false,
      rotateMode: false
    });

    leafletContainer.pm.setGlobalOptions({ pmIgnore: false });

    leafletContainer.on("pm:create", (e: any) => {
      if (e.layer && e.layer.pm) {
        const shape = e
        console.log(e)

        arrCoords[0] = e.layer._latlngs

        props.addDistrict(e.layer._latlngs[0])

        // enable editing of circle
        shape.layer.pm.enable()

        console.log(`object created: ${e.layer._latlngs[0]}`);
        // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        leafletContainer.pm
          .getGeomanLayers(true)
          .bindPopup("i am whole")
          .openPopup()
        leafletContainer.pm
          .getGeomanLayers()
          .map((layer: any, index: any) => layer.bindPopup(`district ${index}`));
        shape.layer.on("pm:edit", (e: any) => {
          const event = e
          // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON());
        });
      }
    });

    leafletContainer.on("pm:remove", (e: any) => {
      console.log("object removed")
      // console.log(leafletContainer.pm.getGeomanLayers(true).toGeoJSON())
    });

    return () => {
      leafletContainer.pm.removeControls()
      leafletContainer.pm.setGlobalOptions({ pmIgnore: true })
      isMounted = false
    };
  }, [context, arrCoords])

  return null
};

export default Geoman