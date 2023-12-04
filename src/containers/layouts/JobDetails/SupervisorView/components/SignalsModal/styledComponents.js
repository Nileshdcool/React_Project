import styled from 'styled-components';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import Dialog from '@material-ui/core/Dialog/Dialog';

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    max-width: 460px;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 30px;
    overflow-y: hidden;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
    border: solid 1px #707070;
    background-color: #ffffff;
    border-radius: 0;
  }
`;

export const ConfirmationDialogTitle = styled(DialogTitle)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0;
  &.MuiDialogTitle-root {
    padding: 0 0 30px 0;
  }
  margin-bottom: 30px;
  & .MuiTypography-h2{
    text-transform: uppercase;
    color: #425a70;
    margin-left: 15px;
  }
`;

export const ConfirmationDialogContent = styled(DialogContent)`
  display: flex;
  padding: 0;
  margin-bottom: 15px;
  justify-content: center;
  &.MuiDialogContent-root {
    padding: 8px 10px;
  }
  & .MuiTypography-subtitle1 {
    font-weight: normal;
    justify-content: center;
    text-align: center;
    line-height: 1.3;
  }
  & span {
    font-weight: bold;
  }
`;

export const ButtonWrapper = styled(DialogActions)`
  &.MuiDialogActions-root {
    justify-content: center;
  }
  margin-bottom: 10px;
  padding: 0;
`;
