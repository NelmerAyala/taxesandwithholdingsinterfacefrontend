import React from 'react'; 
import { Route, Navigate } from 'react-router-dom';  

import PropTypes from 'prop-types'

export default function RouteWrapper({   
    element: Element,   
    isPrivate,   
    ...rest 
}) {

    /**    
     * Redirect user to SignIn page if he tries to access a private      route
     * without authentication.    
     */   
    if (isPrivate && !isLogged) {
        return <Navigate to="/login" replace />;   
    }    
    /**    
     * Redirect user to Main page if he tries to access a non private route    
     * (SignIn or SignUp) after being authenticated.    
     */
    if (!isPrivate && isLogged) {     
        return <Navigate to="/" replace />;  
        
    }    


    /**    
     * If not included on both previous cases, redirect user to the desired route.    
     */   
    return <Route {...rest} element={Element} />; 
}
    RouteWrapper.propTypes = {
        isPrivate: PropTypes.bool,
        element: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
    };

    RouteWrapper.defaultProps = {
        isPrivate: false
    };