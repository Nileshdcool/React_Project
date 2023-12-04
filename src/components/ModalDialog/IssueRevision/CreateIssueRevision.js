import {
  CheckboxGroup,
  IssueRevisionButtonsWrapper,
  IssueRevisionCheckbox,
  IssueRevisionDialogContent,
  IssueRevisionDialogTitle,
  IssueRevisionText,
  IssueRevisionTitle,
  StyledDialog,
  StyledTextArea
} from '../styledComponents';

import Checkbox from '@material-ui/core/Checkbox';
import ContainedButton from '../../Buttons/ContainedButton';
import FormGroup from '@material-ui/core/FormGroup';
import { LINES } from '../../../constants';
import React from 'react';
import * as PropTypes from "prop-types";

const CreateIssueRevision = ({
  open,
  headerText,
  buttonsNames,
  onClickConfirm,
  onClickCancel,
  informationDialog,
  onChangeMessage,
  onChangeCheckbox,
  issueRevisionText,
  issueRevisionRole,
  isAutomaticIR,
  jobType,
  isJobInProgress
}) => {
  const isDisabled = [LINES.CREATED, LINES.STAGED].includes(jobType) || (jobType === LINES.ACTIVE && !isJobInProgress);
  return (
    <StyledDialog
      open={open}
    >
      <IssueRevisionDialogTitle disableTypography>
        <IssueRevisionTitle variant="h4">{headerText}</IssueRevisionTitle>
      </IssueRevisionDialogTitle>
      <IssueRevisionDialogContent disableTypography>
        {!isAutomaticIR
          ? <CheckboxGroup>
            <IssueRevisionText variant="h4">
              Please select the groups you want to notify of a revision:
          </IssueRevisionText>
            <FormGroup row>
              <IssueRevisionCheckbox
                checked={issueRevisionRole.supervisor}
                onChange={onChangeCheckbox}
                control={<Checkbox name="supervisor" />}
                label="SUPERVISOR" />
              <IssueRevisionCheckbox
                disabled={isDisabled}
                checked={issueRevisionRole.operator}
                onChange={onChangeCheckbox}
                control={<Checkbox name="operator" />}
                label="OPERATOR" />
            </FormGroup>
          </CheckboxGroup>
          : null}
        <IssueRevisionText variant="h4">
          Enter a message:
          </IssueRevisionText>
        <StyledTextArea
          multiline
          value={issueRevisionText}
          variant="outlined"
          rowsMax={100}
          onChange={(e) => onChangeMessage(e)}
        />
      </IssueRevisionDialogContent>
      <IssueRevisionButtonsWrapper>
        {!informationDialog && (
          <ContainedButton
            variant="contained"
            color="secondary"
            colorType="white"
            onClick={onClickCancel}
            text={buttonsNames.cancelButtonText}
          />
        )}
        <ContainedButton
          variant="contained"
          color="primary"
          colorType="red"
          onClick={onClickConfirm}
          text={buttonsNames.confirmButtonText}
        />
      </IssueRevisionButtonsWrapper>
    </StyledDialog>
  )
};

CreateIssueRevision.propTypes = {
  open: PropTypes.bool,
  headerText: PropTypes.func,
  buttonsNames: PropTypes.func,
  onClickConfirm: PropTypes.func,
  onClickCancel: PropTypes.func,
  informationDialog: PropTypes.bool,
  onChangeMessage: PropTypes.func,
  onChangeCheckbox: PropTypes.func,
  issueRevisionText: PropTypes.func,
  issueRevisionRole: PropTypes.instanceOf(Object),
  isAutomaticIR: PropTypes.bool,
  jobType: PropTypes.string,
  isJobInProgress: PropTypes.bool
};

export default React.memo(CreateIssueRevision);
