import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Switch } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { getUserAuthRoles } from '../../actions/authorisation';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <div>
      <Switch>
        <ProtectedRoute
          path="/"
          isAuthenticated
        />
      </Switch>
    </div>
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
)(App);
