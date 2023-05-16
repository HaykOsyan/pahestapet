import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';

export const Context = createContext(null);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Context.Provider
      value={{
        user: new UserStore(),
        product: new ProductStore()
      }}
    >
      <App />
    </Context.Provider>
  </BrowserRouter>
);

reportWebVitals();