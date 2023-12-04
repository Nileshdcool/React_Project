import {
  BUTTONS_TEXT,
  EMPLOYEE_NUMBER_ERROR,
  EMPLOYEE_NUMBER_TITLE,
  FIRST_ARTICLE,
  UNIT_CHECK_ACTIONS
} from '../../../../../../../constants';
import {
  ButtonContainer,
  FirstActionRow,
  NoTasks,
  UnitCheckIconWrapper,
  UnitCheckListItem,
  UnitCheckName,
  UnitChecksActionsBlock,
  UnitChecksListBody,
} from './styledComponents';
import React, { useEffect, useState } from 'react';
import {
  approveUnitCheck,
  clearOperatorData,
  doneUnitCheck,
  finishUnitCheck,
  getLineJobStationKPI,
  getOperatorSidebarData,
  getOperatorTasks,
  getOperatorUnitChecks,
  startUnitCheck,
  undoneUnitCheck
} from '../../../../../../../actions/operator';
import { bindActionCreators, compose } from 'redux';
import {
  selectEmployeeNumberError,
  selectIsFAApproved,
  selectIsStationHasActiveUnit,
  selectOperatorSidebarData,
} from '../../../../../../../selectors/operatorSelectors';

import CheckIcon from '@material-ui/icons/Check';
import { ChecksButton } from '../Buttons/Button';
import EmployeeNumber from '../../components/EmployeeNumber/EmployeeNumber';
import Loader from '../../../../../../../components/Loader/Loader';
import Typography from '@material-ui/core/Typography';
import { clearITPs } from '../../../../../../../actions/supervisorITPs';
import { clearStationBOMS } from '../../../../../../../actions/supervisorJobDetails';
import { clearVDRs } from '../../../../../../../actions/supervisorVDRs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

const isAllUnitChecksDone = (unitChecks) => unitChecks.every(item => item.completedForActiveStationUnit);
const hasFirstArticle = unitChecks => unitChecks.find(item => item.text === FIRST_ARTICLE);
const isFirstArticle = (unitChecks, index) => hasFirstArticle(unitChecks) && !index;
const unapprovedBySupervisor = (unapproved, unitChecks) => unapproved && hasFirstArticle(unitChecks) && !hasFirstArticle(unitChecks).confirmedBySupervisor;

const UnitChecksList = ({
  checks,
  startUnitCheck,
  finishUnitCheck,
  doneUnitCheck,
  undoneUnitCheck,
  operatorSidebarData,
  approveUnitCheck,
  error,
  getOperatorUnitChecks,
  getOperatorSidebarData,
  hasActiveStationUnit,
  isFAApproved,
  getLineJobStationKPI,
  getOperatorTasks,
  clearVDRs,
  clearITPs,
  clearStationBOMS,
  clearOperatorData,
}) => {
  const [disableUnitChecksActions, setDisableUnitChecksActions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const [employeeNumber, setEmployeeNumber] = useState(false);

  const onChangeEmployeeNumber = (e) => {
    setEmployeeNumber(e.target.value.trim());
  };

  const onSaveEmployeeNumber = () => {
    const { id } = operatorSidebarData;
    approveUnitCheck(id, employeeNumber)
      .then(response => {
        if (response) {
          toggleModal(false);
        }
        getOperatorUnitChecks(id)})
      .then(() => setIsLoading(false));
  };

  useEffect(() => {
    if (hasActiveStationUnit) {
      setDisableUnitChecksActions(false);
    }
  }, [hasActiveStationUnit]);

  const onUnitAction = (actionType) => {
    const { id, stationId } = operatorSidebarData;
    setIsLoading(true);
    if (actionType === BUTTONS_TEXT.start) {
      startUnitCheck(id)
        .then(() => getOperatorSidebarData(stationId))
        .then(() => {
          setDisableUnitChecksActions(false);
          setIsLoading(false);
        });
      return;
    }
    if (actionType === BUTTONS_TEXT.finish) {
      finishUnitCheck(id)
        .then(() => {
          getOperatorSidebarData(stationId).then((response) => {
            if (!response.data) {
              clearVDRs();
              clearITPs();
              clearStationBOMS();
              clearOperatorData();
            } else {
              const { id } = response.data;
              getOperatorUnitChecks(id);
              getLineJobStationKPI(id);
              getOperatorTasks(id);
            }
          });
        })
        .then(() => {
          setDisableUnitChecksActions(true);
          setIsLoading(false);
        });
    }
  };

  const onUnitCheckAction = (actionType, unitCheckId) => {
    const { id } = operatorSidebarData;
    setIsLoading(true);
    if (actionType === UNIT_CHECK_ACTIONS.done) {
      doneUnitCheck(id, unitCheckId)
        .then(() => getOperatorUnitChecks(id))
        .then(() => setIsLoading(false));
    } else {
      undoneUnitCheck(id, unitCheckId)
        .then(() => getOperatorUnitChecks(id))
        .then(() => setIsLoading(false));
    }
  };
  return (
    <UnitChecksListBody>
      {!hasActiveStationUnit && !!checks.filter(item => item.text !== FIRST_ARTICLE).length && (
        <FirstActionRow>
          <ChecksButton
            colortype="classic"
            text={BUTTONS_TEXT.start}
            onClick={() => onUnitAction(BUTTONS_TEXT.start)}
          />
        </FirstActionRow>
      )}
      {!!checks.length && checks.filter(item => item.text !== FIRST_ARTICLE).length
        ? (sortBy(checks, 'sortIndex').map((item, index) => (
          <UnitCheckListItem key={item.id}>
            <UnitCheckName>
              <Typography noWrap variant="body2">{item.text}</Typography>
            </UnitCheckName>
            <UnitChecksActionsBlock isFirstArticle={isFirstArticle(checks, index)}>
              {isFirstArticle(checks, index)
                ? (<ButtonContainer>
                  {!item.confirmedBySupervisor ? (
                    <ChecksButton
                      variant="outlined"
                      colortype="white"
                      disableRipple
                      color="primary"
                      text={BUTTONS_TEXT.done}
                      disabled={disableUnitChecksActions || !item.completedForActiveStationUnit}
                      onClick={() => toggleModal(!isModalOpen)}
                    />
                  ) : (
                      <UnitCheckIconWrapper
                        onClick={() => onUnitCheckAction('', item.id)}
                      >
                        <CheckIcon />
                      </UnitCheckIconWrapper>
                    )}
                </ButtonContainer>
                )
                : null}
              <ButtonContainer>
                {!item.completedForActiveStationUnit ? (
                  <ChecksButton
                    variant="outlined"
                    colortype="white"
                    text={BUTTONS_TEXT.done}
                    disabled={disableUnitChecksActions ||
                    (hasFirstArticle(checks) &&
                      unapprovedBySupervisor(!isFAApproved, checks) &&
                      !isFirstArticle(checks, index)
                    )}
                    onClick={() => onUnitCheckAction(BUTTONS_TEXT.done, item.id)}
                  />
                ) : (
                    <UnitCheckIconWrapper
                      onClick={() => onUnitCheckAction('', item.id)}
                    >
                      <CheckIcon />
                    </UnitCheckIconWrapper>
                  )}
              </ButtonContainer>
              <ButtonContainer>
                {checks.length - 1 === index && (
                  <ChecksButton
                    variant="contained"
                    colortype="classic"
                    text={BUTTONS_TEXT.finish}
                    disabled={!isAllUnitChecksDone(checks)}
                    onClick={() => onUnitAction(BUTTONS_TEXT.finish)}
                  />
                )}
              </ButtonContainer>
            </UnitChecksActionsBlock>
          </UnitCheckListItem>
        )))
        : <NoTasks>No unit checks</NoTasks>}
      <Loader open={isLoading} />
      <EmployeeNumber
        open={isModalOpen}
        buttonsNames={{
          confirmButtonText: BUTTONS_TEXT.submit,
          cancelButtonText: BUTTONS_TEXT.cancel,
        }}
        onChangeEmployeeNumber={onChangeEmployeeNumber}
        onClose={() => toggleModal(false)}
        headerText={EMPLOYEE_NUMBER_TITLE}
        employeeNumber={employeeNumber}
        onClickCancel={() => toggleModal(false)}
        onClickConfirm={onSaveEmployeeNumber}
        errorText={error && EMPLOYEE_NUMBER_ERROR}
      />
    </UnitChecksListBody>
  );
};

const mapStateToProps = createStructuredSelector({
  operatorSidebarData: selectOperatorSidebarData(),
  error: selectEmployeeNumberError(),
  hasActiveStationUnit: selectIsStationHasActiveUnit(),
  isFAApproved: selectIsFAApproved(),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  startUnitCheck,
  finishUnitCheck,
  doneUnitCheck,
  undoneUnitCheck,
  approveUnitCheck,
  getOperatorUnitChecks,
  getOperatorSidebarData,
  getLineJobStationKPI,
  getOperatorTasks,
  clearVDRs,
  clearITPs,
  clearStationBOMS,
  clearOperatorData,
}, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(UnitChecksList);
