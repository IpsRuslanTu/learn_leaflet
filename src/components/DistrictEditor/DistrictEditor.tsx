import React from 'react'
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from '../GeometryOnMapEditor/GeometryOnMapEditorProvider'
import { Geocode } from '../../models/Geocode'
import { District } from './DistrictType'
import { Input } from 'antd'
import { Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

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
    const [districtName, setDistrictName] = React.useState<string>('');
    const [markerPos, setMarkerPos] = React.useState<LatLngExpression>([56.631124, 47.894478]);
    const markerRef = React.useRef<L.Marker>(null);

    const [renderPolygons, toggleRenderPolygons] = React.useState<boolean>(true);

    const onDistrictNameChange = (e: any) => {
        setDistrictName(e.target.value);
        if (selectedDistrictId)
            props.changeDistrictName(selectedDistrictId, e.target.value);
    };

    React.useEffect(() => {
        geometryContext.setSelfIntersection(false);
        geometryContext.enablePolygonDraw();
        geometryContext.enableEditing();
        geometryContext.enableDeleting();
    }, []);

    React.useEffect(() => {
        props.districts.forEach((district) => {
            if (renderPolygons)
            {
                geometryContext.addPolygon(district.id, district.coords);
            }
            const a = geometryContext.getCopyPolygon();
            a.onClick((e: any) => {
                setSelectedDistrictId(a.getId());
                setMarkerPos(e.latlng);
                setDistrictName(district.districtName ? district.districtName : '');
                markerRef.current?.openPopup();
            })
        }); 
        toggleRenderPolygons(false);
    }, [props]);

    React.useEffect(() => {
        geometryContext.onPolygonCreate((id: number, coords: Geocode[]) => {
            props.addDistrict(id, coords);
        });

        geometryContext.onPolygonEdit((id: number, coords: Geocode[]) => {
            props.editDistrict(id, coords);
        })

        geometryContext.onPolygonDelete((id: number) => {
            props.removeDistrict(id);
        });
    }, [])

    return (
        <Marker position={markerPos} ref={markerRef}>
            <Popup minWidth={200}>
                <Input value={districtName} onChange={onDistrictNameChange} />
            </Popup>
        </Marker>
    )
}

export default DistrictEditor;