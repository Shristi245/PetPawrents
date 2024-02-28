// import React, { useContext } from 'react';
// import { Redirect, Route } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// const PrivateRoute = ({ component: Component, adminOnly, ...rest }) => {
//     const { user, role } = useContext(AuthContext);

//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 user ? (
//                     adminOnly && role !== 'admin' ? (
//                         <Redirect to="/" />
//                     ) : (
//                         <Component {...props} />
//                     )
//                 ) : (
//                     <Redirect to="/login" />
//                 )
//             }
//         />
//     );
// };

// export default PrivateRoute;
