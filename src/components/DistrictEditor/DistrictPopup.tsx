import { Button, Input } from 'antd';
import { LatLngExpression } from 'leaflet';
import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { District } from './District';
import { icon } from './Icon/Icon';
import './districtEditor.css';

interface IDistrictPopupProps {
  position: LatLngExpression;
  visible: any;
  district: District;
}

const DistrictPopup = observer((props: IDistrictPopupProps) => {
  const [originalDistrictName, setOriginalDistrictName] = React.useState<string>('');
  const [availableSaveButton, setAvailableSaveButton] = React.useState<boolean>(true);

  React.useEffect(() => {
    setAvailableSaveButton(props.district.districtName === '' ? true : false);
  }, [props.district.districtName])

  const onCancel = React.useCallback(() => {
    props.visible.current.closePopup();
    props.district.districtName = originalDistrictName;
  }, [props.district, props.visible, originalDistrictName])

  const onSave = React.useCallback(() => {
    props.visible.current.closePopup();
  }, [props.visible])

  const saveInitialName = React.useCallback(() => {
    setOriginalDistrictName(props.district.districtName);
  }, [props.position])

  const renameDistrict = (e: ChangeEvent<HTMLInputElement>) => {
    props.district.districtName = e.target.value;
  }

  return (
    <>
      <Marker icon={icon} position={props.position} ref={props.visible}>
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