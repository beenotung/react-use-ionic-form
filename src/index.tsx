import React from 'react';
import ReactDOM from 'react-dom';
import DemoForm from './DemoForm';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/text-alignment.css';

ReactDOM.render(
  <React.StrictMode>
    <DemoForm />
  </React.StrictMode>,
  document.getElementById('root'),
);
