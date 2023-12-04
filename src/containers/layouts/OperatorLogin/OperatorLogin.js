import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import { getUserAuthRoles, operatorAuth } from "../../../actions/authorisation";
import Loader from '../../../components/Loader/Loader';
import { BUTTONS_TEXT } from '../../../constants/index';
import {
  LoginButton,
  LogoContainer,
  OperatorLoginWrapper,
  StyledTextField,
} from './styledComponents';

const OperatorLogin = ({ operatorAuth, history, getUserAuthRoles }) => {
  const [employeeNumber, setEmployeeNumber] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoginError, setIsLoginError] = React.useState(false);

  const changeEmployeeNumber = (value) => {
    if (isLoginError) {
      setIsLoginError(false);
    }
    setEmployeeNumber(value)
  }
  const submitLogin = (e) => {
    // TODO
    // Submit logic
    e.preventDefault();
    setIsLoading(true);
    setEmployeeNumber('');
    operatorAuth({
      employeeNumber,
    }).then(response => {
      if (!response) {
        setIsLoading(false);
        setIsLoginError(true);
      } else {
        localStorage.setItem('OPERATOR_AUTH_TOKEN', response.data.token);
        getUserAuthRoles().then(response => response &&
          response.data &&
          localStorage.setItem('USER_ROLE', JSON.stringify(response.data)));
        setIsLoading(false);
        if (history.location.state.from.state && history.location.state.from.state.backUrl) {
          history.push(history.location.state.from.state.backUrl);
        } else if (history.location.state) {
          history.push(history.location.state.from.pathname);
        } else {
          history.push('/operator');
        }
      }
    }).catch(error => {
      console.log(error);
      setIsLoading(false);
      setIsLoginError(true);
    })
  };
  return (
    <OperatorLoginWrapper>
      <LogoContainer />
      <form noValidate autoComplete="off" onSubmit={(e) => submitLogin(e)}>
        <StyledTextField
          autoFocus
          placeholder="Enter Your Employee Number"
          variant="outlined"
          size="small"
          value={employeeNumber || ''}
          onChange={(e) => changeEmployeeNumber(e.target.value)}
          borderError={isLoginError}
        />
        <LoginButton
          text={BUTTONS_TEXT.submit}
          colorType="classic"
          onClick={submitLogin}
          color="primary"
        />
      </form>
      <Loader open={isLoading} />
    </OperatorLoginWrapper>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  operatorAuth,
  getUserAuthRoles,
}, dispatch);

export default connect(null, mapDispatchToProps)(withRouter(OperatorLogin));
