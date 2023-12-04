import { createSelector } from 'reselect';
const selectAuthorizationState = state => state.changeViewStore;

const selectView = () =>
  createSelector(
    selectAuthorizationState,
    state => state.view,
  );

export {
  selectView,
};
