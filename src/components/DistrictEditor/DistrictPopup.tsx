import { Button, Input } from 'antd';
import L, { LatLngExpression } from 'leaflet';
import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { District } from './District';
import { icon } from './Icon/Icon';
import './districtEditor.css';

interface IDistrictPopupProps {
  position: LatLngExpression;
  // visible: boolean;
  district: District;
}

const DistrictPopup = observer((props: IDistrictPopupProps) => {
  const markerRef = React.useRef<L.Marker>(null);

  React.useEffect(() => {
    markerRef.current?.openPopup();
  }, [props.position])

  const [originalDistrictName, setOriginalDistrictName] = React.useState<string>('');
  const [availableSaveButton, setAvailableSaveButton] = React.useState<boolean>(true);

  React.useEffect(() => {
    setAvailableSaveButton(props.district.districtName === '' ? true : false);
  }, [props.district.districtName])

  const onCancel = React.useCallback(() => {
    markerRef.current?.closePopup();
    props.district.districtName = originalDistrictName;
  }, [props.district, props.position, originalDistrictName])

  const onSave = React.useCallback(() => {
    markerRef.current?.closePopup();
  }, [props.position])

  const saveInitialName = React.useCallback(() => {
    setOriginalDistrictName(props.district.districtName);
  }, [props.position])

  const renameDistrict = (e: ChangeEvent<HTMLInputElement>) => {
    props.district.districtName = e.target.value;
  }

  return (
    <>
      <Marker icon={icon} position={props.position} ref={markerRef}>
        <Popup minWidth={200} onOpen={saveInitialName} closeButton={false}>
          <Input
            className='district-popup_input'
            value={props.district.districtName}
            onChange={renameDistrict}
          />
          <div className='district-popup_buttons'>
            <Button type="default" size="small" onClick={onCancel}>
              Отмена
            </Button>
            <Button type="primary" size="small" disabled={availableSaveButton} onClick={onSave}>
              Сохранить
            </Button>
          </div>
        </Popup>
      </Marker>
    </>
  )
})

export default DistrictPopup