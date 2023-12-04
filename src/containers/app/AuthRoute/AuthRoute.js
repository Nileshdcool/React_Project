import React from 'react';
import { Redirect, Route, withRouter } from 'react-router';

import { NON_AUTH_ROLE_REDIRECT_URL } from '../../../constants';
import { checkUserRolesIsRequired, getUserRoleKeyByRolesData } from "../../../utils";

const AuthRoute = ({
  Component, path, exact = false, isInitialPage, userRole, requiredRoles, ...rest
}) => {
  const matchedRequiredRoles = checkUserRolesIsRequired(userRole, requiredRoles);
  const roleForRedirectPath = getUserRoleKeyByRolesData(userRole);
  return (
    <Route
      path={path}
      exact={exact}
      {...rest}
      render={({ location }) =>
        (!!matchedRequiredRoles || (isInitialPage && !matchedRequiredRoles) ? (
          <>
            {!!Component ? <Component {...rest} /> : null}
          </>
        ) : (
          <Redirect
            to={{
              pathname: NON_AUTH_ROLE_REDIRECT_URL[roleForRedirectPath],
              state: { from: location },
            }}
          />
        ))}
    />
  );
};

export default withRouter(AuthRoute);
