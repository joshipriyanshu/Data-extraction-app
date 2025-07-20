import React from 'react';

import Fileselector from './Components/Input';
import  Navbar  from './Components/Navbar';
import Alternateapp from './Components/Maincomponents';
import { Productinfopage } from './Components/Productinfopage';
import { Invoice } from './Components/Invoice';
import Maincomponents from './Components/Maincomponents';
import { Outlet } from 'react-router';
import Uploadsection from './Components/Input';

function App() {
  return (
    <>
      <Navbar/>
      
      <Outlet/>
      
    </>  
  
  );
}

export default App;
