import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import  Productinfopage  from './Components/Productinfopage';
import  Invoice  from './Components/Invoice';
import Customer from './Components/Customer'; // Ensure this path matches the actual file casing
import App from './App';
import Uploadsection from './Components/Input';
import { store } from './redux/store'; // Ensure this path matches your store configuration

// Corrected Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This is the root layout component
    children: [
      {
        index: true, // This route will render at the parent's path (i.e., '/')
        element: <Uploadsection />
      },
      {
        path: "productinfopage",
        element: <Productinfopage />
      },
      {
        path: "invoice",
        element: <Invoice />
      },
            {
        path: "Customer",
        element: <Customer />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Provider store={store}>
      {/* 🎯 The RouterProvider handles rendering the entire app based on the URL */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);