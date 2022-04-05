import { Button, Input } from "antd"
import { LatLngExpression } from "leaflet";
import { Marker, Popup } from "react-leaflet"
import { icon } from './Icon/Icon'

interface ITitle {
  markerPos: LatLngExpression;
  markerRef: any;
  districtName: string | undefined;
  onDistrictNameChange: (e: any) => void;
}

const Title = (props: ITitle) => {
  const closeTitle = () => {
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
          <Button type="primary" size="small" onClick={closeTitle}>Сохранить</Button>
        </Popup>
      </Marker>
    </>
  )
}
export default Title