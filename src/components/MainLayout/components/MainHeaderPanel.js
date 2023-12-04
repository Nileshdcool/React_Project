import Switch from '@material-ui/core/Switch';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { getQueuePositionsPlanner, getQueuePositionsSupervisor } from '../../../actions/lines';
import { changeView } from '../../../actions/roles';
import { BUTTONS_TEXT } from '../../../constants';
import { userRolesSelector } from '../../../selectors/auth';
import { selectView } from '../../../selectors/roles';
import ContainedButton from '../../Buttons/ContainedButton';
import {
  ChangeModeButtonsWrapper,
  MainLayoutHeaderPanel,
  Placeholder,
  RolesSwitcherWrapper, RoleSwitcherText, SwitcherWrapper,
} from '../styledComponents';
import MainSelect from './MainSelect';

const roleViewItems = [
  {
    value: 'planner',
    text: 'planner',
  },
  {
    value: 'supervisor',
    text: 'supervisor',
  },
];

const MainHeaderPanel = ({
  lines,
  userRoles,
  isInnerPage,
  onSelectHandle,
  selectedValue,
  url,
  changeView,
  roleView,
  history,
  getQueuePositionsPlanner,
  getQueuePositionsSupervisor,
}) => {
  const isOperator = url.indexOf('operator') + 1;
  const isMonitorPage = url.indexOf('monitor') + 1;

  const operatorLogout = () => {
    localStorage.removeItem('OPERATOR_AUTH_TOKEN');
    window.location.reload();
  };

  const onChangeRoleView = (e) => {
    if (e.target.value === 'planner') {
      getQueuePositionsPlanner();
    } else {
      getQueuePositionsSupervisor();
    }
    if (isMonitorPage && e.target.value === 'planner') {
      localStorage.setItem('ROLE_VIEW', e.target.value);
      changeView(e.target.value);
      history.push('/');
    } else {
      localStorage.setItem('ROLE_VIEW', e.target.value);
      changeView(e.target.value);
    }
  };
  const backToSupervisorPlanner = () => {
    history.push('/');
  };
  const isAuthenticatedAsOperator = !!localStorage.getItem('OPERATOR_AUTH_TOKEN');
  const storageRoleView = localStorage.getItem('ROLE_VIEW');
  return (
    <MainLayoutHeaderPanel>
      {lines.length && !isOperator ? (
        <MainSelect
          value={selectedValue}
          width={250}
          onChange={onSelectHandle}
          displayEmpty
          items={lines}
          isDisableSelect={isInnerPage}
        />
      ) : (
        <Placeholder>
          {userRoles && (userRoles.supervisor || userRoles.leadman) && !isOperator
            ? 'No production lines'
            : ''}
        </Placeholder>
      )}
      <RolesSwitcherWrapper>
        {userRoles?.admin && !isOperator
          && (
            <MainSelect
              value={(!!storageRoleView && storageRoleView) || roleView}
              width={250}
              onChange={onChangeRoleView}
              items={roleViewItems}
              fontSize="16px"
            />
        )}
        {(
          userRoles?.supervisor
          || userRoles?.leadman
          || (userRoles?.admin && roleView === 'supervisor')
        )
        && !isOperator
        && (
          <ChangeModeButtonsWrapper>
            <ContainedButton
              variant="contained"
              color="primary"
              component={NavLink}
              to="/monitor"
              exact
              activeClassName="selectedButton"
              colorType="classic"
              text={BUTTONS_TEXT.monitor}
            />
            <ContainedButton
              variant="contained"
              color="primary"
              colorType="classic"
              text={BUTTONS_TEXT.admin}
              component={NavLink}
              to="/"
              exact
              activeClassName="selectedButton"
            />
          </ChangeModeButtonsWrapper>
        )}
        {userRoles?.admin && !!isOperator && (
          <ContainedButton
            variant="contained"
            color="primary"
            colorType="classic"
            onClick={backToSupervisorPlanner}
            text={BUTTONS_TEXT.backToSupervisorPlanner}
          />
        )}
        {isAuthenticatedAsOperator
        && userRoles
        && (userRoles.operator || userRoles.leadman)
        && !!isOperator && (
          <ContainedButton
            variant="contained"
            color="primary"
            colorType="classic"
            onClick={operatorLogout}
            text={BUTTONS_TEXT.logout}
          />
        )}
      </RolesSwitcherWrapper>
    </MainLayoutHeaderPanel>
  );
};

const mapStateToProps = createStructuredSelector({
  userRoles: userRolesSelector(),
  roleView: selectView(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  changeView,
  getQueuePositionsPlanner,
  getQueuePositionsSupervisor,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(MainHeaderPanel);
