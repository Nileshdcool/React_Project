import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export const StyledDialog = styled(Dialog)`
  & .MuiDialog-paper {
    max-width: 460px;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 60px;
    overflow-y: hidden;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
    border: solid 1px #707070;
    background-color: #ffffff;
    border-radius: 0;
  }
`;

export const StyledBOMDialog = styled(StyledDialog)`
  .MuiBackdrop-root {
    background-color: transparent;
  }
  & .MuiDialog-paper {
    max-width: ${props => props.width};
    height: ${props => props.height};
    justify-content: space-between;
    padding: 0;
    @media (width: 1920px) {
      max-width: ${props => props.width};
    }
  }
  & .react-resizable-handle {
    ${props => props.isOperatorViewBoms && 'display: none'};
  }
`;

export const StyledAnnotationDialog = styled(StyledDialog)`
  & .MuiDialog-paper {
    max-width: 320px;
    height: 320px;
    justify-content: space-between;
    padding: 0;
    top: 10px;
    left: 180px;
  }
`;

export const StyledFixtureDialog = styled(StyledAnnotationDialog)`
  & .MuiDialog-paper {
    max-width: 320px;
    height: 200px;
    justify-content: space-between;
    padding: 0;
    top: 0px;
    left: 0px;
  }
`;

export const ConfirmationDialogTitle = styled(DialogTitle)`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0;
  &.MuiDialogTitle-root {
    flex-direction: column;
    padding: 0 0 30px 0;
  }
  margin-bottom: 30px;
  & .MuiTypography-h4{
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
  }
`;

export const BOMDialogTitle = styled(ConfirmationDialogTitle)`
  justify-content: space-between;
  flex-direction: row;
  background-color: #9d9d9d;
  height: 40px;
  &.MuiDialogTitle-root {
    flex-direction: row;
    padding: 0;
  }
`;

export const AnnotationDialogTitle = styled(ConfirmationDialogTitle)`
  &.MuiDialogTitle-root {
    padding: 0 0 0px 0;
  }
`;

export const FixtureDialogTitle = styled(AnnotationDialogTitle)``;
export const IssueRevisionDialogTitle = styled(ConfirmationDialogTitle)`
  &.MuiDialogTitle-root {
    padding: 0 0 20px 0;
  }
`;

export const BOMNameTitle = styled(Typography)`
  &.MuiTypography-h4 {
    line-height: 2.5;
    margin-left: 10px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    color: #ffffff;
  }
`;

export const ConfirmationDialogContent = styled(DialogContent)`
  display: flex;
  padding: 0;
  margin-bottom: ${props => props.isOperatorViewBoms ? '0' : '15px'};
  &.MuiDialogContent-root {
    padding: 8px 16px;
  }
  & .MuiTypography-subtitle1 {
    font-weight: normal;
  }
`;

export const IssueRevisionDialogContent = styled(ConfirmationDialogContent)`
  flex-direction: column;
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

export const RecentFilesRedioGroup = styled(StyledRadioGroup)`
  &:after {
    content: '';
  }
  &.MuiFormGroup-row {
    flex-direction: row;
    justify-content: center;
  }
`;

export const AnnotationDialogContent = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding: 10px;
  }
  display: flex;
  flex-direction: column;
  padding: 0;

  & .MuiTypography-subtitle1 {
    font-weight: normal;
  }
`;

export const FixtureDialogContent = styled(AnnotationDialogContent)`
&.MuiDialogContent-root {
  padding: 0 30px;
}
`;
export const FixtureTitle = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #425a70;
`;
export const FixtureContent = styled.p`
  margin: 5px 0;
  font-weight: regular;
  color: #707070;
`;

export const ButtonWrapper = styled(DialogActions)`
  margin-bottom: 10px;
  padding: 0;
  & button:first-child {
    margin-right: 12px;
  }
`;

export const BOMButtonWrapper = styled(ButtonWrapper)`
  margin-bottom: 0px;
  width: 300px;
  &.MuiDialogActions-root {
    justify-content: ${props => props.isOperatorViewBoms ? 'flex-end' : 'space-between'};
  }
`;

export const AnnotationModalButtonWrapper = styled(BOMButtonWrapper)`
  &.MuiDialogActions-root {
    justify-content: flex-end;
  }
`;

export const AnnotationButtonWrapper = styled(ButtonWrapper)`
  margin-bottom: 0px;
  width: 100%;
  &.MuiDialogActions-root {
    justify-content: flex-end;
    padding: 8px 0;
  }
`;

export const FixtureButtonWrapper = styled(AnnotationButtonWrapper)``;

export const ModalButtonWrapper = styled(ButtonWrapper)`
  margin-bottom: 0px;
  &.MuiDialogActions-root {
    width: 300px;
    justify-content: ${props => (props.isAnnotation ? 'space-between' : 'flex-end')};
    padding: 8px 10px;

  }
  & button:first-child {
    margin-right: 0;
  }
`;

export const IssueRevisionButtonsWrapper = styled(ButtonWrapper)`
  &.MuiDialogActions-root {
    justify-content: center;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BOMIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Check = styled(CheckIcon)`
  color: #ffffff;
`;

export const Close = styled(CloseIcon)`
  color: #ffffff;
`;

export const HeaderCell = styled(TableCell)`
  &.MuiTableCell-head {
    color: #425a70;
    background: #ffffff;
    font-size: 16px;
    border-top: none;
    border-bottom: none;
    padding: 5px;
    min-width: ${props => props.minwidth};
    @media all and (width: 1920px) {
      padding: 16px;
      min-width: ${props => props.minwidth}
    }
  }
`;

export const StyledCell = styled(TableCell)`
  &.MuiTableCell-root {
    font-size: 16px;
    color: #425a70;
    border-top: none;
    border-bottom: none;
    padding: 10px 5px;
    @media all and (width: 1920px) {
      padding: 10px 14px;
    }
  }
`;

export const TextCutter = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 70px;
  margin: 0;
`;

export const StyledTextArea = styled(TextField)`
   & .MuiOutlinedInput-notchedOutline {
    border-color: #707070;
    border-radius: 2px;
    border-width: 1px;
   }
   & .MuiOutlinedInput-root.Mui-focused {
    & .MuiOutlinedInput-notchedOutline {
    border-color: #707070;
    border-radius: 2px;
    border-width: 1px;
   }
  }
   &.MuiFormControl-root {
    display: flex;
    margin-top: 10px;
    height: 150px;
   }
   & .MuiOutlinedInput-multiline {
    height: 100%;
    display: flex;
   }
   textarea {
    height: 100%!important;
    color: #707070;
    font-size: 20px;
    overflow: auto!important;
    line-height: 1.2;
    text-align: left;
   }
`;

export const Triangle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  // border-width: 8px 8px 8px 8px;
  border-color: red red transparent transparent;
  filter: drop-shadow(0 0 0 #000);
`;

export const ItemCellWrapper = styled.div`
  display: flex;
  cursor: ${props => props.isAnnotated && 'pointer'};
`;

export const IssueRevisionTitle = styled(Typography)`
  &.MuiTypography-h4 {
    font-family: Roboto;
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
    line-height: 1.17;
    text-align: center;
    color: #425a70;
  }
`;

export const IssueRevisionText = styled(IssueRevisionTitle)`
  &.MuiTypography-h4 {
    color: #425a70;
    font-size: 16px;
    line-height: 1.19;
    text-align: left;
  }
  `;

export const IssueRevisionCheckbox = styled(FormControlLabel)`
  &.MuiFormControlLabel-root{
    flex-direction: row-reverse;
    margin: 10px;
    & > span {
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      line-height: 1.14;
      color: ${props => props.disabled ? '#dddddd' : '#425a70'};
    }
  }
`;

export const CopyAnnotationCheckBox = styled(IssueRevisionCheckbox)`
  &.MuiFormControlLabel-root{
    flex-direction: row;
  }
`;

export const RecentFilesModalText = styled.p`
  font-family: Roboto;
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  line-height: 1.17;
  text-align: center;
  color: #425a70;
  text-transform: uppercase;
  margin: 0;
`
export const RecentFilesModalSubtitle = styled(RecentFilesModalText)`
  font-size: 16px;
  font-weight: normal;
  margin: 10px;
  text-transform: none;
`;

export const RecentFilesButtonGroup = styled.div`
  width: 200px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
`;

export const RecentFilesCheckboxGroup = styled.div`
  display: flex;
  justify-content: center;
`;
