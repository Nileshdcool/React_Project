import { createSelector } from 'reselect';
const selectAuthorizationState = state => state.authorization;

const userRolesSelector = () =>
  createSelector(
    selectAuthorizationState,
    state => state.userRoles,
  );

export {
  userRolesSelector,
};
