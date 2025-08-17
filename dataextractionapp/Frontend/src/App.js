import  Navbar  from './Components/Navbar';
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
