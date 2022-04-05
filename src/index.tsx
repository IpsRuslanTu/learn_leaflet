import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css'
import './index.css';
import App from './App';
import { districtStore } from './store/districtStore';

ReactDOM.render(
  <App store={districtStore} />,
  document.getElementById('root')
);