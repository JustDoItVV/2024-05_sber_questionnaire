import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import App from './app/app';
import { frontendStorage } from './app/storage/storage.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={frontendStorage}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
)
