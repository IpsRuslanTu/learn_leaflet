import { Button, Input } from "antd"
import { LatLngExpression } from "leaflet";
import React from "react";
import { Marker, Popup } from "react-leaflet"
import { icon } from './Icon/Icon'

interface IDistrictPopup {
  markerPos: LatLngExpression;
  markerRef: any;
  districtName: string | undefined;
  onDistrictNameChange: (e: any) => void;
}

const DistrictPopup = (props: IDistrictPopup) => {

  let mode = props.districtName === "" ? true : false;

  const cancel = () => {
    props.markerRef.current.closePopup();
  }

  const save = () => {
    props.markerRef.current.closePopup();
  }

  return (
    <>
      <Marker icon={icon} position={props.markerPos} ref={props.markerRef}>
        <Popup minWidth={200}>
          <Input
            style={{ marginBottom: "13px" }}
            value={props.districtName}
            onChange={props.onDistrictNameChange}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="default" size="small" onClick={cancel}>Отмена</Button>
            <Button type="primary" size="small" disabled={mode} onClick={save}>Сохранить</Button>
          </div>
        </Popup>
      </Marker>
    </>
  )
}
export default DistrictPopup