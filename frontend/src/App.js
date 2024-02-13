import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute"
import {AuthProvider} from './context/AuthContext';


import Navbar from './Components/Navbar';

import Footer from './Components/Footer';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import PetCredentials from './views/PetCredentials';
import Dashboard from './views/Dashboard';

  function App() {
    return (
      <Router>
        <AuthProvider>
          <Navbar />
          <Switch>
            <PrivateRoute component = {Dashboard} path="/dashboard" exact/>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/login" />
            <Route component={Register} path="/register" />
            <Route component={PetCredentials} path="/pet" />


            
          </Switch>
          <Footer />
         
         
        </AuthProvider>
      </Router>
    );
  }
  
export default App;