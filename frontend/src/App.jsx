import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Signin from './Components/Signin';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

  
  function App() {
    return (
      <Router>
        <div>
          <Navbar />
          <Home />
        
          
          
          <Routes>
            <Route path="signin/" exact component={<Signin />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    );
  }
  
export default App;