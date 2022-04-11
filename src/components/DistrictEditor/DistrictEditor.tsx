import React from 'react'
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from '../GeometryOnMapEditor/GeometryOnMapEditorProvider'
import { Geocode } from '../../models/Geocode'
import L, { LatLngExpression } from 'leaflet'
import { Polygon } from '../GeometryOnMapEditor/models/Polygon'
import DistrictPopup from './DistrictPopup'
import { observer } from 'mobx-react'
import { District } from './District'
import { DistrictStore } from '../../store/DistrictStore'
import { MapMode } from '../../models/MapMode'

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
    const [markerPos, setMarkerPos] = React.useState<LatLngExpression>([56.631124, 47.894478]);
    const markerRef = React.useRef<L.Marker>(null);

    const onPolygonClick = React.useCallback((e: any, districtId: number) => {
        setSelectedDistrictId(districtId);
        setMarkerPos(e.latlng);
    }, [])

    React.useEffect(() => {
        if (!selectedDistrictId) return;

        const district = props.districtStore.districts.find((x: District) => x.id === selectedDistrictId)

        setSelectedDistrict(district);

        if (!district) return;

        markerRef.current?.openPopup();
    }, [selectedDistrictId, markerPos]);

    React.useEffect(() => {
        geometryContext.setSelfIntersection(false);
        geometryContext.enablePolygonDraw();
        geometryContext.enableEditing();
        geometryContext.enableDeleting();
        geometryContext.onMapMode();
    }, []);

    React.useEffect(() => {
        props.districtStore.districts.forEach((existingDistrict: District) => {
            const polygon = geometryContext.addPolygon(existingDistrict.id, existingDistrict.coords);
            polygon.onClick(onPolygonClick)
        });

        props.districtStore.onDistrictRemove((id: number) => {
            geometryContext.deleteLayer(id);
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

    if (geometryContext.getCurrentMapMode() === MapMode.normalMode
        && selectedDistrict !== undefined) {
        return (
            <DistrictPopup
                markerPos={markerPos}
                markerRef={markerRef}
                district={selectedDistrict}
            />
        )
    }
    else return null;
})

export default DistrictEditor;