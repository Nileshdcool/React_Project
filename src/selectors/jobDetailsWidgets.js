import { createSelector } from 'reselect';
const selectSupervisorJobDetailsState = state => state.jobDetails;

const selectLineJoblITPs = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.planerITPs,
  );

const selectLineJobExternalVDRs = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.planerExternalVDRs,
  );


const unsavedNotesSelector = () =>
  createSelector(
    selectSupervisorJobDetailsState,
    state => state.unsavedNotes,
  );

export {
  selectLineJobExternalVDRs,
  selectLineJoblITPs,
  unsavedNotesSelector
};
