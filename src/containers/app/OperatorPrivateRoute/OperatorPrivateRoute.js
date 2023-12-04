import React, { useEffect, useState } from 'react';
import { Redirect, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from "redux";

import { getUserAuthRoles } from '../../../actions/authorisation';
import OperatorLayout from '../../layouts/OperatorLayout/OperatorLayout';

const OperatorPrivateRoute = ({ children, getUserAuthRoles, ...rest }) => {
  const [userRoles, setUserRoles] = useState(null);

  useEffect(() => {
    getUserAuthRoles().then(response => setUserRoles(response.data));
  }, []);
  // const roles = JSON.parse(localStorage.getItem('USER_ROLE'));
  return (
    <>
      {!!userRoles && (
      <Route
        {...rest}
        render={({ location }) =>
          (!!localStorage.getItem('OPERATOR_AUTH_TOKEN') || userRoles?.admin ? (
            <OperatorLayout />
            ) : (
              <Redirect
                to={{
                  pathname: '/operator-login',
                  state: { from: location },
                }}
              />
            ))}
      />
      )}
    </>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserAuthRoles,
}, dispatch);

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(OperatorPrivateRoute);
