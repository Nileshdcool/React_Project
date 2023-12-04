import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';

import ContainedButton from '../../../../../../../../components/Buttons/ContainedButton';
import {
  ConfirmationDialogContent,
  ConfirmationDialogTitle,
  StyledDialog,
  StyledTypographyDescription,
} from '../../../TasksWidget/styledComponents';
import {
  ModalDialogButtonWrapper,
  UnitChecksStyledTextArea,
} from '../UnitCheckMultiSelectGroup/styledComponents';

// This component is also used in 'src\containers\layouts\MonitorLayout\components\KPIsAndGoals\components\GoalsContentRow.js'
const CreateAndEditUnitCheckModalDialog = ({
  open,
  onClose,
  headerText,
  buttonsNames,
  onClickConfirm,
  onClickCancel,
  onChangeUnitCheckDescription,
  selectedUnitCheckId,
  unitCheckDescription,
  placeholder,
  fieldName,
  disableMultiline,
  error,
  helperText
}) => (
  <StyledDialog
    open={open}
    onClose={onClose}
    PaperProps={{ id: 'draggable-dialog' }}
    PaperComponent={Paper}
    aria-labelledby="draggable-dialog-title"
    id="draggable-dialog"
  >
    <ConfirmationDialogTitle>
      {headerText}
    </ConfirmationDialogTitle>
    <ConfirmationDialogContent>
      <DialogContentText>
        <StyledTypographyDescription variant="body2">{fieldName || 'CHECK DESCRIPTION'}</StyledTypographyDescription>
        <UnitChecksStyledTextArea 
          multiline={!disableMultiline}
          autoFocus
          variant="outlined"
          rowsMax={200}
          onChange={onChangeUnitCheckDescription}
          placeholder={placeholder || "Enter description..."}
          value={unitCheckDescription}
          error={error}
          helperText={helperText}
        />
      </DialogContentText>
    </ConfirmationDialogContent>
    <ModalDialogButtonWrapper>
      <ContainedButton
        variant="contained"
        color={!!selectedUnitCheckId ? 'secondary' : 'primary'}
        colorType={!!selectedUnitCheckId ? 'white' : 'classic'}
        onClick={onClickCancel}
        text={buttonsNames.cancelButtonText}
      />
      <ContainedButton
        variant="contained"
        color="primary"
        colorType="classic"
        disabled={!unitCheckDescription}
        onClick={e => onClickConfirm(e)}
        text={buttonsNames.confirmButtonText}
      />
    </ModalDialogButtonWrapper>
  </StyledDialog>
);
export default React.memo(CreateAndEditUnitCheckModalDialog);
