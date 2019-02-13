import React from 'react';
import {
    Route,
    Redirect
  } from "react-router-dom";
import { ACCESS_TOKEN } from '../constants';
  
  
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem(ACCESS_TOKEN) ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
);
  
export default PrivateRoute