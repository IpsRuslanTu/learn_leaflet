import { Button, Input } from 'antd';
import L, { LatLngExpression } from 'leaflet';
import { observer } from 'mobx-react';
import React, { ChangeEvent } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { District } from './District';
import { icon } from './Icon/Icon';
import './DistrictEditor.css';

interface IDistrictPopupProps {
  position: LatLngExpression;
  district: District | undefined;
}

const DistrictPopup = observer((props: IDistrictPopupProps) => {
  const markerRef = React.useRef<L.Marker>(null);

  React.useEffect(() => {
    if (props.district) {
      markerRef.current?.openPopup();
    } else {
      markerRef.current?.closePopup();
    }

    setSaveButtonDisabled(!props.district?.districtName);
  }, [props.district, props.position, props.district?.districtName])

  const [originalDistrictName, setOriginalDistrictName] = React.useState<string>('');
  const [saveButtonDisabled , setSaveButtonDisabled] = React.useState<boolean>(false);

  const onCancel = React.useCallback(() => {
    markerRef.current?.closePopup();

    if (!props.district) {
      return;      
    }

    props.district.districtName = originalDistrictName;
  }, [props.district, originalDistrictName])

  const onSave = React.useCallback(() => {
    markerRef.current?.closePopup();
  }, [])

  const saveOriginalDistrictName = React.useCallback(() => {
    setOriginalDistrictName(props.district?.districtName || '');
  }, [props.district])

  const renameDistrict = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!props.district) {
      return;      
    }
    props.district.districtName = e.target.value;
  }, [props.district])

  return (
    <>
      <Marker icon={icon} position={props.position} ref={markerRef}>
        <Popup minWidth={200} onOpen={saveOriginalDistrictName} closeButton={false} closeOnClick={false}>
          <Input
            className='district-popup_input'
            value={props.district?.districtName}
            onChange={renameDistrict}
          />
          <div className='district-popup_buttons'>
            <Button type="default" size="small" onClick={onCancel}>
              Отмена
            </Button>
            <Button type="primary" size="small" disabled={saveButtonDisabled} onClick={onSave}>
              Сохранить
            </Button>
          </div>
        </Popup>
      </Marker>
    </>
  )
})

export default DistrictPopup