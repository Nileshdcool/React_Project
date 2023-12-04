import {
  AddTemplateModalStyledTypographyDescription,
  CreateTemplateConfirmationDialogTitle,
  ErrorText
} from './styledComponents';
import {
  ConfirmationDialogContent,
  StyledDialog,
} from '../../../../../../layouts/JobDetails/SupervisorView/components/TasksWidget/styledComponents';

import ContainedButton from '../../../../../../../components/Buttons/ContainedButton';
import DialogContentText from '@material-ui/core/DialogContentText';
import { ModalDialogButtonWrapper } from '../../../../../../layouts/JobDetails/SupervisorView/components/ChecksWidget/components/UnitCheckMultiSelectGroup/styledComponents';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { TemplateNameStyledTextArea } from '../../../../../../layouts/JobDetails/SupervisorView/components/styledComponents';

const EmployeeNumber = ({
  open,
  onClose,
  headerText,
  buttonsNames,
  onClickConfirm,
  onClickCancel,
  onChangeEmployeeNumber,
  employeeNumber,
  errorText,
}) => (
    <StyledDialog
      open={open}
      onClose={onClose}
      PaperProps={{ id: 'draggable-dialog' }}
      PaperComponent={Paper}
      aria-labelledby="draggable-dialog-title"
      id="draggable-dialog"
    >
      <CreateTemplateConfirmationDialogTitle>
        {headerText}
      </CreateTemplateConfirmationDialogTitle>
      <ConfirmationDialogContent>
        <DialogContentText>
          <AddTemplateModalStyledTypographyDescription variant="body2">
            EMPLOYEE NUMBER:
        </AddTemplateModalStyledTypographyDescription>
          <TemplateNameStyledTextArea
            multiline
            autoFocus
            variant="outlined"
            rowsMax={5}
            onChange={onChangeEmployeeNumber}
            placeholder=""
          />
          <ErrorText variant="body2">
            {errorText}
          </ErrorText>
        </DialogContentText>
      </ConfirmationDialogContent>
      <ModalDialogButtonWrapper>
        <ContainedButton
          variant="contained"
          color="primary"
          colorType="classic"
          onClick={onClickCancel}
          text={buttonsNames.cancelButtonText}
        />
        <ContainedButton
          variant="contained"
          color="secondary"
          colorType="white"
          disabled={!employeeNumber}
          onClick={e => onClickConfirm(e)}
          text={buttonsNames.confirmButtonText}
        />
      </ModalDialogButtonWrapper>
    </StyledDialog>
  );
export default EmployeeNumber;
