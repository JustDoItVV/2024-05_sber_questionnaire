import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app/App.tsx';
import { frontendStorage } from './app/storage/storage.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={frontendStorage}>
      <App />
    </Provider>
  </React.StrictMode>,
)
