import React from 'react'
import "leaflet"
import "@geoman-io/leaflet-geoman-free"
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css"
import { GeometryContext } from '../GeometryOnMapEditor/GeometryOnMapEditorProvider'
import { Geocode } from '../../models/Geocode'
import { District } from './DistrictType'

interface IDistrictEditor {
    districts: District[];
    addDistrict: (id: number, newCoords: Geocode[]) => void;
    editDistrict: (id: number, newCoords: Geocode[]) => void;
    removeDistrict: (id: number) => void;
}

const DistrictEditor = (props: IDistrictEditor) => {

    const geometryContext = React.useContext(GeometryContext);
    if (!geometryContext) {
        throw new Error("Geometry context is undefined")
    }

    React.useEffect(() => {
        geometryContext.setSelfIntersection(false);
        geometryContext.enablePolygonDraw();
        geometryContext.enableEditing();
        geometryContext.enableDeleting();

        props.districts.forEach((district) => {
            geometryContext.addPolygon(district.id, district.coords);
        });

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

    return null
}

export default DistrictEditor;