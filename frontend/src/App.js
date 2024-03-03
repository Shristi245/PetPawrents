import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PrivateRoute from "./utils/PrivateRoute"
import { AuthProvider } from "./context/AuthContext";
import { Redirect } from "react-router-dom";

import Navbar from "./Components/Navbar";

import Footer from "./Components/Footer";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import PetCredentials from "./containers/PetCredentials";
import AdminDashboard from "./containers/Dashboard/AdminDashboard";
import About from "./containers/About";
import Service from "./containers/Service";
import Activate from "./containers/Activate";
import PasswordReset from "./containers/PasswordReset.js";
import PasswordResetConfirm from "./containers/PasswordResetConfirm.js";
import UserProfile from "./containers/UserProfile";
import EditProfile from "./containers/EditProfile";
import UserList from "./containers/Dashboard/UserList";
import EditUser from "./containers/Dashboard/EditUser";
import BookAppointment from "./containers/BookAppointment";


const App = () => (
    <Router>
        <AuthProvider>
            <Navbar />
            <Switch>
                {/* Admin Routes */}
                <Route component={AdminDashboard} path="/admin-dashboard" />
                <Route component={UserList} path="/admin-dashboard-users" />
                <Route component={EditUser} path="/admin-dashboard-edituser/:userId"/>

                {/* User Routes */}
                <Route component={EditProfile} path="/user-edit-profile" />
                <Route component={UserProfile} path="/user-profile" />
                <Route component={BookAppointment} path="/book-appointment" />

                {/* Common Routes */}
                <Route component={Home} path="/" exact />
                <Route component={Login} path="/login" />
                <Route component={Register} path="/register" />
                <Route component={PetCredentials} path="/pet" />
                <Route component={About} path="/about" />
                <Route component={Service} path="/services" />
                <Route component={Activate} path="/activate/:uid/:token" />
                <Route component={PasswordReset} path="/password-reset" />
                <Route component={PasswordResetConfirm} path="/password-reset/confirm/:uid/:token"/>

                {/* Redirect to home for unknown paths */}
                <Redirect to="/" />
            </Switch>
                    
            <Footer />
    
        </AuthProvider>
    </Router>
);

export default App;
