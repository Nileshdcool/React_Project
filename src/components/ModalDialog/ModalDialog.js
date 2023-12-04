import {
  ButtonWrapper,
  ConfirmationDialogContent,
  ConfirmationDialogTitle,
  StyledDialog,
} from './styledComponents';

import ContainedButton from '../Buttons/ContainedButton';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const ModalDialog = ({
  open,
  onClose,
  headerText,
  bodyText,
  buttonsNames,
  onClickConfirm,
  onClickCancel,
  isDraggable,
  informationDialog,
}) => (
  <StyledDialog
    isDraggable={isDraggable}
    open={open}
    onClose={onClose}
    PaperProps={{ id: 'draggable-dialog' }}
    PaperComponent={isDraggable ? PaperComponent : Paper}
    aria-labelledby="draggable-dialog-title"
    id="draggable-dialog"
  >
    <ConfirmationDialogTitle disableTypography>
      <Typography variant="h4">{headerText}</Typography>
    </ConfirmationDialogTitle>
    <ConfirmationDialogContent disableTypography>
        <Typography variant="subtitle1">{bodyText}</Typography>
    </ConfirmationDialogContent>
    <ButtonWrapper>
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
        colorType="classic"
        onClick={onClickConfirm}
        text={buttonsNames.confirmButtonText}
      />
    </ButtonWrapper>
  </StyledDialog>
);

export default React.memo(ModalDialog);
