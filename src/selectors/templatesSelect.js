import { createSelector } from 'reselect';

const selectSupervisorJobDetailsState = state => state.lineJobTemplates;

const selectTemplates = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.templates,
  );

export {
  selectTemplates,
};
