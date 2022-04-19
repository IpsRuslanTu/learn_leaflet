import React from 'react'
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from '../GeometryOnMapEditor/GeometryOnMapEditorProvider'
import { Geocode } from '../../models/Geocode'
import { LatLngExpression } from 'leaflet'
import { Polygon } from '../GeometryOnMapEditor/models/Polygon'
import DistrictPopup from './DistrictPopup'
import { observer } from 'mobx-react'
import { District } from './District'
import { DistrictStore } from '../../store/DistrictStore'
import { MapMode } from '../GeometryOnMapEditor/models/MapMode'

interface DistrictEditorProps {
    districtStore: DistrictStore;
}

const DistrictEditor = observer((props: DistrictEditorProps) => {
    const geometryContext = React.useContext(GeometryContext);
    if (!geometryContext) {
        throw new Error("Geometry context is undefined")
    }

    const [selectedDistrict, setSelectedDistrict] = React.useState<District | undefined>(undefined);
    const [selectedDistrictId, setSelectedDistrictId] = React.useState<number | undefined>(undefined);
    const [popupPosition, setPopupPosition] = React.useState<LatLngExpression>([56.631124, 47.894478]);

    const onPolygonClick = React.useCallback((e: any, districtId: number) => {
        if (geometryContext.getCurrentMapMode() === MapMode.DeleteMode) {
            setSelectedDistrictId(undefined);
            return;
        }
        setSelectedDistrictId(districtId);
        setPopupPosition(e.latlng);
    }, [])

    React.useEffect(() => {

        const district = props.districtStore.districts.find((x: District) => x.id === selectedDistrictId)

        setSelectedDistrict(district);

    }, [selectedDistrictId, props.districtStore.districts, popupPosition]);

    React.useEffect(() => {
        geometryContext.setSelfIntersection(false);
        geometryContext.enablePolygonDraw();
        geometryContext.enableEditing();
        geometryContext.enableDeleting();
    }, []);

    React.useEffect(() => {
        props.districtStore.districts.forEach((existingDistrict: District) => {
            const polygon = geometryContext.addPolygon(existingDistrict.id, existingDistrict.coords);
            polygon.onClick(onPolygonClick)
        });

        props.districtStore.onDistrictRemove((id: number) => {
            geometryContext.deletePolygon(id);
        })
    }, []);

    React.useEffect(() => {
        geometryContext.onPolygonCreate((polygon: Polygon) => {
            props.districtStore.addDistrict(polygon.getId(), polygon.getCoordinates());
            polygon.onClick(onPolygonClick);
        });

        geometryContext.onPolygonEdit((id: number, coords: Geocode[]) => {
            props.districtStore.editDistrict(id, coords);
        })

        geometryContext.onPolygonDelete((id: number) => {
            props.districtStore.removeDistrict(id);
        });
    }, [])

    return (
        <DistrictPopup
            position={popupPosition}
            district={selectedDistrict}
        />
    )
})

export default DistrictEditor;