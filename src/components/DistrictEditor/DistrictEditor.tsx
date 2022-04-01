import React from 'react'
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from '../GeometryOnMapEditor/GeometryOnMapEditorProvider'
import { Geocode } from '../../models/Geocode'
import { District } from './DistrictType'
import { Button, Input } from 'antd'
import { Marker, Popup } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import { Polygon } from '../GeometryOnMapEditor/models/Polygon'
import { icon } from './Icon/Icon'

interface IDistrictEditor {
    districts: District[];
    addDistrict: (id: number, newCoords: Geocode[]) => void;
    editDistrict: (id: number, newCoords: Geocode[]) => void;
    removeDistrict: (id: number) => void;
    changeDistrictName: (id: number, name: string) => void;
}

const DistrictEditor = (props: IDistrictEditor) => {
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
            props.changeDistrictName(selectedDistrictId, e.target.value);
        }
    }, [selectedDistrictId]);

    const onPolygonClick = React.useCallback((e: any, districtId: number) => {
        setSelectedDistrictId(districtId);
        setMarkerPos(e.latlng);
    }, [])

    React.useEffect(() => {
        if (!selectedDistrictId) return;

        const district = props.districts.find((x) => x.id === selectedDistrictId)

        if (!district) return;

        setDistrictName(district.districtName);
        markerRef.current?.openPopup();
    }, [selectedDistrictId, props.districts, markerPos]);

    React.useEffect(() => {
        geometryContext.setSelfIntersection(false);
        geometryContext.enablePolygonDraw();
        geometryContext.enableEditing();
        geometryContext.enableDeleting();
    }, []);

    React.useEffect(() => {
        props.districts.forEach((existingDistrict) => {
            const polygon = geometryContext.addPolygon(existingDistrict.id, existingDistrict.coords);
            polygon.onClick(onPolygonClick)
        });
    }, []);

    React.useEffect(() => {
        geometryContext.onPolygonCreate((polygon: Polygon) => {
            props.addDistrict(polygon.getId(), []);
            polygon.onClick(onPolygonClick);
        });

        geometryContext.onPolygonEdit((id: number, coords: Geocode[]) => {
            props.editDistrict(id, coords);
        })

        geometryContext.onPolygonDelete((id: number) => {
            props.removeDistrict(id);
        });
    }, [])

    return (
        <Marker icon={icon} position={markerPos} ref={markerRef}>
            <Popup minWidth={200}>
                <Input
                    style={{ marginBottom: "13px" }}
                    value={districtName}
                    onChange={onDistrictNameChange}
                />
                <Button type="primary" size="small">Сохранить</Button>
            </Popup>
        </Marker>
    )
}

export default DistrictEditor;