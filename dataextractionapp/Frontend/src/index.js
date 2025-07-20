import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router";
import { Productinfopage } from './Components/Productinfopage';
import { Invoice } from './Components/Invoice';
import Maincompoment from './Components/Maincomponents';


import Navbar from './Components/Navbar';
import App from './App';
import Uploadsection from './Components/Input';

const router = createBrowserRouter([
  { path: "/", element: <App/>,
    children: [ {

      path: "/",
      element: <App />
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
      path: "Uploadsection",
      element: <Uploadsection />
    }
    
  
  
  ]

   },
  ])  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
<StrictMode>
  <RouterProvider router={router} />
</StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

