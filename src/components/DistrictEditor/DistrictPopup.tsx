import { Button, Input } from "antd";
import { LatLngExpression } from "leaflet";
import { observer } from "mobx-react";
import React, { ChangeEvent } from "react";
import { Marker, Popup } from "react-leaflet";
import { District } from "./District";
import { icon } from './Icon/Icon'

interface IDistrictPopupProps {
  markerPos: LatLngExpression;
  markerRef: any;
  district: District;
}

const DistrictPopup = observer((props: IDistrictPopupProps) => {
  const [originalDistrictName, setOriginalDistrictName] = React.useState<string>('');
  let mode = props.district.districtName === "" ? true : false;

  const onCancel = () => {
    props.markerRef.current.closePopup();
    props.district.districtName = originalDistrictName;
  }

  const onSave = () => {
    props.markerRef.current.closePopup();
  }

  const testFunc = React.useCallback(() => {
    setOriginalDistrictName(props.district.districtName);
  }, [props.markerPos])

  const renameDistrict = (e: ChangeEvent<HTMLInputElement>) => {
    props.district.districtName = e.target.value;
  }

  return (
    <>
      <Marker icon={icon} position={props.markerPos} ref={props.markerRef}>
        <Popup minWidth={200} onOpen={testFunc} closeButton={false}>
          <Input
            style={{ marginBottom: "13px" }}
            value={props.district.districtName}
            onChange={renameDistrict}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button type="default" size="small" onClick={onCancel}>Отмена</Button>
            <Button type="primary" size="small" disabled={mode} onClick={onSave}>Сохранить</Button>
          </div>
        </Popup>
      </Marker>
    </>
  )
})

export default DistrictPopup