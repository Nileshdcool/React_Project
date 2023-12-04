import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import { ICONS_COLORS } from '../../../constants';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import styled from 'styled-components';

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
  flex-direction: column;
  justify-content: center;
  padding: 0;
  &.MuiDialogTitle-root {
    padding: 0 0 30px 0;
  }
  margin-bottom: 30px;
  & .MuiTypography-h2 {
    text-transform: uppercase;
    color: #425a70;
    margin-left: 15px;
    font-family: Roboto;
    font-size: 30px;
    font-weight: bold;
    font-style: normal;
    line-height: 1.17;
    text-align: center;
  }
`;

export const ConfirmationDialogContent = styled(DialogContent)`
  display: flex;
  min-height: 46px;
  max-height: 100px;
  height: 100%;
  padding: 0;
  margin-bottom: 15px;
  flex-direction: column;
  justify-content: space-between;
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
  margin: 0;
  padding: 0;
`;
export const ConfirmationTitleTextBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SubtitleConfirmation = styled(Typography)`
  &.MuiTypography-h4 {
    color: #425a70;
    margin-left: 15px;
    font-family: Roboto;
    font-style: normal;
    text-align: center;
    font-size: 16px;
    font-weight: ${(props) => (props.isMessage ? 'bold' : 'normal')};
    ${(props) => props.isMarginNeeded && 'margin-bottom: 20px'};
    line-height: 1.19;
    white-space: pre-wrap;
  }
`;

export const StyledWarningIcon = styled(WarningIcon)`
  &.MuiSvgIcon-root {
    transform: scale(0.7);
    fill: ${(props) => ICONS_COLORS[props.type]};
    margin-right: 5px;
    height: 40px;
    width: 40px;
  }
`;
