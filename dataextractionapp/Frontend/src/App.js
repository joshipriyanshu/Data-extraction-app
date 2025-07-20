import React from 'react';

import Fileselector from './Components/Input';
import  Navbar  from './Components/Navbar';
import Alternateapp from './Components/Maincomponents';

function App() {
  return (
    <div className="App"> 
        <Navbar/>
      {/* <Fileselector /> */}
      <Alternateapp />
    </div>
  );
}

export default App;
