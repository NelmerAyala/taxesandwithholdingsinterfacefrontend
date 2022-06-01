// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useUser from '../hooks/useUser'

const PrivateRoute = () => {
  const {isLogged} = useUser();
    // const isLogged = null; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isLogged ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;