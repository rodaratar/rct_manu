import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import MapView from './components/MapView';
import BarScatter from './components/PlotlyBarScatter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="AppContainer">
      <MapView />
      <BarScatter />
    </div>
  </React.StrictMode>
);
