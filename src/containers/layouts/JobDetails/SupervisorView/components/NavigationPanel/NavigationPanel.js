import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CustomIconButton from '../../../../../../components/Buttons/CustomIconButton';
import { BackIcon, HomeIcon } from '../../../../../../components/SvgIcons/svgIcons';
import { StyledButton } from '../../../../../../components/Buttons/styledComponents';
import { getLineJobDetails } from '../../../../../../actions/jobDetails';
import DropDownSelect from '../../../../../../components/DropDownSelect';
import ModalDialog from '../../../../../../components/ModalDialog';

import { updateLineJobQueue } from '../../../../../../actions/lines';

import {
  selectActivelineJobs,
  selectAssignedToJobStationsCount,
  selectedLineJobDetailsQueuePositionName,
  selectQueuePositions,
} from '../../../../../../selectors/jobs';

import {
  BUTTONS_TEXT,
  ACTIVATE_JOB_MODAL_HEADER,
  ACTIVATE_JOB_MODAL_TEXT,
  GLOBAL_COLORS,
  NAVIGATION_PANEL_INFO,
  LINES,
  WARNING_MODAL_HEADER,
  WARNING_MODALS_TYPES,
  WARNING_MODALS_TEXT_MAP,
  MAX_ACTIVE_LINE_JOBS_COUNT,
} from '../../../../../../constants';

import {
  NavigationPanelWrapper,
  MainNavigationWrapper,
  SecondaryNavigationWrapper,
  InformationBlock,
} from './styledComponents';

const NavigationPanel = ({
  onHomeHandle,
  onBack,
  data,
  queuePositions,
  selectedLineJobDetailsQueuePositionName,
  updateLineJobQueue,
  getLineJobDetails,
  match,
  assignedToJobStationsCount,
  activeLineJobs,
}) => {
  const [isSelectDisable, setIsSelectDisable] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [phaseIdToChange, setPhaseIdToChange] = React.useState(null);
  const [warningModalType, setWarningModalType] = React.useState(null);

  const changePhase = async (positionid) => {
    const { jobId } = match.params;
    const data = {
      lineJobId: jobId,
      queuePosition: positionid,
    };
    if (positionid) {
      setIsSelectDisable(true);
      await updateLineJobQueue(jobId, data)
        .then(() => getLineJobDetails(jobId));
      setIsSelectDisable(false);
    }
  };

  const onSelectHandle = (e) => {
    const targetPhaseName = e.target.textContent;
    const isDropdownTarget = Object.values(LINES).includes(e.target.textContent)
    if (targetPhaseName === selectedLineJobDetailsQueuePositionName || !isDropdownTarget) {
      return;
    }
    if (selectedLineJobDetailsQueuePositionName === LINES.ACTIVE && targetPhaseName !== LINES.ACTIVE) {
      setWarningModalType(WARNING_MODALS_TYPES.orderChanging);
    }
    if (
      selectedLineJobDetailsQueuePositionName === LINES.CREATED
      && [LINES.ACTIVE, LINES.STAGED].includes(targetPhaseName)
      && assignedToJobStationsCount < 1
    ) {
      setWarningModalType(WARNING_MODALS_TYPES.setupJobStation);
      return;
    }
    if (activeLineJobs.length >= MAX_ACTIVE_LINE_JOBS_COUNT && targetPhaseName === LINES.ACTIVE) {
      setWarningModalType(WARNING_MODALS_TYPES.tooManyActiveJobs);
      return;
    }
    if (targetPhaseName === LINES.ACTIVE) {
      setIsModalOpen(true);
      setPhaseIdToChange(e.target.value);
      return;
    }
    changePhase(e.target.value);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };
  const onConfirmPhaseChanging = () => {
    changePhase(phaseIdToChange);
    setIsModalOpen(false);
  };

  return (
    <NavigationPanelWrapper>
      <MainNavigationWrapper>
        <CustomIconButton
          disableFocusRipple
          color="primary"
          onClick={onBack}
          disableRipple
          icon={<BackIcon />}
          iconFontSize="17px"
        />
        <CustomIconButton
          disableFocusRipple
          color="primary"
          onClick={onHomeHandle}
          disableRipple
          icon={<HomeIcon />}
          iconFontSize="31px"
        />
        <StyledButton
          disableRipple
          textcolor={GLOBAL_COLORS.navigationColor}
          onClick={onHomeHandle}
        >
          Home
        </StyledButton>
      </MainNavigationWrapper>
      <SecondaryNavigationWrapper>
        <InformationBlock>
          {
          NAVIGATION_PANEL_INFO.map((item, index) => {
            const value = index > 2 ? item : `${item}#`;
            return (
              <Typography
                variant="subtitle2"
                key={`${item}#-${data[item]}`}
              >
                {`${value}: ${data[item]}`}
              </Typography>
            );
          })
        }
        </InformationBlock>
        <DropDownSelect
          value={selectedLineJobDetailsQueuePositionName}
          width={250}
          isStatusesUpdated={isSelectDisable}
          onChange={onSelectHandle}
          displayEmpty
          variant="outlined"
          items={queuePositions}
        />
      </SecondaryNavigationWrapper>
      <ModalDialog
        open={isModalOpen}
        buttonsNames={{
          confirmButtonText: BUTTONS_TEXT.activate,
          cancelButtonText: BUTTONS_TEXT.cancel,
        }}
        headerText={ACTIVATE_JOB_MODAL_HEADER}
        bodyText={ACTIVATE_JOB_MODAL_TEXT}
        onClickCancel={onCloseModal}
        onClickConfirm={onConfirmPhaseChanging}
      />
      <ModalDialog
        open={!!warningModalType}
        buttonsNames={{
          confirmButtonText: BUTTONS_TEXT.ok,
          cancelButtonText: '',
        }}
        informationDialog
        onClose={() => setWarningModalType(null)}
        headerText={WARNING_MODAL_HEADER}
        bodyText={WARNING_MODALS_TEXT_MAP[warningModalType]}
        onClickConfirm={() => setWarningModalType(null)}
      />
    </NavigationPanelWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  queuePositions: selectQueuePositions(),
  selectedLineJobDetailsQueuePositionName: selectedLineJobDetailsQueuePositionName(),
  assignedToJobStationsCount: selectAssignedToJobStationsCount(),
  activeLineJobs: selectActivelineJobs(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateLineJobQueue,
  getLineJobDetails,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
)(NavigationPanel);
