import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../selectors/selectors";
import { useSelector } from "react-redux";




export const PrivateRoute = ({children, ...rest}: any) => {
    
    
    const isAuthenticated = !!useSelector(getToken);


    const routeComponent = () => (
        isAuthenticated 
            ? (children)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};
