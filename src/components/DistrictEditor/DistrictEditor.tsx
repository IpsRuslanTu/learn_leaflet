import React from 'react'
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from '../GeometryOnMapEditor/GeometryOnMapEditorProvider'
import { Geocode } from '../../models/Geocode'
import L, { LatLngExpression } from 'leaflet'
import { Polygon } from '../GeometryOnMapEditor/models/Polygon'
import Title from './Title'
import { observer } from 'mobx-react'
import { District } from './DistrictType'

const DistrictEditor = observer((store: any) => {
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
            store.changeDistrictName(selectedDistrictId, e.target.value);
        }
    }, [selectedDistrictId]);

    const onPolygonClick = React.useCallback((e: any, districtId: number) => {
        setSelectedDistrictId(districtId);
        setMarkerPos(e.latlng);
    }, [])

    React.useEffect(() => {
        if (!selectedDistrictId) return;

        const district = store.districts.find((x: District) => x.id === selectedDistrictId)

        if (!district) return;

        setDistrictName(district.districtName);
        markerRef.current?.openPopup();
    }, [selectedDistrictId, store.districts, markerPos]);

    React.useEffect(() => {
        geometryContext.setSelfIntersection(false);
        geometryContext.enablePolygonDraw();
        geometryContext.enableEditing();
        geometryContext.enableDeleting();
    }, []);

    React.useEffect(() => {
        store.districts.forEach((existingDistrict: District) => {
            const polygon = geometryContext.addPolygon(existingDistrict.id, existingDistrict.coords);
            polygon.onClick(onPolygonClick)
        });
    }, []);

    React.useEffect(() => {
        geometryContext.onPolygonCreate((polygon: Polygon) => {
            store.addDistrict(polygon.getId(), polygon.getCoordinates());
            polygon.onClick(onPolygonClick);
        });

        geometryContext.onPolygonEdit((id: number, coords: Geocode[]) => {
            store.editDistrict(id, coords);
        })

        geometryContext.onPolygonDelete((id: number) => {
            store.removeDistrict(id);
        });
    }, [])

    return (
        <Title
            markerPos={markerPos}
            markerRef={markerRef}
            districtName={districtName}
            onDistrictNameChange={onDistrictNameChange}
        />
    )
})

export default DistrictEditor;