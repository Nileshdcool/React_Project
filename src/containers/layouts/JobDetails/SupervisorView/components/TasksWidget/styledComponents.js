import styled from 'styled-components';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField/TextField';
import Input from '@material-ui/core/Input/Input';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

export const TasksHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TasksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  overflow-y: auto;
  & .MuiTooltip-tooltip {
    margin-bottom: -20px;
    font-size: 16px;
  }
`;

export const ButtonWrapper = styled(DialogActions)`
  display: flex;
  &.MuiDialogActions-root {
    justify-content: center;
    padding: 0;
  }
`;

export const ConfirmationDialogContent = styled(DialogContent)`
  display: flex;
  padding: 0;
  margin-bottom: 5px;
  &.MuiDialogContent-root {
    display: flex;
    padding: 0 10px;
  }
  & .MuiDialogContentText-root {
    display: flex;
    width: 100%;
    flex-direction: column;
  }
  & .MuiTypography-body2 {
    font-weight: normal;
    margin-bottom: 15px;
  }
  & .template-name-text-area.MuiOutlinedInput-multiline {
    height: auto;
   }
`;

export const StyledTypographyDescription = styled(Typography)`
margin-bottom: 20px;
  &.MuiTypography-body2 {
    font-weight: normal;
    margin-bottom: 15px;
    &:after {
    content: '*';
    font-size: 16px;
    font-weight: bold;
    margin-left: 5px;
    color: red;
  }
  }
`;

export const ConfirmationDialogTitle = styled(DialogTitle)`
  &.MuiDialogTitle-root {
  display: flex;
  padding: 0 0 0 25px;
  height: 52px;
  background-color: #006ba6;
  margin-bottom: 15px;
  align-items: center;
  text-transform: uppercase;
  }
  & .MuiTypography-h6{
  color: white;
  font-weight: 500;
  font-size: 24px;
  line-height: 1.17;
  }
`;

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    max-width: 470px;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 0 25px 0;
    overflow-y: hidden;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
    outline: solid 1px #425a70;
    background-color: #ffffff;
    border-radius: 0;
  }
`;

export const StyledTextArea = styled(TextField)`
   & .MuiOutlinedInput-notchedOutline {
    border-color: #425a70;
    border-radius: 0;
    border-width: 1px;
   }
   & .MuiOutlinedInput-root.Mui-focused {
    & .MuiOutlinedInput-notchedOutline {
    border-color: #425a70;
    border-radius: 0;
    border-width: 1px;
   }
  }
   &.MuiFormControl-root {
    display: flex;
    width: 100%;
    height: 95px;
   }
   & .MuiOutlinedInput-multiline {
    height: 100%;
    display: flex;
    padding: 12px;
    margin-bottom: 15px;
   }
   textarea {
    height: 100%!important;
    color: #425a70;
    font-size: 16px;
    overflow: auto!important;
    line-height: 1.19;
    text-align: left;
   }
`;

export const AdditionalDataPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledRadioGroup = styled(RadioGroup)`
    &:after {
    content: '*';
    font-size: 16px;
    font-weight: bold;
    margin-left: 5px;
    color: red;
  }
  & .MuiRadio-colorSecondary.Mui-checked {
    color: #707070;
  }
  & .MuiFormControlLabel-labelPlacementStart {
    margin-left: 12px;
    margin-right: -11px;
  }
  & .MuiTypography-body1 {
    height: 16px;
    font-family: Roboto;
    font-size: 14px;
    line-height: 1.14;
    text-align: left;
    color: #425a70;
  }
`;

export const Label = styled.label`
  display: flex;
  height: 30px;
  padding-right: 10px;
  align-items: center;
      &:after {
    content: ${props => (props.isMandatory ? '\'*\'' : '')};
    font-size: 16px;
    font-weight: bold;
    margin-left: 5px;
    color: red;
  }
`;

export const StyledTasksNumericInput = styled(Input)`
  display: flex;
 &.MuiInputBase-root {
  width: 110px;
  height: 30px;
  padding: 5px;
  border-radius: 2px;
  font-size: 14px;
  border: solid 1px #707070;
  background-color: #ffffff;
  box-sizing: border-box;
  position: relative;
   
 }
  &.MuiInput-underline:after, 
  &.MuiInput-underline:before,
  &.MuiInput-underline.Mui-focused:after,
  &.MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: none;
  }
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button {  
    opacity: 1;
  }
  
`;

export const TasksHorizontalWithLabelWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
      & .MuiTypography-body2 {
    margin-bottom: 0;
  }
  &:last-child {
    margin-left: 9px;
  }
`;

export const SecondDataRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;

`;
export const EndAdornmentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ArrowsWrapper = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  height: 12px;
  width: 12px;
  &:hover{
    background-color: #e6e6e6;
  }
`;
export const ArrowTemplate = styled.div`
  display: flex;
  width: 0; 
  height: 0; 
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
`;
export const ArrowDropUp = styled(ArrowTemplate)`
  border-bottom: 6px solid #425a70;
`;
export const ArrowDropDown = styled(ArrowTemplate)`
  border-top: 6px solid #425a70;
`;
