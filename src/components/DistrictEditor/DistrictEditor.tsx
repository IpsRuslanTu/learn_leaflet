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
import { District } from './DistrictType'
import { DistrictStore } from '../../store/DistrictStore'
import { MapMode } from '../../models/MapMode'

const DistrictEditor = observer((districtStore: DistrictStore) => {
    const geometryContext = React.useContext(GeometryContext);
    if (!geometryContext) {
        throw new Error("Geometry context is undefined")
    }

    const [selectedDistrictId, setSelectedDistrictId] = React.useState<number | undefined>(undefined);
    const [markerPos, setMarkerPos] = React.useState<LatLngExpression>([56.631124, 47.894478]);
    const [districtName, setDistrictName] = React.useState<string | undefined>(undefined);
    const markerRef = React.useRef<L.Marker>(null);

    const onDistrictNameChange = React.useCallback((e: any) => {
        setDistrictName(e.target.value);
        if (selectedDistrictId) {
            districtStore.changeDistrictName(selectedDistrictId, e.target.value);
        }
    }, [selectedDistrictId]);

    const onPolygonClick = React.useCallback((e: any, districtId: number) => {
        setSelectedDistrictId(districtId);
        setMarkerPos(e.latlng);
    }, [])

    React.useEffect(() => {
        if (!selectedDistrictId) return;

        const district = districtStore.districts.find((x: District) => x.id === selectedDistrictId)

        if (!district) return;

        setDistrictName(district.districtName);
        markerRef.current?.openPopup();
    }, [selectedDistrictId, districtStore.districts, markerPos]);

    React.useEffect(() => {
        geometryContext.setSelfIntersection(false);
        geometryContext.enablePolygonDraw();
        geometryContext.enableEditing();
        geometryContext.enableDeleting();
        geometryContext.onMapMode();
    }, []);

    React.useEffect(() => {
        districtStore.districts.forEach((existingDistrict: District) => {
            const polygon = geometryContext.addPolygon(existingDistrict.id, existingDistrict.coords);
            polygon.onClick(onPolygonClick)
        });

        districtStore.onDistrictRemove((id: number) => {
            geometryContext.deleteLayer(id);
        })
    }, []);

    React.useEffect(() => {
        geometryContext.onPolygonCreate((polygon: Polygon) => {
            districtStore.addDistrict(polygon.getId(), polygon.getCoordinates());
            polygon.onClick(onPolygonClick);
        });

        geometryContext.onPolygonEdit((id: number, coords: Geocode[]) => {
            districtStore.editDistrict(id, coords);
        })

        geometryContext.onPolygonDelete((id: number) => {
            districtStore.removeDistrict(id);
        });
    }, [])

    if (geometryContext.getCurrentMapMode() === MapMode.normalMode) {
        return (
            <DistrictPopup
                markerPos={markerPos}
                markerRef={markerRef}
                districtName={districtName}
                onDistrictNameChange={onDistrictNameChange}
            />
        )
    }
    else return null;
})

export default DistrictEditor;