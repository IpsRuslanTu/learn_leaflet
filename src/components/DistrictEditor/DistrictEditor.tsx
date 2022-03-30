import React from 'react'
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from '../GeometryOnMapEditor/GeometryOnMapEditorProvider'
import { Geocode } from '../../models/Geocode'
import { District } from './DistrictType'
import { Input } from 'antd'

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

    const [districtName, setDistrictName] = React.useState<string | null>(null);

    // const districtsRef = React.useRef(props.districts);

    const onDistrictNameChange = (id: number, e: any) => {
        setDistrictName(e.target.value);
        props.changeDistrictName(id, e.target.value);
    };
    
    const content = (id: number, name: string) => {
        return <Input value={districtName ? districtName : name} onChange={(e: any) => onDistrictNameChange(id, e)} />;
        // return <div contentEditable suppressContentEditableWarning={true} onChange={(e: any) => onDistrictNameChange(id, e)}>{name}</div>
    }

    React.useEffect(() => {
        geometryContext.setSelfIntersection(false);
        geometryContext.enablePolygonDraw();
        geometryContext.enableEditing();
        geometryContext.enableDeleting();

        props.districts.forEach((district) => {
            const a: any = geometryContext.addPolygon(district.id, district.coords);

            a.onClick((e: any) => {
                geometryContext.showPopup(e, content(a.getId(), 
                    district.districtName ? district.districtName : ''));
            })
        });

        geometryContext.onPolygonCreate((id: number, coords: Geocode[]) => {
            // console.log(districtsRef.current.length);
            props.addDistrict(id, coords);
        });

        geometryContext.onPolygonEdit((id: number, coords: Geocode[]) => {
            props.editDistrict(id, coords);
        })

        geometryContext.onPolygonDelete((id: number) => {
            props.removeDistrict(id);
        });
    }, [props])

    return null
}

export default DistrictEditor;