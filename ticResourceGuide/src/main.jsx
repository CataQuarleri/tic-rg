import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ResourceProvider } from './context/ResourceContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResourceProvider>
      <App />
    </ResourceProvider>
  </React.StrictMode>
);