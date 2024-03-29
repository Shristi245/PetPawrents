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
import PetRegisterPage from "./containers/PetCredentailsPage.jsx";
import AdminDashboard from "./containers/Dashboard/AdminDashboard.jsx";
import About from "./containers/About";
import Service from "./containers/Service";
import Activate from "./containers/Activate";
import ResetPassword from "./containers/ResetPassword";
import EditProfile from "./containers/EditProfile";
import UserList from "./containers/Dashboard/UserList.jsx";
import EditUser from "./containers/Dashboard/EditUser.jsx";
import BookAppointment from "./containers/BookAppointment";
import UserProfile from "./containers/UserProfile";
import ConfirmPassword from "./containers/ConfirmPassword";
import Contact from "./containers/Contact";
import Donation from "./containers/Donation";
import ProductPage from "./containers/Product/Product.jsx";
import ShoppingCart from "./containers/Product/ShoppingCart.jsx";
import AdminProductList from "./containers/Dashboard/AdminProductList.jsx";
import AddProductPage from "./containers/Dashboard/AddProductPage.jsx";
import AddAdoptionDetails from "./containers/Dashboard/AddAdoptionDetails.jsx";
import AdoptionDetails from "./containers/adoption/AdoptionDetails.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAppointments from "./containers/Dashboard/AdminAppointmentPage.jsx";
import AdminAdoptionList from "./containers/Dashboard/AdminAdoptionList.jsx";
import EditProductPage from "./containers/Dashboard/EditProductPage.jsx";

const App = () => {
  console.log(1);
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <ToastContainer />
        <Switch>
          {/* Admin Routes */}
          <Route component={AdminDashboard} path="/admin-dashboard" />
          <Route component={UserList} path="/admin-dashboard-users" />
          <Route
            component={EditUser}
            path="/admin-dashboard-edituser/:userId"
          />
          {/* Admin Product Routes */}
          <Route
            component={AdminProductList}
            path="/admin-dashboard-products"
          />
          <Route component={AddProductPage} path="/add-product" />
          <Route component={EditProductPage} path="/edit-product/:productID" />

          {/* Admin Adoption Routes */}
          <Route component={AddAdoptionDetails} path="/add-adoption" />
          <Route
            component={AdminAdoptionList}
            path="/admin-dashboard-adoption"
          />

          {/* User Routes */}
          <Route component={EditProfile} path="/edit-profile" />
          <Route component={UserProfile} path="/profile" />

          <Route component={BookAppointment} path="/book-appointment" />
          <Route component={AdminAppointments} path="/admin-appointment" />

          {/* Common Routes */}
          <Route component={Home} path="/" exact />
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={PetRegisterPage} path="/pet" />
          <Route component={About} path="/about" />
          <Route component={Service} path="/services" />
          <Route component={Activate} path="/activate/:uid/:token" />
          <Route component={ResetPassword} path="/reset-password" />
          <Route component={ConfirmPassword} path="/confirm-password" />
          <Route component={Contact} path="/contact" />
          <Route component={Donation} path="/donation" />
          <Route component={ProductPage} path="/product" />
          <Route component={ShoppingCart} path="/cart" />
          <Route component={AdoptionDetails} path="/adoption" />

          {/* Redirect to home for unknown paths */}
          <Redirect to="/" />
        </Switch>

        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
