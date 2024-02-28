import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PrivateRoute from "./utils/PrivateRoute"
import {AuthProvider} from './context/AuthContext';
import { Redirect } from 'react-router-dom'; 

import Navbar from './Components/Navbar';

import Footer from './Components/Footer';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import PetCredentials from './containers/PetCredentials';
import AdminDashboard from './containers/Dashboard/AdminDashboard';
import About from './containers/About';
import Service from './containers/Service';
import UserProfile from './containers/UserProfile';
import EditProfile from './containers/EditProfile';
import UserList from './containers/Dashboard/UserList'; 
import EditUser from './containers/Dashboard/EditUser';

function App() {
  return (
      <Router>
          <AuthProvider>
              <Navbar />
              <Switch>
                  {/* Admin Routes */}
                  <Route component={AdminDashboard} path="/admin-dashboard"/>
                  <Route component={UserList} path="/admin-dashboard-users" />
                  <Route component={EditUser} path="/admin-dashboard-edituser/:userId" />

                  {/* User Routes */}
                  <Route component={EditProfile} path="/user-edit-profile" />
                  <Route component={UserProfile} path="/user-profile" />

                  {/* Common Routes */}
                  <Route component={Home} path="/" exact />
                  <Route component={Login} path="/login" />
                  <Route component={Register} path="/register" />
                  <Route component={PetCredentials} path="/pet" />
                  <Route component={About} path="/about" />
                  <Route component={Service} path="/services" />

                  {/* Redirect to home for unknown paths */}
                  <Redirect to="/" />
              </Switch>
              <Footer />
          </AuthProvider>
      </Router>
  );
}


export default App;
