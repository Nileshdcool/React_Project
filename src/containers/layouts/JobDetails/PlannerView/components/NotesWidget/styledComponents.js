import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';

export const AddNotesPopUpWrapper = styled.div`
  width: 488px;
  height: 425px;
  z-index: 50;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
  outline: 1px solid #707070;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const AddNotesPopUpWrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 13px 12px 15px;
  background-color: #9d9d9d;
  cursor: grab;
`;
export const AddNotesPopUpFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 15px 30px 15px;
  margin-top: 5px;
  & .MuiButton-containedSecondary {
    border: solid 1px #707070;
    color: #707070;
  }
`;

export const NotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, #93c6f4, #064289);
  cursor: pointer;
  height: 1.575em;
`;

export const StyledAddIcon = styled(AddIcon)`
  &.MuiSvgIcon-root {
    fill: #ffffff;
  }
`;

export const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  &.MuiSvgIcon-root{
    fill: #ffffff;
  }
  
`;
export const StyledTextArea = styled(TextField)`
   & .MuiOutlinedInput-notchedOutline {
    border-color: #707070;
    border-radius: 8px;
    border-width: 1px;
   }
   & .MuiOutlinedInput-root.Mui-focused {
    & .MuiOutlinedInput-notchedOutline {
    border-color: #707070;
    border-radius: 8px;
    border-width: 1px;
   }
  }
   &.MuiFormControl-root {
    display: flex;
    margin: 15px;
    height: 100%;
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
export const StyledNotesTitle = styled(Typography)`
  &.MuiTypography-root{
  vertical-align: center;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.19;
    text-align: left;
    color: #ffffff;
    margin-left: 20px;
    margin-right: 20px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
  }
  
`;


export const NotesFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const NotesContentWrapper = styled.p`
  display: flex;
  width: 300px;
  height: 232px;
  font-size: 20px;
  line-height: 1.2;
  text-align: left;
  color: #707070;
  margin: 25px auto;
  white-space: pre-wrap;
  overflow-y: auto;
  padding-right: 20px;
`;

