import React from 'react';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import ContainedButton from '../../../../../../components/Buttons/ContainedButton';
import {
  ConfirmationDialogContent,
  StyledDialog,
} from '../TasksWidget/styledComponents';
import { ModalDialogButtonWrapper } from '../ChecksWidget/components/UnitCheckMultiSelectGroup/styledComponents';
import { TemplateNameStyledTextArea } from '../styledComponents';
import {AddTemplateModalStyledTypographyDescription, CreateTemplateConfirmationDialogTitle} from './styledComponents';

const CreateNewTemplateModalView = ({
  open,
  onClose,
  headerText,
  buttonsNames,
  onClickConfirm,
  onClickCancel,
  onChangeTemplateName,
  templateName,
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
          TEMPLATE NAME:
        </AddTemplateModalStyledTypographyDescription>
        <TemplateNameStyledTextArea
          multiline
          autoFocus
          className='template-name-text-area'
          variant="outlined"
          rowsMax={5}
          onChange={onChangeTemplateName}
          placeholder=""
        />
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
        disabled={!templateName}
        onClick={e => onClickConfirm(e)}
        text={buttonsNames.confirmButtonText}
      />
    </ModalDialogButtonWrapper>
  </StyledDialog>
);
export default React.memo(CreateNewTemplateModalView);
